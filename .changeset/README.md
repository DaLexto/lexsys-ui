# Changesets

Maintainers add a changeset when a publish-facing change lands in `@lexsys/cli` or
`@lexsys/registry`:

```bash
pnpm changeset
```

The Release workflow on `main` opens a **Version packages** PR when changesets are
pending, then publishes to npm dist-tag **`next`** after that PR merges.

See [docs/DEPLOY.md](../docs/DEPLOY.md) and [docs/SCRIPTS.md](../docs/SCRIPTS.md).
