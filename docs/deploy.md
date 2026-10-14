# Deploy — forening.trondheimdc.no

A static site (Next.js `output: "export"`), the same way as utlegg and regnskap. There is no app server, no database and no secret on the server.

```text
push to main
    → GitHub Actions: lint, typecheck, next build
    → rsync out/ → /var/www/sites/forening.trondheimdc.no/public
```

| Part | Value |
|---|---|
| Public URL | https://forening.trondheimdc.no |
| Static files | `/var/www/sites/forening.trondheimdc.no/public` |
| Nginx config | [nginx-forening.trondheimdc.no.conf](./nginx-forening.trondheimdc.no.conf) |
| Nginx logs | `/var/www/sites/forening.trondheimdc.no/logs/` |
| Workflows | `.github/workflows/cd.yml` (push to `main`), `pr.yml` (pull requests to `main`) |

## 1. GitHub (one-time)

| Type | Name | Value |
|---|---|---|
| Secret | `SSH_HOST` / `SSH_USER` / `SSH_PRIVATE_KEY` | Same as utlegg and regnskap (org secrets) |

`SSH_USER` must be able to write to the static files directory below.

## 2. Server (one-time)

DNS already resolves: `forening.trondheimdc.no` is covered by the wildcard CNAME to `worldwide.trondheimdc.no`.

```bash
# From your machine
scp docs/setup-server.sh docs/nginx-forening.trondheimdc.no.conf <server>:
# On the server, with the user behind the SSH_USER secret
sudo bash setup-server.sh <deploy-user>
```

[setup-server.sh](./setup-server.sh) creates the site and log directories, gets the certificate from certbot (webroot, port 80 only until it exists), then installs the full nginx config and reloads. It is safe to run again.

## 3. First deploy

Push `main`, or run **Actions → CD - Build & Deploy** by hand (`workflow_dispatch`).

## 4. Verify after deploy

```bash
curl -sI https://forening.trondheimdc.no | head -1                    # 200
curl -sI https://forening.trondheimdc.no/stotte | head -1             # 200
curl -sI https://forening.trondheimdc.no/st%C3%B8tte | head -1        # 200 (the /støtte alias)
curl -sI https://forening.trondheimdc.no/finnes-ikke | head -1        # 404
curl -sI http://forening.trondheimdc.no | grep -i ^location           # → https://
```

Then open the site in a browser with the dev tools console open: a Content-Security-Policy violation there means something new loads from another origin, and the policy in the nginx config needs to allow it.

## Local preview of the build

```bash
pnpm build
pnpm start                  # serves out/ on http://localhost:3000
```
