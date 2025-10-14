import type { NextConfig } from "next";

const nextConfig: NextConfig = {

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
