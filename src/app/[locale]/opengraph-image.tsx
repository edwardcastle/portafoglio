import { ImageResponse } from "next/og";

export const alt = "Eduardo Castillo — Full-Stack Web Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const taglines: Record<string, string> = {
  en: "Websites, Web Apps & Custom Projects",
  it: "Siti Web, App Web e Progetti su Misura",
  es: "Sitios Web, Apps Web y Proyectos a Medida",
};

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tagline = taglines[locale] ?? taglines.en;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)",
          fontFamily: "sans-serif",
          color: "#0f172a",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "#6366f1",
            fontSize: 36,
            fontWeight: 700,
            marginBottom: 30,
            color: "#ffffff",
          }}
        >
          EC
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            letterSpacing: "-1px",
            textAlign: "center",
            lineHeight: 1.2,
            color: "#0f172a",
          }}
        >
          Eduardo Castillo
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#6366f1",
            marginTop: 12,
            fontWeight: 600,
          }}
        >
          Full-Stack Web Developer
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#94a3b8",
            marginTop: 16,
            textAlign: "center",
          }}
        >
          {tagline}
        </div>
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: 40,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {["Vue.js", "React", "Next.js", "TypeScript", "Go", "Python"].map(
            (tech) => (
              <div
                key={tech}
                style={{
                  padding: "8px 20px",
                  borderRadius: "999px",
                  border: "1px solid #e2e8f0",
                  fontSize: 16,
                  color: "#64748b",
                  background: "rgba(99, 102, 241, 0.08)",
                }}
              >
                {tech}
              </div>
            ),
          )}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 18,
            color: "#64748b",
          }}
        >
          eduardocastillo.dev
        </div>
      </div>
    ),
    { ...size },
  );
}
