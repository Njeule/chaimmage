# chaimmage Website — Updated Tailwind v4 Version

This version fixes the Tailwind/PostCSS error by using the official Tailwind Vite plugin.

## Test locally

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal.

## Build test

```bash
npm run build
```

## Cloudflare Pages settings

Framework preset:

```text
Vite
```

Build command:

```text
npm run build
```

Build output directory:

```text
dist
```

## Environment variables

For sample data, you do not need any environment variables.

When your Cloudflare R2 JSON files are ready, set:

```text
VITE_IMAGES_JSON_URL=https://images.yourdomain.com/data/images.json
VITE_COLLECTIONS_JSON_URL=https://images.yourdomain.com/data/collections.json
VITE_KOFI_URL=https://ko-fi.com/chaimmage
```

## Notes

- Prompt pack price is set to $1.99.
- No login is required.
- Donation link goes to https://ko-fi.com/chaimmage.
