import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";
import { Resend } from "resend";

/**
 * In-memory rate limiting store: client IP -> timestamps array.
 *
 * SERVERLESS CAVEATS:
 * Note that in-memory state is maintained per individual serverless execution instance.
 * On platforms like Vercel, requests may be routed to different lambda instances or reset on cold starts.
 * This provides best-effort mitigation against rapid-fire spam and accidental duplicate clicks.
 * For distributed production-grade rate limiting across multiple serverless regions/instances,
 * use Upstash Redis, Cloudflare Turnstile/WAF, or an external rate limiter.
 */
const ipRequestsMap = new Map<string, number[]>();
const ONE_HOUR_MS = 60 * 60 * 1000;
const MAX_REQUESTS_PER_HOUR = 5;

function isRateLimited(ip: string): boolean {
  if (process.env.NODE_ENV !== "production" || ip === "127.0.0.1" || ip === "::1" || ip === "localhost") {
    return false;
  }

  const now = Date.now();
  const timestamps = ipRequestsMap.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < ONE_HOUR_MS);

  if (recent.length >= MAX_REQUESTS_PER_HOUR) {
    ipRequestsMap.set(ip, recent);
    return true;
  }

  recent.push(now);
  ipRequestsMap.set(ip, recent);

  // Periodic pruning of stale IPs to prevent unbounded memory growth
  if (ipRequestsMap.size > 500) {
    for (const [key, times] of ipRequestsMap.entries()) {
      const active = times.filter((t) => now - t < ONE_HOUR_MS);
      if (active.length === 0) {
        ipRequestsMap.delete(key);
      } else {
        ipRequestsMap.set(key, active);
      }
    }
  }

  return false;
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

// Escape HTML characters to prevent HTML/XSS injection in rendered email notifications
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function POST(request: NextRequest) {
  try {
    // 1. IP Rate Limiting Check
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many submissions. Please reach out to us directly on WhatsApp.",
        },
        { status: 429 }
      );
    }

    // 2. Parse request body
    const rawBody = await request.json().catch(() => null);
    if (!rawBody || typeof rawBody !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid request payload." },
        { status: 400 }
      );
    }

    // Support field name aliases (name / fullName, service / projectType)
    const normalizedBody = {
      ...rawBody,
      name: rawBody.name ?? rawBody.fullName,
      service: rawBody.service ?? rawBody.projectType,
    };

    // 3. Zod Validation
    const validatedData = contactFormSchema.parse(normalizedBody);

    // 4. Honeypot Check: if website field is filled, silently reject to drop automated bots
    if (validatedData.website && validatedData.website.trim().length > 0) {
      return NextResponse.json(
        { success: true, message: "Thank you. We'll reply as soon as we can." },
        { status: 200 }
      );
    }

    // 5. Verify Resend Configuration
    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmailTo = process.env.CONTACT_EMAIL_TO;

    if (!resendApiKey || !contactEmailTo) {
      console.error("Contact service misconfigured: RESEND_API_KEY or CONTACT_EMAIL_TO is missing");
      return NextResponse.json(
        {
          success: false,
          error: "Contact service is not configured. Please reach out via WhatsApp.",
        },
        { status: 500 }
      );
    }

    // 6. Dispatch Email via Resend
    try {
      const resend = new Resend(resendApiKey);
      const safeSenderName = validatedData.name.replace(/[\r\n]/g, " ").slice(0, 50);
      const safeService = (validatedData.service || "General Inquiry").replace(/[\r\n]/g, " ").slice(0, 50);
      const safeSubject = `New Project Inquiry from ${safeSenderName} - ${safeService}`;

      const plainTextBody = [
        "New Project Inquiry — SHREEJAN AI SOLUTIONS",
        "",
        `Name: ${validatedData.name}`,
        `Email: ${validatedData.email}`,
        `Phone / WhatsApp: ${validatedData.phone || "Not provided"}`,
        `Service Interest: ${validatedData.service || "General Inquiry"}`,
        "",
        "Message:",
        validatedData.message,
      ].join("\n");

      const htmlBody = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid rgb(229, 231, 235); border-radius: 8px; background-color: rgb(255, 255, 255); color: rgb(17, 24, 39);">
          <h2 style="font-size: 20px; font-weight: 600; margin-top: 0; margin-bottom: 16px; border-bottom: 1px solid rgb(229, 231, 235); padding-bottom: 12px; color: rgb(17, 24, 39);">
            New Inquiry — SHREEJAN AI SOLUTIONS
          </h2>
          <table style="width: 552px; border-collapse: collapse; margin-bottom: 16px;">
            <tr>
              <td style="padding: 6px 0; color: rgb(107, 114, 128); width: 140px; font-size: 14px;">Name:</td>
              <td style="padding: 6px 0; font-weight: 500; font-size: 14px; color: rgb(17, 24, 39);">${escapeHtml(validatedData.name)}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: rgb(107, 114, 128); font-size: 14px;">Email:</td>
              <td style="padding: 6px 0; font-size: 14px; color: rgb(29, 78, 216);"><a href="mailto:${escapeHtml(validatedData.email)}" style="color: rgb(29, 78, 216); text-decoration: none;">${escapeHtml(validatedData.email)}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: rgb(107, 114, 128); font-size: 14px;">Phone / WhatsApp:</td>
              <td style="padding: 6px 0; font-size: 14px; color: rgb(17, 24, 39);">${escapeHtml(validatedData.phone || "Not provided")}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: rgb(107, 114, 128); font-size: 14px;">Service Interest:</td>
              <td style="padding: 6px 0; font-size: 14px; color: rgb(17, 24, 39);">${escapeHtml(validatedData.service || "General Inquiry")}</td>
            </tr>
          </table>
          <div style="margin-top: 16px; padding: 12px 16px; background-color: rgb(250, 250, 249); border-radius: 6px; border: 1px solid rgb(229, 231, 235);">
            <p style="margin: 0; font-size: 14px; line-height: 1.6; color: rgb(17, 24, 39); white-space: pre-wrap;">${escapeHtml(validatedData.message)}</p>
          </div>
        </div>
      `;

      const fromAddress = process.env.RESEND_FROM_EMAIL || "SHREEJAN AI <onboarding@resend.dev>";

      const { error } = await resend.emails.send({
        from: fromAddress,
        to: contactEmailTo,
        replyTo: validatedData.email,
        subject: safeSubject,
        text: plainTextBody,
        html: htmlBody,
      });

      if (error) {
        console.error("Resend delivery failed:", error);
        return NextResponse.json(
          {
            success: false,
            error: "Failed to send message. Please reach out directly on WhatsApp.",
          },
          { status: 502 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: "Thank you. We'll reply as soon as we can.",
        },
        { status: 200 }
      );
    } catch (sendError) {
      console.error("Resend delivery exception:", sendError);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to send message. Please reach out directly on WhatsApp.",
        },
        { status: 502 }
      );
    }
  } catch (error: any) {
    if (error?.name === "ZodError") {
      return NextResponse.json(
        {
          success: false,
          error: "Please check your inputs and try again.",
          details: error.errors?.map((e: any) => `${e.path.join(".")}: ${e.message}`),
        },
        { status: 400 }
      );
    }

    console.error("Contact API unexpected error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "We could not process your inquiry. Please reach out to us directly on WhatsApp.",
      },
      { status: 500 }
    );
  }
}
