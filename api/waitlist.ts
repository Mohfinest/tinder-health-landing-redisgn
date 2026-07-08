import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sendAdminNotification, sendUserConfirmation } from "../lib/email.js";
import { sendToFormspree } from "../lib/formspree.js";

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

  const { fullName, workEmail, role, investmentAmount } = req.body;

  if (!fullName || !workEmail || !role) {
    return res.status(400).json({ error: "Missing required fields: fullName, workEmail, or role" });
  }

  const submittedAt = new Date().toISOString();
  const details = {
    fullName,
    workEmail,
    role,
    investmentAmount: investmentAmount || null,
    submittedAt
  };

  console.log(`[Waitlist Submission] Processing registration for ${fullName} (${workEmail})`);

  // Execute all deliveries concurrently
  const results = await Promise.allSettled([
    sendAdminNotification("waitlist", details),
    sendUserConfirmation("waitlist", details),
    sendToFormspree("waitlist", {
      fullName,
      workEmail,
      email: workEmail,
      _replyto: workEmail,
      role,
      investmentAmount: investmentAmount || "N/A",
      submittedAt,
      subject: `New waitlist signup - ${fullName}`,
      message: `New waitlist signup - ${fullName} (${workEmail}, ${role})\n\nWaitlist application details:\n- Name: ${fullName}\n- Email: ${workEmail}\n- Role: ${role}\n- Investment Amount: ${investmentAmount || "N/A"}\n- Submitted At: ${submittedAt}`
    })
  ]);

  // Log delivery outcomes
  let hasSucceeded = false;
  results.forEach((result, idx) => {
    const methods = ["Admin Notification", "User Confirmation", "Formspree Push"];
    const name = methods[idx];
    if (result.status === "fulfilled") {
      if (result.value === true) {
        console.log(`[Waitlist Delivery Success] ${name} succeeded.`);
        hasSucceeded = true;
      } else {
        console.warn(`[Waitlist Delivery Failed] ${name} returned false (skipped or soft-failure).`);
      }
    } else {
      console.error(`[Waitlist Delivery Exception] ${name} failed:`, result.reason);
    }
  });

  // Only return error if EVERY single delivery method failed entirely
  if (!hasSucceeded) {
    return res.status(500).json({
      error: "All notification delivery channels failed. Please check backend logs."
    });
  }

  return res.status(201).json({
    success: true,
    application: {
      id: `TH-${Date.now()}`,
      fullName,
      workEmail,
      role,
      investmentAmount: investmentAmount || null,
      submittedAt,
    },
  });
}
