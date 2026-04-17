import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "letcommunitieslead.unaids.org" },
      { protocol: "https", hostname: "www.nairobisummiticpd.org" },
      { protocol: "https", hostname: "www.inequalitycouncil.org" },
      { protocol: "https", hostname: "utiq.com" },
      { protocol: "https", hostname: "www.cubitaproducciones.com" },
      { protocol: "https", hostname: "cubitaproducciones.com" },
      { protocol: "https", hostname: "www.casainordine.com" },
      { protocol: "https", hostname: "casainordine.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
