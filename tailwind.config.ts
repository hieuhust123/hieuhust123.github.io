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
          accent:  '#34D058', // bright PCB green — primary CTA / highlights
          muted:   '#56F175', // lighter green   — secondary text accents
        },
        surface: {
          base:    '#0A0E14', // deep slate background
          card:    '#0F141C', // card / panel background
          border:  '#1E2733', // subtle slate borders
        },
        // Heading/body near-black — warmer than Tailwind's zinc-900
        ink: '#1A1A1A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      typography: (theme: (path: string) => string) => ({
        // Prose styles for MDX project detail pages
        invert: {
          css: {
            '--tw-prose-body':         theme('colors.zinc.300'),
            '--tw-prose-headings':     theme('colors.white'),
            '--tw-prose-links':        theme('colors.green.400'),
            '--tw-prose-code':         theme('colors.green.300'),
            '--tw-prose-pre-bg':       theme('colors.zinc.900'),
            '--tw-prose-pre-code':     theme('colors.zinc.100'),
            '--tw-prose-hr':           theme('colors.zinc.700'),
            '--tw-prose-quotes':       theme('colors.zinc.300'),
            '--tw-prose-quote-borders':theme('colors.green.500'),
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
