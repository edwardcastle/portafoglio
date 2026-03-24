import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 },
    );
  }

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: "Portfolio Contact", email: "sir.edwardcastle@gmail.com" },
      to: [{ email: "sir.edwardcastle@gmail.com", name: "Eduardo Castillo" }],
      replyTo: { email, name },
      subject: `New message from ${name}`,
      htmlContent: `
        <h2>New contact form message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    console.error("Brevo error:", res.status, body);
    return NextResponse.json(
      { error: "Failed to send message", brevo: body },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
