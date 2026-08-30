# VANIL portfolio — permanent project memory

## Purpose of this file

This is the durable history, product logic, and technical memory of the VANIL / Ivan Novichkov portfolio. It complements AGENTS.md:

- AGENTS.md contains current operating rules and release requirements.
- PROJECT_MEMORY.md explains why the project looks this way, how it evolved, and how its parts fit together.

Every new Codex dialogue must read both files completely before changing the project. Update this document whenever a change affects positioning, architecture, content structure, design decisions, security rules, publishing, or the roadmap.

Last consolidated: 2026-08-28.

## Project identity

- Owner: Ivan Novichkov / Иван Новичков.
- Visual mark: VANIL.
- Public identity: VANIL / Иван Новичков.
- Role: developer of websites and n8n / AI automations.
- Telegram: https://t.me/novichkov_ivan.
- Email: ewan.novichkov@yandex.ru.
- Technical GitHub username: VanilVibecoder.
- Repository: https://github.com/VanilVibecoder/vanilvibecoder.github.io.
- Production site: https://vanilvibecoder.github.io.

VanilVibecoder remains the GitHub username but is not the main service brand. The site must keep the real name visible near VANIL.

## Product purpose

The site is a credibility-first portfolio used in manual outreach, job applications, and sales conversations. It proves that Ivan can analyze a process, design an automation, build it, test it, and document it. It does not claim that simply publishing the site will produce organic leads.

Core positioning since the web-development expansion:

> Создаю сайты и автоматизирую ручные процессы.
>
> От структуры и интерфейса сайта до n8n- и AI-workflow: разбираю задачу, собираю решение, проверяю сценарии и фиксирую ограничения.

Primary call to action:

> Опишите задачу — я предложу подход: веб-интерфейс, автоматизацию или их связку.

The positioning is intentionally based on business problems rather than one industry. Service-business cases demonstrate experience but must never be presented as the only market Ivan serves.

## Decision principles

1. Evidence before marketing claims. A case is described only with facts that can be checked in its repository or test notes.
2. Problems before industries. Services are grouped around requests, support, documents, data, integrations, and workflow stabilization.
3. Honest status labels. Only demo, training, and public-template are allowed.
4. Static by default. The MVP has no backend, form, analytics, cookies, React runtime, or intentional client JavaScript.
5. Safety before downloads. A workflow is linked only after sanitization, automated scanning, and manual n8n review.
6. Accessibility is part of completion, not optional polish.
7. A small maintainable portfolio is preferable to speculative features without demand.
8. Web projects and automation cases are separate evidence categories and must not share a misleading content status or schema.

## Chronology

### 2026-07-17 — repository and baseline

- The local repository was initialized on main.
- Commit 4b4e251 created the empty project baseline.
- Development moved to codex/portfolio-mvp.
- The public GitHub repository VanilVibecoder/vanilvibecoder.github.io was created.

### 2026-07-17 — portfolio MVP

The initial implementation was split into focused commits before PR #1:

- 1a3a022 configured Astro, TypeScript, Tailwind, npm, formatting, and linting.
- 4e86c42 built the visual system, layouts, pages, typed case content, SEO, and the four case narratives.
- ee1b525 added the workflow export scanner, fixtures, tests, CI, Playwright checks, and GitHub Pages deployment.

PR #1 was squash-merged as c7bcb97, Build VANIL portfolio MVP (#1).

During review, axe checks exposed accessibility issues. Coral contrast, heading order, and skip-link focus behavior were corrected. The completed browser suite passed 27 tests across mobile, tablet, and desktop.

### 2026-07-17 — hero scale correction

The first public hero was visually too large around the 903 × 714 viewport and wrapped awkwardly. The heading was reduced and balanced without changing the positioning.

- Feature commit: 1d7753c.
- PR #2 squash merge: 31e5c36, Refine hero heading scale (#2).
- Current rule: clamp(2.4rem, 5.4vw, 5.2rem), maximum width 18ch, line height 0.98, balanced wrapping.
- At 903 × 714 the heading is approximately 48.8 px and forms three balanced lines.

Do not restore the oversized hero without explicit approval from Ivan.

### 2026-07-17 — durable agent context

AGENTS.md was expanded from a short project note into the operating contract for future Codex sessions.

- Feature commit: 25f3c4f.
- PR #3 squash merge: 5d9b673, Document portfolio project context (#3).

It records positioning, factual constraints, content schema, workflow security, accessibility, quality gates, Git process, and deployment.

### 2026-07-31 — permanent history and architecture memory

PROJECT_MEMORY.md was introduced in PR #4 to preserve the chronology, rationale, architecture, page logic, release flow, and unresolved work separately from the shorter operational instructions in AGENTS.md. AGENTS.md was linked to this file so a new context window reads both sources before acting.

The quality gate also detected newly published advisories affecting Astro 6.3.8 and its transitive dependencies. Astro was updated to the then-current stable 7.1.6 and the compatible sharp update was applied. Production audit returned zero vulnerabilities. Development-only advisories inherited from Lighthouse CI remained outside the required production audit and must be revisited when Lighthouse CI publishes a non-breaking dependency update.

### 2026-07-31 — reference-led visual redesign

Ivan explicitly requested a stronger visual direction and supplied three references. Reference 2 was selected as the primary influence because its premium editorial composition, clear hierarchy, restrained warm light, and architectural scale fit credibility-led sales conversations in Russia and the CIS better than the cyberpunk robot or purely abstract particle references.

The redesign keeps the verified information architecture and factual case content intact while changing the visual system:

- dark graphite header and image-led hero;
- warm paper content sections for long-form readability;
- restrained apricot/copper accent instead of a louder coral treatment;
- more architectural spacing, squared controls, and calmer card surfaces;
- an original generated hero asset showing structured data entering a controlled system and resolving into a clear output.

The hero asset lives at public/images/hero-automation-architecture.webp. It is decorative, has no embedded text, logo, person, robot, customer data, or product UI, and is served as an optimized WebP. The homepage heading retains the approved clamp(2.4rem, 5.4vw, 5.2rem), 18ch maximum width, 0.98 line height, and balanced wrapping. This direction supersedes the earlier all-light hero while preserving the light editorial content foundation and the prohibition on cyberpunk styling.

PR #5 was squash-merged as 37f0c8b, Redesign portfolio visual system (#5), and deployed to GitHub Pages.

### 2026-08-01 — expanded public case catalogue

The portfolio catalogue was expanded from four to six verified public cases without changing the original order:

- AI Content Factory Lite was added as a demo: a 64-node main workflow with PostgreSQL state, budget controls, media generation, a FastAPI/FFmpeg renderer, human review, and a separate error workflow.
- AI Price List Auditor was added as training work: a synthetic CSV/XLSX pipeline with local Ollama column mapping, deterministic validation, duplicate classification, and format conversion.

Both source repositories contain public workflow exports, but the portfolio's stricter scanner rejects their top-level `pinData` field even when empty. The case pages therefore link to the repositories and disclose the limitation, but intentionally omit direct workflow-download buttons until the exports are re-sanitized and pass the strict scanner. The repository `telegram-rag-chat-bot-n8n` remains excluded under the existing publication rule; the portfolio repository and `vibecodeCODEX` are not separate n8n case studies.

### 2026-08-28 — websites added as a second service direction

The portfolio expanded from a single automation focus to two explicit service directions: websites / web services and AI / process automation. The homepage keeps the credibility-first structure but now routes visitors to separate evidence catalogues.

The first web project is the independent “Мистер Детейлинг” concept. Its public Vercel site demonstrates a service catalogue, inspection comparison, in-browser preliminary estimate and a prepared Telegram enquiry. Its `/admin` route demonstrates local content, price and section-visibility editing. The work is explicitly labelled as a portfolio demo: it is not an official client delivery, the prices and imagery are demonstrational, and the editor has no shared database or authentication.

Web projects use a separate typed `src/data/sites.ts` data module and `/sites/` routes. This avoids mixing web work into the stricter n8n case schema. Real screenshots of both the public page and editor are stored locally in the portfolio; no private data or credentials are shown.

During the same change, the cases collection moved from Astro's packaged glob loader to a small local Markdown loader in `src/content.config.ts`. The packaged loader caused Vite 8 to evaluate the CommonJS `picomatch` entry as ESM under the repository's Node 24 quality gate (`require is not defined`). The local loader preserves the same Markdown files, Zod validation, rendered case bodies and static routes while avoiding that dependency path.

The completed local publication review passed formatting, lint, Astro check, 3 unit tests, an 11-page production build, 36 Playwright/axe checks across mobile, tablet and desktop, visual inspection at 375, 768 and 1440 px, and the production dependency audit with zero vulnerabilities. No workflow export or download changed, so an additional n8n workflow review was not applicable.

### 2026-08-28 — Boujee added as the second web project

The website catalogue now includes the independent Boujee portfolio concept. The public demo presents a curated service catalogue, publicly confirmed team roles, a three-step Beauty Route that recommends one service and two alternatives, and a handoff to YClients for the full catalogue, schedule and booking. The paired `/admin/demo` surface demonstrates local editing for services, team, hidden promotion drafts, media metadata and section visibility.

The case is deliberately described as an unofficial demo rather than a client delivery. It records that the concept imagery does not show real staff, premises or work results; current commercial information remains the responsibility of YClients; and the demo admin does not synchronize changes between devices. Real 1440 px captures of the supplied public and admin URLs are stored with the portfolio project.

The local publication review passed formatting, lint, Astro check with 0 errors, 3 unit tests, a 12-page static build, 42 Playwright/axe checks across mobile, tablet and desktop, visual inspection at 375, 768 and 1440 px, and the production dependency audit with zero vulnerabilities. No workflow export or download changed, so n8n workflow review was not applicable.

### 2026-08-30 — web-project presentation label refined

The two implemented website cards and their detail-page heroes now use the user-facing label «Реализованный проект» instead of «Демонстрационный MVP». This foregrounds that both interfaces were actually designed, built, tested and deployed. Their typed status remains `demo`, and the case copy and limitations continue to state that they are independent unofficial portfolio concepts rather than client production deliveries. Automation-case status labels are unchanged. During the required release audit, the compatible transitive `nanoid` dependency was refreshed from 3.3.16 to 3.3.18 in `package-lock.json` to resolve GHSA-2v37-7h3g-55p8; no direct dependency or runtime architecture changed.

## User-facing information architecture

### Homepage: /

The homepage moves from broad positioning to proof and then to contact:

1. Hero: Ivan's web and automation role with a direct CTA.
2. Two service directions: websites / web services and AI / process automation.
3. What can be automated: recurring business problems, not industries.
4. Selected websites and automation cases as separate evidence groups.
5. Process: analysis → architecture → build and tests → documentation and handoff.
6. Stack and reliability principles.
7. About Ivan / VANIL.
8. Telegram-first contact section with email and GitHub alternatives.

### Website catalogue: /sites/

The catalogue presents completed implementations with the label «Реализованный проект» and contains their typed demo status, target audience, implemented functions, live URL, screenshots, tested scenarios and explicit independent-project limitations.

### Website detail: /sites/[slug]/

Each web-project page explains the task, the user journey, who the interface is for, what is implemented, what was verified and what remains deliberately outside the demo scope.

### Case catalogue: /cases/

The catalogue contains all six cases in a deliberate order. Cards expose the honest status, problem, concise outcome, stack, and link to the detail page.

### Case detail: /cases/[slug]/

Each case page is generated from typed Markdown and includes:

- status and summary;
- problem and automated process;
- architecture and stack;
- reliability decisions;
- tested scenarios;
- metrics with explicit source or qualification;
- limitations and roadmap;
- repository and a safe workflow download when available;
- gallery entries when sanitized real screenshots are added.

### Not found: /404.html

A custom static 404 keeps navigation and brand continuity on GitHub Pages.

Russian is the only published language in v1. The schema accepts ru and en so a complete English section can be added later, but an empty language switcher must not be shown.

## Technical architecture

The system is a static content pipeline:

    Markdown case files
            |
            v
    Astro Content Collection + Zod validation
            |
            v
    Astro pages and reusable components
            |
            v
    Static HTML, CSS, sitemap, metadata, and JSON-LD
            |
            v
    GitHub Actions build
            |
            v
    GitHub Pages at vanilvibecoder.github.io

There is no production database or application server. Supabase, PostgreSQL, Qdrant, Ollama, and other tools appear as technologies inside case studies; the portfolio itself does not connect to them at runtime.

### Runtime and build stack

- Astro 7.1.x with output set to static.
- Strict TypeScript.
- Tailwind CSS 4 through the Vite integration.
- Astro Content Collections with Zod validation.
- Local Manrope Variable and JetBrains Mono Variable packages.
- npm and package-lock.json for reproducible installation.
- ESLint, Prettier, Node test runner, Playwright, axe, and Lighthouse CI tooling.

### Main modules

- astro.config.mjs sets the canonical production site, static output, sitemap, and Tailwind integration.
- src/content.config.ts is the source of truth for the automation-case schema and its local Markdown loader.
- src/content/cases contains one Markdown file per automation case.
- src/data/sites.ts contains typed web-project facts and detail-page copy.
- src/layouts/BaseLayout.astro owns metadata, canonical links, JSON-LD, skip link, header, and footer.
- src/pages/index.astro owns the homepage sections and hero.
- src/pages/sites owns the web-project catalogue and detail pages.
- src/pages/cases/index.astro builds the case catalogue.
- src/pages/cases/[slug].astro generates one static page per case.
- src/components contains shared brand, navigation, case card, status, footer, and architecture-map UI.
- src/styles/global.css contains global tokens, typography, layout behavior, focus states, and reduced-motion rules.
- scripts/audit-workflow-export.mjs scans candidate n8n exports without printing secret values.
- tests/audit-workflow.test.mjs validates safe and unsafe workflow fixtures.
- tests/e2e/site.spec.ts covers routes, navigation, cases, contacts, accessibility, responsive layouts, 404, and downloads.
- .github/workflows/ci.yml runs quality and browser checks.
- .github/workflows/deploy.yml publishes the static build from main to GitHub Pages.

## Content model

The cases collection validates these fields:

- slug, locale, title, eyebrow, summary;
- status: demo, training, or public-template;
- featured, order, stack, problems, optional nodeCount;
- repoUrl and optional releaseUrl;
- metrics, where every item requires value, label, and a meaningful source;
- testedScenarios, limitations, architecture, gallery, and updatedAt.

Invalid statuses, missing or invalid GitHub repository links, and metrics without meaningful qualification stop the build. This is intentional: marketing copy cannot bypass the factual contract.

## Case inventory and truth boundaries

### 1. AI Front Office

- Slug: ai-front-office.
- Status: demo.
- Role: flagship demonstration MVP.
- Verified scope: four workflows and 95 nodes.
- Never describe it as a confirmed client production deployment without new evidence.

### 2. RAG-поддержка Motorika

- Slug: rag-motorika.
- Status: demo.
- Architecture includes Qdrant, Ollama, PostgreSQL/Supabase, and an admin API.
- Treat the service-business context as a use case, not an exclusive specialization.

### 3. AI Lead Triage

- Slug: ai-lead-triage.
- Status: training.
- The training label must remain visible and unambiguous.

### 4. LinkedIn Job Scout

- Slug: linkedin-job-scout.
- Status: public-template.
- Published numbers describe one test run and are not production KPIs.

### 5. AI Content Factory Lite

- Slug: ai-content-factory-lite.
- Status: demo.
- Verified scope: 64 nodes in the main workflow, PostgreSQL state machine, FastAPI/FFmpeg renderer, human review, and 21 documented test scenarios.
- Direct workflow download remains blocked until top-level `pinData` is removed and the strict scanner passes.

### 6. AI Price List Auditor

- Slug: ai-price-list-auditor.
- Status: training.
- Verified scope: the published synthetic fixture contains 10 input rows, 6 expected output rows and 4 excluded rows; the workflow uses local Qwen 2.5 7B mapping and deterministic validation rules. The repository README still describes an older 35-to-31 demonstration, so the portfolio follows the checked-in fixture instead.
- Treat the numbers as one synthetic demonstration, never as production performance or a client outcome.
- Direct workflow download remains blocked until top-level `pinData` is removed and the strict scanner passes.

Case order remains a product decision: the original four retain their established sequence, while the two newer public projects are appended in repository publication order. Revisit featured ordering only with explicit product intent and evidence from real sales conversations.

## Design architecture

The visual direction is premium editorial-tech with a dark, image-led opening and a light reading surface:

- dark graphite header and hero;
- warm paper content sections;
- dark ink typography on light sections and ivory typography on dark sections;
- restrained apricot/copper as the accent;
- dark panels for architecture diagrams;
- local Manrope for primary text;
- local JetBrains Mono for technical labels.

Avoid cyberpunk styling, stock robots, outer-space AI clichés, heavy gradients, emoji cards, and imitation of n8n's brand. The hero artwork may establish mood, but technical credibility comes from clear structure, truthful detail, and real sanitized workflow evidence.

Responsive behavior is mobile-first. Required visual review widths are 375, 768, and 1440 px. The layout must have no horizontal overflow. Keyboard focus, skip navigation, semantic heading order, WCAG AA contrast, useful alt text, and prefers-reduced-motion must remain intact.

## Workflow screenshot strategy

Real workflow screenshots are the highest-value visual follow-up because they show actual implementation complexity. They are not yet a reason to replace the text architecture maps.

When added:

1. Use a consistent preview crop on cards.
2. Use a full workflow view plus one or two meaningful detail crops on case pages.
3. Preserve an accessible text explanation of the architecture.
4. Remove credentials, tokens, personal data, real IDs, webhook URLs, private customer information, and identifying pinned data.
5. Prefer legible screenshots over decorative full-canvas images where nodes cannot be read.

## Workflow publication and security model

Public demonstration exports may use MIT where appropriate. Production and private versions remain closed. The case repository is the source; the portfolio should link to a stable sanitized GitHub Release asset rather than a mutable raw file.

Before publishing a JSON or JSON.GZ export:

    npm run audit:workflows -- PATH

The scanner rejects active workflows, credentials, top-level id, versionId, meta, pin/static data, real Telegram, Sheet, or webhook identifiers, and strings resembling secrets. Its output may show only finding codes and suspicious field paths, never the suspected values.

Every public workflow also needs a manual official n8n review. Automated scanning is necessary but not sufficient. Never publish telegram-sales-payment-automation-n8n or the empty telegram-rag-chat-bot-n8n repository.

## SEO and delivery logic

BaseLayout provides unique metadata, canonical URLs, Open Graph data, and JSON-LD. The build generates a sitemap; public/robots.txt controls indexing. Person markup represents Ivan, while case pages may expose SoftwareSourceCode semantics.

The project is built by GitHub Actions. Only a merged change on main is production. A green pull request is not proof of deployment: after the Pages workflow completes, verify https://vanilvibecoder.github.io directly.

## Quality gates

Run from the repository root after material changes:

    npm run format:check
    npm run lint
    npm run check
    npm test
    npm run build
    npm run test:e2e
    npm audit --omit=dev

Also audit each changed workflow export. Visual changes require review at 375, 768, and 1440 px. Lighthouse targets are performance at least 90 and accessibility, best practices, and SEO at least 95.

The last full review recorded before this memory file was 2026-07-17:

- Astro check: 0 errors.
- Unit tests: 3 of 3.
- Playwright and axe: 27 of 27 across mobile, tablet, and desktop.
- Production dependency audit: 0 vulnerabilities.
- Production site: HTTP 200.

The documentation and Astro 7.1.6 update were fully verified on 2026-07-31:

- Formatting and lint passed.
- Astro check: 0 errors, with 3 non-blocking deprecation hints.
- Unit tests: 3 of 3.
- Static build: 7 pages.
- Playwright and axe: 27 of 27 across mobile, tablet, and desktop.
- Production dependency audit: 0 vulnerabilities.
- No workflow JSON or workflow download changed, so manual n8n review was not applicable.

Historical results are context only; they never replace checks for a new change.

## Git and release workflow

1. Fetch origin and start from origin/main.
2. Create a focused codex/* branch.
3. Keep unrelated user changes untouched.
4. Run the local quality gate.
5. Stage only intended files and create a focused commit.
6. Push the branch and open a draft pull request.
7. Wait for quality and browser CI.
8. Merge only after checks pass.
9. Wait for the Pages deployment.
10. Verify the public URL directly.

## Deliberate MVP exclusions

These are not missing by accident:

- backend or server functions;
- React or another client framework;
- contact form;
- analytics and cookies;
- runtime Supabase integration;
- incomplete English pages;
- unverified testimonials, ROI, savings, uptime, and production outcomes.

Add them only when they solve a demonstrated problem and can be maintained safely.

## Current roadmap

1. Add sanitized real n8n workflow screenshots to cards and detail pages.
2. Replace raw or folder links with stable sanitized GitHub Release assets.
3. Complete and record the manual official n8n review for every downloadable workflow.
4. Use the site in weekly problem-specific manual outreach and link prospects to the closest case rather than only the homepage.
5. Update copy based on real objections and conversations.
6. Add problem-specific landing pages only after repeated demand.
7. Add /en/ only when the complete English experience is ready.

## How to use this memory in another context window

Open the repository and give Codex this instruction:

> Прочитай AGENTS.md и PROJECT_MEMORY.md полностью. Затем проверь git status, текущую ветку, последние коммиты и публичный сайт. Продолжай из задокументированного состояния; не пересобирай проект с нуля и не меняй факты кейсов без доказательств.

If the public site, repository state, or these documents disagree, stop and investigate Git history and the deployed build. Do not silently choose the more convenient version.

## Memory maintenance protocol

Update this file in the same pull request whenever a change affects:

- product positioning or CTA;
- brand naming or key visual decisions;
- routes, content schema, or case ordering;
- architecture, dependencies, or runtime behavior;
- case status, metrics, sources, limitations, or workflow links;
- security and workflow publication rules;
- CI, tests, deployment, or production URL;
- completed milestones or roadmap priorities.

Add a dated chronology entry with the PR or commit when known. Preserve previous decisions and mark them superseded instead of deleting their history. Keep secrets and private customer data out of this file.
