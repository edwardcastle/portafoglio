import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          borderRadius: "36px",
          fontSize: 90,
          fontWeight: 700,
          color: "#06b6d4",
          fontFamily: "sans-serif",
        }}
      >
        EC
      </div>
    ),
    { ...size },
  );
}