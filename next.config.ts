import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  experimental: {

    serverActions:{

      bodySizeLimit:'5mb',

    },

  },

  serverExternalPackages: ['@prisma/adapter-libsql', '@libsql/client'],
  eslint:{

    ignoreDuringBuilds:true,

  },

  images: {
    
    remotePatterns:[

      {

        protocol: 'https',
        hostname:'lh3.googleusercontent.com',
        pathname:'/**'

      },

      {

        protocol:'https',
        hostname:'avatars.githubusercontent.com',
        pathname:'/**'

      },

      {
        protocol:'https',
        hostname: new URL(process.env.SUPABASE_URL!).hostname,
        pathname:'/**'
      }

    ]

  }
};

export default nextConfig;
