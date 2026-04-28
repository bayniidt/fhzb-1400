/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. 开启独立服务模式 (standalone)
  output: 'standalone', 
  
  // 2. 告诉 Next 资源文件的基础路径
  basePath: '/fhzb', 
  
  // 3. 如果你使用了 <Image /> 组件，GitHub Pages 不支持原生的图片优化，需要禁用
  images: {
    unoptimized: true,
  },

  async rewrites() {
    if (process.env.NODE_ENV !== "development") {
      return [];
    }

    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:3001/api/:path*",
      },
      {
        source: "/uploads/:path*",
        destination: "http://127.0.0.1:3001/uploads/:path*",
      },
    ];
  },
};

export default nextConfig;
