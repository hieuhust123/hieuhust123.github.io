'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export interface ProjectCardProps {
  slug: string;          // used to build the URL: /projects/[slug]
  title: string;
  summary: string;       // 1-2 sentence technical summary
  tags: string[];        // e.g. ['React', 'TypeScript', 'PostgreSQL']
  media: {
    type: 'image' | 'video';
    src: string;         // path relative to /public, e.g. '/projects/demo.mp4'
    alt?: string;        // used for images
    poster?: string;     // video thumbnail, path relative to /public
  };
}

export default function ProjectCard({ slug, title, summary, tags, media }: ProjectCardProps) {
  return (
    // Stretched-link pattern: the card itself is NOT a link. The "View details"
    // link below carries an `after:absolute after:inset-0` overlay that makes the
    // whole card clickable. To add a button/link INSIDE the card later (e.g. a
    // GitHub link), give it `relative z-10` so it sits above this overlay and
    // stays independently clickable.
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="group card-glow relative flex flex-col rounded-xl bg-[#161616] overflow-hidden transition-colors hover:bg-[#1b1b1b] focus-within:ring-2 focus-within:ring-violet-500"
    >
      {/* ── Media area (image or video) ───────────────────────────────── */}
      <div className="relative aspect-video w-full bg-[#1a1a1a] overflow-hidden">
        {media.type === 'image' ? (
          <Image
            src={media.src}
            alt={media.alt ?? title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <video
            src={media.src}
            poster={media.poster}
            muted
            loop
            playsInline
            // Autoplay on hover via onMouseEnter / onMouseLeave
            onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play()}
            onMouseLeave={(e) => {
              const v = e.currentTarget as HTMLVideoElement;
              v.pause();
              v.currentTime = 0;
            }}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      {/* ── Card body ─────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-base font-semibold text-white leading-snug">{title}</h3>
        <p className="text-sm text-zinc-400 leading-relaxed flex-1">{summary}</p>

        {/* Tech tags */}
        <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md bg-[#1F1F1F] px-2 py-0.5 font-mono text-xs text-violet-300 border border-[#2A2A2A]"
            >
              {tag}
            </li>
          ))}
        </ul>

        {/* CTA — the stretched link. `after:absolute after:inset-0` expands its
            click area to cover the entire card. */}
        <Link
          href={`/projects/${slug}`}
          aria-label={`View project: ${title}`}
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-violet-400 transition-colors group-hover:text-violet-300 focus:outline-none after:absolute after:inset-0 after:rounded-xl"
        >
          View details
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      </div>
    </motion.article>
  );
}
