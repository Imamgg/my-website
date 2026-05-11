import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Imam Syafii — Full-Stack Developer & Web3 Enthusiast";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 30%, #16213e 60%, #0f0f23 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Glow effect */}
        <div
          style={{
            position: "absolute",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            gap: "16px",
          }}
        >
          {/* Avatar circle */}
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "42px",
              fontWeight: 700,
              color: "white",
              marginBottom: "8px",
            }}
          >
            IS
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: "56px",
              fontWeight: 800,
              color: "white",
              letterSpacing: "-2px",
              lineHeight: 1,
            }}
          >
            Imam Syafii
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: "24px",
              fontWeight: 400,
              background: "linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6)",
              backgroundClip: "text",
              color: "transparent",
              letterSpacing: "0.5px",
            }}
          >
            Full-Stack Developer & Web3 Enthusiast
          </div>

          {/* Tech stack */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "16px",
            }}
          >
            {["Next.js", "React", "Laravel", "Node.js", "TypeScript", "Web3"].map(
              (tech) => (
                <div
                  key={tech}
                  style={{
                    padding: "6px 16px",
                    borderRadius: "20px",
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  {tech}
                </div>
              )
            )}
          </div>

          {/* URL */}
          <div
            style={{
              fontSize: "16px",
              color: "rgba(255,255,255,0.35)",
              marginTop: "24px",
              letterSpacing: "1px",
            }}
          >
            imamgg-dev.vercel.app
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
