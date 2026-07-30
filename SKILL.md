---
name: figma-react-to-appian-sail
description: Translate a Figma Make export or React/HTML/CSS/Tailwind application into the closest technically achievable native Appian SAIL implementation. Use when Claude Code must inspect a frontend repository, decompose its exact visual system, map React components and interactions to SAIL, build Appian objects through Developer MCP, create a persistent end-to-end demo, or converge source and Appian screenshots across desktop, tablet, and mobile.
argument-hint: "[source-path] [target-Appian-application]"
---

# Figma/React to Appian SAIL

Recreate the supplied frontend as a native Appian application with maximum visual and functional fidelity. Treat the running source application as the visual and behavioral source of truth. Treat React, HTML, CSS, Tailwind, screenshots, and Figma assets as evidence—not deployable Appian code.

Interpret `$ARGUMENTS` as an optional source path followed by an optional target Appian application name or URL. Discover either value from the current project when omitted.

## Non-negotiable principles

1. Preserve source content, hierarchy, layout, density, states, interactions, and responsive behavior unless Appian makes a specific detail impossible.
2. Use Appian-native SAIL, records, rules, actions, processes, documents, groups, and Sites. Never embed or execute the source web application in Appian.
3. Prefer a composed SAIL implementation that resembles the source over a generic Appian pattern.
4. Use an Appian design system only where it reproduces the source accurately. It is a component toolbox, not the visual authority.
5. Make principal actions work and persist. Never present a disconnected demo control as functional.
6. Simulate unavailable external services honestly. Persist believable inputs and outputs and label them as simulated.
7. Measure visual fidelity by rendered screenshots, not by valid SAIL alone.
8. Do not modify unrelated Appian objects, applications, records, documents, or security.

## Inputs

Locate or request only inputs that cannot be discovered:

- source repository or local clone;
- target Appian site and application name, UUID/URL, and prefix;
- connected Appian Developer MCP server;
- installed Appian development skill and version-matched references;
- credentials or browser authentication only when the official flow requires them;
- explicit scope exceptions, such as production integration or destructive migration.

If the target application is not specified, remain read-only in Appian and produce the source inventory and target-independent plans.

## Required tool posture

Load the installed Appian development skill completely before Appian design or execution. Read every universal reference it marks as mandatory, including MCP tooling, confirmation behavior, SAIL components/functions, null safety, short-circuit behavior, and verification checkpoints.

Use:

- repository and shell tools for source inspection;
- the source app’s supported package manager and development server;
- a browser automation or screenshot tool to render source and Appian screens;
- Appian Developer MCP for Appian reads, writes, validation, tests, and object inspection.

If an expected Appian tool is unavailable, inspect the MCP tool surface rather than inventing a tool name.

Approve repeated read, validate, and narrowly scoped create calls only when the target is unambiguous. Require explicit confirmation before:

- deletion;
- overwriting a pre-existing object;
- broad or lockout-capable security changes;
- changes outside the target application;
- real external credentials or integrations;
- destructive data reset;
- continuing after suspected process-model corruption.

## Workspace and evidence

Use or create:

```text
Plans/<app-slug>/
├── 00-source-inventory.md
├── 01-visual-specification.md
├── 02-component-mapping.md
├── 03-responsive-mapping.md
├── 04-appian-object-plan.md
├── 05-test-plan.md
├── 06-build-log.md
├── visual-diffs/
├── 91-test-report.md
└── 99-build-report.md

SAIL-Interfaces/<PREFIX>/
screenshots/source/
screenshots/appian/
assets/demo-documents/
```

Do not create planning files before completing the relevant inspection. Record exact evidence paths, routes, selectors, component names, and Appian object identifiers.

## Phase 1 — Inspect without changing Appian

### Inspect the source

Run the application when feasible. Read, at minimum:

- package manifest and lockfile;
- router and application entry points;
- pages, layouts, shared components, dialogs, tabs, drawers, and navigation;
- JSX/TSX markup and component props;
- CSS, CSS modules, CSS variables, Tailwind config/classes, and theme files;
- assets, fonts, icons, images, and generated asset resolvers;
- mock data, stores, state transitions, validation, and fake APIs;
- viewport-dependent behavior and hidden/overflow behavior;
- empty, loading, success, validation, error, disabled, selected, hover, focus, and expanded states.

Distinguish:

- working behavior;
- static visual behavior;
- fake or timed behavior;
- dead controls;
- unused dependencies/components;
- inferred behavior not evidenced by the source.

Capture every material screen and state at the source application’s intended viewports. Default to:

- desktop: 1440 × 900;
- tablet: 1024 × 768;
- mobile: 390 × 844.

Use additional breakpoints when source CSS changes elsewhere.

### Inspect the target

Remain read-only. Inventory the target application’s objects, folders, data model, naming, design-system components, Sites, groups, and security. Identify reusable objects and conflicts. Never assume an empty target.

Write `00-source-inventory.md`. Include:

- routes and screen/state matrix;
- navigation graph;
- component inventory and reuse frequency;
- forms, fields, rules, and actions;
- data entities and relationships;
- workflows and status transitions;
- integrations and simulations;
- accessibility issues in the source;
- target-application conflicts and reuse candidates.

## Phase 2 — Produce an exact visual specification

Do not start SAIL implementation until this phase is complete.

For every screen, inspect the actual rendered DOM plus JSX and styles. Resolve utilities into explicit values. For example:

```text
max-w-7xl px-6 py-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4
```

Record as:

```text
max content width: 1280 px
horizontal/vertical padding: 24 px
columns: 1 below 768; 2 at 768–1023; 3 at 1024+
gap: 16 px
```

Write `01-visual-specification.md` with:

- viewport and content widths;
- header/navigation dimensions;
- page and section spacing;
- grids, columns, alignment, wrapping, and ordering;
- component dimensions, padding, borders, radii, and shadows;
- background, text, border, semantic, and interaction colors;
- font family, size, weight, line height, case, and truncation;
- icons, sizes, stroke style, and placement;
- buttons, inputs, tables, cards, dialogs, badges, and tabs;
- all visible states;
- source screenshots and the exact route/state used.

Extract reusable tokens into a table. Preserve semantic roles even when Appian requires the nearest supported literal value.

## Phase 3 — Map React and Tailwind to SAIL

Write `02-component-mapping.md`. Create one row per source component or repeated inline pattern:

| Source component | Source evidence | SAIL composition | State/data contract | Responsive behavior | Fidelity risk |
|---|---|---|---|---|---|

Use these mapping heuristics:

- CSS grid → nested `a!columnsLayout()`/`a!columnLayout()` or a responsive card/list composition.
- Flex row/column → columns, side-by-side layouts, card contents, or ordered component arrays.
- Card → `a!cardLayout()` with measured padding, border, radius, background, and contents.
- Status pill → supported tag component when sufficiently faithful; otherwise compose icon and styled text/card primitives.
- HTML table → `a!gridField()` backed by records or queries; provide a mobile card alternative when necessary.
- Modal/drawer → record action, related action, task form, or dialog-capable Appian pattern.
- Route detail → record summary/view or Site page with record context.
- Tabs → record views or stateful SAIL tab controls, preserving order and active styling.
- Browser file upload → `a!fileUploadField()` plus persisted Document metadata.
- Local state mutation → record writes, process variables, or local UI state according to required persistence.
- Toast → Appian confirmation, validation, banner, or process completion message.
- Client filtering/sorting → record query, user filter, or server-backed grid behavior.
- Browser export → Appian-generated document from saved data.
- Hover-only action → visible accessible action link/button.

Do not mechanically force one source component into one SAIL component. Compose multiple primitives when that is more faithful.

For each mismatch:

1. name the Appian limitation;
2. preserve, in order: information hierarchy, placement, density, typography, color/decoration, interaction detail;
3. document the intended approximation;
4. do not silently substitute a generic template.

Write `03-responsive-mapping.md` with a breakpoint-by-breakpoint transformation for every page and shared component. Preserve content order, column transitions, action availability, and readable data presentation. Avoid relying on horizontal scroll as the only mobile solution.

## Phase 4 — Design the native Appian application

Infer the smallest coherent Appian architecture that supports the complete source journey:

- record types, fields, keys, relationships, reference data, calculated fields, and sync;
- interfaces, reusable visual components, expression rules, constants, and folders;
- record lists, views, actions, related actions, and Sites;
- groups, roles, object security, and record security;
- process models, tasks, statuses, notifications, exception paths, and activity/audit history;
- document storage and generation;
- external integrations or clearly labeled simulations;
- realistic fictional seed data and demo documents;
- reset/reseed support when the user requests an end-to-end demo.

Never copy mock-array defects into the data model. Resolve missing foreign keys, string-formatted numeric fields, inconsistent status vocabularies, and unreachable transitions.

Write `04-appian-object-plan.md`. For each object specify:

- exact prefixed name and type;
- source requirement/screen;
- dependencies and creation order;
- security;
- MVP/demo/deferred status;
- MCP reliability and manual configuration;
- validation and test method.

Write `05-test-plan.md` covering visual, functional, data, workflow, security, responsive, accessibility, simulation, failure, refresh/persistence, and end-to-end cases.

## Phase 5 — Build in dependency order

Unless the user requested planning only, proceed after plans are coherent and the target is safe.

Build in this order:

1. folders, groups, constants, document folders, and safe security foundations;
2. reference data and record types;
3. fields, relationships, views, filters, and actions;
4. seed records and fictional documents;
5. reusable visual SAIL components;
6. application shell and navigation;
7. screens in journey order;
8. persistent actions and metric rules;
9. process models and tasks;
10. simulated or real integrations as authorized;
11. export/document generation;
12. Site configuration;
13. reset/reseed administration when in scope.

After every object:

- add it to the target application if required;
- retrieve it and verify identity/configuration;
- validate expressions and design objects;
- run the narrowest relevant test;
- save SAIL source locally;
- update `06-build-log.md`;
- stop on corruption, cross-application impact, or an unresolved validation error.

Use null-safe expressions and explicit short-circuit patterns required by the Appian skill. Do not create large process models in one blind operation. Build and verify one bounded process path or node group at a time.

## Phase 6 — Functional demo fidelity

For a demo build:

- generate realistic fictional data sufficient to populate every view, KPI, state, filter, and workflow;
- create fictional documents with a visible demonstration disclaimer;
- persist every principal user action;
- replace unavailable APIs/AI with deterministic simulations driven by current record data and selected scenarios;
- include success, pending, empty, validation, and recoverable failure scenarios;
- ensure refresh does not erase completed actions;
- never claim a simulation is a live integration or genuine AI inference.

Every visible principal control must either work, be visibly disabled with an explanation, or be removed when the source control was dead and the user did not ask to preserve it.

## Phase 7 — Screenshot convergence

Perform this loop screen by screen:

1. set identical source and Appian viewport dimensions;
2. navigate both to equivalent data and UI state;
3. capture full-page and detail screenshots;
4. compare hierarchy, geometry, spacing, typography, colors, borders, icons, wrapping, content density, and responsive behavior;
5. record discrepancies in `visual-diffs/<screen>-diff.md`;
6. classify each discrepancy as critical, high, medium, low, or unavoidable;
7. fix critical/high discrepancies first, then medium discrepancies;
8. re-render and repeat until convergence.

Apply these targets where SAIL permits:

- content/actions and section order: 100%;
- principal grid, alignment, and stacking: exact;
- spacing/dimension deviation: within 8 px for major geometry and 4 px for repeated components;
- typography: preserve hierarchy, weight, case, and wrapping;
- colors: nearest supported value with consistent semantic use;
- responsive state changes: same breakpoint intent and content order;
- no critical or high visual discrepancy at completion.

Do not falsify precision when Site chrome, browser rendering, or SAIL constraints make a measurement uncontrollable. Document unavoidable deviations.

## Phase 8 — Validate the end-to-end journey

Execute the complete user journey from Site entry through final outcome. Verify:

- navigation and access;
- saved records and relationships;
- KPIs based on actual saved data;
- creation/upload;
- process transitions and tasks;
- edits and approvals;
- activity/audit history;
- exports using current saved data;
- simulated integrations;
- empty, loading, success, and failure states;
- persistence after refresh;
- desktop, tablet, and mobile rendering;
- absence of SAIL validation errors and broken Site pages.

Write `91-test-report.md` with expected/actual results, evidence, affected objects, and remediation. Fix blocking and functional failures, then repeat affected tests.

Write `99-build-report.md` with:

- objects created, reused, and changed;
- implemented, simulated, deferred, and manual functionality;
- visual fidelity status and unavoidable deviations;
- tests passed/failed;
- security and configuration notes;
- reproducible demo steps;
- remaining risks.

## Completion criteria

Do not declare completion merely because objects were created or interfaces render. Completion requires:

- a navigable Appian Site or explicitly scoped equivalent;
- working, persistent principal journeys;
- valid and tested SAIL/design objects;
- representative demo data when requested;
- screenshot comparison at all required viewports;
- no unresolved critical/high visual discrepancy;
- documented limitations and simulations;
- no unrelated Appian changes.
