# Temporary GitHub Pages catalogue

This standalone static preview reuses the main site's catalogue components. It has no admin login, database, form submissions or private messages. The public catalogue snapshot lives in `catalogue.json`; local edits do not automatically appear online.

To refresh the snapshot while the full local site is running on port 5173:

```sh
node scripts/preview-snapshot.mjs
```

To build:

```sh
npx vite build --config preview/vite.config.mjs
node scripts/preview-pages.mjs
```

Publish the contents of `out` to the `gh-pages` branch. GitHub repository Settings → Pages uses that branch's root directory. Product routes have real index files so refreshing and sharing deep links works. The preview is marked noindex.

To stop hosting, unpublish the site in Settings → Pages. The full application and its local data remain separate from this static preview.
