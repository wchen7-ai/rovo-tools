# Rovo Credits Toolkit

One repo. One source of truth. Three tools + one Confluence page, all reading the same numbers.

## Why this repo exists

The rate card, allowances, and benchmark bands used to be copy-pasted across five
places (two tool repos + the Confluence prose). One rate change in September meant
hand-editing five files and hoping nothing was missed. Now:

**All numbers live in [`data/rovo-rates.json`](data/rovo-rates.json) and nowhere else.**

```
rovo-tools/
├── data/
│   ├── rovo-rates.json          ← THE single source of truth (edit here only)
│   └── rovo-rates.embedded.js   ← GENERATED offline fallback (do not hand-edit)
├── build-embedded.js            ← regenerates the embedded copy from the JSON
├── shared/
│   └── rovo-data.js         ← tiny loader all tools import
├── estimator/index.html     ← deep modelling tool (reads the config)
├── scenarios/index.html     ← quick "where would we land?" view (reads the config)
├── capabilities/index.html  ← feature reference (reads the config)
└── docs/
    └── TERMINOLOGY.md        ← canonical terms across tools + Confluence + C360
```

## The four-layer system (where each thing lives)

| Layer | Surface | Audience | Who edits |
|---|---|---|---|
| **Why** — billing reality (six-tier taxonomy) | Mental Model page (Alana's, Confluence) | Internal / pricing | Alana |
| **What to say** — rules, FAQ, references, credits | Rules of Thumb page (Confluence) | Field CSMs | Wallace |
| **Model it** — interactive | estimator / scenarios / capabilities (this repo) | Field + customer | `rovo-rates.json` |
| **Source of truth** — the numbers | `data/rovo-rates.json` | Maintainer | Wallace |

Confluence is the **front door**: direction, references/citations, general Q&A, and
credit to contributors. It links down to the tools; the tools never restate numbers
the config doesn't provide.

## How to make a change (the whole point)

### Changing a rate, allowance, or band
1. Edit **only** `data/rovo-rates.json`.
2. Bump `_meta.lastVerified` to today.
3. Commit + push. GitHub Pages redeploys; all three tools pick up the new numbers on next load.
4. Update the **Confluence Rules of Thumb** prose tables to match (the one prose surface
   that can't auto-sync) and confirm its "Figures maintained in rovo-rates.json —
   last verified DD Mon" line shows the same date.

That's it. No touching individual tool HTML for a numbers change.

### Terminology change
Edit the `terminology` block in the config **and** [`docs/TERMINOLOGY.md`](docs/TERMINOLOGY.md).

### C360 column rename (Phase 1)
Edit the `c360Mapping.columns` block in the config — not the estimator's parser.

### After ANY change to `rovo-rates.json`
Regenerate the offline fallback so the double-click (`file://`) path stays in sync:
```
node build-embedded.js
```
This writes `data/rovo-rates.embedded.js` (a generated artifact — never hand-edit it).
Skipping this only affects offline/double-click use; served-over-HTTP always reads the
canonical JSON.

## Deployment

Each subfolder publishes as its own GitHub Pages path, e.g.
`https://<user>.github.io/rovo-tools/estimator/`. Embed those URLs into the Confluence
pages via the iframe/HTML macro. Because the JSON is served same-origin, no CORS setup.

> Migration note: this consolidates the former `rovo-credit-estimator` and
> `rovo-credit-scenarios` repos into one, which is what makes a shared config physically
> possible. Point the old Confluence embeds at the new `/rovo-tools/<tool>/` URLs.

## Customer 360 integration

- **Phase 1 (now):** CSV / manual export imported client-side into the Estimator.
  Data never leaves the browser — no security review needed. Mapping lives in
  `c360Mapping`. See TERMINOLOGY.md for the cross-match.
- **Phase 2:** confirm C360 API access + whether it exposes the "automation runs that
  invoked Rovo" field (currently missing).
- **Phase 3 (contingent on Phase 2):** live fetch via a token-holding proxy (Forge app
  or serverless) — a static page cannot hold a credential securely. Needs a security review.

## Disclaimer

All figures are directional planning estimates consistent with Atlassian's public rate
card and the official Rovo Calculator (go/rovocalc) — **not billing quotes**. Always
confirm sizing and pricing with AE/CSM before sharing numbers with a customer.
