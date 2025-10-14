import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  env: {

    AUTH_SECRET:process.env.AUTH_SECRET,
    DATABASE_URL:process.env.DATABASE_URL,
    AUTH_GITHUB_SECRET:process.env.GITHUB_SECRET,
    AUTH_DISCORD_ID:process.env.AUTH_DISCORD_ID,
    AUTH_DISCORD_SECRET:process.env.AUTH_DISCORD_SECRET,
    API_KEY:process.env.API_KEY,
    API_URL:process.env.API_URL
    

  },

  experimental: {

    serverActions:{

      bodySizeLimit:'5mb',

    }

  },

    
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

      }

    ]

  }
};

export default nextConfig;
