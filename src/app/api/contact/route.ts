import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        // Validate input
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Missing required fields.", success: false },
                { status: 400 }
            );
        }

        // The target email to receive the messages
        const myEmail = "gajananhampiholi24@gmail.com";

        // Create a Nodemailer transporter using Gmail
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: myEmail,
                pass: process.env.EMAIL_PASS, // Needs to be generated Gmail App Password
            },
        });

        // Setup email data
        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: myEmail,
            replyTo: email,
            subject: `New Portfolio Contact from ${name}`,
            text: `You have a new message from your portfolio website.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
        <div style="font-family: sans-serif; padding: 20px; line-height: 1.5; color: #333;">
          <h2 style="color: #a78bfa;">New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email via Nodemailer:", error);
        return NextResponse.json(
            { error: "Failed to send email. Ensure EMAIL_PASS is set.", success: false },
            { status: 500 }
        );
    }
}
