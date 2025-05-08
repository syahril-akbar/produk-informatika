/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: process.env.NODE_ENV === 'production',
  webpack: (config, { dev, isServer }) => {
    // Ensure React is not minified in development
    if (dev) {
      config.optimization.minimize = false;
      
      // Add this to get more detailed error messages
      config.resolve.alias = {
        ...config.resolve.alias,
        'react': process.env.NODE_ENV === 'development' ? 'react/profiling' : 'react',
        'react-dom': process.env.NODE_ENV === 'development' ? 'react-dom/profiling' : 'react-dom',
      };
    }
    
    // Add polyfills for older browsers
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig;
