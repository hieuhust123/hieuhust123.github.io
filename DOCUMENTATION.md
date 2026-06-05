# Portfolio Website — Content Editor's Guide

This document tells you **exactly where to go and what to change** for every part of the website. No prior coding knowledge is assumed. All edits are plain text replacements inside specific files.

---

## Table of Contents

1. [Project Structure — Where Things Live](#1-project-structure--where-things-live)
2. [Running the Site Locally](#2-running-the-site-locally)
3. [Deploying to GitHub Pages (Going Live)](#3-deploying-to-github-pages-going-live)
4. [Home Page](#4-home-page)
5. [Projects — Editing Existing Cards](#5-projects--editing-existing-cards)
6. [Projects — Adding a New Project](#6-projects--adding-a-new-project)
7. [Project Detail Pages](#7-project-detail-pages)
8. [Research Page](#8-research-page)
9. [Resume Page](#9-resume-page)
10. [Contact Page](#10-contact-page)
11. [Navigation Bar & Footer](#11-navigation-bar--footer)
12. [Media Guide — Images & Videos](#12-media-guide--images--videos)
13. [Uploading Your Resume PDF](#13-uploading-your-resume-pdf)

---

## 1. Project Structure — Where Things Live

```
d:\Personal_portfolio\
│
├── public\                        ← Static files served directly (images, videos, PDFs)
│   ├── projects\
│   │   ├── project-one\           ← Media for Project One
│   │   ├── project-two\           ← Media for Project Two
│   │   └── project-three\         ← Media for Project Three
│   └── research\                  ← PDF files for publications
│       └── paper-one.pdf
│
├── src\
│   ├── app\                       ← One folder = one page
│   │   ├── page.tsx               ← HOME page
│   │   ├── projects\
│   │   │   ├── page.tsx           ← PROJECTS LIST page
│   │   │   └── [slug]\
│   │   │       └── page.tsx       ← PROJECT DETAIL page (individual project)
│   │   ├── research\
│   │   │   └── page.tsx           ← RESEARCH page
│   │   ├── resume\
│   │   │   └── page.tsx           ← RESUME page
│   │   └── contact\
│   │       └── page.tsx           ← CONTACT page
│   │
│   └── components\
│       ├── Navbar.tsx             ← Top navigation bar
│       ├── Footer.tsx             ← Bottom footer
│       └── ProjectCard.tsx        ← The card component used in the grid
│
├── .github\workflows\deploy.yml   ← Automatic GitHub Pages deployment
└── DOCUMENTATION.md               ← This file
```

**Rule of thumb:** Every page you see on the website has a matching `page.tsx` file in `src/app/`. Edit that file to change what's on that page.

---

## 2. Running the Site Locally

Before making edits, start the local preview server so you can see changes instantly.

**Step 1** — Open PowerShell or Command Prompt

**Step 2** — Run these two commands:
```powershell
cd d:\Personal_portfolio
npm run dev
```

**Step 3** — Open your browser and go to `http://localhost:3000`

The page will automatically refresh every time you save a file. Keep the terminal open while working — closing it stops the server.

---

## 3. Deploying to GitHub Pages (Going Live)

The site is hosted **free** on GitHub Pages. Once set up, every time you push code, GitHub automatically rebuilds and republishes the live site at `https://hieuhust123.github.io`.

GitHub username: **hieuhust123** · Live URL: **https://hieuhust123.github.io**

### First-time setup (do this once)

**Step 1 — Create the repository on GitHub**

1. Go to https://github.com/new
2. **Repository name:** `hieuhust123.github.io` — must be exactly this (your username + `.github.io`). This is what makes it a free personal site.
3. Visibility: **Public**
4. Leave everything else **unchecked** — no README, no .gitignore, no license (this repo already has files).
5. Click **Create repository**.

**Step 2 — Push your code** (in PowerShell):
```powershell
cd d:\Personal_portfolio
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/hieuhust123/hieuhust123.github.io.git
git push -u origin main
```
On the first `git push`, a browser window will ask you to log in to GitHub — approve it (this happens only once). If `git commit` complains it doesn't know who you are, run this first:
```powershell
git config --global user.email "duchieubui511@gmail.com"
git config --global user.name "Hieu Bui"
```

**Step 3 — Turn on GitHub Pages**

Go to the **repository's** settings (NOT your account settings):

1. Open https://github.com/hieuhust123/hieuhust123.github.io/settings/pages
2. Under **Build and deployment → Source**, select **GitHub Actions** (not "Deploy from a branch").

> ⚠️ Common mistake: there are *two* "Pages" settings. The one you need is inside the **repository** (URL above, has a "Source" dropdown). The account-wide one at `github.com/settings/pages` only handles "Verified domains" — that is **not** the right page.

**Step 4 — Wait for the build**

1. Open the **Actions** tab: https://github.com/hieuhust123/hieuhust123.github.io/actions
2. Find the **"Deploy to GitHub Pages"** workflow. Yellow ● = building, green ✅ = done, red ✗ = failed.
3. When it's green (~2 minutes), your site is live at **https://hieuhust123.github.io**.

> If the first run failed (red ✗) because it ran *before* you set the Source to "GitHub Actions" in Step 3, just re-run it: open the failed run → **Re-run all jobs**.

### Every time after that (to publish updates)

Whenever you change the site, run:
```powershell
cd d:\Personal_portfolio
git add .
git commit -m "Describe what you changed"
git push
```
GitHub rebuilds and redeploys automatically. Wait ~2 minutes (watch the **Actions** tab), then refresh `https://hieuhust123.github.io` to see your changes live.

> The `git init`, `git remote add`, and Pages setup (Steps 1–3) are **one-time only**. After that, you only ever need the three `git add` / `git commit` / `git push` commands above.

---

## 4. Home Page

**File:** [src/app/page.tsx](src/app/page.tsx)

### 4a. Change your name

Find line 79:
```tsx
          Kai Nguyen
```
Replace `Kai Nguyen` with your real name.

### 4b. Change your job title

Find line 88:
```tsx
          <span className="text-gradient">Software Engineer</span>
```
Replace `Software Engineer` with your actual title (e.g. `ML Engineer`, `Full-Stack Developer`).

### 4c. Change your professional summary

Find lines 98–100:
```tsx
          I build reliable, performant systems and clean user interfaces. Focused on
          [your domain — e.g. distributed systems / ML infrastructure / full-stack web].
          Currently at [Company] or open to new opportunities.
```
Replace the entire paragraph with your own 2–3 sentence summary. Keep it on the same lines, just change the text.

### 4d. Change the skills list

Find lines 169–172:
```tsx
              'TypeScript', 'React', 'Next.js', 'Node.js',
              'Python', 'Go', 'PostgreSQL', 'Docker',
              'Kubernetes', 'AWS', 'CI/CD', 'System Design',
```
Add, remove, or rename skills by editing this comma-separated list. Each skill must be wrapped in single quotes and separated by commas.

### 4e. The featured projects on the home page

The three cards shown on the home page are defined at lines 8–45 in the same file. They are kept in sync with the main Projects page — see **Section 5** for how to edit them.

---

## 5. Projects — Editing Existing Cards

Project cards appear in **two places** and must be updated in **both**:

- **Home page** (featured strip): [src/app/page.tsx](src/app/page.tsx) — lines 8–45, the `FEATURED_PROJECTS` array
- **Projects list page**: [src/app/projects/page.tsx](src/app/projects/page.tsx) — lines 6–28, the `ALL_PROJECTS` array

Each project card looks like this:

```tsx
{
  slug: 'project-one',           // ← URL identifier, e.g. /projects/project-one
  title: 'Project One Title',    // ← Title shown on the card
  summary: 'A brief technical summary...',  // ← 1–2 sentence description
  tags: ['React', 'TypeScript', 'Node.js'], // ← Tech tags shown as pills
  media: {
    type: 'image',               // ← 'image' or 'video'
    src: '/projects/project-one/cover.png', // ← Path to your image/video file
    alt: 'Screenshot of Project One',       // ← Accessible description (images only)
  },
},
```

**To edit a card:**
1. Open both files above
2. Find the project by its `title` text
3. Change `title`, `summary`, `tags`, and `media` values
4. Save both files

**Important:** The `slug` field controls the URL. If you change the slug, you must also rename the matching key in the `PROJECTS` object in [src/app/projects/[slug]/page.tsx](src/app/projects/[slug]/page.tsx) — see Section 7 for details.

### Changing the media type from image to video (or vice versa)

For an **image**:
```tsx
media: {
  type: 'image',
  src: '/projects/my-project/cover.png',
  alt: 'Description of the image',
},
```

For a **video** (plays silently on hover):
```tsx
media: {
  type: 'video',
  src: '/projects/my-project/demo.mp4',
  poster: '/projects/my-project/poster.png',  // thumbnail shown before the video plays
},
```

---

## 6. Projects — Adding a New Project

### Step 1 — Create a folder for the project's media

Inside `d:\Personal_portfolio\public\projects\`, create a new folder named after your project slug (no spaces, use hyphens). Example:
```
public\projects\my-new-project\
```
Place your image or video inside that folder.

### Step 2 — Add a card entry in both data arrays

Open [src/app/page.tsx](src/app/page.tsx) and find the `FEATURED_PROJECTS` array (line 8). Add a new entry inside the `[` `]` brackets:

```tsx
{
  slug: 'my-new-project',
  title: 'My New Project',
  summary: 'What this project does in 1–2 sentences.',
  tags: ['Python', 'Docker'],
  media: {
    type: 'image',
    src: '/projects/my-new-project/cover.png',
    alt: 'Screenshot of My New Project',
  },
},
```

Do the same in [src/app/projects/page.tsx](src/app/projects/page.tsx) inside the `ALL_PROJECTS` array.

### Step 3 — Add the detail-page content

Open [src/app/projects/[slug]/page.tsx](src/app/projects/[slug]/page.tsx) and add a new block to the `PROJECTS` object, using your new slug as the key:
```tsx
'my-new-project': {
  title: 'My New Project',
  summary: 'What this project does in 1–2 sentences.',
  tags: ['Python', 'Docker'],
  date: 'March 2024',
  githubUrl: '',
  liveUrl: '',
  body: [
    { heading: 'Overview', paragraphs: ['...'] },
  ],
},
```
The page list is generated from the keys of `PROJECTS`, so adding the block is all that's needed — the new page appears at `/projects/my-new-project` automatically. See **Section 7** for full details on each field.

### Step 4 — Add the media file

See **Section 12** for how to properly resize/optimize the image or video before copying it into the `public` folder.

---

## 7. Project Detail Pages

**File:** [src/app/projects/[slug]/page.tsx](src/app/projects/[slug]/page.tsx)

Each project now has its **own** detail page content. All of it lives in a single object called `PROJECTS` near the top of this file. The page reads the slug from the URL (e.g. `/projects/project-one`) and shows the matching block.

### How to edit a project

1. Open the file and find the `PROJECTS` object.
2. Locate the block for the project you want to edit — it starts with its slug, e.g. `'project-one': {`.
3. Change the values inside that block:

```tsx
'project-one': {
  title: 'Your Project Title',          // ← Big heading at the top
  summary: 'One or two sentences...',    // ← Short description under the title
  tags: ['SystemVerilog', 'APB'],        // ← The pills; comma-separated, each in single quotes
  date: 'March 2024',                    // ← Shown on the right of the tags
  githubUrl: '',                         // ← Your repo URL, or '' to hide the button
  liveUrl: '',                           // ← Your live demo URL, or '' to hide the button
  body: [
    {
      heading: 'Overview',               // ← A section heading (becomes an <h2>)
      paragraphs: [
        'First paragraph of this section.',
        'A second paragraph (optional).',
      ],
    },
    // ... more sections ...
  ],
},
```

### Editing the tags (the pills)

The `tags` field is a plain list. Each tag is wrapped in single quotes and separated by commas:

- **Add a tag** → add `, 'YourTag'` inside the `[ ]`
- **Remove a tag** → delete `'Tag',` including its comma
- **Rename a tag** → change the text between the quotes

### Hiding the GitHub / Live Demo buttons

Set the URL to an empty string `''` and that button disappears automatically. Paste a real URL (e.g. `'https://github.com/hieuhust123/my-repo'`) to show it. No more dead buttons that link to nothing.

### Writing the long-form content (the `body`)

The `body` is a list of sections. Each section is a `heading` plus one or more `paragraphs`:

```tsx
body: [
  { heading: 'Overview',     paragraphs: ['What it is and why you built it.'] },
  { heading: 'Architecture', paragraphs: ['How the system is structured.'] },
  { heading: 'Challenges',   paragraphs: ['The hardest problem and how you solved it.'] },
  { heading: 'Results',      paragraphs: ['Measurable outcomes — speed, coverage, etc.'] },
],
```

- **Add a section** → copy a `{ heading: ..., paragraphs: [...] },` block and paste it inside the `body` list.
- **Add a paragraph** → add another `'...'` string inside that section's `paragraphs: [...]` list.
- **Remove a section** → delete its whole `{ ... },` block.

**Recommended sections:** Overview, Architecture *or* Approach, Challenges & Solutions, Results, Reflection & Skills Gained.

> **Architecture vs. Approach:** Use **"Architecture"** when the section describes a real system design (especially if you include a block/architecture diagram, like the FPGA project). Use **"Approach"** when it describes your method or process rather than a system structure. Both are just heading text — change the `heading: '...'` value to whichever fits.

> **Reflection & Skills Gained:** Each project ends with a reflection section — what you learned, the skills you built, and what you'd do differently. This is valuable for a portfolio (recruiters look for it), so keep one on every project. It's an ordinary section, so edit its `paragraphs` like any other.

### Adding images inside a write-up section (a gallery)

Any section can show images below its paragraphs by adding an `images` list. This is how the FPGA project shows its flowchart and result photos. Each image has a `src`, an `alt` (description), and an optional `caption`:

```tsx
{
  heading: 'Results',
  paragraphs: ['A sentence introducing the images below.'],
  images: [
    { src: '/projects/project-two/results/erosion.jpg',  alt: 'Eroded frame on the VGA display',  caption: 'Erosion' },
    { src: '/projects/project-two/results/dilation.jpg', alt: 'Dilated frame on the VGA display', caption: 'Dilation' },
  ],
},
```

How it lays out:
- **One image** → shown full width.
- **Two or more images** → shown in a responsive 2-column grid (single column on phones).
- The `caption` line appears in small grey text under each image. Leave the `caption` out to show no caption.
- `paragraphs` is optional when you have `images` — a section can be images-only (just delete the `paragraphs: [...]` line).

**Where to put the image files:** drop them in `public/projects/<slug>/` (a `results/` sub-folder keeps things tidy, e.g. `public/projects/project-two/results/erosion.jpg`). Use lowercase filenames with no spaces, and make the `src` path match exactly. See **Section 12** for recommended sizes.

- **Add an image** → add another `{ src: '...', alt: '...', caption: '...' },` line inside the `images: [...]` list.
- **Remove an image** → delete its `{ ... },` line.

### The hero media (the big box under the title)

Each project can show one large image or video at the top of its detail page. This is controlled by the optional `media` field in the project's block. Until you set it, the box shows a `[ project media ]` placeholder.

For a **technical / hardware project**, good things to put here are a **block / architecture diagram**, a **waveform screenshot** (e.g. from QuestaSim), or a **short demo video**.

**To show an image:**
```tsx
media: {
  type: 'image',
  src: '/projects/project-three/cover.png',   // file path under public/
  alt: 'Block diagram of the timer IP',         // description for accessibility
},
```

**To show a video** (plays with controls, muted, loops):
```tsx
media: {
  type: 'video',
  src: '/projects/project-three/demo.mp4',
  poster: '/projects/project-three/poster.png', // thumbnail before it plays
},
```

**To show nothing** (keep the placeholder): simply delete the whole `media: { ... },` block.

Then place the actual file in the matching folder, e.g. `public/projects/project-three/cover.png`. See **Section 12** for recommended image/video sizes. The `src` path must match the file location exactly, including upper/lowercase.

### Adding a brand-new project

Add a new block to the `PROJECTS` object using a new slug as the key (e.g. `'my-new-project': { ... }`). Because the list of pages is generated from the keys of `PROJECTS`, that's all you need — the new detail page will exist at `/projects/my-new-project` automatically. (Remember to also add the card in the two list files — see **Section 6**.)

> **Note:** If you visit a URL whose slug isn't in `PROJECTS`, the site shows a 404 page instead of wrong content.

---

## 8. Research Page

**File:** [src/app/research/page.tsx](src/app/research/page.tsx)

The page supports two types of entries: **Publications** and **Blog Write-ups**. Both live in the `RESEARCH_ITEMS` array starting at line 29.

### Adding a Publication

Copy this block and add it inside the `RESEARCH_ITEMS` array:

```tsx
{
  type: 'publication',
  title: 'Your Paper Title',
  authors: 'Nguyen, K., Co-Author, A.',          // Last name, First initial format
  venue: 'IEEE Conference on X, Vol. 3, 2025',   // Full journal/conference name
  year: 2025,
  abstract: 'A 2–3 sentence summary of what the paper proves or contributes.',
  pdfUrl: '/research/my-paper.pdf',              // Optional — see below for uploading
  doiUrl: 'https://doi.org/10.xxxx/xxxxx',       // Optional — remove line if you don't have a DOI
},
```

To upload the PDF: place your `.pdf` file inside `d:\Personal_portfolio\public\research\` and set `pdfUrl` to `/research/your-filename.pdf`.

To hide the PDF button: simply delete the `pdfUrl` line entirely.
To hide the DOI button: simply delete the `doiUrl` line entirely.

### Adding a Blog Write-up

Copy this block and add it inside the `RESEARCH_ITEMS` array:

```tsx
{
  type: 'post',
  title: 'My Technical Write-up Title',
  date: '2025-06-01',            // Format: YYYY-MM-DD
  summary: 'One or two sentences describing what the post covers.',
  slug: 'my-write-up-slug',      // Used in the URL: /research/my-write-up-slug
  tags: ['Machine Learning', 'Python'],
},
```

### Removing an entry

Find the entry you want to remove and delete everything from the opening `{` to the closing `},` for that entry.

### Order of entries

Entries appear on the page in the order they are listed in the array. Move blocks up or down to reorder them.

---

## 9. Resume Page

**File:** [src/app/resume/page.tsx](src/app/resume/page.tsx)

### 9a. Name and title (top of page)

Find lines 12–13:
```tsx
          <h1 className="text-4xl font-bold text-white">Kai Nguyen</h1>
          <p className="mt-1 text-zinc-400">Software Engineer</p>
```
Replace `Kai Nguyen` and `Software Engineer` with your real name and title.

### 9b. Contact strip

Find lines 28–31:
```tsx
          <span>your@email.com</span>
          <span>linkedin.com/in/your-handle</span>
          <span>github.com/hieuhust123</span>
          <span>Your City, Country</span>
```
Replace each placeholder with your real details. Do not change anything other than the text between `<span>` and `</span>`.

### 9c. Summary paragraph

Find lines 39–41:
```tsx
            Software engineer with X years of experience building [domain]. Passionate
            about [theme]. Proven track record of [key achievement].
```
Replace with your actual summary.

### 9d. Work experience

Each job is an `<ExperienceItem>` block. Here is the structure:

```tsx
<ExperienceItem
  role="Your Job Title"
  company="Company Name"
  period="Jan 2023 – Present"
  bullets={[
    'First bullet point about what you did.',
    'Second bullet point with a measurable result.',
    'Third bullet point.',
  ]}
/>
```

To **add a new job**: copy an entire `<ExperienceItem ... />` block and paste it above or below an existing one. Fill in the values.

To **remove a job**: delete the entire `<ExperienceItem ... />` block.

### 9e. Education

Find lines 76–80:
```tsx
              <p className="font-semibold text-white">B.Sc. Computer Science</p>
              <span className="font-mono text-xs text-zinc-500">2019 – 2023</span>
            </div>
            <p className="text-zinc-400">University Name</p>
            <p className="text-zinc-500 text-xs">GPA: X.X / 4.0 · Relevant coursework: …</p>
```
Replace the degree, years, university name, and GPA/coursework line with your real details.

### 9f. Skills

Each row is a `<SkillRow>` block:
```tsx
<SkillRow label="Languages"  skills={['TypeScript', 'Python', 'Go', 'SQL']} />
```

- Change `label` to rename the category (e.g. `"Tools"`, `"Cloud"`)
- Add or remove items inside the `skills={[...]}` list — each item must be in single quotes and separated by commas
- To add a new row: copy a `<SkillRow ... />` line and paste it below the last one

---

## 10. Contact Page

**File:** [src/app/contact/page.tsx](src/app/contact/page.tsx)

### 10a. Status line

Find line 15:
```tsx
          I&apos;m currently [open to opportunities / not looking / open to collaborations].
```
Replace the bracketed text with your current status, e.g.:
```tsx
          I&apos;m currently open to new opportunities.
```

### 10b. Email address

There are **two places** to update your email on this page.

Line 23:
```tsx
          href="mailto:your@email.com"
```

Line 28:
```tsx
            your@email.com
```

Replace both `your@email.com` with your real email.

### 10c. LinkedIn handle

Line 32:
```tsx
          href="https://linkedin.com/in/your-handle"
```
Line 39:
```tsx
            linkedin.com/in/your-handle
```
Replace `your-handle` with your actual LinkedIn username in both places.

### 10d. Enable the contact form (Formspree)

The form currently has a placeholder action. To make it work:

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form — Formspree will give you an ID like `xpwzabcd`
3. Find line 64:
```tsx
        action="https://formspree.io/f/YOUR_FORM_ID"
```
Replace `YOUR_FORM_ID` with your actual Formspree ID:
```tsx
        action="https://formspree.io/f/xpwzabcd"
```

Messages submitted via the form will then be forwarded to your email by Formspree.

---

## 11. Navigation Bar & Footer

### Navbar — logo text

**File:** [src/components/Navbar.tsx](src/components/Navbar.tsx), line 25:
```tsx
          kai.nguyen<span className="text-violet-400">_</span>
```
Change `kai.nguyen` to your preferred name/handle displayed in the top-left corner.

### Footer — name in copyright

**File:** [src/components/Footer.tsx](src/components/Footer.tsx), line 40:
```tsx
          © {year} Kai Nguyen. Built with Next.js & Tailwind CSS.
```
Replace `Kai Nguyen` with your name.

### Footer — LinkedIn link

Line 57:
```tsx
            href="https://linkedin.com/in/your-linkedin"
```
Replace `your-linkedin` with your LinkedIn username.

### Footer — email link

Line 68:
```tsx
            href="mailto:your@email.com"
```
Replace `your@email.com` with your real email.

---

## 12. Media Guide — Images & Videos

All media files go inside `d:\Personal_portfolio\public\`. Files placed here are served directly by the website.

### Folder convention

```
public\
└── projects\
    └── your-project-slug\
        ├── cover.png        ← Card thumbnail (image projects)
        ├── poster.png       ← Video thumbnail (shown before video plays)
        └── demo.mp4         ← Demo video (video projects)
```

### Image guidelines

| Setting | Recommended value |
|---|---|
| Format | PNG or WebP (avoid JPEG for screenshots) |
| Dimensions | **1280 × 720 px** (16:9 ratio — matches the card aspect ratio) |
| File size | Under **300 KB** |

**How to resize and compress on Windows (free tools):**

- **Squoosh** (browser-based, no install): go to `squoosh.app`, drag your image in, resize to 1280×720, export as WebP at ~80% quality
- **Paint**: open image → Resize → set to 1280×720 pixels → Save As PNG

### Video guidelines

| Setting | Recommended value |
|---|---|
| Format | MP4 (H.264 codec) |
| Dimensions | **1280 × 720 px** |
| Duration | 15–30 seconds (loops silently on hover) |
| File size | Under **5 MB** |

**How to compress a video (free):**

- **HandBrake** (free desktop app): open your video → Preset: "Web → Gmail Large 3 Minutes 720p30" → Start Encode
- **Trim first**: if your video is long, cut it to 15–30 seconds before compressing

**Always create a poster image** (thumbnail) for videos — it shows before the user hovers. A PNG screenshot of the first frame works well.

### After preparing your files

1. Copy the files into the correct folder under `public\projects\your-project-slug\`
2. Make sure the `src` path in your project card matches exactly, including uppercase/lowercase

---

## 13. Uploading Your Resume PDF

The Resume page has a "Download PDF" button that serves the file `/resume.pdf`.

**To upload your resume:**

1. Export your resume as a PDF from Word, Google Docs, or any editor
2. Rename the file to exactly `resume.pdf` (lowercase)
3. Copy it to: `d:\Personal_portfolio\public\resume.pdf`

That's it. The "Download PDF ↓" button on the Resume page will now serve your actual file.

**To update the resume later**, simply replace `public\resume.pdf` with the new version — keep the filename the same.

**Note:** The PDF and the inline HTML resume on the page are independent. Updating the PDF does not change the HTML version and vice versa. Keep both in sync manually.

---

## Quick Reference — Most Common Changes

| What to change | File | What to look for |
|---|---|---|
| Your name (everywhere) | `src/app/page.tsx`, `src/app/resume/page.tsx`, `src/components/Navbar.tsx`, `src/components/Footer.tsx` | `Kai Nguyen` |
| Hero summary | `src/app/page.tsx` | Line ~98 |
| Skills list | `src/app/page.tsx` | `'TypeScript', 'React'...` |
| Project card title/summary/tags | `src/app/page.tsx` AND `src/app/projects/page.tsx` | `FEATURED_PROJECTS` / `ALL_PROJECTS` |
| Project detail content | `src/app/projects/[slug]/page.tsx` | Placeholder `<h2>` and `<p>` blocks |
| Add a publication | `src/app/research/page.tsx` | `RESEARCH_ITEMS` array |
| Add a blog post | `src/app/research/page.tsx` | `RESEARCH_ITEMS` array |
| Work experience | `src/app/resume/page.tsx` | `<ExperienceItem>` blocks |
| Resume PDF | `public/resume.pdf` | Replace the file |
| Email address | `src/components/Footer.tsx`, `src/app/contact/page.tsx`, `src/app/resume/page.tsx` | `duchieubui511@gmail.com` |
| LinkedIn URL | `src/components/Footer.tsx`, `src/app/contact/page.tsx` | `your-linkedin` |
| Contact form | `src/app/contact/page.tsx` | `YOUR_FORM_ID` |
