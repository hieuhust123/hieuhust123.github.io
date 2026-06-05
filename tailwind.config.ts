import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // Dark mode is class-based so we can toggle it programmatically if needed.
  // Default is dark — see layout.tsx where <html> always carries the 'dark' class.
  darkMode: 'class',
  theme: {
    extend: {
      // Brand palette — tweak these two lines to retheme the whole site
      colors: {
        brand: {
          accent:  '#7C3AED', // violet-600  — primary CTA / highlights
          muted:   '#A78BFA', // violet-400  — secondary text accents
        },
        surface: {
          base:    '#0D0D0D', // near-black background
          card:    '#161616', // card / panel background
          border:  '#2A2A2A', // subtle borders
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      typography: (theme: (path: string) => string) => ({
        // Prose styles for MDX project detail pages
        invert: {
          css: {
            '--tw-prose-body':         theme('colors.zinc.300'),
            '--tw-prose-headings':     theme('colors.white'),
            '--tw-prose-links':        theme('colors.violet.400'),
            '--tw-prose-code':         theme('colors.violet.300'),
            '--tw-prose-pre-bg':       theme('colors.zinc.900'),
            '--tw-prose-pre-code':     theme('colors.zinc.100'),
            '--tw-prose-hr':           theme('colors.zinc.700'),
            '--tw-prose-quotes':       theme('colors.zinc.300'),
            '--tw-prose-quote-borders':theme('colors.violet.500'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),  // enables prose classes for MDX pages
  ],
};

export default config;
