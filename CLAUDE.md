# santaclaritaartificialintelligence.com

## Deploy — Cloudflare Pages (MIGRATED off Netlify; Netlify retired 2026-07-01)
- **Host:** Cloudflare Pages project `santaclaritaartificialintelligence`, account 8d19fd09c66903840c347da43306673e, production branch `main`, DIRECT UPLOAD (not git-connected).
- **Deploy is MANUAL.** `git push` saves to GitHub but does NOT deploy the live site. To publish:
  1. Ensure git is a COMPLETE mirror of live — CF Pages deploy = full-site atomic REPLACE; a partial/stale tree WIPES live.
  2. `rsync -a --exclude=.git --exclude=.github --exclude=CLAUDE.md --exclude=README.md ./ /tmp/deploy/`
     `CLOUDFLARE_ACCOUNT_ID=8d19fd09c66903840c347da43306673e wrangler pages deploy /tmp/deploy --project-name=santaclaritaartificialintelligence --branch=main --commit-dirty=true`
  Full anti-wipe procedure: `claude-memory/sellersonlyagent-deploy-topology.md`.
- **RETIRED 2026-07-01:** removed the orphaned Netlify Action + netlify.toml. Old Netlify site `cb6f3d15-560c-447d-a2f8-15626a58df1e` is a dormant orphan.
- **Never deploy a partial/stale clone.** See `claude-memory/connor-deploy-safety.md`.
