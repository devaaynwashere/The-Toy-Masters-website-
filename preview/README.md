# Temporary GitHub Pages catalogue

This standalone static preview reuses the main site's catalogue and admin components. Open `/The-Toy-Masters-website-/admin/` to test products, categories, markets, photos, settings and sample inbox statuses. It requires no password and has no database or real form submissions. The sample inbox contains fictional requests.

Edits and uploaded photos are saved in this browser's local storage and reflected in the catalogue in the same browser after navigating or refreshing. Other visitors see their own copy. Use **Reset demo** to return to the snapshot. Browser storage limits apply; use small photos. Clearing browser data also removes demo edits. Do not enter confidential client information. The live application's authentication, database and storage are unchanged.

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
