# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Kasm Workspaces Registry that publishes modular DragonOS SDR Docker workspace definitions. The registry is a static site hosted on GitHub Pages at `https://techring-live.github.io/kasm-registry/`. Kasm admins add this URL to discover and install specialized RF/SDR analysis workspaces pulling images from `harbor.lab.techring.live`.

## Build & Deploy

```bash
# Install dependencies
npm ci --prefix processing
npm ci --prefix site

# Full multi-branch build (runs in CI, builds ALL branches into public/)
./build_all_branches.sh

# Process workspace metadata only (generates public/list.json + icons)
node processing

# Build site only (Next.js static export → ../public)
cd site && npm run deploy
```

CI triggers on push to any branch except `gh-pages`. The workflow runs `build_all_branches.sh` which checks out every remote branch, runs the processing pipeline + Next.js build for each, then deploys the combined output to `gh-pages` via `JamesIves/github-pages-deploy-action@v4`.

## Architecture

### Three-stage pipeline

1. **Workspace definitions** (`workspaces/{Name}/workspace.json` + icon PNG) — source of truth for each workspace variant
2. **Processing** (`processing/processjson.js`) — globs all `workspace.json` files, computes SHA1 folder hashes for change detection, copies icons to `public/icons/`, outputs `public/list.json` and `public/versions.json`
3. **Site** (`site/`) — Next.js 14 static export (`output: 'export'`) with Tailwind CSS. Main pages: workspace library (`pages/index.js`) with version/search filtering, and workspace editor/generator (`pages/new/[[...workspace]].js`) that exports ZIP files

### Multi-branch versioning

`build_all_branches.sh` builds every active branch into its own subdirectory under `public/`. Each branch gets its own `basePath` in `next.config.js` (dynamically rewritten during build). A root `index.html` redirects to the default branch. Branch `1.1` is currently the main branch.

### Workspace JSON schema

Key fields in `workspace.json`:
- `compatibility[]` — array of Kasm version entries, each with `version`, `image` (Docker image path), and `uncompressed_size_mb`
- `docker_registry` — points to Harbor (`https://harbor.lab.techring.live`)
- `run_config.privileged: true` — required for USB SDR device passthrough
- `image_src` — icon filename (naming convention: lowercase, special chars → hyphens)

### Processing utilities

- `processing/add_next_version.js` — adds new Kasm version compatibility entries with rolling-daily/weekly/stable tags to all workspaces
- `processing/get_image_sizes.js` — pulls Docker images and updates `uncompressed_size_mb` fields
- `processing/update_1_0_to_1_1.js` — migration script from schema 1.0 to 1.1

## Conventions

- **Conventional Commits**: `feat:`, `fix:`, `ci:`, `docs:`
- **Site config** is in `site/next.config.js` — registry name, description, URLs are set as `env` vars there
- **Icons** are shared across variants currently (all use `dragonos-sdr.png`)
- Workspace `friendly_name` drives the directory name under `workspaces/` and the auto-generated icon filename via `friendlyUrl()` (lowercase, spaces/special → hyphens)
