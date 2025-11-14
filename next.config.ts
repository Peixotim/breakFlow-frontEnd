import type { NextConfig } from "next";

const nextConfig: NextConfig = {
images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**', // Permite qualquer imagem desse host
      },
      {
        protocol: 'https',
        hostname: 'placehold.co', // Adicionado para o seu fallback 'onError'
        port: '',
        pathname: '/**',
      },
    ],
  },
};


export default nextConfig;
