import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Les logos clients sont fournis en SVG (fichiers internes, /public/images/logos).
    // Sans cette option, next/image renvoie une 400 sur tout SVG.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy:
      "default-src 'self'; script-src 'none'; sandbox; style-src 'unsafe-inline'",
  },
};

export default nextConfig;
