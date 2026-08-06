# Rovo Credits: Rules of Thumb for Customer Conversations

> **DRAFT — revised for alignment with the Rovo toolkit (Estimator / Capabilities) and the shared rate config.** Review before publishing to Confluence. Numbers and terminology here match `data/rovo-rates.json` (single source of truth). Nothing is live until you paste/approve.

**Purpose.** A working reference for navigating customer questions about "how much will Rovo cost us in credits?" during TAS/CSA Rovo engagement. Rules of thumb for:

1. Rovo credit vs. token usage
2. The rate card
3. Agent-design guidance (standard agent vs. heavier reasoning modes — Think Deeper / Max)
4. Usage governance
5. Common customer FAQs

Figures are directional planning estimates, not billing quotes. For pricing, estimation, and forecasting, always involve the CSM and AE. Contributions welcome.

**This page mirrors the toolkit's single source of truth** — rates and allowances are maintained once in the [Rovo toolkit config](https://github.com/wchen7-ai/rovo-tools/blob/main/data/rovo-rates.json) and surfaced by the tools below. Rate figures verified **5 Aug 2026**.

**Companion tools**
- **Official Calculator:** [go/rovocalc](https://docs.google.com/spreadsheets/d/1wj0YXk09ITQ43pFxsCN5rAwSK7u8OJRCLnD0gdv33zg/copy)
- **[Rovo Credit Estimator](https://wchen7-ai.github.io/rovo-tools/estimator/)** — model a customer's monthly usage vs. pooled allowance
- **[Rovo Capabilities — by Collection](https://wchen7-ai.github.io/rovo-tools/capabilities/)** — what Rovo does per product, with fund-vs-spend and the full rate card *(NEW — the detailed rate-card companion)*
- **Rovo Credit Scenarios** — *retired; use the Estimator instead*

*Thanks to everyone contributing to this reference — Jennifer Yuan, Alana Dyson, and the TAS/CSA AI team.*

---

## I. The one-line answer

**Credits ≠ Tokens.**

Most everyday usage is a flat **10 credits per request**; the number that matters is monthly burn against the **pooled allowance**, not per-request cost. Credits are billed per interaction type, not per token — a short question and a long one cost the same in standard chat. [1]

| | **Credits** | **Tokens** |
| --- | --- | --- |
| **What it is** | The billing/metering unit customers consume | Underlying model volume (~100 tokens ≈ 75 words) |
| **Who sees it** | *Customer* — drawn from monthly allowance | *Internal* — what the LLM processes |
| **How it's charged** | Fixed 10 cr for chat & agents; variable for heavier modes | Only drives cost in variable/long-running modes |
| **Prompt length effect** | None — short and long both cost 10 credits | Longer prompt = more tokens |

**Mental model:** credits are a **monthly prepaid wallet, not a taxi meter**. Count actions, not words.

---

## II. The rate card

| **Interaction** | **Credit cost** |
| --- | --- |
| Search, summaries, definitions, chart insights | 0 (free today) |
| Teamwork Graph API call | 1–10 (reads cost, writes free) |
| Rovo Agent request | 10 (fixed) |
| Rovo Chat — Quick Answer | 10 (fixed) |
| Confluence Create with Rovo | ~70 |
| Rovo Chat — Think Deeper | Variable (~50 simple, 100+ deep; ~75 mid-point) |
| Rovo Chat — Max (Marathon) | **TBD — coming soon** (highest reasoning tier; rate not finalised) [10] |

Customer-facing rates above are safe to quote from Atlassian Support. [1] **Internal / directional (not on a Support page — don't quote to customers):** Atlassian-hosted LLMs apply a ~50% premium (e.g. Quick Answer → ~15 credits). [8]

**Rovo Dev credits are a separate pool** (~5 cr per successful LLM request; 2,000/dev/mo on Standard, $0.01/credit overage). [2]

> **Reasoning tiers are all one currency.** Quick Answers, Think Deeper, and Max (Marathon) all spend the **same** Rovo credits — there is no separate "Max" wallet. The tiers just cost more as they reason harder: Quick Answers (flat 10) → Think Deeper (variable ~50–100+) → **Max (highest, coming soon, rate TBD)**. The only genuinely separate pool is Rovo Dev (coding agents). [10]

> **Deep Research is a retired product for agents.** New agents no longer show a Deep Research toggle, and agents never auto-route to it. Steer customers to **Think Deeper** for similar results. See §V. [10]

---

## III. Included allowances that fund the pool (per user / month)

| **App / Collection** | **Standard** | **Premium** | **Enterprise** |
| --- | --- | --- | --- |
| **Jira** | 25 | 70 | 150 |
| **Confluence** | 25 | 70 | 150 |
| **Service Mgmt / JSM** | 25 | 70 | 150 |
| **Teamwork Collection** | 250 | 700 | 1,500 |

Credits are **pooled org-wide**, reset monthly, and don't roll over. [1]

The count-actions shortcut: *credits ≈ number of AI actions × 10*.

Reality check: a Premium app allowance of 70 credits ≈ **7 chat/agent requests per user per month**. Individual app allowances fill fast; the Teamwork Collection (10× credits) is the comfortable tier. Pooling is what saves you — see the worked example in §IV.

**Count-actions nuance for technical buyers.** Everyday work is flat 10 credits. One layer down: Teamwork Graph API calls run 1–10 credits each, and **write actions are free** (e.g. creating a Jira issue) while **reads cost** (e.g. summarizing a page). Free all month: every Search, summary, definition, and chart insight. [1]

---

## IV. Reading a customer's usage & forecasting

**Active users — the number that drives the estimate.** Define active users by **actual Chat + Agent usage**, not seats and not the headline AI MAU. [16]

> **How to read it from Customer 360:** open the customer's **Cloud Usage → "Rovo capabilities: Monthly active users"** panel and read the **Chat users (plus Agent users)** line. **Average the last 3 months** for a steadier basis — a single month can be noisy. Do **not** use the headline **Total AI MAU** or **Search users**; those count free search and aren't credit-consuming users. Seats set the *allowance*; active users drive *usage*.

**Forecast:** *(monthly interactions × credits per interaction) vs. pooled allowance*. Rough workflow costs (these are *batch/whole-job* figures, not single actions): a triage rule over ~20 tickets ~200/run (20 × 10) · three bulk-import creates ~150 · one Confluence Create ~70 · a weekly Insights digest ~50. Per single action it's still the flat ~10 cr. Point admins to **Platform Usage** in Admin Hub and the Rovo calculator (**go/rovocalc**). [5]

**AI Aha adoption anchor (internal).** Meaningful adoption pegs at ~10 Rovo Chat messages (~100 credits) per user; getting a user to product value across Jira + Confluence runs **~1.7k credits**. [12]

### A worked example — "will this org stay within budget?"

*Illustrative only — round numbers, not a real customer.*

Take a **100-seat Confluence Premium** org. At 70 credits/user, that's **7,000 credits/month pooled** across everyone. [1] Seats set the allowance; active users drive usage.

**The usage bands** (from the official Rovo Calculator's benchmark bands, converted at the flat 10 cr/request): **Light ≈ 1 request/user/mo (~10 cr) · Moderate ≈ 2 (~20 cr) · Heavy ≈ 10 (~100 cr)**. The calculator's bands are built from active-customer usage; the ~175 cr aspirational high-water mark is Atlassian's own internal blended average. [12]

**Today's reality (most orgs).** Real adoption is low — a typical org has far fewer active users than seats, and credit utilization often sits in the low single digits. Say **~15 of the 100 seats** use Rovo in a month, mostly Light–Moderate (~1–2 requests). That's roughly 15 × ~15 cr = **~225 credits/month against 7,000** — comfortably under, using ~3% of the pool. This matches what we see in the field: customers are barely touching their allowance pre-enforcement.

**What changes the picture — heavier adoption + automation.** As adoption grows, or if automation enters:

- **~40 active users** at the Moderate–Heavy end (~10 actions/mo, ~100 cr) → ≈ **4,000 credits/month** interactive.
- Add **automation** — a couple of agent-firing rules at ~30 runs/day org-wide ≈ 600 runs × 10 cr = **~6,000 credits/month**.
- Interactive (~4,000) + automation (~6,000) = **~10,000 vs. a 7,000 pool → over**, driven mostly by automation, not the human users.

**Takeaways to keep in your pocket:**
- **Most orgs sit well under their pool today** — utilization is low; the headroom is real.
- **Pooling absorbs uneven human use.** A room of Light users leaves headroom, so a few Heavy users (~175) is fine — no one is capped at their own 70. Pooling is the answer to "won't our power users blow the budget?"
- **Automation is the swing factor**, not per-user chat — one busy event rule can outweigh all the humans combined.

**Model the specific customer in the [Rovo Credit Estimator](https://wchen7-ai.github.io/rovo-tools/estimator/)** — plug in their real seats, editions, active users (3-month Chat+Agent MAU, not total AI MAU), activity mix, and automation runs for a proper per-driver breakdown and a green/amber/red verdict. The bands above are a "which bucket" gut-check, not a forecast.

---

## V. How credit consumption shapes agent design

**Default to a standard single agent on the flat 10-credit rate. Reach for a heavier reasoning mode (Think Deeper / Max) only when the task genuinely needs multi-step planning or cross-source judgement** — a cheap wrong answer you re-run costs more than one good expensive one.

### What the popular agents actually cost — three buckets

Looking at Atlassian's out-of-the-box agents [4], credit consumption sorts into three design patterns. Which bucket an agent falls into matters far more than its per-run rate:

- **Flat-rate, human-triggered (most agents)** — a person runs them interactively, single-step, flat 10 cr. This is the bulk of the catalog: **Product Requirements Guide**, **Release Notes Drafter**, **Readiness Checker**, **Work Item Organizer**, **Bug Report Assistant**, **OKR Generator**, **Global Translator**. Cost scales gently with adoption; easy to budget.
- **Agents wired into automation (the volume multiplier — watch these)** — an agent connected to an automation rule so it runs automatically when the rule fires, with **no human present**. Credits then scale with how often the *rule* fires, not with headcount. The official catalog builds two agents specifically for this: **Blocker Checker** and **Service Triage** (both "designed for automations"). A triage rule on "every new ticket" can fire thousands of times a month — usually the single biggest credit driver in an org, dwarfing interactive use.
- **Cross-source judgement agents (use Think Deeper as a one-off)** — agents whose job is to reason across multiple sources and make a judgement call: **Rovo Ops**, **Jira Delivery Agent**, **Customer Insights**, **Transcript Insights Reporter**. These are the genuine case for the heavier Think Deeper tier — but use it as a **one-off** for the specific hard task, not as the agent's default. A triage agent is the pattern in miniature: keep it on Quick Answers for rule-based routing (flat 10 cr), bump to Think Deeper only for the ambiguous tickets that need judgement, and reserve Max for open-ended cross-tool investigation once it ships.

> **Modelling note — automation ≠ Rovo credits.** Customer 360's automation-run count is the *total* automation across Jira/Confluence, **not** the subset wired to a Rovo agent. Only agent-connected runs spend credits. When you model automation in the [Rovo Credit Estimator](https://wchen7-ai.github.io/rovo-tools/estimator/), enter only the **Rovo-involved** runs, not C360's total — otherwise you'll massively overstate burn.

**Sub-agents don't double the cost — but separately-metered actions do add up.** If you chat with a main agent (10 cr) and it hands off to a sub-agent for ordinary reasoning, you are **not** charged another 10 cr — the main agent and its sub-agents run as **one invocation on one model**, and their skills are billed collectively as a single ~10 cr interaction. [10]

**The exception:** if a sub-agent triggers an action that is *separately metered*, that action bills at its own rate on top of the 10 cr. Each billable AI action is metered per event at its own rate-card rate — [1] so:

- Sub-agent → **fires an automation-connected agent run** = +~10 cr per run.
- Sub-agent → **Confluence Create with Rovo** = +~70 cr for the create.
- Sub-agent → **Think Deeper** = that step bills at the variable Think Deeper rate.

**Rule of thumb:** one agent interaction is ~10 cr no matter how many sub-agents reason inside it, plus the rate of any distinct billable action (Create, Think Deeper, another agent run) that gets invoked along the way.

**Deep Research is retired for agents — use Think Deeper.** New agents no longer show a Deep Research toggle, and agents never auto-route to it (whereas Think Deeper can activate automatically on complex prompts). For one-off heavy synthesis in *Chat* (not agents), Deep Research still exists — ~100 credits, up to 15 minutes, full citations. [10]

> *Internal note — the default model behind each tier lives on an internal beta page; do not share model names with customers.*

---

## VI. Customer FAQ — definitions & gotchas

*On Confluence, render each Q&A below as an `expand` macro (question = title, answer = collapsed body). The two subsections that follow are also wrapped as `expand` macros.*

- **What counts as an "interaction"?** One billable request. A 5-message chat = ~50 credits, regardless of length. Search/summaries are free. [1]
- **How do we define an active/credit-consuming user?** Actual Chat + Agent users (3-month average from the C360 MAU panel), *not* Total AI MAU (search-dominated). See §IV.
- **"I don't want surprise bills — what if we run out?"** Extra usage is off by default, so there's no automatic overage. In-flight work completes; only new requests pause, and free features (Search, summaries, chart insights) keep working. The pool resets monthly. Admin alerts fire at 80% and 100%, and a hard cap is available. [3]
- **"Does it cost more depending on where I use it — Slack, Teams, Jira?"** No "app tax." The cost is set by the feature (Basic 10 cr vs. Premium variable), not the surface it's triggered from. What changes your pool is which subscriptions *fund* it — not where you spend. [3]
- **"Why should I pay for context / API calls?"** Third-party tools pulling Atlassian context through the Teamwork Graph API bill 1–10 cr/call. You're paying for permission-aware business context, not just model output. [14]
- **"Is everything moving to this model now?"** No — some capabilities (e.g. Loom AI) stay on a separate system for now. Scope the specific products in play rather than assuming a universal change.

### Which subscriptions actually fund credits?

**Only four subscription types fund the pool — the Teamwork Collection is a bundle, not a fifth app.** [1]

- **Funds the credit pool:** Jira, Confluence, JSM (Service Collection) — 25 / 70 / 150 by edition; and Teamwork Collection — 250 / 700 / 1,500 (≈10× a single app).
- **Spends credits, no own allowance:** Loom AI, JPD, Trello, and the Strategy Collection (Focus / Talent / Align). Rovo features run here and draw from the pool, but grant no allowance of their own.
- **Runs Rovo free, or only feeds the graph:** Analytics chart insights, Search, summaries, definitions (free today); connectors like Slack, GitHub, Google Drive, Figma feed the Teamwork Graph and cost only via TWG API calls. "Free" reflects today's rate card and may change. [14]

**Sizing warning:** the Teamwork Collection already includes Confluence, Trello, Atlas, and Loom — count the Collection **or** the individual apps, never both, or you'll double-count the allowance.

### Which products spend credits — Loom, JPD, Trello, Analytics?

Credits are tied to the **Rovo feature used, not the product**. Grouped by how confirmed the capability is:

**Confirmed (GA):**
- **Core apps** (Jira/Confluence/JSM): Chat, Agents at standard rates; Search/summaries free. [1]
- **Loom:** AI features spend credits (LACE agents, AI workflows, meeting-recording actions), ~70–300/run.
- **Strategy Collection:** own AI (e.g. Talent Advisor); spends from the pool at standard rates, no own allowance. [17][18]

**Verify — limited or unconfirmed:**
- **JPD:** supported with gaps (ideas treated as flat text, Insights not indexed); chat/agents bill same standard rates.
- **Trello:** outside the standard allowance model — verify with account team.
- **Analytics:** native chart insights are **free today (Verify — confirm entitlement)**. But **Rovo cross-product reporting** (e.g. Jira sprint data → a Confluence page) is a Rovo Chat/agent action and costs **~10 cr** — chart insights are free; *generating the report is not*. ("Rovo for analytics" is ambiguous — clarify native Analytics AI vs. Rovo cross-product reporting; entitlement differs.)

**Connectors:** feed the graph; cost only via TWG API calls (1–10 each, reads cost / writes free). Rovo Search across connected apps is free. [14]

---

## VII. Admin controls & governing usage

There's no single "usage cap" toggle. Governance is split across two things: **who controls what** (the admin architecture) and **how you keep consumption in check** (usage governance). [11]

### A. The admin architecture — three layers, top-down

Control flows from the org down to a single agent. Each layer has a different owner and a different job:

1. **Org admin — turns Rovo on and sets the boundary.** Enable or block Rovo per app, set rollout scope (start with pilot groups, expand org-wide), apply IP allowlists, govern connectors, and open usage visibility. **MCP lives here too** — enable/disable the MCP *server*, set allowed domains, and configure read/write/search permission groups (all org-wide today, not per-site). [11]
2. **Studio admin — governs what gets built.** This is the builder control plane: assign out-of-the-box agents, create **custom agents**, build **apps** (Studio's App Builder), build **automations**, and attach agents to **knowledge sources** (connectors). Three independent creator roles gate this — *agent creator*, *app creator*, *automation creator* — each grantable by user or group. [11]
3. **Agent owner / manager — governs a single agent.** Sets who can use and edit it, what **skills/tools** it can call, and its instructions. Owners can also make an agent private or share it with named users.

### B. Governing usage — where to watch, alert, and cap

Once Rovo is live, consumption is governed separately from access:

- **Review usage** — Admin → Rovo → Insights: total usage over time, by app, and by individual user. This is where a heavy-user hotspot or a runaway automation shows up. [5]
- **Set alerts & caps** — admins get 80% / 100% notifications; extra-usage caps are opt-in and **off by default**, so there's no accidental overage. [3]
- **Restrict who can build** — the single biggest burn lever. Limiting agent (and especially automation) creation prevents "builder sprawl," the usual cause of runaway credit growth. [11]

**Recommended stack (best practice):** [20]

- **Access shape** — broad Rovo *usage*, narrow *Studio access*, restricted *creators*.
- **Phase the rollout** — pilot group first, keep early agents private, then expand in waves.
- **Showback before chargeback** — make usage visible to stakeholders first, then decide whether formal cost allocation is needed.

**Governance gaps to flag** — four controls admins expect but don't fully have yet: [11]

- **No per-agent group sharing.** You can restrict who sees an agent, but only by naming *individual users* — there's no "share with this team/group." Managing a sensitive agent across a large team means adding people one by one. (Group support is in progress.)
- **No hide-until-approved workflow.** An agent a non-admin builds can't be held hidden pending formal admin sign-off. The workaround is a sandbox: build and test there, then move approved agents to production. Admin "verification" is a trust badge, not a gate.
- **MCP controls are org-wide, not site-scoped.** Enabling/disabling the MCP server, allowed domains, and permission groups apply to the whole org — you can't loosen or tighten MCP for one site or business unit independently.
- **Usage forecasting is still "coming soon."** Admins get 80% / 100% threshold alerts, but the forward-looking spend forecast in Insights isn't live yet — so you can't yet see a projected end-of-cycle burn inside the product.

**Two ways an agent can now be invoked programmatically — both admin-gated.**

**Rovo Public Agents API.** A documented REST API (`/gateway/api/rovo/v1`) to open a conversation with an agent by ID and send messages, via OAuth 2.0. **Status: EAP + allowlisted** — not yet GA self-serve; confirm the org is enabled before promising it. [19]

**Agent2Agent (A2A).** A live, customer-documented protocol letting compatible third-party agents (e.g. Claude, Gemini) and custom agents connect to Rovo and act across Jira/Confluence **using the user's existing permissions**. Uses OAuth 2.1; **the org admin must enable A2A in Admin Hub first**, so it's a governance lever, not a bypass. [6][7]

Credit treatment is settled either way: an agent call triggered through either path spends credits like any other invocation. [1]

---

## VIII. Honest caveats

- No universal rule of thumb for exact per-prompt cost — variable-mode consumption depends on prompt, model, and use case.
- Rate-card values beyond the official Support page are directional and may change before enforcement (~Dec 2026).
- Usage profiles (Light/Moderate/Heavy) are the calculator's benchmark bands — directional anchors for "which bucket," not a per-customer forecast. Always model the specific customer in the Estimator.
- **"Free" = 0 credits today.** This may change once usage enforcement begins (~Dec 2026) — re-check the current rate before quoting.

---

## IX. References & resources

Check these before quoting numbers — official Support pages govern commitments; internal pages are directional. **Last updated / verified** shows the source's own last-edit date (internal) or when we last verified it (external Support). Rate figures on this page verified **5 Aug 2026**.

### Official (Atlassian Support / atlassian.com)

| **#** | Resource | Use it for | **Verified** |
| --- | --- | --- | --- |
| 1 | [Rovo usage allowance](https://support.atlassian.com/rovo/docs/rovo-usage-limits/) | Rates, allowances, free vs. billable, TWG API pricing | 5 Aug 2026 |
| 2 | [Rovo Plans & FAQs](https://www.atlassian.com/licensing/rovo) | Usage measurement, pooling, Rovo Dev pricing | 5 Aug 2026 |
| 3 | [Manage your bill for Rovo](https://support.atlassian.com/subscriptions-and-billing/docs/managing-your-bill-for-rovo/) | Billing, overage opt-in, 90-day notice | 5 Aug 2026 |
| 4 | [Compare Rovo Chat reasoning modes](https://support.atlassian.com/rovo/docs/compare-rovo-chat-reasoning-modes/) | Quick Answer / Think Deeper / Deep Research | 5 Aug 2026 |
| 5 | [Gain insights into Rovo AI activity](https://support.atlassian.com/organization-administration/docs/gain-insights-into-rovo-ai-activity/) | Rovo Insights, supported apps, Platform usage vs. Trends | 5 Aug 2026 |
| 6 | [Use Agent2Agent connections](https://support.atlassian.com/atlassian-ai-gateway/docs/use-agent2agent-connections/) | A2A protocol, OAuth 2.1, permission inheritance, 3P agent connections | Verified 6 Aug 2026 |
| 7 | [Manage A2A connections in Admin Hub](https://support.atlassian.com/security-and-access-policies/docs/manage-a2a-connections-in-admin-hub/) | Admin gate for enabling A2A | Verified 6 Aug 2026 |

### Internal (hello.atlassian.net) — directional

| **#** | Resource | Use it for | **Last updated** |
| --- | --- | --- | --- |
| 8 | [Rovo Credits, LLM tokens & words](https://hello.atlassian.net/wiki/spaces/tcsm/pages/7323412132) | Credit/token math, fixed vs. variable, AHL premium | 17 Jul 2026 |
| 9 | [Rovo Current Limitations & Guidance](https://hello.atlassian.net/wiki/spaces/~712020c9c9d639ac1e4582a8cb52c87fc3b62c/pages/6536233883) | Partner talk-track, quotas, technical limits, enforcement timeline | 26 Apr 2026 |
| 10 | [Reasoning & model selection](https://hello.atlassian.net/wiki/spaces/~7120204cd8d80c30a04786b126ea9de3ddc4e4/pages/7061944198) | Studio tiers, default models, Deep Research retirement, Max | 29 May 2026 |
| 11 | [Admin Controls for Rovo](https://hello.atlassian.net/wiki/spaces/~tmihaylova/pages/7153605046) | Governance layers, usage controls, rollout | 11 Jun 2026 |
| 12 | [Board Paper: Atlassian AI Strategy](https://hello.atlassian.net/wiki/spaces/ftw/pages/7189706990) | Org-level consumption concentration (top 1% burn ~68%) | 16 Jun 2026 |
| 13 | [Rovo Credit Consumption Mental Model](https://hello.atlassian.net/wiki/spaces/~639a1f1cf3c3dfd71fe87a21/pages/7035879613) | Upstream six-tier rate-tier taxonomy (the "why" behind the rates) | Verified 5 Aug 2026 |
| 14 | [Monetization Plans for Rovo MCP Tools](https://hello.atlassian.net/wiki/spaces/455183727/pages/7318508587) | Rovo Search free across UI/API/MCP; 3P connector spend | Jul 2026 |
| 15 | [Rovo credits UBP FAQs](https://hello.atlassian.net/wiki/spaces/acbp/pages/7102029744) | Free vs. billable actions, overage math | Verified 5 Aug 2026 |
| 16 | [How Rovo credits work — customer-facing draft](https://hello.atlassian.net/wiki/spaces/Rovo/pages/6782683836) | Customer-facing framing of free vs. paid | Verified 5 Aug 2026 |
| 17 | [Strategy Collection Hub](https://hello.atlassian.net/wiki/spaces/CW/pages/4799799333) | Focus/Talent/Jira Align bundle; Strategy spend | Verified 5 Aug 2026 |
| 18 | [Talent Tokenomics / Agent Cost Governance](https://hello.atlassian.net/wiki/spaces/~712020b2de4996df98489fadf6b749b0d13b9a/pages/7260656915) | Talent agent cost tracking | Verified 5 Aug 2026 |
| 19 | [Rovo agent invocation APIs (Agent as a Tool)](https://hello.atlassian.net/wiki/spaces/mcp/pages/7241401527) | Public Agents API — EAP/allowlisted, endpoints, auth scopes | Verified 6 Aug 2026 |
| 20 | [Managing a Rovo Rollout: Governance, Access Control & Usage Tracking](https://hello.atlassian.net/wiki/spaces/~71202020f2b5b038c949e9901003414bf00eb2/pages/7142974484) | Recommended stack, phased rollout, showback-before-chargeback, reporting cadence | Verified 6 Aug 2026 |

### Related team resources (from the space)

- **Using Rovo Credit Consumption Insights in Customer Conversations** — Jennifer Yuan
- **Rovo Credits — 15 Example Use Cases with Concrete Credit Costs** — Oliver Bredow
- **Rovo Credits rate card summary** — Caroline Bartle
- **Rovo/AI credit modeling & deal sizing guide** — REAL Hub
- **Rovo Rate Card Update - July 8** — REAL News (Tammy Lam)

**Watch items that will change:** credit enforcement (~Dec 2026); Max reasoning tier (coming soon, rate TBD); reasoning-tier model names (beta); the Rovo Public Agents API graduating from EAP to GA; which currently-free features (Analytics, Search) later attach a cost. Re-verify against the Support pages above.
