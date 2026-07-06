'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import ProjectCard, { type ProjectCardProps } from '@/components/ProjectCard';

// ── Placeholder project data — move to /content/projects/*.mdx later ─────────
const FEATURED_PROJECTS: ProjectCardProps[] = [
  {
    slug: 'project-one',
    title: 'Hardware Accelerator in SystemC: Diffie-Hellman Key Exchange',
    summary:
      'A clocked SystemC hardware accelerator that offloads the compute-intensive digit-division step of a Diffie-Hellman key exchange, built as a structural datapath controlled by a Moore FSM with a custom enable/done HW/SW handshake.',
    tags: ['SystemC', 'HW/SW Co-Design', 'Datapath', 'FSM'],
    media: {
      type: 'image',
      src: '/projects/project-one/cover.png', // place file in public/projects/project-one/
      alt: 'Diffie-Hellman hardware accelerator',
    },
  },
  {
    slug: 'project-two',
    title: 'Real-Time Morphological Image Processing on FPGA',
    summary:
      'A Nexys A7 (Artix-7) pipeline that captures live camera input and runs grayscale, thresholding, and morphological operations (erosion/dilation/opening/closing) in hardware, streamed to a VGA display.',
    tags: ['VHDL', 'FPGA', 'Nexys A7', 'VGA'],
    media: {
      type: 'image',
      src: '/projects/project-two/cover.png', // place file in public/projects/project-two/
      alt: 'FPGA image-processing pipeline architecture diagram',
    },
  },
  {
    slug: 'project-three',
    title: '8-bit Programmable Timer IP with APB Slave Interface',
    summary:
      'An 8-bit timer IP in Verilog with TCR/TDR/TSR registers, up/down counting, four clock sources, and overflow/underflow interrupts over an APB slave interface — verified in QuestaSim with a 21-case self-checking testbench.',
    tags: ['Verilog', 'APB', 'QuestaSim', 'FSM'],
    media: {
      type: 'image',
      src: '/projects/project-three/cover.png',
      alt: '8-bit timer IP with APB slave interface',
    },
  },
];

// ── Fade-up animation preset (reused across sections) ────────────────────────
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

// ─────────────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl flex-col justify-center px-6 py-24">

        {/* Eyebrow label */}
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mb-4 font-mono text-sm text-green-700"
        >
          Hi, I&apos;m
        </motion.p>

        {/* Name */}
        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-serif text-5xl font-bold tracking-tight text-ink sm:text-6xl lg:text-7xl"
        >
          Harry Bui
        </motion.h1>

        {/* Role tagline */}
        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-3 text-3xl font-semibold sm:text-4xl"
        >
          <span className="text-gradient">ECE Graduate Researcher</span>
        </motion.h2>

        {/* Professional summary placeholder */}
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-zinc-600 sm:text-lg"
        >
          {/* TODO: replace with your actual summary */}
          I design and implement hardware systems and ML pipelines across the full stack — from FPGA-based image processing and chip physical design to deep learning research on HPC clusters. Currently pursuing an MASc in ECE at UVic, with industry experience in semiconductor digital design and embedded systems.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/projects"
            className="rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-700/20 transition-all duration-200 hover:bg-green-800 hover:-translate-y-0.5"
          >
            View Projects
          </Link>
          <Link
            href="/resume"
            className="rounded-lg border border-[#E5E5E5] px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-all duration-200 hover:border-green-700 hover:text-ink hover:-translate-y-0.5"
          >
            Resume
          </Link>
        </motion.div>

      </section>

      {/* ════════════════════════════════════════════════════════════════
          FEATURED PROJECTS SECTION
      ════════════════════════════════════════════════════════════════ */}
      <section className="border-t border-[#E5E5E5] bg-[#FAFAFA] py-24">
        <div className="mx-auto max-w-6xl px-6">

          {/* Section header */}
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="mb-1 font-mono text-xs text-green-700 uppercase tracking-widest">
                Selected work
              </p>
              <h2 className="font-serif text-3xl font-bold text-ink">Featured Projects</h2>
            </div>
            <Link
              href="/projects"
              className="hidden text-sm text-zinc-500 transition-colors hover:text-green-700 sm:block"
            >
              All projects →
            </Link>
          </div>

          {/* Responsive 3-column project grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_PROJECTS.map((project) => (
              <ProjectCard key={project.slug} {...project} />
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          QUICK ABOUT / SKILLS STRIP (optional teaser)
      ════════════════════════════════════════════════════════════════ */}
      <section className="border-t border-[#E5E5E5] py-24">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="mb-2 font-mono text-xs text-green-700 uppercase tracking-widest">
            Core skills
          </p>
          <h2 className="mb-10 font-serif text-3xl font-bold text-ink">What I work with</h2>

          {/* Skill tag cloud — replace / extend as needed */}
          <ul className="flex flex-wrap justify-center gap-3">
            {[
              'Python', 'C++', 'Verilog', 'Bash',
              'SystemVerilog', 'Pytorch', 'Tensorflow', 'Numpy',
              'Pandas', 'Git', 'Linux', 'Docker',
            ].map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-[#E5E5E5] bg-[#FFFFFF] px-4 py-1.5 font-mono text-sm text-zinc-700 transition-colors hover:border-green-700 hover:text-green-700"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
