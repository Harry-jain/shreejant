import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawTitle = searchParams.get("title") || "SHREEJAN AI SOLUTIONS";
    const rawSubtitle =
      searchParams.get("subtitle") || "Crafting Digital Empires — Mumbai Gen AI Agency";

    // Enforce strict length limits and strip control characters
    const title = rawTitle.slice(0, 100).replace(/[\x00-\x1f\x7f]/g, "").trim();
    const subtitle = rawSubtitle.slice(0, 150).replace(/[\x00-\x1f\x7f]/g, "").trim();

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            backgroundColor: "#090C15",
            padding: "80px",
            border: "8px solid #7C5CFC",
          }}
        >
          {/* Top Branding */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                border: "2px solid #7C5CFC",
                backgroundColor: "#121626",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#7C5CFC",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              S
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                letterSpacing: "0.15em",
                color: "#FFFFFF",
              }}
            >
              SHREEJAN <span style={{ color: "#7C5CFC" }}>AI SOLUTIONS</span>
            </div>
          </div>

          {/* Title Area */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div
              style={{
                fontSize: "56px",
                fontWeight: "900",
                color: "#FFFFFF",
                lineHeight: "1.15",
                maxWidth: "960px",
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: "24px",
                color: "#7C5CFC",
                fontWeight: "500",
              }}
            >
              {subtitle}
            </div>
          </div>

          {/* Bottom Coordinates */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              borderTop: "1px solid rgba(124,92,252,0.3)",
              paddingTop: "24px",
              color: "#A0B4CC",
              fontSize: "18px",
            }}
          >
            <div>Mumbai, Maharashtra • India</div>
            <div style={{ color: "#7C5CFC" }}>shreejanai.in</div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}

