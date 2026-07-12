import { NextResponse } from "next/server";

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

        // Example logging for local simulation before integrating a provider like Resend:
        console.log("Contact Request Received:", { name, email, message });

        // TODO: When live, implement Resend/SendGrid API call here.
        // await resend.emails.send({
        //   from: 'contact@gajanan.dev',
        //   to: 'your-email@gajanan.dev',
        //   subject: `New Contact Request from ${name}`,
        //   text: message,
        // });

        // Simulate network delay for UI feedback
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return NextResponse.json({ success: true, message: "Email sent successfully" });
    } catch (error) {
        console.error("Error in contact API:", error);
        return NextResponse.json(
            { error: "Internal Server Error", success: false },
            { status: 500 }
        );
    }
}
