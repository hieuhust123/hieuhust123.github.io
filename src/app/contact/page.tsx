'use client';

import Link from 'next/link';

// Contact page — static links + a simple mailto-based form fallback.
// For a real form backend, replace the <form> action with Formspree, Resend, etc.

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24">
      <div className="mb-12">
        <p className="mb-1 font-mono text-xs text-green-700 uppercase tracking-widest">Get in touch</p>
        <h1 className="text-4xl font-bold text-zinc-900">Contact</h1>
        <p className="mt-3 text-zinc-600 leading-relaxed">
          I&apos;m currently [open to opportunities / not looking / open to collaborations].{/* TODO */}
          The best way to reach me is via email or LinkedIn.
        </p>
      </div>

      {/* ── Quick links ──────────────────────────────────────────────── */}
      <div className="mb-12 flex flex-col gap-3 sm:flex-row">
        <a
          href="mailto:duchieubui511@gmail.com"   // TODO
          className="flex-1 rounded-xl border border-[#E5E5E5] bg-[#FFFFFF] px-6 py-4 transition-colors hover:border-green-700 group"
        >
          <p className="font-mono text-xs text-zinc-500 mb-1">Email</p>
          <p className="text-sm font-medium text-zinc-900 group-hover:text-green-700 transition-colors">
            duchieubui511@gmail.com {/* TODO */}
          </p>
        </a>
        <Link
          href="http://www.linkedin.com/in/harry-bui0511"   // TODO
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-xl border border-[#E5E5E5] bg-[#FFFFFF] px-6 py-4 transition-colors hover:border-green-700 group"
        >
          <p className="font-mono text-xs text-zinc-500 mb-1">LinkedIn</p>
          <p className="text-sm font-medium text-zinc-900 group-hover:text-green-700 transition-colors">
            http://www.linkedin.com/in/harry-bui0511 {/* TODO */}
          </p>
        </Link>
        <Link
          href="https://github.com/hieuhust123"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-xl border border-[#E5E5E5] bg-[#FFFFFF] px-6 py-4 transition-colors hover:border-green-700 group"
        >
          <p className="font-mono text-xs text-zinc-500 mb-1">GitHub</p>
          <p className="text-sm font-medium text-zinc-900 group-hover:text-green-700 transition-colors">
            github.com/hieuhust123
          </p>
        </Link>
      </div>

      <hr className="border-[#E5E5E5] mb-12" />

      {/* ── Contact form (mailto fallback) ─────────────────────────── */}
      {/*
        This submits to Formspree by default — replace YOUR_FORM_ID with your
        Formspree endpoint, or swap the action for any other form backend.
        Formspree free tier: https://formspree.io
      */}
      <form
        action="https://formspree.io/f/YOUR_FORM_ID"   // TODO: replace
        method="POST"
        className="flex flex-col gap-5"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="font-mono text-xs text-zinc-500">Name</span>
            <input
              name="name"
              type="text"
              required
              placeholder="Your name"
              className="rounded-lg border border-[#E5E5E5] bg-[#FFFFFF] px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-600 outline-none transition-colors focus:border-green-700 focus:ring-1 focus:ring-green-700/30"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="font-mono text-xs text-zinc-500">Email</span>
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="rounded-lg border border-[#E5E5E5] bg-[#FFFFFF] px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-600 outline-none transition-colors focus:border-green-700 focus:ring-1 focus:ring-green-700/30"
            />
          </label>
        </div>

        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-xs text-zinc-500">Subject</span>
          <input
            name="subject"
            type="text"
            placeholder="What's this about?"
            className="rounded-lg border border-[#E5E5E5] bg-[#FFFFFF] px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-600 outline-none transition-colors focus:border-green-700 focus:ring-1 focus:ring-green-700/30"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-xs text-zinc-500">Message</span>
          <textarea
            name="message"
            rows={5}
            required
            placeholder="Your message…"
            className="rounded-lg border border-[#E5E5E5] bg-[#FFFFFF] px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-600 outline-none transition-colors focus:border-green-700 focus:ring-1 focus:ring-green-700/30 resize-none"
          />
        </label>

        <button
          type="submit"
          className="self-start rounded-lg bg-green-700 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-700/20 transition-all duration-200 hover:bg-green-800 hover:-translate-y-0.5"
        >
          Send message →
        </button>
      </form>

    </div>
  );
}
