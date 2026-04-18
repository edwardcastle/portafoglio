import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Eduardo Castillo — Frontend Developer",
    short_name: "Eduardo Castillo",
    description:
      "Frontend Developer specializing in Vue 3, Nuxt 3, and TypeScript. 6+ years building enterprise web applications. Available for hire — remote from Italy.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#6366f1",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
