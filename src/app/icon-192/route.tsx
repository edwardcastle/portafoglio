import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#6366f1",
          borderRadius: "24px",
          fontSize: 96,
          fontWeight: 700,
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        EC
      </div>
    ),
    { width: 192, height: 192 },
  );
}
