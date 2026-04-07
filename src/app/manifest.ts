import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Eduardo Castillo — Full-Stack Web Developer",
    short_name: "Eduardo Castillo",
    description:
      "Full-Stack Developer with 6+ years of experience building websites, web apps, and custom projects. Available for hire — remote from Italy.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
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
