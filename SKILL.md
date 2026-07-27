---
name: appian-aurora-design-system
description: Use when designing UIs for Appian SAIL applications (Mercury sites, Solutions, PHQ apps). Provides Aurora design tokens (colors, type), iconography mapping, content/voice guidance, and a Mercury site UI kit with header, cards, grids, banners, tags, forms.
---

# Appian Dev — Figma-to-Appian Demo Builder

Rebuilds the application in `./figma-source` as a native, fully working Appian demo. The rebuild
must be Appian-native (SAIL interfaces, record types, process models) — never an embedded React/HTML
shell. "Native" is the whole point: it's what proves the design translates to the platform.

# Appian Aurora Design System

Source recreation of [appian-design/aurora](https://github.com/appian-design/aurora). Use the tokens in `colors_and_type.css` and the components in `ui_kits/sail_site/` for any Appian SAIL mockup.

## Quick start
1. Link `colors_and_type.css` and `ui_kits/sail_site/site.css`.
2. Load FontAwesome 5 from CDN; reference Aurora icons by their FA equivalent (see README).
3. For full demos, mount the React kit (SiteChrome.jsx + Components.jsx + App.jsx) — see `ui_kits/sail_site/index.html`.
4. For each customer demo, override `--accent` and `--nav-bar` in `:root` to the brand color.


## Companion skill: appian-aurora-design-system

**Mandatory prerequisite for Phase 3.** Load `appian-aurora-design-system` before building any SAIL
interface. It supplies the actual Appian visual language — color/type tokens, the Mercury site UI
kit, iconography mapping, and content/voice guidance — that a native rebuild should render with.
`./figma-source` is the source of truth for *what* to build (structure, hierarchy, content, flows,
interactions); Aurora is the source of truth for *how it should look* as a real Appian app. Don't
replicate the Figma prototype's raw CSS in SAIL — reconcile the two per the rule in Phase 3.

## Before starting: confirm the execution path (do this first, every time)

This skill assumes Claude Code has *some* way to actually create/modify objects in a live Appian
environment, and that mechanism determines almost everything about how the rest of this skill
executes. Common possibilities, in rough order of how Appian environments are typically wired up:

- An **Appian MCP connector** or API integration is available to this session.
- Appian's **Git-backed application development** (package/deployment sync) is configured for the
  target environment, so objects can be authored as files and pushed via Appian's deployment
  tooling/CLI.
- No programmatic access exists, and object creation has to happen through **browser automation**
  against Appian Designer's web UI (e.g. via a browser-use tool), driven click-by-click.

**Do not assume which of these is true.** Check what's actually available in the current session
(connectors, CLI tools, credentials) before planning. If none of the above is confirmed, stop and
ask the user how Claude Code is meant to reach the target Appian environment — this is a
credential/access question, not a design decision, and it's the one thing in this whole workflow
worth blocking on even under "work autonomously" instructions.

Also confirm up front, since the rest of the plan depends on them:
- Target application name and exact object prefix (e.g. `FTA`)
- The GitHub repo URL/path for `./figma-source`
- Whether the target Appian environment is a dedicated dev/demo environment (not shared with other
  live work) — this matters because of the "don't touch unrelated objects" constraint below

## Non-negotiable constraints (apply throughout, not just at setup)

- Native Appian patterns only — no embedded web app.
- Visual language comes from Aurora tokens/components, not from the Figma source's raw CSS — Figma
  governs structure and intent, Aurora governs rendering (see Phase 3).
- Every object created gets the confirmed prefix.
- Never modify objects or applications outside the target app's scope.
- Ask for explicit confirmation only for: destructive actions, actions requiring external
  credentials, or writes Appian itself gates behind confirmation. Everything else — reasonable
  design decisions, object structure, demo data content — proceed autonomously.
- Persist all data; every user-facing action in the demo journey must actually do something, not
  just navigate.

## Phase 1 — Inspection

1. Read `./figma-source` in full: component tree, routes/screens, state shape, mock data shapes,
   any brief/PRD file left alongside it (e.g. `docs/figma-make-brief.md` — read this first if
   present, it carries intent that the code alone won't).
2. Click through the live Figma Make prototype end-to-end and screenshot every page and state via
   browser automation — every screen, not a sample, and regardless of how complete the exported
   HTML/CSS already looks. Save under `./figma-source/screenshots/<screen-name>.png`, named to
   match the screen inventory you'll write in Phase 2. This is required every time — it's the
   visual ground truth Phase 3 interfaces get checked against.
3. Inspect the existing target Appian application for objects you can reuse (shared components,
   existing record types/rules that already fit) before creating new ones.
4. From all of the above, infer and write down (don't just hold in context — see Phase 2):
   - Data model / entities / relationships / statuses
   - Roles and the permission boundary between them
   - Full screen inventory and the flows connecting them (list/detail/form/empty/error states)
   - Where the design implies an external integration (CRM, e-sign, AI, payment, etc.)
   - Anything visually distinctive worth preserving deliberately (density, layout rhythm, component
     patterns) versus incidental React implementation detail that doesn't need to survive

## Phase 2 — Plan

Write plans to `./Plans` before building anything:
- `./Plans/data-model.md` — entities, fields, relationships, statuses, prefix-named object list
- `./Plans/object-inventory.md` — every record type, interface, process model, site page, rule,
  document, and report you intend to create, each with its intended FTA-prefixed name
- `./Plans/flows.md` — the end-to-end journeys implied by the source app (e.g. upload → analysis →
  review/edit → approval → export → AI assistant), including whatever external-system linking the
  source actually contains — don't assume a CRM (or any specific integration) exists unless the
  source shows one; infer the integration set from `./figma-source`, not from a template list.
  Include failure/exception paths, not just happy paths.
- `./Plans/open-questions.md` — anywhere the source design underspecifies something and you made a
  reasonable call; log the call and move on, don't block on it

Where the Figma source doesn't spell out a layout choice or component behavior, make the closest
reasonable Appian-native decision — repurposing existing SAIL components in combinations the source
didn't literally show is expected, not a deviation, as long as the result preserves the visual
hierarchy and intent.

## Phase 3 — Build

Work screen-by-screen / flow-by-flow, not all-at-once:

1. **Data layer first**: record types, relationships, statuses, validations, security.
2. **Process layer**: process models for anything stateful/multi-step (approvals, exception
   handling, notifications), with realistic assignments and audit history.
3. **Interface layer**: SAIL interfaces per screen, matching the source's structure, visual
   hierarchy, and responsive behavior — expressed through Aurora, not the Figma prototype's raw
   styling:
   - Layout, component choice, and content per screen come from `./figma-source` and its Phase 1
     screenshots.
   - Colors, type, spacing, chrome (headers/cards/grids/banners/tags/forms), and iconography come
     from Aurora's `colors_and_type.css` and `ui_kits/sail_site/` — map each Figma component to its
     closest Aurora equivalent rather than hand-rolling a look-alike.
   - If the Figma source implies a specific brand accent color, apply it the way Aurora expects:
     override `--accent`/`--nav-bar` in `:root` rather than introducing ad hoc colors elsewhere.
   - Labels, empty-state text, error messages, and other UI copy follow Aurora's content and voice
     guidance for tone consistency.
   - Reference the Phase 1 screenshots while building, not just the HTML — SAIL layout primitives
     don't map 1:1 to CSS, so the screenshot is ground truth for "does this look right," the HTML is
     ground truth for "what does this contain and in what order."
4. **Simulated integrations**: for anything the source app calls out to externally (and any real
   integration that isn't actually available in this environment), build a demo-safe simulation —
   deterministic-enough to be reliable in a live demo, but with realistic latency/failure states so
   it doesn't feel fake.
5. **Site**: assemble the full site structure so the app is navigable end-to-end, not just
   individually reachable pages.
6. **Supporting assets**:
   - Billboard/hero imagery: check Aurora's `assets/` for existing billboard imagery that already
     fits before generating anything new. When something new is genuinely needed, generate as SVG
     first, rasterize to PNG (check available tooling in the sandbox — e.g. a headless renderer or
     SVG-to-PNG library — before assuming one exists), and keep it visually consistent with Aurora's
     existing billboard style.
   - Demo documents (PDFs, generated reports) needed for the review/export/approval journey.

## Phase 4 — Demo data

Populate enough realistic fictional data that every page, KPI, filter, record view, and workflow is
demonstrable without looking sparse — including enough variety to show different statuses,
edge cases (empty states, overdue items, rejected items), and enough volume that list views and
filters are meaningfully testable.

## Phase 5 — Validate and test

1. Validate every object immediately after creating it — don't batch validation to the end.
2. Test every workflow end-to-end as a user would run it, not just check that objects exist.
3. Fix errors as found; keep iterating until the full demo journey runs clean start to finish.
4. Log test runs to `./Plans/test-reports/`.
5. Back up SAIL interface definitions to `./SAIL-Interfaces/` as you go, not just at the end.

## Phase 6 — Report

Produce a final build report under `./Plans/build-report.md`: what was built, what was simulated
vs. real, known limitations, and how to run the demo journey end-to-end.

## Reminders throughout

- Reuse existing suitable FTA objects before creating new ones.
- Stay inside the target application's scope — never touch unrelated apps/objects.
- Autonomy is the default; only stop for destructive actions, external credentials, or explicit
  platform confirmation prompts.


## Files
- `README.md` — full design system docs (content, visual, iconography).
- `colors_and_type.css` — tokens.
- `assets/` — Appian logos, favicons, billboard imagery.
- `preview/` — design-system preview cards.
- `ui_kits/sail_site/` — Mercury SAIL site React kit + working demo.
- `site_styles/` — reference screenshots of real SAIL site chrome.
