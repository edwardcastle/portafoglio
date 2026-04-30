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
          background: "#050510",
          borderRadius: "24px",
          fontSize: 96,
          fontWeight: 700,
          color: "#06b6d4",
          fontFamily: "sans-serif",
        }}
      >
        EC
      </div>
    ),
    { width: 192, height: 192 },
  );
}
