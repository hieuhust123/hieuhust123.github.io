'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const NAV_LINKS = [
  { label: 'Home',     href: '/'         },
  { label: 'Projects', href: '/projects' },
  { label: 'Research', href: '/research' },
  { label: 'Resume',   href: '/resume'   },
  { label: 'Contact',  href: '/contact'  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[#E5E5E5] bg-[#FAFAFA]/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        {/* Logo / wordmark */}
        <Link href="/" className="font-mono text-sm font-medium text-ink tracking-wider hover:text-green-700 transition-colors">
          Harry.Bui
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={clsx(
                    'relative text-sm font-medium transition-colors duration-200',
                    isActive ? 'text-green-700' : 'text-zinc-600 hover:text-ink'
                  )}
                >
                  {label}
                  {/* Animated underline for active link */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 h-px w-full bg-green-700"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile: hamburger placeholder — wire up with useState if needed */}
        <button
          aria-label="Open menu"
          className="flex md:hidden flex-col gap-1.5 p-2"
        >
          <span className="h-px w-6 bg-zinc-700" />
          <span className="h-px w-6 bg-zinc-700" />
          <span className="h-px w-4 bg-zinc-700" />
        </button>

      </nav>
    </header>
  );
}


