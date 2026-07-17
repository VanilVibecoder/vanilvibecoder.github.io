# VANIL portfolio instructions

## Mission and audience

Build a credibility-first portfolio for Ivan Novichkov. Position by business problem, never by a
single industry. `VANIL` is the visual mark; `Ivan Novichkov` must remain visible beside it.

## Stack and commands

- Astro static output, strict TypeScript, Tailwind CSS, npm.
- Use `npm run check`, `npm run lint`, `npm test`, `npm run build`, and `npm run test:e2e`.
- Keep client JavaScript at zero unless a user-visible behavior cannot be expressed with HTML/CSS.

## Content rules

- Store cases in `src/content/cases` and validate them through the `cases` content collection.
- Label every case as `demo`, `training`, or `public-template`.
- Never invent clients, testimonials, savings, ROI, uptime, or production outcomes.
- Every metric must include a short source or qualification.
- State limitations and known follow-up work plainly.
- Russian is the only published locale in v1; keep the schema ready for `en` without showing an
  empty language switcher.

## Workflow publishing

- Publish only sanitized demonstration exports. Keep production and private workflows out of the
  site repository.
- Run `npm run audit:workflows -- <path>` before linking a downloadable workflow.
- Reject credentials, secrets, instance metadata, pin data, active exports, and real endpoint IDs.
- Never print suspected secret values in scanner output or CI logs.

## UX and accessibility

- Preserve the editorial-tech direction: warm paper background, ink text, coral accent, dark
  architecture panels.
- Meet WCAG AA contrast, semantic heading order, keyboard access, visible focus, descriptive link
  text, useful alt text, and `prefers-reduced-motion`.
- Validate at 375 px, 768 px, and 1440 px. Avoid horizontal scrolling.

## Git and definition of done

- Work on `codex/*` branches and open draft pull requests by default.
- Do not stage unrelated user files.
- A change is done only when format, lint, Astro check, unit tests, production build, workflow audit,
  Playwright smoke tests, and a visual review pass.
