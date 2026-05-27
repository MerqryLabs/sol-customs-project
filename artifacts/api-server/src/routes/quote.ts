import { Router, type IRouter } from "express";
import { Resend } from "resend";
import { SubmitQuoteBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/quote", async (req, res): Promise<void> => {
  const parsed = SubmitQuoteBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { fullName, email, phone, vehicle, service, message, honeypot } =
    parsed.data;

  // Honeypot spam check
  if (honeypot) {
    // Silently succeed to fool bots
    res.json({ success: true, message: "Thank you. Your quote request has been sent. Sol Customs will contact you soon." });
    return;
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    req.log.error("RESEND_API_KEY is not set");
    res.status(500).json({ error: "Email service not configured. Please contact us directly at inquire@solcustoms.com." });
    return;
  }

  const resend = new Resend(resendApiKey);

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #C6A15B;">New Quote Request — Sol Customs</h2>
      <hr style="border-color: #C6A15B;" />
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold; width: 180px;">Full Name</td>
          <td style="padding: 8px 0;">${fullName}</td>
        </tr>
        <tr style="background: #f9f9f9;">
          <td style="padding: 8px 0; font-weight: bold;">Email</td>
          <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">Phone</td>
          <td style="padding: 8px 0;">${phone}</td>
        </tr>
        <tr style="background: #f9f9f9;">
          <td style="padding: 8px 0; font-weight: bold;">Vehicle</td>
          <td style="padding: 8px 0;">${vehicle}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">Service</td>
          <td style="padding: 8px 0;">${service}</td>
        </tr>
        ${
          message
            ? `
        <tr style="background: #f9f9f9;">
          <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Message</td>
          <td style="padding: 8px 0; white-space: pre-wrap;">${message}</td>
        </tr>`
            : ""
        }
      </table>
      <hr style="border-color: #C6A15B;" />
      <p style="color: #888; font-size: 12px;">This quote request was submitted through the Sol Customs website.</p>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: "Sol Customs Website <onboarding@resend.dev>",
      to: ["inquire@solcustoms.com"],
      replyTo: email,
      subject: `New Quote Request from ${fullName} — ${service}`,
      html: emailHtml,
    });

    if (error) {
      req.log.error({ error }, "Resend email send failed");
      res.status(500).json({ error: "Failed to send quote request. Please try again or contact us directly at inquire@solcustoms.com." });
      return;
    }

    req.log.info({ fullName, service }, "Quote request email sent successfully");
    res.json({
      success: true,
      message: "Thank you. Your quote request has been sent. Sol Customs will contact you soon.",
    });
  } catch (err) {
    req.log.error({ err }, "Unexpected error sending quote email");
    res.status(500).json({ error: "Failed to send quote request. Please try again or contact us directly at inquire@solcustoms.com." });
  }
});

export default router;
