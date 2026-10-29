import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Protótipos de prospects nunca devem ser indexados
  async headers() {
    return [{ source: "/p/:slug*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;
