import ProjectCard, { type ProjectCardProps } from '@/components/ProjectCard';

// ── All projects data ─────────────────────────────────────────────────────────
// As the list grows, move this to /content/projects/ as MDX files and load
// with gray-matter + fs at build time.
const ALL_PROJECTS: ProjectCardProps[] = [
  {
    slug: 'project-one',
    title: 'Hardware Accelerator in SystemC: Diffie-Hellman Key Exchange',
    summary: 'A clocked SystemC hardware accelerator offloading the digit-division step of a Diffie-Hellman key exchange — a structural datapath driven by a Moore FSM with a custom enable/done HW/SW handshake.',
    tags: ['SystemC', 'HW/SW Co-Design', 'Datapath', 'FSM'],
    media: { type: 'image', src: '/projects/project-one/cover.png', alt: 'Diffie-Hellman hardware accelerator' },
  },
  {
    slug: 'project-two',
    title: 'Real-Time Morphological Image Processing on FPGA',
    summary: 'Nexys A7 (Artix-7) pipeline: live camera input, grayscale, adjustable thresholding, and morphological ops (erosion/dilation/opening/closing) in hardware, streamed to VGA.',
    tags: ['VHDL', 'FPGA', 'Nexys A7', 'VGA'],
    media: { type: 'image', src: '/projects/project-two/cover.png', alt: 'FPGA image-processing pipeline architecture diagram' },
  },
  {
    slug: 'project-three',
    title: '8-bit Programmable Timer IP with APB Slave Interface',
    summary: '8-bit Verilog timer IP with TCR/TDR/TSR registers, up/down counting, four clock sources, and overflow/underflow interrupts over APB — verified in QuestaSim with a 21-case self-checking testbench.',
    tags: ['Verilog', 'APB', 'QuestaSim', 'FSM'],
    media: { type: 'image', src: '/projects/project-three/cover.png', alt: '8-bit timer IP with APB slave interface' },
  },
];

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      {/* Page header */}
      <div className="mb-14">
        <p className="mb-1 font-mono text-xs text-violet-400 uppercase tracking-widest">
          Portfolio
        </p>
        <h1 className="text-4xl font-bold text-white">Projects</h1>
        <p className="mt-3 max-w-lg text-zinc-400">
          A collection of things I&apos;ve built — from side experiments to production systems.
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ALL_PROJECTS.map((project) => (
          <ProjectCard key={project.slug} {...project} />
        ))}
      </div>
    </div>
  );
}
