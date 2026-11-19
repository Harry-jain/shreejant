import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";
import { Resend } from "resend";

// In-memory rate limiting store: IP -> timestamps array
const hourlyIpMap = new Map<string, number[]>();
const dailyIpMap = new Map<string, number[]>();
let globalTimestamps: number[] = [];

const ONE_HOUR_MS = 60 * 60 * 1000;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const MAX_REQUESTS_PER_HOUR = 5;
const MAX_REQUESTS_PER_DAY = 15;
const MAX_GLOBAL_PER_DAY = 150;

function isRateLimited(ip: string): { limited: boolean; reason?: string } {
  // Relax rate limit in development or loopback testing
  if (process.env.NODE_ENV !== "production" || ip === "127.0.0.1" || ip === "::1" || ip === "localhost") {
    return { limited: false };
  }

  const now = Date.now();

  // 1. Global Daily Circuit Breaker
  globalTimestamps = globalTimestamps.filter((t) => now - t < ONE_DAY_MS);
  if (globalTimestamps.length >= MAX_GLOBAL_PER_DAY) {
    return { limited: true, reason: "Global submission threshold reached. Please connect on WhatsApp." };
  }

  // 2. Per-IP Hourly Limit
  const hourly = hourlyIpMap.get(ip) || [];
  const validHourly = hourly.filter((time) => now - time < ONE_HOUR_MS);
  if (validHourly.length >= MAX_REQUESTS_PER_HOUR) {
    hourlyIpMap.set(ip, validHourly);
    return { limited: true, reason: "Hourly rate limit reached. Please connect on WhatsApp." };
  }

  // 3. Per-IP Daily Limit
  const daily = dailyIpMap.get(ip) || [];
  const validDaily = daily.filter((time) => now - time < ONE_DAY_MS);
  if (validDaily.length >= MAX_REQUESTS_PER_DAY) {
    dailyIpMap.set(ip, validDaily);
    return { limited: true, reason: "Daily submission limit reached. Please connect on WhatsApp." };
  }

  validHourly.push(now);
  hourlyIpMap.set(ip, validHourly);

  validDaily.push(now);
  dailyIpMap.set(ip, validDaily);

  globalTimestamps.push(now);

  return { limited: false };
}

// Extract sanitized client IP
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const candidate = forwarded.split(",")[0].trim();
    if (/^(?:::ffff:)?(?:\d{1,3}\.){3}\d{1,3}$|^[a-fA-F0-9:]+$/.test(candidate)) {
      return candidate;
    }
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp && /^(?:::ffff:)?(?:\d{1,3}\.){3}\d{1,3}$|^[a-fA-F0-9:]+$/.test(realIp.trim())) {
    return realIp.trim();
  }
  return "127.0.0.1";
}

// Helper to escape HTML characters and prevent HTML injection in emails
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: NextRequest) {
  try {
    // 1. IP Rate Limiting Check
    const ip = getClientIp(request);
    const rateCheck = isRateLimited(ip);

    if (rateCheck.limited) {
      return NextResponse.json(
        {
          error:
            rateCheck.reason ||
            "Rate limit reached. For immediate assistance, please connect with us directly on WhatsApp.",
        },
        { status: 429 }
      );
    }

    // 2. Body Parsing & Zod Validation
    const rawBody = await request.json();
    const validatedData = contactFormSchema.parse(rawBody);

    const fullName = validatedData.fullName;
    const contact = validatedData.contact || validatedData.email || validatedData.phone || "Not provided";
    const message = validatedData.message;
    const projectType = validatedData.projectType || validatedData.service || "General Inquiry";

    const isEmail = contact.includes("@");
    const clientEmail = isEmail ? contact : (validatedData.email || undefined);
    const clientPhone = !isEmail ? contact : (validatedData.phone || undefined);

    // 3. Email Dispatch via Resend (if configured)
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL_TO || "aishreejan@gmail.com";

    if (resendApiKey && !resendApiKey.includes("placeholder") && !resendApiKey.includes("re_xxxx")) {
      try {
        const resend = new Resend(resendApiKey);
        const safeSubject = `⚡ New Project Inquiry: ${fullName.replace(/[\r\n]/g, " ")} — ${projectType.replace(/[\r\n]/g, " ")}`;
        const plainTextBody = `New Project Inquiry — SHREEJAN AI SOLUTIONS\n\nClient Name: ${fullName}\nContact Info: ${contact}\nProject Type: ${projectType}\n\nMessage:\n${message}`;

        await resend.emails.send({
          from: "SHREEJAN AI Inquiries <onboarding@resend.dev>",
          to: recipientEmail,
          replyTo: clientEmail,
          subject: safeSubject,
          text: plainTextBody,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #7C5CFC; border-radius: 12px; background-color: #0A0D15; color: #FFFFFF;">
              <h2 style="color: #7C5CFC; font-size: 22px; margin-bottom: 20px; border-bottom: 1px solid rgba(124,92,252,0.3); padding-bottom: 10px;">
                New Project Inquiry — SHREEJAN AI SOLUTIONS
              </h2>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 8px 0; color: #A0B4CC; width: 140px;">Client Name:</td>
                  <td style="padding: 8px 0; font-weight: bold; color: #FFFFFF;">${escapeHtml(fullName)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #A0B4CC;">Contact Info:</td>
                  <td style="padding: 8px 0; color: #7C5CFC; font-weight: bold;">${escapeHtml(contact)}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #A0B4CC;">Project Type:</td>
                  <td style="padding: 8px 0; color: #FFFFFF;">${escapeHtml(projectType)}</td>
                </tr>
              </table>
              <div style="background-color: rgba(255,255,255,0.04); border-left: 3px solid #7C5CFC; padding: 14px; border-radius: 4px; margin-top: 15px;">
                <p style="margin: 0; color: #FFFFFF; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</p>
              </div>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error("Resend delivery notice:", emailErr);
        // Non-blocking so client receives success
      }
    } else {
      console.log("Mock lead recorded (Resend unconfigured):", { projectType, timestamp: new Date().toISOString() });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been received. A founding partner will review your requirements and respond within 4 hours.",
        fullName,
      },
      { status: 200 }
    );
  } catch (error: any) {
    if (error?.name === "ZodError") {
      return NextResponse.json(
        {
          error: "Please check your inputs and try again.",
          details: error.errors?.map((e: any) => `${e.path.join(".")}: ${e.message}`),
        },
        { status: 400 }
      );
    }

    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "We could not process your inquiry. Please reach out to us directly on WhatsApp." },
      { status: 500 }
    );
  }
}
