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
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
          fontFamily: "sans-serif",
          color: "#ffffff",
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
          }}
        >
          Eduardo Castillo
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#a5b4fc",
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
                  border: "1px solid #334155",
                  fontSize: 16,
                  color: "#cbd5e1",
                  background: "rgba(99, 102, 241, 0.1)",
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
