import ProjectCard, { type ProjectCardProps } from '@/components/ProjectCard';

// ── All projects data ─────────────────────────────────────────────────────────
// As the list grows, move this to /content/projects/ as MDX files and load
// with gray-matter + fs at build time.
const ALL_PROJECTS: ProjectCardProps[] = [
  {
    slug: 'cnn-raybnn-transfer-learning',
    title: 'Training-Efficient Transfer Learning for Sparse Ray-Traced Neural Networks',
    summary: 'Ongoing research on training a hybrid CNN + sparse ray-traced neural-network classifier faster: grow the model in stages and carry every learned weight across each step, aiming to reach the same accuracy in fewer epochs. Built in PyTorch with a custom Rust/CUDA network-surgery extension.',
    tags: ['Deep Learning', 'Transfer Learning', 'PyTorch', 'Rust', 'CUDA'],
    media: { type: 'image', src: '/projects/cnn-raybnn-transfer-learning/cover.png', alt: 'Progressive-growth transfer learning: a network grown across three stages while preserving learned weights' },
  },
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
    title: 'APB Timer IP — Verilog RTL + SystemVerilog Verification',
    summary: 'An ongoing 8-bit Verilog Timer IP project whose procedural baseline evolved into a class-based SystemVerilog environment with typed mailboxes, clocking blocks, separated prediction and comparison, constrained-random stimulus, and functional coverage.',
    tags: ['Verilog RTL', 'SystemVerilog', 'APB', 'QuestaSim', 'Functional Coverage'],
    media: { type: 'image', src: '/projects/project-three/rtl-architecture.svg', alt: 'RTL architecture of the APB Timer IP' },
  },
];

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      {/* Page header */}
      <div className="mb-14">
        <p className="mb-1 font-mono text-xs text-green-700 uppercase tracking-widest">
          Portfolio
        </p>
        <h1 className="font-serif text-4xl font-bold text-ink">Projects</h1>
        <p className="mt-3 max-w-lg text-zinc-600">
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
