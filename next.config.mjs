import nextMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypePrism from '@mapbox/rehype-prism'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  reactStrictMode: true,
  transpilePackages: [
    'ai',
    '@ai-sdk/react',
    '@ai-sdk/provider',
    '@ai-sdk/provider-utils',
    '@ai-sdk/gateway',
    '@ai-sdk/mcp',
    'zod',
  ],
  experimental: {
    scrollRestoration: true,
  },
  async redirects() {
    return [
      {
        source: '/konrad-agent',
        destination: '/portfolio-agent',
        permanent: true,
      },
    ]
  },
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  },
})

export default withMDX(nextConfig)
