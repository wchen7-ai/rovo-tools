# Terminology Alignment

Canonical terms used across **all four surfaces**: the Confluence Rules of Thumb page,
the three tools (Estimator / Scenarios / Capabilities), and Customer 360.

Rule: use the **Canonical** term everywhere. The **Aliases** column lists names seen on
other surfaces that mean the same thing — reconcile to canonical when they appear.

The machine-readable version lives in `data/rovo-rates.json` → `terminology`. This doc is
the human-readable companion; keep the two in sync.

---

## Core terms

| Canonical | Definition | Aliases / seen-as | Do NOT confuse with |
|---|---|---|---|
| **Active users (credit consumers)** | Subset of seats who actually use Rovo and generate billable actions. Basis = **actual chat + agent call counts** from Rovo Capability Usage, not a % of seats. | "credit consumers", C360 "Rovo MAU (excl. search)" | C360 "Rovo MAU (incl. search)" — that counts free-search users too |
| **Seats (licensed users)** | People with a paid license. Sets the **allowance**, not usage. | "licensed users", C360 "Seats" | Active users |
| **Credits** | Billing/metering unit the customer consumes. Monthly prepaid wallet. | — | **Tokens** (internal model volume; ~100 tokens ≈ 75 words) |
| **Interaction (billable request)** | One billable request. 5-message chat = ~50 cr regardless of length. | "request" | Free actions (search/summary) |
| **Automation run** | Agent run fired by an automation rule. ~10 cr, any trigger. | "agent-on-automation", "rule run" | An active user — a service account is **not** an active user |
| **Pooled allowance** | Org-wide credit bucket, monthly reset, no rollover. | "org pool" | Per-user cap (there isn't one — pooling is the point) |

## The active-user reconciliation (Jennifer's #1 fix)

This is the single most important cross-match, because C360 and the tools name it
differently and the wrong choice inflates the estimate:

**How a CSM reads it from Customer 360:** open the customer's **Cloud Usage → "Rovo
capabilities: Monthly active users"** panel and read the **Chat users (+ Agent users)**
line. **Average the last 3 months** for a steadier basis — a single month can be noisy
(a launch spike, a quiet month). Don't use the headline **Total AI MAU** or **Search
users** — those count free search and aren't credit-consuming users.

```
C360 "Total AI MAU"              →  counts free search — NOT active users
C360 MAU panel · Search users    →  free — context only, NOT active users
C360 MAU panel · Chat users      →  USE THIS — the monthly credit-consuming population
C360 MAU panel · Agent users     →  add to Chat users
Estimator "Active users / month" →  3-month average of Chat (+ Agent) users
```

## Search scope assumption

Every tool assumes **interactive Rovo Search**, which is **free — including across
third-party connected apps** (Slack, Google Drive, GitLab, Box, etc.). Confirmed: Rovo
Search is free across UI, public APIs, and MCP, and connecting/indexing 3P data is free
(sources: [MCP monetization](https://hello.atlassian.net/wiki/spaces/455183727/pages/7318508587),
[How Rovo credits work](https://hello.atlassian.net/wiki/spaces/Rovo/pages/6782683836),
[UBP FAQs](https://hello.atlassian.net/wiki/spaces/acbp/pages/7102029744)).

Two qualifiers: **web search** (vs. internal/connected-app search) may cost more; and
**programmatic TWG search** via MCP/API is *registered* as billable (1–10 cr) but pending
review, **not yet enforced**. So interactive search = free today; that "today" is why the
tool keeps a source + last-checked citation rather than a bare claim.

## Automation caveat

C360 knows **total** automation runs (often hundreds of thousands over 12 months) but
**cannot yet** tell which ones invoked Rovo. Credit treatment itself is **settled**
(confirmed w/ Adam, 4 Aug 2026):

> **Credits follow the agent call, not the caller.** Any Rovo agent invocation spends
> ~10 cr regardless of trigger — human, service account, or API.

- **Human** → spends credits, counts as an active user.
- **Service account** (automation rule) → spends credits, but is **not** an active user.
  Count as automation, not a user.
- **API call** → spends credits the same way. **Caveat:** the agent-invocation API is
  *unverified* as of 4 Aug 2026 (Alex, Loom) — endpoints not confirmed to exist. The
  credit rule is settled; API availability is not.

**Finding the Rovo share** (since C360 can't split it): work in reverse — a Rovo agent
with high invocations but near-zero unique users is automation-driven; in Rovo Studio,
the agent's **Surfaces → Automations** tab lists the rules tied to it.

**Not an edition thing.** A Rovo agent call costs ~10 cr on Standard, Premium, and
Enterprise alike. Jira/Confluence automation-rule *execution* limits (how often a rule
may fire) are a **separate meter** — more allowed rule runs don't make Rovo agent calls
cheaper or free. Don't conflate rule-execution limits with Rovo credit cost.

## "Agent request" vs "Automation" — keep them separate

Same ~10 cr per call, different basis. Do not merge:

| | Agent request (§3 slider) | Automation (§4 box) |
|---|---|---|
| **Who runs it** | A person, interactively | A rule — no human present |
| **Basis** | Per active user / month | Org-wide / month |
| **Scales with** | Headcount × adoption | Rules × events (one rule can fire 1000s×) |
| **Counts as active user?** | Yes | No (service account ≠ user) |
| **Conversation** | Adoption story | Governance story |

## Free actions (highlight everywhere)

Search, summaries, definitions, and Analytics chart insights = **0 credits today**.
Highlight with a color/asterisk linked to a footnote so customers don't assume they cost.
"Free" reflects today's rate card and may change at enforcement (~Dec 2026).
