/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    // This tells Next.js to use the styled-components swc transform
    styledComponents: true,
  },
};

export default nextConfig;
