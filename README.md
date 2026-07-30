# Figma to Appian Field Guide

An interactive, beginner-friendly guide for translating a Figma Make/React application into a high-fidelity native Appian SAIL application with Claude Code and Appian Developer MCP.

## Included

- Ten-stage workflow from discovery through final testing, with saved progress
- A saved macOS, Windows, and Linux selector with platform-specific commands
- Claude Code prompts embedded directly into the stage where each is used
- Subscription prerequisites and direct sign-up/approval links
- Troubleshooting guide
- Downloadable translation skill and direct access to the shared Gemini Gem
- Direct link to the shared Figma Make Brief Generator Gem and a downloadable `CLAUDE.md` project template
- Copyable installer that installs or updates both required Claude Code skills directly from GitHub
- Official resources and GitHub Pages automation

## Run locally

No build step is required.

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Publish with GitHub Pages

1. Push the files to `main`.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions**.
4. Confirm the **Deploy GitHub Pages** workflow succeeds.
5. Visit `https://yousseffranci-appian.github.io/figma-to-appian/`.

Every later push to `main` republishes automatically.

## Notes

Progress is stored locally in the visitor’s browser. The site has no analytics, backend, or credential collection.
