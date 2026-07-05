// Research page — supports both publication entries and blog-style write-ups.

// ── Types ────────────────────────────────────────────────────────────────────

interface Publication {
  type: 'publication';
  title: string;
  authors: string;       // e.g. "Nguyen, K., Smith, J."
  venue: string;         // journal or conference name
  year: number;
  abstract: string;
  pdfUrl?: string;
  doiUrl?: string;
}

interface BlogPost {
  type: 'post';
  title: string;
  date: string;          // ISO date string, e.g. "2024-11-01"
  summary: string;
  slug: string;          // links to /research/[slug]
  tags: string[];
  label?: string;        // badge text (defaults to "Write-up"); e.g. "Research"
  href?: string;         // overrides the "Read more" link (defaults to /research/[slug])
}

type ResearchItem = Publication | BlogPost;

// ── Placeholder data — replace with real content ─────────────────────────────

const RESEARCH_ITEMS: ResearchItem[] = [
  {
    type: 'post',
    label: 'Research',
    title: 'Training-Efficient Transfer Learning for Sparse Ray-Traced Neural Networks',
    date: '2026-07-01',
    summary:
      'Ongoing research on training a hybrid CNN + sparse ray-traced neural-network classifier faster: grow the model in stages and preserve every learned weight across each step, aiming to reach the same accuracy in fewer epochs. Includes a custom Rust/CUDA operation that grows the network while keeping its learned connections intact, and a generic per-stage stopping rule.',
    slug: 'cnn-raybnn-transfer-learning',
    href: '/projects/cnn-raybnn-transfer-learning',
    tags: ['Deep Learning', 'Transfer Learning', 'PyTorch', 'Rust', 'CUDA'],
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function PublicationCard({ item }: { item: Publication }) {
  return (
    <article className="rounded-xl border border-[#E5E5E5] bg-[#FFFFFF] p-6 transition-colors hover:border-green-700/40">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex-1 min-w-0">
          <span className="mb-2 inline-block rounded-full bg-green-700/10 px-2.5 py-0.5 font-mono text-xs text-green-700 border border-green-700/20">
            Publication · {item.year}
          </span>
          <h2 className="mt-1 text-lg font-semibold text-zinc-900">{item.title}</h2>
          <p className="mt-1 font-mono text-xs text-zinc-500">{item.authors}</p>
          <p className="mt-0.5 font-mono text-xs text-zinc-600 italic">{item.venue}</p>
          <p className="mt-3 text-sm text-zinc-600 leading-relaxed">{item.abstract}</p>
        </div>
      </div>
      <div className="mt-4 flex gap-3">
        {item.pdfUrl && (
          <a
            href={item.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-[#E5E5E5] px-3 py-1.5 text-xs text-zinc-600 transition-colors hover:border-green-700 hover:text-zinc-900"
          >
            PDF ↓
          </a>
        )}
        {item.doiUrl && (
          <a
            href={item.doiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-[#E5E5E5] px-3 py-1.5 text-xs text-zinc-600 transition-colors hover:border-green-700 hover:text-zinc-900"
          >
            DOI →
          </a>
        )}
      </div>
    </article>
  );
}

function BlogCard({ item }: { item: BlogPost }) {
  const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });

  return (
    <article className="rounded-xl border border-[#E5E5E5] bg-[#FFFFFF] p-6 transition-colors hover:border-green-700/40">
      <span className="mb-2 inline-block rounded-full bg-[#FFFFFF] px-2.5 py-0.5 font-mono text-xs text-zinc-600 border border-[#E5E5E5]">
        {item.label ?? 'Write-up'} · {formattedDate}
      </span>
      <h2 className="mt-1 text-lg font-semibold text-zinc-900">{item.title}</h2>
      <p className="mt-2 text-sm text-zinc-600 leading-relaxed">{item.summary}</p>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <ul className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <li key={tag} className="font-mono text-xs text-green-700 bg-[#FFFFFF] border border-[#E5E5E5] rounded px-2 py-0.5">
              {tag}
            </li>
          ))}
        </ul>
        <a
          href={item.href ?? `/research/${item.slug}`}
          className="text-sm text-green-700 hover:text-green-800 transition-colors"
        >
          Read more →
        </a>
      </div>
    </article>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ResearchPage() {
  const publications = RESEARCH_ITEMS.filter((i) => i.type === 'publication') as Publication[];
  const posts        = RESEARCH_ITEMS.filter((i) => i.type === 'post')        as BlogPost[];

  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <div className="mb-14">
        <p className="mb-1 font-mono text-xs text-green-700 uppercase tracking-widest">Research</p>
        <h1 className="text-4xl font-bold text-zinc-900">Research &amp; Writing</h1>
        <p className="mt-3 max-w-lg text-zinc-600">
          Ongoing research and technical writing. Currently focused on training-efficient machine learning.
        </p>
      </div>

      {/* Publications */}
      {publications.length > 0 && (
        <section className="mb-16">
          <h2 className="mb-6 text-xl font-semibold text-zinc-900">Publications</h2>
          <div className="flex flex-col gap-4">
            {publications.map((item) => (
              <PublicationCard key={item.title} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* Blog posts */}
      {posts.length > 0 && (
        <section>
          <h2 className="mb-6 text-xl font-semibold text-zinc-900">Current Research</h2>
          <div className="flex flex-col gap-4">
            {posts.map((item) => (
              <BlogCard key={item.slug} item={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
