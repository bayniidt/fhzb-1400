/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. 开启静态导出
  output: 'export', 
  
  // 2. 告诉 Next 资源文件的基础路径
  // 这里的 fhzb-1400 必须和你的仓库名完全一致
  basePath: '/fhzb-1400', 
  
  // 3. 如果你使用了 <Image /> 组件，GitHub Pages 不支持原生的图片优化，需要禁用
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
