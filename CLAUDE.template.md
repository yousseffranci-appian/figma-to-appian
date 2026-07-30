# Figma-to-Appian project instructions

## Project goal
Rebuild the complete application under `./figma-source` as a native, fully working Appian demonstration.

## Target
- Application name: `[APPLICATION NAME]`
- Required object prefix: `[PREFIX]`
- Appian environment: `[APPIAN ENVIRONMENT]`
- Appian version: `[VERSION]`
- Figma repository: `[GITHUB REPOSITORY]`

## Sources of truth
- `./figma-source` controls product content, flow, pages, behavior, and interactions.
- `./screenshots/source` controls visual comparison.
- The installed Appian skill controls Appian object-creation rules.
- The installed Figma-to-Appian skill controls visual translation and verification.
- `./figma-source/assets-source` contains approved brand and visual assets when present.

## Non-negotiable rules
- Build with native Appian objects. Never embed the React application, HTML pages, or an iframe.
- Create every new object inside the target application and prefix it with `[PREFIX]`.
- Inspect before creating and reuse suitable target-application objects.
- Do not modify unrelated applications or objects.
- Persist business information and make visible principal actions functional.
- Implement empty, loading, success, validation, and failure states.
- Use process models for stateful or multi-step workflows.
- Simulate unavailable integrations deterministically and label them honestly.
- Validate every Appian object immediately after creating or updating it.
- Test every workflow end to end.
- Back up SAIL interfaces under `./SAIL-Interfaces`.
- Save analysis, plans, logs, and tests under `./Plans`.
- Preserve source images; process final raster assets as PNG before Appian import.
- Keep important text in SAIL, not baked into images.
- Never fabricate an Appian UUID.
- Never delete an Appian object without dependency analysis and explicit approval.

## Working behavior
Work in phases:

1. Inspect.
2. Plan.
3. Present the proposed object list.
4. Implement in dependency order.
5. Validate each object.
6. Test the completed slice.
7. Record the result.
8. Continue.

Only request approval for destructive actions, external credentials, confirmation-gated Appian operations, or changes outside the target application.
