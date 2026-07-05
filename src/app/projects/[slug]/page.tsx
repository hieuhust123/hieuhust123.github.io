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
    body: Section[];
  }
> = {
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
    githubUrl: '', // No public repo yet — paste the URL here to show the GitHub button.
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
    title: '8-bit Programmable Timer IP with APB Slave Interface',
    summary:
      'Designed an 8-bit timer IP in Verilog with three memory-mapped registers (TCR, TDR, TSR), up/down counting, four selectable internal clock sources, and overflow/underflow interrupts, exposed through an AMBA APB slave interface with full PSLVERR-compliant error handling. Verified in QuestaSim with a Makefile-driven, self-checking testbench and 21 directed, constrained-random, and fork-join test cases.',
    tags: ['Verilog', 'APB', 'QuestaSim', 'FSM', 'Verification'],
    date: 'May 2026',
    githubUrl: 'https://github.com/hieuhust123/Timer_full',
    liveUrl: '',
    // Hero visual. Drop the block-diagram image in public/projects/project-three/cover.png
    // (the top-level block diagram from the design spec works perfectly here).
    media: {
      type: 'image',
      src: '/projects/project-three/cover.png',
      alt: 'Top-level block diagram of the 8-bit timer IP: Read/Write Control (APB slave), Control Logic, TCNT counter, clock select, overflow/underflow comparator, and the TDR/TCR/TSR registers',
      fit: 'contain',
    },
    body: [
      {
        heading: 'Overview',
        paragraphs: [
          'An 8-bit programmable timer IP written in Verilog, exposing its functionality through three memory-mapped registers — a control register (TCR), a data register (TDR), and a status register (TSR) — over an AMBA APB slave interface. The timer counts up or down across the full 0x00–0xFF range, selects among four internal clock sources, and raises overflow/underflow status flags, making it a reusable building block for an SoC register map.',
        ],
      },
      {
        heading: 'Architecture',
        paragraphs: [
          'The IP is partitioned into five cooperating blocks. The Read/Write Control block is the APB slave front end: it runs the APB state machine, decodes the address, and reads/writes the registers. The Control Logic block is a pure combinational fan-out that decodes the TCR control bits and routes them to the datapath. The Clock Select block muxes one of four external clocks based on the configured source, the Timer Counter (TCNT) does the actual up/down counting, and the Overflow/Underflow Comparator watches the count value to raise event flags.',
          'A clean clock-domain discipline ties it together: the selected timer clock (TMR_CLK_IN) is not used directly as a clock. Instead, a rising-edge detector (TMR_EDGE = TMR_CLK_IN & ~registered_clk) converts it into a single-cycle enable pulse, so every flip-flop in the counter is clocked by the system PCLK. This keeps the whole design synchronous and avoids a multi-clock counter.',
        ],
        images: [
          {
            src: '/projects/project-three/cover.png',
            alt: 'Top-level block diagram showing Read/Write Control (APB slave) on the right, Control Logic on the left, the TCNT counter with overflow/underflow comparators in the centre, a Select-clock mux, and the TDR/TCR/TSR registers',
            caption: 'Top-level block diagram: APB Read/Write Control, Control Logic, TCNT counter, clock select, overflow/underflow comparator, and the TDR/TCR/TSR register file.',
            fit: 'contain',
          },
        ],
      },
      {
        heading: 'APB Slave & Register Map',
        paragraphs: [
          'The APB front end implements the standard IDLE → SETUP → ACCESS state machine, validating the PSEL/PENABLE/PWRITE sequence, generating PREADY (with a configurable WAIT_STATE, default 2), and asserting PSLVERR on illegal access. A register write commits on the final ACCESS-phase PCLK edge when the transfer is valid and the target is writable.',
          'A 3-bit address bus (PADDR[2:0]) decodes the register map: 0x0 = TDR (R/W), 0x1 = TCR (R/W), 0x2 = TSR (R/W, with write-1-to-clear status bits), 0x3 = TCNT (read-only — writes are ignored), and 0x4–0x7 = reserved, which assert PSLVERR. TDR, TCR, and TSR are stored internally as flip-flops; TCNT is read back live through a dedicated read path.',
        ],
      },
      {
        heading: 'Counter & Status Behaviour',
        paragraphs: [
          'TCR drives the datapath directly: TCR[7] loads the TDR preset into TCNT, TCR[5] selects direction (0 = up, 1 = down), TCR[4] enables counting, and TCR[1:0] selects the clock source — one of four PCLK divisions (PCLK/2, /4, /8, /16). The counter only updates when it is enabled and a TMR_EDGE pulse arrives; otherwise it holds. Asserting load for a single cycle preloads the start value, then counting resumes from there.',
          'The comparator raises TMR_OVF the cycle before the counter wraps from 0xFF→0x00 (up-counting) and TMR_UDF the cycle before 0x00→0xFF (down-counting). These combinational pulses are latched into the sticky, hardware-set / software-cleared (W1C) status bits TSR[0] (OVF) and TSR[1] (UDF) in the Read/Write Control block, so software sees the event until it explicitly clears it.',
        ],
      },
      {
        heading: 'Verification',
        paragraphs: [
          'I built a Makefile-driven testbench in QuestaSim featuring a bus-master VIP, clock and reset generators, and a scoreboard for self-checking, with the full simulation and reporting flow automated via Tcl and Bash.',
          'The suite contains 21 directed, constrained-random, and concurrent (fork-join) test cases targeting register access, PSLVERR responses, up/down counting across all four internal clocks, pause/resume, reset, and overflow/underflow corner cases — driven to close functional and code coverage holes.',
        ],
      },
      {
        heading: 'Reflection & Skills Gained',
        paragraphs: [
          'Building this IP deepened my understanding of standard bus protocols — designing a compliant APB slave, including correct PSLVERR behaviour on invalid access, made the rules of a real SoC interface concrete. The W1C status flags and the fork-join race-condition tests sharpened how I reason about hardware-software interaction at the register level.',
          'On the verification side I gained hands-on experience writing directed and constrained-random testcases in QuestaSim, and learned why deliberately provoking race conditions is essential to trust a status register under real driver contention rather than just in the happy path.',
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
        <h1 className="text-4xl font-bold leading-tight text-zinc-900 sm:text-5xl">
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
                className="rounded-lg border border-[#E5E5E5] px-4 py-2 text-sm text-zinc-600 transition-colors hover:border-green-700 hover:text-zinc-900"
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
