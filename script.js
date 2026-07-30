const stages=[
["Discover and brief the journey","Turn real discovery evidence into a consistent, high-impact Figma Make brief before opening design tools.",["Collect discovery notes, client material, and full transcripts","Use the Figma Make Brief Generator Gem","Confirm every persona and business journey","Define the exception path and honest simulations","Reuse the same fictional names, IDs, values, and statuses"],`# Give the Figma Make Brief Generator Gem:\n- discovery transcripts\n- client/prospect materials\n- brand and visual references\n\n# Review the output before moving to Figma Make.`],
["Install your tools","Prepare a fresh Mac with the command-line tools the workflow needs.",["Install Homebrew if needed","Install Git, Node.js, Python 3.12, uv, and GitHub CLI","Install Claude Code and sign in","Run the health check"],`# 1. Check whether Homebrew is already installed\nbrew --version\n\n# 2. Only if Terminal says \"command not found\", install Homebrew\n/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"\n\n# 3. Run every command shown under Homebrew's \"Next steps\", then verify\nbrew --version\n\n# 4. Install the required development tools\nbrew install git node python@3.12 gh\n\n# 5. Install uv\ncurl -LsSf https://astral.sh/uv/install.sh | sh\n\n# 6. Close Terminal completely, reopen it, then verify every tool\ngit --version\nnode --version\nnpm --version\npython3 --version\nuv --version\ngh --version\n\n# 7. Install Claude Code (do not use sudo)\nnpm install -g @anthropic-ai/claude-code\n\n# 8. Verify and diagnose Claude Code\nclaude --version\nclaude doctor\n\n# 9. Start Claude Code and complete browser authentication\nclaude\n\n# 10. When authentication is complete, leave Claude Code with\n/exit`],
["Install both skills","Run this block once. It installs or updates both skills automatically—there is no manual file copying.",["Run the complete installer block","Confirm appian-dev contains SKILL.md and references","Confirm figma-react-to-appian-sail contains SKILL.md","Restart Claude Code so it discovers the skills"],`mkdir -p "$HOME/.claude/skills"\n\nif [ -d "$HOME/.claude/skills/appian/.git" ]; then\n  git -C "$HOME/.claude/skills/appian" pull --ff-only\nelse\n  git clone https://github.com/appian/dev-mcp-skills.git "$HOME/.claude/skills/appian"\nfi\n\nif [ ! -e "$HOME/.claude/skills/appian-dev" ]; then\n  ln -s "$HOME/.claude/skills/appian/skills/appian" "$HOME/.claude/skills/appian-dev"\nfi\n\nmkdir -p "$HOME/.claude/skills/figma-react-to-appian-sail"\ncurl -fL "https://raw.githubusercontent.com/yousseffranci-appian/figma-to-appian/main/SKILL.md" \\\n  -o "$HOME/.claude/skills/figma-react-to-appian-sail/SKILL.md"\n\nls "$HOME/.claude/skills/appian-dev"\nls "$HOME/.claude/skills/figma-react-to-appian-sail"`],
["Prepare Appian","Use a sandbox and confirm Developer MCP and Designer access.",["Confirm your Appian version","Enable Developer MCP","Confirm object-creation permission","Create or identify the target application and prefix"],`Application: <APP NAME>\nPrefix: <PREFIX>\nDesigner URL: <APP URL>\nSite: https://<SITE>.appiancloud.com`],
["Create the workspace","Keep source, evidence, plans, project instructions, MCP configuration, and SAIL backups together.",["Create the parent folder","Create Plans, SAIL, screenshot, and asset folders","Initialize Git","Clone the Figma Make repository","Download and customize CLAUDE.template.md as CLAUDE.md"],`# Replace these two values before running anything\nPROJECT_NAME="my-appian-demo"\nGITHUB_REPOSITORY="OWNER/FIGMA-MAKE-REPOSITORY"\n\n# 1. Authenticate GitHub CLI\n# Choose: GitHub.com → HTTPS → Yes → Login with a web browser\ngh auth login\ngh auth status\n\n# 2. Create and enter the parent project folder\nmkdir -p "$HOME/Documents/appian-claude-projects/$PROJECT_NAME"\ncd "$HOME/Documents/appian-claude-projects/$PROJECT_NAME"\n\n# 3. Initialize the local project and evidence folders\ngit init\nmkdir -p Plans SAIL-Interfaces screenshots/source screenshots/appian assets/demo-documents\n\n# 4. Clone the Figma Make repository into the required folder name\ngh repo clone "$GITHUB_REPOSITORY" figma-source\n\n# 5. Confirm the source exists\ngit -C figma-source status\nls -la figma-source\n\n# 6. Download the project-instructions template\ncurl -fL "https://raw.githubusercontent.com/yousseffranci-appian/figma-to-appian/main/CLAUDE.template.md" \\\n  -o CLAUDE.md\n\n# 7. Open CLAUDE.md and replace every [BRACKETED VALUE]\nopen -a TextEdit CLAUDE.md\n\n# 8. Confirm you are still in the parent workspace\npwd\nls -la`],
["Connect Appian MCP","Launch Claude from the parent folder, configure the project server, restart, and approve it.",["Start Claude from the parent folder","Load /appian-dev","Configure project-level MCP","Restart and approve appian","Verify /mcp and listApplications"],`# 1. Replace the project name, then enter the PARENT workspace\ncd "$HOME/Documents/appian-claude-projects/<PROJECT_NAME>"\n\n# 2. Start Claude Code from this folder\nclaude\n\n# 3. Inside Claude Code, load the Appian skill\n/appian-dev\n\n# 4. Paste this setup request, replacing the URL\nConfigure the Appian Developer MCP server for this project.\n\nAppian environment:\nhttps://<YOUR-SITE>.appiancloud.com\n\nDo not create, update, or delete any Appian objects.\nInspect the installed Appian skill, follow its official version-matched setup\ninstructions, create the project-level .mcp.json, tell me when official browser\nauthentication is required, and finish with a read-only listApplications test.\n\n# 5. When Claude says approval is pending, exit\n/exit\n\n# 6. In normal Terminal, verify the configuration exists\npwd\nls -la .mcp.json\n\n# 7. Restart from the SAME folder and approve only the appian server\nclaude\n\n# 8. Inside Claude Code, confirm the connection\n/mcp\n/appian-dev\n\n# 9. Paste this final read-only test\nRemain strictly read-only. Call listApplications, confirm the target application\nis visible, and do not call any create, update, add, insert, upload, or delete tool.`],
["Run and inspect the source","The rendered Figma Make app is the visual and behavioral authority.",["Install source dependencies","Run the React development server","Check every page and state","Create Plans/source-readiness-report.md","Capture important pages and states","Invoke the translation skill","Complete Phase 1 read-only"],`# TERMINAL WINDOW 1 — run the Figma source\ncd "$HOME/Documents/appian-claude-projects/<PROJECT_NAME>/figma-source"\n\n# Check package.json and the lockfile before choosing the package manager\nls -la\n\n# For package-lock.json, run\nnpm install\nnpm run build\nnpm run dev\n\n# Keep this window running. Open the Local URL shown by Vite,\n# commonly http://localhost:5173\n\n# TERMINAL WINDOW 2 — start Claude from the PARENT workspace\ncd "$HOME/Documents/appian-claude-projects/<PROJECT_NAME>"\nclaude\n\n# Inside Claude Code\n/appian-dev\n/figma-react-to-appian-sail ./figma-source\n\n# Paste the complete Source audit prompt from the Prompt library below.\n# Keep Appian read-only until the inventory and plans are approved.`],
["Plan the translation","Turn JSX, Tailwind, CSS, routes, and states into measurable SAIL mappings.",["Approve the source inventory","Create the visual specification","Create component and responsive mappings","Create the Appian object plan","Create the test plan"],`Proceed with planning only.\nCreate the inventory, visual specification, mappings,\nobject plan, and test plan. Do not build yet.`],
["Build in dependency order","Create native objects, persistence, honest simulations, and a complete Appian Site.",["Create foundations and records","Seed fictional data and documents","Build shared components and screens","Add workflows, actions, and exports","Create the Site","Validate and log every object"],`The plans are approved. Proceed with the complete build.\nWork only in <APP NAME> using <PREFIX>.\nPersist principal actions and validate every object.`],
["Converge, test, and hand off","A valid interface is not done until visual and end-to-end testing passes.",["Compare at 1440×900","Compare at 1024×768 and 390×844","Fix critical/high visual differences","Run the full user journey","Verify persistence and recovery","Produce final reports"],`Execute screenshot convergence for every material screen.\nRun the complete journey, fix blocking and high-impact defects,\nand write the final test and build reports.`]
];
const stageDetails=[
[
["Gather the evidence","Collect the full discovery transcript, notes, supplied documents, brand files, existing screenshots, integration facts, and the exact story you want to demonstrate. Do not start designing from memory or from a short summary."],
["Generate the brief","Open the shared Figma Make Brief Generator Gem below. Upload or paste the discovery evidence, ask it to identify missing information, then generate the structured brief."],
["Quality-check the result","Confirm every persona has a purpose; screens follow the real business journey; every visible action has a destination; the exception path is included; and unavailable integrations are explicitly simulated."],
["Build and inspect in Figma Make","Create a new Make file, paste the approved brief, add brand assets and visual references, and generate the prototype. Walk through every screen, form, dialog, tab, responsive state, and failure path; refine anything you would not want reproduced."],
["Publish from Figma Make","Use Make settings → GitHub → Connect GitHub. On the first push choose Create Repository. Remember: Figma Make creates its own repository, pushes only to the default branch, and synchronization is one-way—later Make pushes can overwrite GitHub edits."]
],
[
["Check Homebrew","Run <code>brew --version</code>. If it returns a version, continue. Otherwise install Homebrew from its official installer and run any “Next steps” commands it prints."],
["Install the toolchain","Install Git, Node.js, Python 3.12, GitHub CLI, and <code>uv</code> using the command block below. Close and reopen Terminal after installing <code>uv</code>."],
["Verify every command","Run <code>git --version</code>, <code>node --version</code>, <code>npm --version</code>, <code>python3 --version</code>, <code>uv --version</code>, and <code>gh --version</code>. Do not continue until each returns a version."],
["Install and authenticate Claude Code","Install Claude Code without <code>sudo</code>, run <code>claude doctor</code>, then run <code>claude</code>. Complete browser authentication and use <code>/exit</code> to return to Terminal."]
],
[
["Run the complete installer","Copy the entire command block below into Terminal. It safely updates the Appian repository when already installed and downloads the current visual-translation skill directly from this GitHub repository."],
["Verify Appian skill discovery","Confirm <code>~/.claude/skills/appian-dev</code> contains <code>SKILL.md</code> and <code>references</code>. If the symbolic link already existed, that is fine."],
["Verify the translation skill","Confirm <code>~/.claude/skills/figma-react-to-appian-sail/SKILL.md</code> exists. Open the first lines if needed and confirm its name is <code>figma-react-to-appian-sail</code>."],
["Align the Appian version","Find the version of the target Appian environment under About Appian. Update the Appian skill’s configured version when its instructions require it, then restart Claude Code."]
],
[
["Confirm licensing and access","Use a development or sandbox site. Confirm you have Appian Designer access, permission to create design objects, and a Claude plan that supports Claude Code."],
["Enable Developer MCP","Ask an Appian administrator to install or enable the Developer MCP capability/plugin and ensure your account can authenticate. Do not test against production."],
["Choose the target","Create or identify the target Appian application. Record its exact application name, short object prefix, Designer URL, environment URL, and Appian version."],
["Protect existing content","Decide whether the target is empty or contains reusable objects. Claude must inspect it read-only before building and must never overwrite or delete pre-existing objects without explicit approval."]
],
[
["Authenticate GitHub CLI","Run <code>gh auth login</code>, choose GitHub.com, HTTPS, browser login, and the account with access to the Figma Make repository. Verify with <code>gh auth status</code>."],
["Create the parent workspace","Create one folder for the whole conversion project—not inside the Figma source. Initialize Git and create Plans, SAIL backups, source/Appian screenshots, and demo-document folders."],
["Clone as figma-source","Clone the Figma Make repository into a child folder named exactly <code>figma-source</code>. Confirm it contains <code>package.json</code>, <code>src</code>, and the generated configuration files."],
["Create persistent instructions","Download <code>CLAUDE.template.md</code>, save it as <code>CLAUDE.md</code> in the parent workspace, and replace every bracketed placeholder. These rules persist across Claude Code sessions."],
["Keep the workspace safe","Store <code>.mcp.json</code>, Plans, SAIL backups, screenshots, and assets in the parent. Start Claude Code from the parent—not from <code>figma-source</code>."]
],
[
["Start in the correct folder","From the parent workspace run <code>claude</code>, then invoke <code>/appian-dev</code>. Tell Claude the target Appian environment and ask it to configure project-level Developer MCP without writing Appian objects."],
["Complete official authentication","Follow only the official browser/OAuth or organization-approved authentication flow. Never store Appian passwords, tokens, or secrets in <code>CLAUDE.md</code> or <code>.mcp.json</code>."],
["Approve the project server","When the server reports Pending approval, exit Claude Code, verify <code>.mcp.json</code> exists, restart Claude from the same parent folder, and approve only the <code>appian</code> server."],
["Prove read-only access","Run <code>/mcp</code> and confirm Appian is Connected. Ask Claude to call <code>listApplications</code> only and verify the target application appears before authorizing any writes."]
],
[
["Prove the source is runnable","Inside <code>figma-source</code>, install dependencies using the lockfile’s package manager, run the development server, and run the production build. Record missing environment variables, assets, and build failures."],
["Create the readiness report","Ask Claude to inspect the framework, build tool, routes, launch commands, environment variables, image references, and build result. Save the evidence to <code>Plans/source-readiness-report.md</code>."],
["Walk the entire experience","Keep the source server running. Use browser automation to visit every route and activate dialogs, tabs, forms, validation, empty, loading, success, error, disabled, hover, focus, and mobile states."],
["Capture the visual baseline","Save material source screenshots at 1440×900, 1024×768, and 390×844 under <code>screenshots/source</code>. Add additional widths wherever the source CSS changes."],
["Inspect Appian read-only","Inventory the target application’s folders, records, interfaces, rules, processes, Sites, groups, and security. Identify reusable objects, naming conflicts, and content that must not be touched."]
],
[
["Create the source inventory","Document every route, screen, state, component, form, field, user action, role, status, workflow, integration, asset, and inferred data relationship. Distinguish working behavior from fake timers and dead controls."],
["Measure the visual system","Resolve Tailwind and CSS into explicit widths, padding, gaps, breakpoints, colors, typography, radii, shadows, icons, and table geometry. Vague phrases such as “responsive cards” are not enough."],
["Map React to SAIL","For every source component or repeated pattern, specify the native SAIL composition, state/data contract, responsive transformation, Appian limitation, and intended approximation."],
["Design the Appian architecture","Plan records, keys, relationships, interfaces, rules, actions, process models, documents, groups, security, simulated integrations, Site pages, seed data, reset support, creation order, and validation method."],
["Review before writes","Check object prefixes, dependencies, security, page coverage, persistence, failure paths, visual risks, and the end-to-end test journey. Correct the plans before authorizing implementation."]
],
[
["Build foundations first","Create folders, groups, constants, document folders, reference data, and safe security foundations. Confirm the current user remains in the administrator group before restricting access."],
["Build the data model","Create record types in dependency order with real primary keys, foreign keys, relationships, numeric types, consistent status vocabularies, record views, filters, and actions. Do not copy defects from mock arrays."],
["Seed a complete demo","Create consistent fictional people, organizations, IDs, amounts, dates, documents, statuses, history, exceptions, and enough records to populate every KPI, filter, page, workflow, and failure state."],
["Build reusable SAIL first","Create shared page headers, KPI tiles, cards, badges, filters, form patterns, empty/error/loading states, and responsive layouts before individual pages. Back up every SAIL definition locally."],
["Add behavior in bounded slices","Implement pages, record actions, writes, calculations, processes, tasks, notifications, exports, and deterministic simulations one journey slice at a time. Every principal control must work, be visibly disabled with a reason, or be removed."],
["Validate continuously","After every object: add it to the application, retrieve it, verify identity and configuration, validate it, run the narrowest useful test, update the build log, and stop on corruption or unexplained cross-application impact."]
],
[
["Capture matching screenshots","For every material screen, render the source and Appian versions at identical desktop, tablet, and mobile viewports. Name evidence consistently so each pair is obvious."],
["Write visual-difference reports","Compare overall geometry, section order, dimensions, spacing, typography, colors, borders, icons, wrapping, density, actions, and responsive transformations. Assign severity to each mismatch."],
["Correct and repeat","Fix every critical and high visual discrepancy, recapture Appian, and compare again. A SAIL interface is not complete merely because it validates."],
["Run the real user journey","Open the Appian Site and test access, navigation, seeded data, KPIs, creation, upload, relationships, processes, tasks, approvals, edits, audit history, simulations, exports, refresh persistence, and recovery."],
["Finish the evidence trail","Record actual results and evidence in the test report. Fix blocking and functional failures, retest affected paths, then produce the final build report with created/reused objects, simulations, limitations, and manual follow-up."]
]
];
const prompts={
setup:`/appian-dev

Configure the Appian Developer MCP server for this project.

Appian environment:
https://<YOUR-SITE>.appiancloud.com

Appian version:
<VERSION>

Do not create, update, or delete Appian objects.

1. Confirm the current folder is the parent project workspace.
2. Read CLAUDE.md and the installed Appian skill.
3. Follow the official version-matched Developer MCP setup instructions.
4. Verify Git, Python, uv, Node.js, and Claude Code.
5. Create the project-level .mcp.json.
6. Tell me exactly when official browser authentication is required.
7. Do not request or store my normal Appian password.
8. Finish with a read-only listApplications call.
9. Confirm the target application is visible.
10. Report the connected site, authenticated user when available, and loaded tools.`,
inspect:`Use the installed Figma-to-Appian translation skill and /appian-dev.

This is an inspection-and-planning phase only.
Do not create, update, or delete any Appian object.

TARGET
- Application: <APPLICATION NAME>
- Prefix: <PREFIX>
- Appian environment: https://<SITE>.appiancloud.com
- Appian version: <VERSION>
- Figma source: ./figma-source
- Repository: https://github.com/<OWNER>/<REPOSITORY>
- Running source: http://localhost:5173

1. Read CLAUDE.md completely.
2. Load both skills and all mandatory Appian references.
3. Inspect every README, package file, lockfile, route, page, layout, component,
   data file, mock service, style file, and asset reference.
4. Run the correct install, build, lint, typecheck, test, and development commands.
5. Launch the source and walk the complete journey with browser automation.
6. Capture every material page/state at 1440x900, 1024x768, and 390x844.
7. Inspect the target Appian application using read-only MCP calls.
8. Identify reusable objects, naming conflicts, and objects that must not be touched.
9. Infer data, roles, statuses, workflows, integrations, security, assets, and simulations.

Create:
- Plans/source-readiness-report.md
- Plans/repository-analysis.md
- Plans/screen-inventory.md
- Plans/data-model.md
- Plans/object-inventory.md
- Plans/flows.md
- Plans/security-model.md
- Plans/integration-plan.md
- Plans/asset-plan.md
- Plans/demo-data-plan.md
- Plans/open-questions.md
- Plans/implementation-sequence.md

For every screen record its route, screenshots, purpose, roles, displayed data,
actions, destinations, all UI states, responsive behavior, expected Appian
interface/view/action, and related process.

For every object record its exact prefixed name, type, purpose, dependencies,
new/reused status, source requirement, security, build phase, validation method,
MCP/manual work, and test journey.

Do not implement. Finish with numbered screen/object inventories, build order,
blockers, assumptions, and open questions.`,
plan:`The source inventory is approved. Remain read-only in Appian.

1. Resolve JSX, DOM, CSS variables, Tailwind utilities, and component props into
   exact widths, heights, padding, gaps, breakpoints, typography, colors, borders,
   radii, shadows, icons, tables, and visible states.
2. Map every source component/repeated pattern to a native SAIL composition,
   state/data contract, responsive transformation, limitation, and fidelity risk.
3. Plan records, keys, relationships, reference data, calculated fields,
   interfaces, rules, actions, processes, documents, groups, security,
   integrations/simulations, Site pages, seed data, reset support, and audit history.
4. Give every object an exact prefixed name, dependency order, validation method,
   test method, and manual-configuration note.
5. Create functional, visual, responsive, accessibility, persistence, security,
   workflow, simulation, failure, and end-to-end tests.

Create:
- Plans/01-visual-specification.md
- Plans/02-component-mapping.md
- Plans/03-responsive-mapping.md
- Plans/04-appian-object-plan.md
- Plans/05-test-plan.md

Stop after presenting the plans, risks, assumptions, and unresolved decisions.`,
build:`/appian-dev

Use ./figma-source as the product, behavior, content, and visual source of truth.

TARGET
- Application: <APPLICATION NAME>
- Prefix: <PREFIX>
- Environment: https://<SITE>.appiancloud.com
- Version: <VERSION>

Build the complete native Appian demo in the approved dependency order.

- Never embed React, HTML, or an iframe.
- Keep every new object in the target application with the required prefix.
- Reuse only verified target objects; do not touch unrelated content.
- Use real records and persist every principal action.
- Correct mock defects: missing keys, formatted numeric strings, inconsistent
  statuses, disconnected data, and unreachable transitions.
- Create consistent fictional data/documents for every page, KPI, filter,
  workflow, exception, and empty/failure state.
- Build reusable SAIL components before page interfaces.
- Add bounded processes, tasks, assignments, notifications, audit history,
  recovery, exports, and honest deterministic simulations.
- Create the complete Appian Site.
- Back up SAIL under SAIL-Interfaces/<PREFIX>.
- Maintain Plans/06-build-log.md.

After every object: add it to the application, retrieve and verify it, validate
it, run the narrowest test, save evidence, and update the build log.

Stop for deletion, overwrite, broad security changes, real credentials,
destructive reset, cross-application impact, corruption, or unresolved validation.
Otherwise continue until the demo is ready.`,
test:`Run the full journey from the Appian Site as a real user.

Verify access, roles, navigation, records, relationships, KPIs, search, filters,
sorting, creation, edits, uploads, downloads, processes, tasks, approvals,
assignments, notifications, audit history, simulations, exports, refresh
persistence, security, and every empty/loading/validation/success/failure state.

For every material screen capture source and Appian at:
- 1440 x 900
- 1024 x 768
- 390 x 844

Compare geometry, order, dimensions, spacing, typography, colors, borders,
shadows, icons, wrapping, density, actions, and responsive behavior.

Write visual differences under Plans/visual-diffs.
Fix every blocking, functional, critical, and high visual defect.
Recapture and retest.

Write:
- Plans/91-test-report.md
- Plans/99-build-report.md

The final report must list created/reused/updated objects, completed behavior,
simulations, deferred items, passed/failed tests, limitations, manual setup,
and next steps.`
};
const faqs=[["Can Figma Make push to an existing repository?","No. Figma Make creates and owns the repository connected to that Make file. Each Make file has its own repository."],["Is the Figma Make GitHub connection two-way?","No. It is a one-way push from Figma Make to the repository’s default branch. GitHub edits do not return to Make and may be overwritten by the next Make push."],["GitHub rejects my password","Run gh auth login, choose GitHub.com, HTTPS, and browser authentication. Then clone with gh repo clone."],["Appian MCP says Pending approval","Exit Claude, confirm .mcp.json is in the parent workspace, relaunch from that exact folder, approve appian, and check /mcp."],["Appian tools are missing","Load /appian-dev, check /mcp, and restart after approval. Ask Claude to inspect the tool surface rather than guessing names."],["The React app will not start","Read package.json and use the package manager matching its lockfile. Usually npm install and npm run dev."],["The Appian UI looks generic","Return to the measured visual plan. Require same-viewport screenshots and composed SAIL primitives instead of generic substitutions."],["A process model appears broken","Stop broad edits. Inspect dependencies, change one bounded path, validate immediately, and do not continue after suspected corruption."],["Should I approve “don’t ask again”?","Use it for narrow repeated reads/validation. Keep one-time approval for deletes, security, resets, overwrites, credentials, and cross-app changes."]];
const stageEl=document.querySelector("#stages"),nav=document.querySelector("#stageNav");stages.forEach((s,i)=>{let id=`stage-${i}`,details=stageDetails[i].map((x,j)=>`<div class="instruction"><span>${j+1}</span><div><h4>${x[0]}</h4><p>${x[1]}</p></div></div>`).join(""),action=i===0?`<a class="gem-action" href="https://gemini.google.com/gem/16fDdWJ4XNR4hAhKOK5X4A7Fa_QyXvX5q?usp=sharing" target="_blank" rel="noreferrer"><span>✦</span><div><small>SHARED GEMINI GEM</small><strong>Open the Figma Make Brief Generator</strong><p>Launch the ready-made Gem, add your discovery materials, and generate the brief.</p></div><b>Open Gem ↗</b></a>`:`<div class="code"><button class="copy">Copy</button><pre>${s[3]}</pre></div>`;nav.insertAdjacentHTML("beforeend",`<button data-id="${id}">${String(i+1).padStart(2,"0")} · ${s[0]}</button>`);stageEl.insertAdjacentHTML("beforeend",`<article class="stage-card" id="${id}"><small>STAGE ${String(i+1).padStart(2,"0")}</small><h3>${s[0]}</h3><p class="stage-intro">${s[1]}</p><div class="instructions">${details}</div><h4 class="completion-title">Completion checklist</h4><div class="checklist">${s[2].map((x,j)=>`<label class="check"><input type="checkbox" data-key="${i}-${j}"><span>${x}</span></label>`).join("")}</div>${action}</article>`)});let saved=JSON.parse(localStorage.getItem("fta-progress")||"{}");document.querySelectorAll(".check input").forEach(x=>{x.checked=!!saved[x.dataset.key];x.onchange=progress});function progress(){let a=[...document.querySelectorAll(".check input")],d=a.filter(x=>x.checked).length;document.querySelector("#progressValue").textContent=Math.round(d/a.length*100)+"%";localStorage.setItem("fta-progress",JSON.stringify(Object.fromEntries(a.map(x=>[x.dataset.key,x.checked]))))}progress();document.querySelector("#reset").onclick=()=>{document.querySelectorAll(".check input").forEach(x=>x.checked=false);progress()};nav.querySelectorAll("button").forEach(b=>b.onclick=()=>document.querySelector("#"+b.dataset.id).scrollIntoView());const stageObserver=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)nav.querySelectorAll("button").forEach(b=>b.classList.toggle("active",b.dataset.id===e.target.id))}),{rootMargin:"-30% 0px -60%"});document.querySelectorAll(".stage-card").forEach(card=>stageObserver.observe(card));
function wire(){document.querySelectorAll(".copy").forEach(b=>b.onclick=async()=>{await navigator.clipboard.writeText(b.parentElement.querySelector("pre").innerText);let t=document.querySelector("#toast");t.classList.add("show");setTimeout(()=>t.classList.remove("show"),1400)})}function show(k){document.querySelector("#promptPanel").innerHTML=`<div class="code"><button class="copy">Copy prompt</button><pre>${prompts[k]}</pre></div>`;wire()}document.querySelectorAll(".tabs button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".tabs button").forEach(x=>x.classList.remove("active"));b.classList.add("active");show(b.dataset.tab)});show("setup");wire();let faq=document.querySelector("#faq");faqs.forEach(([q,a])=>faq.insertAdjacentHTML("beforeend",`<div class="faq-item"><button class="faq-q">${q}<span>＋</span></button><div class="faq-a">${a}</div></div>`));faq.querySelectorAll(".faq-q").forEach(b=>b.onclick=()=>b.parentElement.classList.toggle("open"));
