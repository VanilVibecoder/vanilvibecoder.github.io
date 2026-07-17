# VANIL portfolio — project context and instructions

## Handoff summary

This repository contains the public portfolio of Ivan Novichkov (VANIL), an n8n and AI automation developer. The site is live at https://vanilvibecoder.github.io and the repository is https://github.com/VanilVibecoder/vanilvibecoder.github.io.

Before changing anything, read this file completely and inspect git status. Treat the current public site and factual case content as the baseline.

## Owner and contacts

- Name: Ivan Novichkov / Иван Новичков.
- Visual brand: VANIL / Иван Новичков.
- Telegram: https://t.me/novichkov_ivan (@novichkov_ivan).
- Email: ewan.novichkov@yandex.ru.
- GitHub username: VanilVibecoder; keep it as the technical username, not the main service brand.

## Mission and positioning

The site is a credibility-first portfolio for manual outreach, applications, and sales conversations. It is evidence of competence, not a promise of organic lead generation.

Primary positioning:

> Автоматизирую ручные бизнес-процессы с помощью n8n и AI.
> Заявки, поддержка, документы, данные и интеграции — от разбора процесса до протестированного workflow с документацией.

Position by business problem, never by a single industry. Service-business examples are evidence, not a specialization boundary. Do not use “only for car services”, “for service businesses”, or similar restrictions in the hero.

Primary CTA:

> Опишите повторяющийся процесс — я скажу, что имеет смысл автоматизировать.

## Brand and writing

- VANIL is the short visual mark; Иван Новичков must remain visible beside it.
- In the hero, retain “Иван Новичков · разработчик AI-автоматизаций”.
- Use plain, specific Russian. Prefer process language over generic “AI transformation” claims.
- Never invent clients, testimonials, savings, ROI, uptime, or production outcomes.
- Every metric must include a source or explicit qualification.
- Demo and training work must not be described as a client production implementation.
- State limitations and known follow-up work plainly.

## Current implementation

Published routes:

- / — positioning, problem-based services, selected cases, process, reliability, about, contacts.
- /cases/ — catalogue of four cases.
- /cases/[slug]/ — typed case detail pages.
- /404.html — custom static 404.

Russian is the only published locale in v1. The content schema supports a future en locale, but do not show an empty language switcher.

The site has zero intentional client JavaScript. Preserve that unless a user-visible behavior cannot be expressed with HTML and CSS.

## Case inventory

Keep this order and honest status:

1. ai-front-office — AI Front Office, demo, flagship MVP, four workflows and 95 nodes.
2. rag-motorika — RAG-поддержка Motorika, demo, Qdrant, Ollama, PostgreSQL/Supabase and admin API.
3. ai-lead-triage — AI Lead Triage, training.
4. linkedin-job-scout — LinkedIn Job Scout, public-template; numbers describe one test run, not production KPI.

Case source files live in src/content/cases. Each case must include the problem, automated process, architecture, stack, reliability decisions, tested scenarios, limitations, roadmap, repository link, and safe workflow link when available.

## Content schema

The cases Content Collection is defined in src/content.config.ts. Important fields include:

- slug, locale, title, eyebrow, summary;
- status: only demo, training, or public-template;
- featured, order, stack, problems, nodeCount;
- repoUrl and optional releaseUrl;
- metrics, with a required explanatory source;
- testedScenarios, limitations, architecture, gallery, updatedAt.

The build must fail on invalid status, missing/invalid repository URL, or malformed/unqualified metrics.

## Design system

Direction: light editorial-tech, warm paper background, ink text, coral accent, and dark architecture panels. Fonts are local Manrope Variable and JetBrains Mono Variable.

Avoid cyberpunk templates, stock robots, excessive gradients, emoji cards, and imitation of n8n branding.

Important current hero decision:

- On the homepage, .hero .display uses font-size clamp(2.4rem, 5.4vw, 5.2rem), max-width 18ch, line-height 0.98, and balanced wrapping.
- At 903×714 it renders at approximately 48.8 px in three balanced lines. Do not restore the previous oversized version without explicit user approval.

Workflow screenshots are a desired next enhancement. Use real sanitized screenshots, not decorative mockups. Prefer a consistent preview on case cards and a full view plus one or two meaningful crops on case pages. Keep the explanatory text architecture map. Screenshots must not expose credentials, personal data, tokens, real IDs, webhook URLs, or private customer information.

## Stack and important files

- Astro static output, strict TypeScript, Tailwind CSS, npm.
- Astro Content Collections for Markdown case content.
- Local font packages; no remote font request.
- src/layouts/BaseLayout.astro — metadata, JSON-LD, header/footer, skip link.
- src/pages/index.astro — homepage and hero.
- src/pages/cases/ — catalogue and dynamic case route.
- src/styles/global.css — tokens and global layout.
- scripts/audit-workflow-export.mjs — n8n export safety scanner.
- tests/e2e/site.spec.ts — responsive, accessibility, routes, cases, contacts, 404.
- .github/workflows/ci.yml — quality and browser CI.
- .github/workflows/deploy.yml — GitHub Pages deployment from main.

Backend, React, Supabase runtime, analytics, cookies, and a contact form are intentionally outside the current MVP.

## Workflow publishing and security

- Publish only sanitized demonstration exports under MIT where appropriate.
- Production and private workflows remain closed.
- The source of each workflow remains its case repository.
- Prefer a stable GitHub Release asset (.json or .zip) over a raw development-file URL.
- Never publish telegram-sales-payment-automation-n8n or the empty telegram-rag-chat-bot-n8n repository.
- Run npm run audit:workflows -- PATH before linking any downloadable .json or .json.gz.
- Reject active workflows, credentials, top-level id, versionId, meta, pin/static data, real Telegram/Sheet/webhook IDs, and strings resembling tokens, keys, or passwords.
- Scanner output must show only finding codes and suspicious field paths, never suspected values.
- Apply the official n8n review checklist to every workflow before publication. Do not silently redesign or auto-fix a workflow during review.

## SEO and accessibility

Preserve unique metadata, canonical URLs, Open Graph, sitemap, robots.txt, and JSON-LD Person / SoftwareSourceCode.

Meet WCAG AA contrast, semantic heading order, keyboard access, visible focus, working skip link, descriptive link text, useful alt text, and prefers-reduced-motion. Validate at 375 px, 768 px, and 1440 px and avoid horizontal scrolling.

## Commands and quality gate

Run from the repository root:

    npm install
    npm run dev
    npm run format:check
    npm run lint
    npm run check
    npm test
    npm run build
    npm run test:e2e
    npm audit --omit=dev

Local development URL: http://127.0.0.1:4321/.

The latest completed review on 2026-07-17 had:

- Astro check: 0 errors;
- unit tests: 3/3;
- Playwright/axe: 27/27 across mobile, tablet, and desktop;
- production dependency audit: 0 vulnerabilities;
- GitHub Pages: HTTP 200.

Re-run checks after every material change; historical results are not a substitute.

## GitHub and deployment

- Public repository: VanilVibecoder/vanilvibecoder.github.io.
- Production branch: main.
- Work on codex/* branches.
- Stage only intended files, use a focused commit, push the branch, and open a draft PR by default.
- Merge only after quality and browser CI jobs pass.
- A merge to main automatically deploys through the official Astro GitHub Pages workflow.
- Production URL: https://vanilvibecoder.github.io.
- After deployment, verify the public URL directly instead of relying only on the Actions status.

## Known follow-up work

- Add sanitized real workflow screenshots to cards and case pages.
- Replace raw/folder workflow links with stable sanitized GitHub Release assets.
- Complete and record the manual official n8n review for every downloadable workflow.
- Add English content only when complete enough to publish under /en/.
- Update copy based on real client conversations and repeated objections.
- Add problem-specific landing pages only after repeated demand demonstrates the need.

## Definition of done

A change is complete only when:

- positioning and case claims remain truthful;
- workflow downloads pass the safety scanner and manual n8n review when applicable;
- format, lint, Astro check, unit tests, production build, dependency audit, and Playwright pass;
- visual review passes at required widths;
- no unrelated user files are staged;
- the PR passes CI and the public Pages deployment is verified when publishing.

## Starting a new Codex dialogue

Point the new dialogue at this repository and say: “Read AGENTS.md completely, inspect the current branch and public site, then continue from the documented project state.” The new dialogue should not rebuild the site from scratch or overwrite verified case facts without evidence.
