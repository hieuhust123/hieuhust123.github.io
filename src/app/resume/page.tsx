// Resume page — inline HTML summary + PDF download button.
// Replace all placeholder text with your real information.

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">

      {/* ── Page header with PDF download ──────────────────────────── */}
      <div className="mb-12 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="mb-1 font-mono text-xs text-green-700 uppercase tracking-widest">Résumé</p>
          <h1 className="text-4xl font-bold text-zinc-900">Harry Bui</h1>
        </div>
        <a
          href="/resume.pdf"   // place your PDF at /public/resume.pdf
          download
          className="shrink-0 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-700/20 transition-all duration-200 hover:bg-green-800 hover:-translate-y-0.5"
        >
          Download PDF ↓
        </a>
      </div>

      <div className="flex flex-col gap-10 text-sm">

        {/* ── Contact strip ───────────────────────────────────────── */}
        <section className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs text-zinc-500">
          <span>duchieubui511@gmail.com</span>
          <span>250-884-0259</span>
          <span>linkedin.com/in/harry-bui0511</span>
          <span>github.com/hieuhust123</span>
          <span>Victoria, BC, Canada</span>
        </section>

        <Divider />

        {/* ── Summary ────────────────────────────────────────────── */}
        <Section title="Summary">
          <p className="text-zinc-600 leading-relaxed">
            Electrical &amp; Computer Engineering MASc candidate specializing in RTL and
            digital design. Experienced across the hardware flow — from Verilog/VHDL design
            and APB-based IP, to QuestaSim verification, to ASIC backend static timing
            analysis in Synopsys PrimeTime. Comfortable bridging hardware and software,
            with a background in embedded C/C++ and Python-driven ML research.
          </p>
        </Section>

        <Divider />

        {/* ── Experience ─────────────────────────────────────────── */}
        <Section title="Experience">
          <ExperienceItem
            role="Graduate Research Assistant — Dr. Xiaodai Dong's Lab"
            company="University of Victoria"
            period="Feb 2024 – Present"
            bullets={[
              'Built and trained a hybrid CNN–RayBNN deep learning model in PyTorch and Rust for EEG-based drowsiness classification, running large-scale experiments on Compute Canada HPC clusters with Slurm-managed batch jobs.',
              'Implemented forward/backward propagation interfaces across a Python–Rust boundary, enabling end-to-end gradient flow between a PyTorch CNN and a Rust-based classifier.',
            ]}
          />
          <ExperienceItem
            role="Digital Physical Design Engineer"
            company="CoAsia SEMI"
            period="Oct 2023 – Feb 2024"
            bullets={[
              'Completed a structured training program on the ASIC backend flow, covering synthesis, floorplanning, place & route, clock tree synthesis, and timing closure through lectures, design reviews, and report analysis.',
              'Performed static timing analysis in Synopsys PrimeTime, debugging setup/hold violations, identifying critical paths, and applying SDC timing constraints via Tcl scripts to drive designs toward sign-off.',
              'Developed Tcl and shell scripts to parse PrimeTime timing reports, flag setup/hold violations, and summarize critical paths, streamlining the debug loop during iterative timing closure.',
            ]}
          />
          <ExperienceItem
            role="Software Engineer"
            company="FPT Software"
            period="May 2022 – May 2023"
            bullets={[
              'Developed a C++ Matter Emulator on Linux and Raspberry Pi that simulated multiple Matter-compliant IoT devices (fans, thermostats, locks, lighting) on a single board, enabling automated protocol testing during product integration with LG Electronics.',
              'Wrote Bash automation scripts to auto-generate virtual IoT device clusters on Raspberry Pi 4, cutting device generation time by 80% and providing reproducible test environments for protocol testing.',
            ]}
          />
        </Section>

        <Divider />

        {/* ── Education ──────────────────────────────────────────── */}
        <Section title="Education">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <div className="flex justify-between flex-wrap gap-1">
                <p className="font-semibold text-zinc-900">M.A.Sc. in Electrical &amp; Computer Engineering</p>
                <span className="font-mono text-xs text-zinc-500">Jan 2027 (Expected)</span>
              </div>
              <p className="text-zinc-600">University of Victoria · Victoria, BC</p>
              <p className="text-zinc-500 text-xs">
                Lab TA: Microprocessor-Based Systems, Applied Electronics &amp; Electrical Machines,
                Electronic Devices, Linear Circuits · Coursework: Digital Design, System-on-Chip
                Engineering for Signal Processing, Optimization for Machine Learning
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex justify-between flex-wrap gap-1">
                <p className="font-semibold text-zinc-900">B.Sc. in Electrical Engineering</p>
                <span className="font-mono text-xs text-zinc-500">Aug 2017 – Nov 2022</span>
              </div>
              <p className="text-zinc-600">Hanoi University of Science and Technology · Hanoi, Vietnam</p>
              <p className="text-zinc-500 text-xs">
                Coursework: Microcontroller Systems, Analog &amp; Digital Electronics, Embedded Systems
              </p>
            </div>
          </div>
        </Section>

        <Divider />

        {/* ── Skills ─────────────────────────────────────────────── */}
        <Section title="Skills">
          <div className="flex flex-col gap-3">
            <SkillRow label="RTL & Design" skills={['Verilog', 'VHDL', 'FSM Design', 'APB Protocol', 'Datapath Design']} />
            <SkillRow label="EDA & Sim"    skills={['QuestaSim', 'Xilinx Vivado', 'Synopsys PrimeTime (STA)']} />
            <SkillRow label="Programming"  skills={['Python', 'C/C++', 'Bash', 'Perl']} />
            <SkillRow label="Tools"        skills={['Git', 'Linux', 'Docker', 'HPC/Slurm']} />
          </div>
        </Section>

      </div>
    </div>
  );
}

// ── Sub-components (local, not exported) ──────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-green-700 font-mono">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Divider() {
  return <hr className="border-[#E5E5E5]" />;
}

function ExperienceItem({
  role, company, period, bullets,
}: {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}) {
  return (
    <div className="mb-6 last:mb-0">
      <div className="flex items-start justify-between flex-wrap gap-1 mb-1">
        <div>
          <p className="font-semibold text-zinc-900">{role}</p>
          <p className="text-zinc-600">{company}</p>
        </div>
        <span className="font-mono text-xs text-zinc-500 shrink-0">{period}</span>
      </div>
      <ul className="mt-2 flex flex-col gap-1 pl-4">
        {bullets.map((b) => (
          <li key={b} className="relative text-zinc-600 leading-relaxed before:absolute before:-left-3 before:content-['·'] before:text-green-700">
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SkillRow({ label, skills }: { label: string; skills: string[] }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span className="shrink-0 font-mono text-xs text-zinc-500 w-20">{label}</span>
      <ul className="flex flex-wrap gap-2">
        {skills.map((s) => (
          <li key={s} className="rounded bg-[#FFFFFF] border border-[#E5E5E5] px-2 py-0.5 font-mono text-xs text-zinc-700">
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}
