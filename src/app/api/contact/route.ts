import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resendKey = process.env.RESEND_API_KEY;
const resend = resendKey ? new Resend(resendKey) : null;

// Very light in-memory rate limiting (non-durable)
const hits = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000; // 1 minute
const MAX_REQ = 5;

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const now = Date.now();
    const entry = hits.get(ip);
    if (!entry || now - entry.ts > WINDOW_MS) {
      hits.set(ip, { count: 1, ts: now });
    } else {
      entry.count += 1;
      if (entry.count > MAX_REQ) {
        return NextResponse.json({ error: "Too many requests" }, { status: 429 });
      }
    }

    const body = await req.json();
    const { name, email, type, message, website } = body ?? {};

    if (website) {
      // honeypot triggered
      return NextResponse.json({ ok: true });
    }
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (!resend) {
      console.warn("RESEND_API_KEY not set; skipping email send.");
      return NextResponse.json({ ok: true });
    }

    const subject = `Portfolio Contact: ${name}${type ? ` · ${type}` : ""}`;
    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height:1.6">
        <h2>${subject}</h2>
        <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
        ${type ? `<p><strong>Type:</strong> ${type}</p>` : ""}
        <p style="white-space:pre-wrap">${String(message).slice(0, 5000)}</p>
      </div>
    `;

    await resend.emails.send({
      from: "Portfolio <no-reply@resend.dev>",
      to: ["hi@dzaky.codes"],
      subject,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}

