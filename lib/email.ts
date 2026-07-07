import nodemailer from "nodemailer";

async function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass || user.trim() === "" || pass.trim() === "") {
    console.log("[Email Skipped] GMAIL_USER or GMAIL_APP_PASSWORD not configured.");
    return null;
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user,
      pass,
    },
  });

  try {
    await transporter.verify();
    console.log("[SMTP] Gmail connection verified successfully.");
  } catch (error) {
    console.error("[SMTP] Gmail verification failed:", error);
    return null;
  }

  return transporter;
}

export interface WaitlistDetails {
  fullName: string;
  workEmail: string;
  role: string;
  investmentAmount?: string | null;
  submittedAt: string;
}

export interface PatientDetails {
  name: string;
  email: string;
  phone: string;
  state: string;
  location: string;
  concern: string;
  specialist: string;
  recommendation: string;
  submittedAt: string;
}

/**
 * Sends a notification email to the admin/team
 */
export async function sendAdminNotification(
  type: "waitlist" | "patient",
  details: WaitlistDetails | PatientDetails
): Promise<boolean> {
  const transporter = await getTransporter();
  if (!transporter) return false;

  const adminEmail = "tinderhealth1@gmail.com";
  const user = process.env.GMAIL_USER;

  let subject = "";
  let htmlContent = "";

  if (type === "waitlist") {
    const d = details as WaitlistDetails;
    subject = `🎉 New Waitlist Registration - ${d.fullName}`;
    htmlContent = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
        <div style="text-align: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px; margin-bottom: 20px;">
          <h2 style="color: #2b6cb0; margin: 0; font-size: 24px; font-weight: 700;">Tinder Health Waitlist Notification</h2>
        </div>
        <p style="font-size: 16px; line-height: 1.5; color: #4a5568;">
          You have received a new registration for the Tinder Health Waitlist!
        </p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 10px 0; font-weight: bold; color: #4a5568; width: 180px;">Full Name:</td>
            <td style="padding: 10px 0; color: #2d3748;">${d.fullName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 10px 0; font-weight: bold; color: #4a5568;">Work Email:</td>
            <td style="padding: 10px 0; color: #2d3748;"><a href="mailto:${d.workEmail}" style="color: #3182ce; text-decoration: none;">${d.workEmail}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 10px 0; font-weight: bold; color: #4a5568;">Role:</td>
            <td style="padding: 10px 0; color: #2d3748;">${d.role}</td>
          </tr>
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 10px 0; font-weight: bold; color: #4a5568;">Investment Amount:</td>
            <td style="padding: 10px 0; color: #2d3748;">${d.investmentAmount || "N/A"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 10px 0; font-weight: bold; color: #4a5568;">Submitted At:</td>
            <td style="padding: 10px 0; color: #2d3748;">${new Date(d.submittedAt).toLocaleString()}</td>
          </tr>
        </table>
        <div style="margin-top: 30px; text-align: center; color: #718096; font-size: 12px; border-top: 1px solid #e2e8f0; padding-top: 15px;">
          &copy; ${new Date().getFullYear()} Tinder Health. All rights reserved.
        </div>
      </div>
    `;
  } else {
    const d = details as PatientDetails;
    subject = `🩺 New Patient Matching Request - ${d.name}`;
    htmlContent = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
        <div style="text-align: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 15px; margin-bottom: 20px;">
          <h2 style="color: #dd6b20; margin: 0; font-size: 24px; font-weight: 700;">Tinder Health Patient Matches</h2>
        </div>
        <p style="font-size: 16px; line-height: 1.5; color: #4a5568;">
          A patient has completed the symptoms-to-specialist matching algorithm.
        </p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 10px 0; font-weight: bold; color: #4a5568; width: 180px;">Patient Name:</td>
            <td style="padding: 10px 0; color: #2d3748;">${d.name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 10px 0; font-weight: bold; color: #4a5568;">Email:</td>
            <td style="padding: 10px 0; color: #2d3748;"><a href="mailto:${d.email}" style="color: #3182ce; text-decoration: none;">${d.email}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 10px 0; font-weight: bold; color: #4a5568;">Phone:</td>
            <td style="padding: 10px 0; color: #2d3748;">${d.phone}</td>
          </tr>
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 10px 0; font-weight: bold; color: #4a5568;">State / Location:</td>
            <td style="padding: 10px 0; color: #2d3748;">${d.state} - ${d.location}</td>
          </tr>
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 10px 0; font-weight: bold; color: #4a5568;">Health Concern:</td>
            <td style="padding: 10px 0; color: #2d3748;">${d.concern}</td>
          </tr>
          <tr style="border-bottom: 1px solid #edf2f7;">
            <td style="padding: 10px 0; font-weight: bold; color: #4a5568;">AI Recommended Specialist:</td>
            <td style="padding: 10px 0; color: #2d3748; font-weight: bold;">${d.specialist}</td>
          </tr>
        </table>
        
        <div style="margin-top: 20px; padding: 15px; background-color: #f7fafc; border-left: 4px solid #3182ce; border-radius: 4px;">
          <h4 style="margin: 0 0 8px 0; color: #2d3748; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">AI Clinical Matching Statement:</h4>
          <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #4a5568; font-style: italic;">"${d.recommendation}"</p>
        </div>
        
        <div style="margin-top: 30px; text-align: center; color: #718096; font-size: 12px; border-top: 1px solid #e2e8f0; padding-top: 15px;">
          &copy; ${new Date().getFullYear()} Tinder Health. All rights reserved.
        </div>
      </div>
    `;
  }

  try {
    console.log(`[Email Admin] Sending ${type} notification to admin: ${adminEmail}`);
    await transporter.sendMail({
      from: `"Tinder Health Admin" <${user}>`,
      to: adminEmail,
      subject,
      html: htmlContent,
    });
    console.log(`[Email Admin Success] ${type} notification sent to ${adminEmail}`);
    return true;
  } catch (err: any) {
    console.error(`[Email Admin Error] Failed to send notification to admin:`, err.message || err);
    return false;
  }
}

/**
 * Sends a confirmation email to the user
 */
export async function sendUserConfirmation(
  type: "waitlist" | "patient",
  details: WaitlistDetails | PatientDetails
): Promise<boolean> {
  const transporter = await getTransporter();
  if (!transporter) return false;

  const user = process.env.GMAIL_USER;
  let to = "";
  let subject = "";
  let htmlContent = "";

  if (type === "waitlist") {
    const d = details as WaitlistDetails;
    to = d.workEmail;
    subject = "Welcome to Tinder Health Waitlist";
    htmlContent = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
        <div style="text-align: center; padding-bottom: 25px; margin-bottom: 25px; border-bottom: 1px solid #f0f4f8;">
          <h1 style="color: #008080; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">Tinder Health</h1>
          <p style="color: #718096; margin: 5px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Access to World-Class Healthcare</p>
        </div>
        
        <p style="font-size: 18px; color: #2d3748; margin-bottom: 15px;">
          Hello <strong>${d.fullName}</strong>,
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #4a5568;">
          Thank you for joining the <strong>Tinder Health Waitlist</strong>! We are excited to have you on board as we revolutionize clinical matching and healthcare delivery in Nigeria.
        </p>
        
        <div style="margin: 25px 0; padding: 20px; background-color: #f0fdfa; border-radius: 8px; border: 1px solid #ccfbf1; text-align: center;">
          <h3 style="color: #0f766e; margin: 0 0 5px 0; font-size: 18px;">Registration Confirmed</h3>
          <p style="color: #115e59; margin: 0; font-size: 14px;">We will notify you at <strong>${d.workEmail}</strong> as soon as we launch or when specialized provider spots open.</p>
        </div>
        
        <p style="font-size: 16px; line-height: 1.6; color: #4a5568;">
          Our proprietary clinical match algorithms connect you with globally trained, vetted medical specialists tailored specifically to your unique health profile and geographic convenience.
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #4a5568; margin-top: 25px;">
          Warm regards,<br />
          <strong>The Tinder Health Team</strong>
        </p>
        
        <div style="margin-top: 35px; text-align: center; color: #a0aec0; font-size: 12px; border-top: 1px solid #f0f4f8; padding-top: 20px;">
          This is an automated confirmation email. Please do not reply directly to this email.<br />
          &copy; ${new Date().getFullYear()} Tinder Health. All rights reserved.
        </div>
      </div>
    `;
  } else {
    const d = details as PatientDetails;
    to = d.email;
    subject = "Tinder Health Specialist Match Assessment";
    htmlContent = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
        <div style="text-align: center; padding-bottom: 25px; margin-bottom: 25px; border-bottom: 1px solid #f0f4f8;">
          <h1 style="color: #008080; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">Tinder Health</h1>
          <p style="color: #718096; margin: 5px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Access to World-Class Healthcare</p>
        </div>
        
        <p style="font-size: 18px; color: #2d3748; margin-bottom: 15px;">
          Hello <strong>${d.name}</strong>,
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #4a5568;">
          Thank you for completing the Tinder Health specialist match assessment. Based on your symptoms and health concern:
        </p>
        
        <div style="margin: 25px 0; padding: 20px; background-color: #f7fafc; border-left: 5px solid #008080; border-radius: 6px;">
          <h4 style="margin: 0 0 5px 0; color: #718096; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Recommended Specialist Focus</h4>
          <h2 style="margin: 0 0 10px 0; color: #2d3748; font-size: 20px; font-weight: 700;">${d.specialist}</h2>
          <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #4a5568; font-style: italic;">
            "${d.recommendation}"
          </p>
        </div>
        
        <p style="font-size: 16px; line-height: 1.6; color: #4a5568;">
          Our clinical coordinators are reviewing your profile and will reach out to you within 24 hours at <strong>${d.phone}</strong> to confirm your doctor match, coordinate appointment scheduling, and handle any pre-consultation details.
        </p>
        
        <div style="margin: 20px 0; font-size: 13px; color: #a0aec0; background-color: #fffaf0; border: 1px solid #feebc8; padding: 12px; border-radius: 4px;">
          <strong>Disclaimer:</strong> This AI match recommendation assessment is a preliminary guidance tool and does not constitute formal medical advice, diagnosis, or treatment. For acute, critical, or emergency symptoms, please proceed immediately to the nearest healthcare facility.
        </div>
        
        <p style="font-size: 16px; line-height: 1.6; color: #4a5568; margin-top: 25px;">
          Warm regards,<br />
          <strong>The Tinder Health Team</strong>
        </p>
        
        <div style="margin-top: 35px; text-align: center; color: #a0aec0; font-size: 12px; border-top: 1px solid #f0f4f8; padding-top: 20px;">
          This is an automated match summary email. Please do not reply directly to this email.<br />
          &copy; ${new Date().getFullYear()} Tinder Health. All rights reserved.
        </div>
      </div>
    `;
  }

  try {
    console.log(`[Email User] Sending confirmation email to: ${to}`);
    await transporter.sendMail({
      from: `"Tinder Health" <${user}>`,
      to,
      subject,
      html: htmlContent,
    });
    console.log(`[Email User Success] Confirmation sent successfully to ${to}`);
    return true;
  } catch (err: any) {
    console.error(`[Email User Error] Failed to send confirmation to ${to}:`, err.message || err);
    return false;
  }
}
