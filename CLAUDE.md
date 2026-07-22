# ☠️ DEAD REPO. DO NOT BUILD HERE. DO NOT DEPLOY FROM HERE.

**This folder is not the live site and never has been.** The live
santaclaritaartificialintelligence.com is served from the repo with **no `.com`**:

- ✅ LIVE: `connorwithhonor/santaclaritaartificialintelligence` → `~/dev/santaclaritaartificialintelligence`
- ☠️ THIS: `connorwithhonor/santaclaritaartificialintelligence.com` → dead orphan, older generation

## 🚨 The deploy instructions previously in this file were LIVE-SITE-WIPING

They named Pages project `santaclaritaartificialintelligence`, which is the **real
project serving the real domain**, and a CF Pages deploy is a **full-site atomic
REPLACE**. This tree holds **154** HTML files; live has **209**. Running the old
command from this folder would have deleted roughly **55 live pages** in one shot.
The file even warned that "a partial/stale tree WIPES live" while itself being the
stale tree. Removed 2026-07-22.

**To deploy the real site:** go to `~/dev/santaclaritaartificialintelligence` and
run its own `./deploy-cf.sh` (it ships a clean tree via `git archive`). Never
deploy from this folder.

## This repo has already cost real work three times

1. **2026-06-10 (MacV):** nearly shipped the roofing build in here.
2. **2026-07-01 / 07-04:** somebody built `/wispr`, `/show/` and
   `/voice-ai-for-small-business/` in here. **None of it ever reached live.**
   `/wispr` 404'd for 18 days until it was recovered on 2026-07-22.
3. **2026-07-22 (Vincent):** almost injected the MacBox here before byte-comparing.

## Why your normal instincts fail here

- **This dead repo has the NEWER commit date** (2026-07-04 vs 2026-06-30 live).
  "Most recently updated" points at the WRONG repo. That signal is inverted.
- Both repos ship the same homepage `<title>`, so a title check proves nothing.
- Old advice said to confirm with `netlify sites:list`. That no longer works: the
  live site **moved off Netlify to Cloudflare Pages on 2026-06-29**.

## The check that actually works

Byte-compare `index.html` against the live homepage. Measured 2026-07-22:

| repo | index.html | vs live (75,977 pre-wispr) |
|---|---|---|
| no-`.com` | 75,568 | 409 bytes apart, this is live |
| this one | 99,995 | 24,018 apart, a different site |

## Work still stranded in here

`/wispr` was ported out on 2026-07-22 (commits `2dad504` + `ba94d87`) and is now
live. **Still orphaned and still 404 on live: `/show/` and
`/voice-ai-for-small-business/`.** Port them into the live repo after a
compatibility pass. Do not deploy this tree to publish them.

Full context: `claude-memory/scai-repo-topology-trap.md`
