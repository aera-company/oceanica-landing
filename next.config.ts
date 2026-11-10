import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // Fixa a raiz do workspace neste projeto. Sem isso, um package-lock.json
  // em algum diretório acima (ex.: a HOME) faz o Turbopack inferir a raiz
  // errada: CSS defasado no dev e, com o tempo, fork storm (spawn EAGAIN).
  turbopack: {
    root: path.resolve(__dirname),
  },
  // "/" has no page of its own. Portuguese is the default; a browser that
  // asks for English first goes to /en. Temporary, so the choice can change.
  async redirects() {
    return [
      { source: "/", has: [{ type: "header", key: "accept-language", value: "en.*" }], destination: "/en", permanent: false },
      { source: "/", destination: "/pt", permanent: false },
    ];
  },
};

export default nextConfig;
