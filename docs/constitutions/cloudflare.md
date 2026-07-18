# Cloudflare Constitution

## Use Cloudflare Workers for

- Full-stack Next.js production deployment through `@opennextjs/cloudflare`
- Production-like local previews through Wrangler and `workerd`
- Future Cloudflare resource access through typed Worker bindings

## Required patterns

- Keep Next.js routes on the standard Node.js runtime and let OpenNext adapt the
  production build for Workers.
- Keep `nodejs_compat` enabled and use a current compatibility date in
  `wrangler.jsonc`.
- Keep `.open-next/worker.js` and `.open-next/assets` as the Worker entry point
  and static asset directory.
- Generate binding types with `npm run cf-typegen` after changing bindings.
- Store secrets with Wrangler or in the Cloudflare dashboard; never commit them
  to source or place them in `wrangler.jsonc`.
- Validate deployment compatibility with `npm run check:cloudflare`.
- Test runtime-sensitive behavior with `npm run preview`, not only `next dev`.
- Enable Workers observability and use structured logs for server-side failures.

## Prohibited patterns

- Using the deprecated `@cloudflare/next-on-pages` adapter
- Adding `runtime = "edge"` to Next.js routes handled by OpenNext
- Treating Cloudflare Pages as a full-stack Next.js deployment target
- Accessing Cloudflare resources through REST when an in-process binding exists
- Hand-writing Worker binding interfaces or committing secret values

## Deployment boundary

Cloudflare Workers is the supported full-stack deployment target. A Cloudflare
Pages target would require a separately designed static-export mode and removal
or replacement of every server-only route and feature.
