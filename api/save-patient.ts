import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sendAdminNotification, sendUserConfirmation } from "../lib/email";
import { sendToFormspree } from "../lib/formspree";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS support
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const {
    name,
    email,
    phone,
    state,
    location,
    concern,
    recommendation,
    specialist,
  } = req.body;

  if (!name || !email || !phone || !state || !location || !concern) {
    return res.status(400).json({
      error:
        "Missing required patient fields: name, email, phone, state, location, or concern",
    });
  }

  const submittedAt = new Date().toISOString();

  const details = {
    name,
    email,
    phone,
    state,
    location,
    concern,
    specialist: specialist || "Unspecified",
    recommendation: recommendation || "N/A",
    submittedAt,
  };

  console.log(
    `[Patient Match Submission] Processing submission for ${name} (${email})`
  );

  const results = await Promise.allSettled([
    sendAdminNotification("patient", details),
    sendUserConfirmation("patient", details),
    sendToFormspree("symptom", {
      name,
      email,
      _replyto: email,
      phone,
      state,
      location,
      concern,
      specialist: specialist || "Unspecified",
      recommendation: recommendation || "N/A",
      submittedAt,
      subject: `New patient request - ${name}`,
      message: `Symptom: New patient request - ${name} (${email}, ${phone}, ${concern}, AI: ${
        recommendation || "N/A"
      })

Patient Details:
- Name: ${name}
- Email: ${email}
- Phone: ${phone}
- State: ${state}
- Location: ${location}

Clinical Information:
- Primary Health Concern: ${concern}
- AI Recommended Specialist: ${specialist || "Unspecified"}
- AI Match Recommendation Statement:
"${recommendation || "N/A"}"

Submission Details:
- Time: ${submittedAt}`,
    }),
  ]);

  let hasSucceeded = false;

  results.forEach((result, idx) => {
    const methods = [
      "Admin Notification",
      "User Confirmation",
      "Formspree Push",
    ];

    const method = methods[idx];

    if (result.status === "fulfilled") {
      if (result.value === true) {
        console.log(`[Patient Delivery Success] ${method} succeeded.`);
        hasSucceeded = true;
      } else {
        console.warn(
          `[Patient Delivery Failed] ${method} returned false (skipped or soft-failure).`
        );
      }
    } else {
      console.error(
        `[Patient Delivery Exception] ${method} failed:`,
        result.reason
      );
    }
  });

  if (!hasSucceeded) {
    return res.status(500).json({
      error:
        "All notification delivery channels failed. Please check backend logs.",
    });
  }

  return res.status(201).json({
    success: true,
    patient: {
      id: `TH-PAT-${Date.now()}`,
      name,
      email,
      phone,
      state,
      location,
      concern,
      specialist: specialist || "Unspecified",
      recommendation: recommendation || "N/A",
      submittedAt,
    },
  });
}