/** @type {import('next').NextConfig} */

// For GitHub Pages: repo name is the username root site (hieuhust123.github.io)
// so basePath is empty. If you later deploy a project site (e.g. /portfolio),
// set basePath: '/portfolio' and uncomment assetPrefix.
const nextConfig = {
  output: 'export',        // static HTML export for GitHub Pages
  basePath: '',
  // assetPrefix: '/portfolio',  // uncomment for project-page deployments
  trailingSlash: true,     // required for static hosting
  images: {
    unoptimized: true,     // Next.js Image Optimization is not available in static export
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
};

module.exports = nextConfig;
