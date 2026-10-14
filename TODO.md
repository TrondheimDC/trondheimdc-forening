# TODO before launch

## Content ideas

- [ ] **Archive (`src/data/archive.ts` / `src/components/Archive.tsx`)**:
      each year should also link to that year's talk recordings playlist on
      YouTube, not just the year's conference site.

## Infrastructure (outside this repo)

- [ ] **nginx vhost + TLS cert** (run `docs/setup-server.sh`, see `docs/deploy.md`) for `forening.trondheimdc.no`. DNS already resolves (wildcard CNAME via
      `worldwide.trondheimdc.no`), so only the vhost/cert is missing.
- [ ] Confirm `SSH_HOST` / `SSH_USER` / `SSH_PRIVATE_KEY` org secrets (used by
      `.github/workflows/cd.yml`) have access to
      `/var/www/sites/forening.trondheimdc.no/public`.
- [ ] Link to this site from `trondheimdc.no` (footer + `about` section),
      not yet added, tracked separately.

## Deferred (explicitly out of scope for v1)

- Styret page/photos
- Grasrotandelen CTA (not set up yet)
- Årsmelding / regnskap page (no årsmøte held yet since forening was founded
  2025-11-10)
- Live meetup event data (java.no's Meetup.com scraper could be reused later)
- EHF/electronic invoicing setup
