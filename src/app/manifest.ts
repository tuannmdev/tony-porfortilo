import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tony's Portfolio - Senior Software Engineer",
    short_name: "Tony Portfolio",
    description:
      "Portfolio of Tony Porfortilo, a Senior Software Engineer specializing in full-stack development",
    start_url: "/",
    display: "standalone",
    background_color: "#ccb09c",
    theme_color: "#8c5a3c",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
