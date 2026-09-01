// Project Detail Page — one shared layout, unique content per project.
//
// HOW IT WORKS:
//   • All per-project content lives in the PROJECTS object below, keyed by slug.
//   • The page reads the slug from the URL and renders that project's data.
//   • To edit a project, find its slug block below and change the values.
//   • To add a project, add a new slug block AND add the slug to PROJECT_SLUGS.

import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface Props {
  params: { slug: string };
}

// The hero visual at the top of the page.
//   - For an image: { type: 'image', src: '/projects/<slug>/cover.png', alt: '...' }
//   - For a video:  { type: 'video', src: '/projects/<slug>/demo.mp4', poster: '/projects/<slug>/poster.png' }
//   - Leave it out entirely (omit the `media` field) to show the empty placeholder box.
// `fit` controls how an image sits in the 16:9 box:
//   'cover' (default) fills and may crop — best for photos/screenshots.
//   'contain' shows the whole image, letterboxed — best for diagrams/schematics.
type Media =
  | { type: 'image'; src: string; alt: string; fit?: 'cover' | 'contain' }
  | { type: 'video'; src: string; poster?: string };

// One image shown inside a write-up section.
// `fit` works like the hero's: 'contain' shows the whole image (good for diagrams).
type SectionImage = { src: string; alt: string; caption?: string; fit?: 'cover' | 'contain' };

type Metric = { value: string; label: string; note?: string };

// One section of the write-up: a heading, optional paragraphs, and optional images.
// `images` render as a responsive grid below the paragraphs (1 image = full width).
type Section = {
  heading: string;
  paragraphs?: string[];
  images?: SectionImage[];
};

// ── Per-project content ──────────────────────────────────────────────────────
// Each key is the slug (the part after /projects/ in the URL).
// `body` is an array of sections; each becomes an <h2> + paragraph(s) + optional images.
// To hide the GitHub or Live Demo button, set its url to '' (empty string).
// To show a hero image/video, fill in `media` (see the Media type above).
const PROJECTS: Record<
  string,
  {
    title: string;
    summary: string;
    tags: string[];
    date: string;
    githubUrl: string;
    liveUrl: string;
    media?: Media;
    metrics?: Metric[];
    body: Section[];
  }
> = {
  'cnn-raybnn-transfer-learning': {
    title: 'Training-Efficient Transfer Learning for Sparse Ray-Traced Neural Networks',
    summary:
      'Ongoing research on training a hybrid CNN + sparse ray-traced neural-network image classifier faster. The idea: instead of training the full-size model from scratch, grow it in stages and carry every learned weight across each growth step — a warm start that lets the model reach the same accuracy in fewer epochs.',
    tags: ['Deep Learning', 'Transfer Learning', 'PyTorch', 'Rust', 'CUDA', 'ArrayFire'],
    date: '2026 — ongoing',
    githubUrl: '',
    liveUrl: '',
    media: {
      type: 'image',
      src: '/projects/cnn-raybnn-transfer-learning/cover.png',
      alt: 'Progressive-growth transfer learning: a network grown across three stages while preserving the weights learned so far',
      fit: 'contain',
    },
    body: [
      {
        heading: 'Overview',
        paragraphs: [
          'Modern image classifiers built on a CNN feature extractor feeding a large sparse neural network are expensive to train: the usual practice is to build the full-size model and train it from scratch until it converges. This project asks a simpler question — can we reach the same accuracy for less compute by growing the model progressively?',
          'The approach is a form of transfer learning across model sizes. Training starts with a smaller network, then grows it in stages; at each step the weights learned so far are preserved as an initialization and the whole model is retrained jointly. Early stages are cheap because the model is small, and later stages start warm rather than from random weights.',
        ],
      },
      {
        heading: 'Approach',
        paragraphs: [
          'Each growth step widens both the CNN feature width and the sparse network in tandem, and — crucially — keeps what was already learned. On the CNN side, existing filters are copied forward and only the new filters are freshly initialized. On the sparse-network side, an append-only surgery grows the input dimension while keeping the existing input connections intact, rather than rebuilding the input layer from scratch (which would discard everything it had learned).',
          'To make the comparison fair and reproducible, each stage stops training by a single generic rule — halt when validation loss stops meaningfully improving — instead of a hand-tuned epoch count. This gives every stage exactly as much training as it needs and makes the efficiency measurement honest rather than tuned.',
        ],
      },
      {
        heading: 'Implementation',
        paragraphs: [
          'The CNN and the end-to-end training loop are written in PyTorch. The sparse ray-traced network runs through a custom Rust extension (PyO3 / maturin) over the ArrayFire CUDA backend; the weight-preserving growth operation is implemented at that level so that connections and their learned weights survive the surgery bit-for-bit. Experiments run on image-classification benchmarks on a GPU cluster (H100) via SLURM.',
        ],
      },
      {
        heading: 'Status & what I am exploring',
        paragraphs: [
          'This is active research. The current focus is an honest, paired comparison: does staged growth with weight preservation actually cut training time at equal accuracy, versus simply training the full-size model directly? The emphasis is on a correct method and a fair measurement rather than a headline number — including checking that any speedup is not an artifact of over- or under-fitting.',
        ],
      },
    ],
  },
  'project-one': {
    title: 'Hardware Accelerator in SystemC: Diffie-Hellman Key Exchange',
    summary:
      'A clocked hardware accelerator designed in SystemC to offload the compute-intensive digit-division step of a Diffie-Hellman key exchange from software, built as a structural datapath controlled by a Moore FSM with a custom HW/SW handshaking protocol.',
    tags: ['SystemC', 'HW/SW Co-Design', 'Datapath', 'FSM', 'Cryptography'],
    date: 'August 2024',
    githubUrl: '', // e.g. 'https://github.com/hieuhust123/dh-codesign'
    liveUrl: '',
    body: [
      {
        heading: 'Overview',
        paragraphs: [
          'Diffie-Hellman key exchange relies on repeated modular arithmetic, and the digit-division operation at its core is expensive in software. This project offloads that hot path to a dedicated clocked hardware accelerator described in SystemC, splitting the system across a hardware/software boundary to accelerate the bottleneck while keeping the rest of the protocol in software.',
        ],
      },
      {
        heading: 'Approach',
        paragraphs: [
          'The accelerator was built as a structural datapath — registers, multiplexers, adders, subtractors, and multipliers — wired together and sequenced by a Moore-type finite state machine. This explicit, cycle-by-cycle structure mirrors how the operation would map to real hardware rather than relying on behavioural shortcuts.',
          'To synchronise the hardware and software modules, I replaced SystemC\'s default blocking-FIFO channel with a custom enable/done handshaking protocol. This gave cycle-level control over when the software hands work to the accelerator and when it reads the result back, tightening the coupling across the HW/SW boundary.',
        ],
      },
      {
        heading: 'Reflection & Skills Gained',
        paragraphs: [
          'This project made the trade-offs of hardware/software partitioning concrete: identifying the true bottleneck, deciding what belongs in hardware, and designing the interface between the two is as important as the datapath itself. Building the datapath structurally and controlling it with a Moore FSM strengthened my intuition for translating an algorithm into clocked hardware.',
          'Replacing the default FIFO with an explicit enable/done handshake taught me why communication semantics matter at the cycle level in co-design — the protocol, not just the compute, determines whether the accelerator actually delivers its speedup.',
        ],
      },
    ],
  },

  'project-two': {
    title: 'Real-Time Morphological Image Processing on FPGA',
    summary:
      'A real-time image processing pipeline on a Nexys A7 (Artix-7) FPGA that captures live camera input, converts it to grayscale, applies adjustable binary thresholding, and runs hardware morphological operations — erosion, dilation, opening, and closing — with the processed frames streamed to a VGA display. Written in VHDL and built in Vivado.',
    tags: ['VHDL', 'FPGA', 'Nexys A7', 'Vivado', 'VGA', 'Image Processing'],
    date: 'April 2025',
    githubUrl: 'https://github.com/hieuhust123/fpga-image-processing',
    liveUrl: '',
    // Hero visual. The architecture flowchart (ECE543_flowchart.png) makes a strong hero.
    // Drop a file in public/projects/project-two/ and update the src/alt below.
    media: {
      type: 'image',
      src: '/projects/project-two/cover.png',
      alt: 'Block diagram of the FPGA image-processing pipeline: clock generation, VGA signal/image generation, RGB-to-gray, binary threshold, morphological operations, and display',
      fit: 'contain',
    },
    body: [
      {
        heading: 'Overview',
        paragraphs: [
          'This project implements a complete real-time image processing pipeline in hardware on a Nexys A7 (Xilinx Artix-7) FPGA. A live camera feed is digitised, processed entirely on-chip, and displayed on a VGA monitor with no frame-buffer round-trip to a host PC.',
          'The processing chain performs grayscale conversion, histogram analysis, user-adjustable binary thresholding, and a configurable set of morphological operations — erosion, dilation, opening, and closing — letting the user switch between operations live and observe the effect on the displayed frame.',
        ],
      },
      {
        heading: 'Architecture',
        paragraphs: [
          'The design is split into cooperating modules. A clock generator derives a 25 MHz pixel clock from the 100 MHz system clock to drive the VGA timing. VGA signal generation produces the HSYNC/VSYNC and pixel-position signals, while VGA image generation supplies the RGB streams.',
          'An RGB-to-gray stage converts incoming pixels to luminance and builds a histogram. The binary-threshold module compares each grayscale pixel against a threshold that the user adjusts with push-buttons; the current threshold value is shown on the seven-segment display. The morphological-ops module then applies the selected operation (erosion, dilation, opening, or closing) over the binary frame using a 3×3 structuring element, and an OLED display reports the active stream and morphology status.',
        ],
        images: [
          {
            src: '/projects/project-two/cover.png',
            alt: 'Block diagram of the FPGA image-processing pipeline showing clock generation, VGA signal and image generation, RGB-to-gray with histogram, binary threshold, morphological operations, seven-segment and OLED displays',
            caption: 'System block diagram (modules u1–u8): clocking, VGA generation, grayscale + histogram, thresholding, morphology, and the status displays.',
            fit: 'contain',
          },
        ],
      },
      {
        heading: 'Implementation',
        paragraphs: [
          'The full RTL was written in VHDL and implemented in Vivado targeting the Artix-7 device. Real-time operation required keeping every stage in the streaming pixel pipeline within the 25 MHz pixel-clock budget, with the 3×3 morphological window operating over the live binary stream rather than a buffered image. Line-buffer timing logic maintains the 3×3 pixel-window alignment with the VGA display signals as data moves through the pipeline.',
          'Controls are exposed on the board: push-buttons select the threshold and morphology mode, the seven-segment display shows the threshold, and the OLED reports status — making the design demonstrable interactively on hardware.',
        ],
      },
      {
        heading: 'Results',
        paragraphs: [
          'The system processes the camera feed and renders the thresholded and morphologically-processed output live on a VGA monitor. The captures below show the threshold sweep and each morphological operation running on real scenes, with the threshold and operation switchable in real time. A full write-up of the design and results is documented in the project report.',
        ],
        images: [
          { src: '/projects/project-two/results/threshold-0.jpg', alt: 'VGA output at the lowest binary threshold', caption: 'Threshold 0 — lowest threshold' },
          { src: '/projects/project-two/results/threshold-7.jpg', alt: 'VGA output at a mid-range binary threshold', caption: 'Threshold 7 — mid-range' },
          { src: '/projects/project-two/results/threshold-f.jpg', alt: 'VGA output at the highest binary threshold', caption: 'Threshold F — highest threshold' },
          { src: '/projects/project-two/results/binary.jpg', alt: 'Binarised camera frame on the VGA display', caption: 'Binary image' },
          { src: '/projects/project-two/results/erosion.jpg', alt: 'Eroded binary frame on the VGA display', caption: 'Erosion' },
          { src: '/projects/project-two/results/dilation.jpg', alt: 'Dilated binary frame on the VGA display', caption: 'Dilation' },
          { src: '/projects/project-two/results/open.jpg', alt: 'Opened binary frame on the VGA display', caption: 'Opening (erode → dilate)' },
          { src: '/projects/project-two/results/close.jpg', alt: 'Closed binary frame on the VGA display', caption: 'Closing (dilate → erode)' },
        ],
      },
      {
        heading: 'On-Board Status Display',
        paragraphs: [
          'A small OLED on the board reports the live system state — capture status, the active output operation, and the measured frame rate — confirming the pipeline runs in real time. The photos below show the display as the output operation is switched between binary, erosion, dilation, opening, and closing.',
        ],
        images: [
          { src: '/projects/project-two/results/status-binary.jpg', alt: 'OLED status display showing the binary output mode', caption: 'OLED status — Binary output' },
          { src: '/projects/project-two/results/status-erode.jpg', alt: 'OLED status display showing the erosion output mode', caption: 'OLED status — Erosion' },
          { src: '/projects/project-two/results/status-dilate.jpg', alt: 'OLED status display showing the dilation output mode', caption: 'OLED status — Dilation' },
          { src: '/projects/project-two/results/status-open.jpg', alt: 'OLED status display showing the opening output mode', caption: 'OLED status — Opening' },
          { src: '/projects/project-two/results/status-close.jpg', alt: 'OLED status display showing the closing output mode', caption: 'OLED status — Closing' },
        ],
      },
      {
        heading: 'Reflection & Skills Gained',
        paragraphs: [
          'This project taught me how to think about image processing as a streaming hardware problem rather than a software one — every stage has to keep pace with the pixel clock, so there is no room for buffering an entire frame or iterating over it freely. Designing the threshold and morphology logic to operate on the live pixel stream forced a much sharper understanding of pipelining and timing than a software implementation would.',
          'Along the way I built practical skills in VHDL, the Vivado design-and-implementation flow, and VGA timing on the Artix-7. I also learned the value of on-board feedback for debugging: exposing the threshold on the seven-segment display and the live status on the OLED made the system observable on real hardware, which made bugs far easier to find than relying on simulation alone.',
        ],
      },
    ],
  },

  'project-three': {
    title: 'APB Timer IP — Verilog RTL + SystemVerilog Verification',
    summary:
      'An ongoing 8-bit Timer IP project: Verilog RTL with an AMBA APB interface, plus a class-based SystemVerilog environment built to evolve the original procedural verification baseline.',
    tags: ['Verilog RTL', 'SystemVerilog', 'APB', 'QuestaSim', 'Constrained Random', 'Functional Coverage'],
    date: 'May 2026 — ongoing',
    githubUrl: 'https://github.com/hieuhust123/Timer_full',
    liveUrl: '',
    media: {
      type: 'image',
      src: '/projects/project-three/rtl-architecture.svg',
      alt: 'RTL architecture showing the APB slave, Timer registers, clock selection, counter, and wrap detection',
      fit: 'contain',
    },
    metrics: [
      { value: '26 / 0', label: 'Original verified baseline', note: 'PASS / FAIL before architectural scaling' },
      { value: '37 / 0', label: 'Seeded random checkpoint', note: 'PASS / FAIL, seed 10' },
      { value: 'Ongoing', label: 'Verification status', note: 'Multi-seed, coverage and assertion closure remain' },
    ],
    body: [
      {
        heading: 'Overview',
        paragraphs: [
          'The design is an 8-bit programmable Timer IP written in Verilog and exposed through an AMBA APB slave interface. Its four-address register map contains TDR for load data, TCR for load/enable/direction/clock control, TSR for sticky write-one-to-clear overflow and underflow status, and read-only TCNT for the live counter value.',
          'I kept the original procedural Verilog testbench as the historical verification baseline, then evolved the project with a separate class-based SystemVerilog environment. This preserves the design-verification progression rather than presenting the RTL as a SystemVerilog rewrite.',
        ],
      },
      {
        heading: 'Verilog RTL Architecture',
        paragraphs: [
          'Six RTL modules divide the design into top-level integration, APB read/write control, TCR decoding, four-way clock selection, the TCNT datapath, and wrap detection. The APB slave uses IDLE, SETUP and ACCESS states, supports a configurable wait-state count, and returns PSLVERR for reserved addresses.',
          'CLK_IN[3:0] are external Timer clock inputs. The selected input is converted into an edge-qualified enable inside the PCLK domain instead of directly clocking TCNT. Real FF-to-00 and 00-to-FF counter transitions arm the overflow and underflow sources; hardware status-set has priority over software clear while the source remains active.',
        ],
        images: [
          {
            src: '/projects/project-three/rtl-architecture.svg',
            alt: 'APB Timer RTL architecture and four-address register map',
            caption: 'RTL dataflow: external APB and clock inputs configure the register bank and PCLK-domain Timer datapath.',
            fit: 'contain',
          },
        ],
      },
      {
        heading: 'APB Interface and Register Map',
        paragraphs: [
          'The APB controller handles standard SETUP and ACCESS transfers with parameterized wait states. Valid writes update TDR, TCR or the W1C bits of TSR; writes to TCNT are ignored, and accesses to addresses 0x4 through 0x7 return PSLVERR.',
          'Protocol transition closure is still in progress, so this project does not claim complete AMBA APB compliance. Current verification covers ordinary reads and writes, wait-state completion, read-only behavior, error responses, and ongoing back-to-back transfer work.',
        ],
      },
      {
        heading: 'Verification Evolution',
        paragraphs: [
          'The original Verilog testbench established a procedural, self-checking baseline. The SystemVerilog version separates stimulus policy, protocol driving, passive observation, prediction, comparison and coverage into focused components instead of extending one monolithic scoreboard.',
          'Directed and constrained-random tests inherit from a common virtual base test and share one typed request mailbox and one APB driver. The top-level selects either test through a base-class handle, demonstrating polymorphism while preserving a single owner for APB request signals.',
        ],
      },
      {
        heading: 'SystemVerilog Verification Architecture',
        paragraphs: [
          'The active path is test → request mailbox → APB driver → interface/DUT. Independent passive monitors reconstruct completed APB transfers and PCLK-domain Timer events. Each observation is cloned into separate checking and coverage streams so consumers never compete for or mutate the same object.',
          'The predictor owns expected TDR, TCR, TSR and TCNT state and emits typed check-result objects. The comparator owns equality policy, pass/fail counters and final reporting. Lifecycle counters prevent simulation from ending until requests, observations, predictions, comparisons and coverage samples have drained.',
        ],
        images: [
          {
            src: '/projects/project-three/verification-architecture.svg',
            alt: 'Class-based SystemVerilog verification architecture from tests through driver, DUT, monitors, predictor, comparator, and coverage',
            caption: 'One active APB owner, independent passive observation streams, separated prediction and comparison, and explicit lifecycle accounting.',
            fit: 'contain',
          },
        ],
      },
      {
        heading: 'Reference Modeling and Timing',
        paragraphs: [
          'A TCR write configures the Timer; it does not itself cause every future count. APB observations and Timer events therefore enter the predictor as separate causal streams. Interface clocking blocks centralize drive and sample timing instead of scattering raw edge controls through the classes.',
          'Only a selected-clock 0-to-1 transition with enable asserted can load, increment or decrement expected TCNT. Overflow is predicted only for FF-to-00 and underflow only for 00-to-FF, preventing boundary loads from being mistaken for real wrap events.',
          'Same-cycle APB and Timer-event ordering is a known open issue: some seeds can expose a TCNT prediction mismatch. The current work is making that ordering deterministic rather than presenting the reference model as verification-complete.',
        ],
      },
      {
        heading: 'Constrained-Random Stimulus and Functional Coverage',
        paragraphs: [
          'Request fields are randomized with legal base constraints and targeted inline constraints, while DUT response fields remain non-random. Directed and random stimulus reuse the same mailbox transport and driver, and seeds are recorded for repeatability.',
          'APB coverpoints measure operation, address, validity, PSLVERR and TCR fields, with requirement-driven crosses. Timer-event coverage measures reset context, direction at real wraps, and fake-overflow/fake-underflow prevention. A reported 100% value applies only to the legal bins in that specific covergroup version; pause/resume coverage, merged-regression closure, code coverage and assertion coverage remain separate work.',
        ],
      },
      {
        heading: 'Bug Exposed by Verification',
        paragraphs: [
          'A directed false-wrap scenario exposed an RTL bug: loading TCNT across the FF-to-00 boundary could set overflow even though no real counting event occurred. The wrap detector was updated to qualify the transition with the load control, and matching fake-overflow and fake-underflow scenarios were added to both checking and functional coverage.',
          'This was a useful verification lesson: boundary values alone do not prove a wrap. The model and RTL must distinguish the cause of a transition—load versus count—not merely its before-and-after values.',
        ],
      },
      {
        heading: 'Verified Checkpoints',
        paragraphs: [
          'The original procedural testbench established a reproducible 26 PASS / 0 FAIL baseline. A later constrained-random smoke checkpoint completed 37 comparisons with 0 failures using seed 10. These numbers are intentionally labeled as different checkpoints rather than combined into one test count.',
          'Aggregate code-coverage percentages are intentionally withheld until the expanded directed and random regressions are cleanly rerun against the same coverage model and their UCDB databases are merged. Coverage occurrence does not override a comparator failure.',
        ],
      },
      {
        heading: 'Current Engineering Status',
        paragraphs: [
          'The class-based environment, major directed scenarios, constrained-random path and functional coverage model are implemented. Deterministic multi-seed regression, APB transition closure, complete requirement-to-coverage mapping and assertions remain in progress, so the repository reflects active development rather than a verification-complete release.',
          'Build targets and scripts support compilation, directed/random selection, seed recording, UCDB capture and coverage-report workflows with Make, Tcl and Bash. Assertions are roadmap work and are intentionally not claimed as completed.',
        ],
      },
      {
        heading: 'Reflection & Skills Demonstrated',
        paragraphs: [
          'This evolution made the difference between generating traffic and building a reusable verification architecture concrete. The most important lessons were enforcing one signal owner, separating expected-state modeling from verdict policy, accounting for every transaction lifecycle stage, and modeling physical causes rather than convenient correlations.',
          'The project demonstrates Verilog RTL design, AMBA APB behavior, SystemVerilog OOP, inheritance and polymorphism, typed mailboxes, object cloning, clocking blocks, constrained randomization, event-driven reference modeling, functional coverage, reproducible seeds and QuestaSim regression debugging.',
        ],
      },
    ],
  },
};

// Slugs to pre-render at build time. Add new project slugs here too.
const PROJECT_SLUGS = Object.keys(PROJECTS);

export async function generateStaticParams() {
  return PROJECT_SLUGS.map((slug) => ({ slug }));
}

export default function ProjectDetailPage({ params }: Props) {
  const { slug } = params;
  const project = PROJECTS[slug];

  // Unknown slug → 404 instead of showing wrong content.
  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">

      {/* ── Back navigation ─────────────────────────────────────────── */}
      <Link
        href="/projects"
        className="mb-10 inline-flex items-center gap-2 font-mono text-sm text-zinc-500 transition-colors hover:text-green-700"
      >
        ← Back to projects
      </Link>

      {/* ── Article header ──────────────────────────────────────────── */}
      <header className="mb-12 border-b border-[#E5E5E5] pb-10">
        {/* Breadcrumb slug */}
        <p className="mb-3 font-mono text-xs text-green-700 uppercase tracking-widest">
          {slug}
        </p>

        {/* Title */}
        <h1 className="font-serif text-4xl font-bold leading-tight text-ink sm:text-5xl">
          {project.title}
        </h1>

        {/* One-liner summary */}
        <p className="mt-4 text-lg text-zinc-600">
          {project.summary}
        </p>

        {/* Metadata row: tags + date */}
        <div className="mt-6 flex flex-wrap items-center gap-4">
          {/* Tech tags */}
          <ul className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md bg-[#FFFFFF] px-2.5 py-1 font-mono text-xs text-green-700 border border-[#E5E5E5]"
              >
                {tag}
              </li>
            ))}
          </ul>
          {/* Date */}
          <time className="ml-auto font-mono text-xs text-zinc-600">
            {project.date}
          </time>
        </div>

        {/* External links (GitHub, live demo) — only shown if a URL is set */}
        {(project.githubUrl || project.liveUrl) && (
          <div className="mt-6 flex gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-[#E5E5E5] px-4 py-2 text-sm text-zinc-600 transition-colors hover:border-green-700 hover:text-ink"
              >
                View on GitHub →
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-green-700/10 border border-green-700/30 px-4 py-2 text-sm text-green-700 transition-colors hover:bg-green-700/20"
              >
                Live Demo →
              </a>
            )}
          </div>
        )}
      </header>

      {/* ── Hero media ──────────────────────────────────────────────── */}
      <div className="relative mb-12 overflow-hidden rounded-xl border border-[#E5E5E5] aspect-video bg-[#FFFFFF] flex items-center justify-center">
        {project.media?.type === 'image' ? (
          <Image
            src={project.media.src}
            alt={project.media.alt}
            fill
            className={project.media.fit === 'contain' ? 'object-contain' : 'object-cover'}
            sizes="(max-width: 768px) 100vw, 768px"
          />
        ) : project.media?.type === 'video' ? (
          <video
            src={project.media.src}
            poster={project.media.poster}
            controls
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        ) : (
          // No media set yet — show the placeholder box.
          <p className="font-mono text-sm text-zinc-600">[ project media ]</p>
        )}
      </div>

      {project.metrics && project.metrics.length > 0 && (
        <section aria-label="Verified project metrics" className="mb-14 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="rounded-xl border border-[#E5E5E5] bg-white p-5">
              <p className="font-mono text-2xl font-semibold text-green-700">{metric.value}</p>
              <p className="mt-1 text-sm font-semibold text-ink">{metric.label}</p>
              {metric.note && <p className="mt-1 text-xs leading-relaxed text-zinc-500">{metric.note}</p>}
            </div>
          ))}
        </section>
      )}

      {/* ── Long-form content ───────────────────────────────────────── */}
      <article className="prose prose-zinc max-w-none
                          prose-headings:font-semibold
                          prose-a:text-green-700 prose-a:no-underline hover:prose-a:underline
                          prose-code:font-mono prose-code:text-green-700
                          prose-pre:border prose-pre:border-[#E5E5E5] prose-pre:rounded-xl">
        {project.body.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs?.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            {section.images && section.images.length > 0 && (
              <div
                className={`not-prose mt-6 grid gap-4 ${
                  section.images.length === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'
                }`}
              >
                {section.images.map((img) => (
                  <figure key={img.src} className="m-0">
                    <div className="relative aspect-video overflow-hidden rounded-lg border border-[#E5E5E5] bg-[#FFFFFF]">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className={img.fit === 'contain' ? 'object-contain' : 'object-cover'}
                        sizes="(max-width: 640px) 100vw, 384px"
                      />
                    </div>
                    {img.caption && (
                      <figcaption className="mt-2 font-mono text-xs text-zinc-500">
                        {img.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}
          </section>
        ))}
      </article>

    </div>
  );
}
