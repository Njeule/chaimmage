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


## Display order

The website now uses these ordering rules:

- Homepage collections: featured first, then newest upload date.
- Homepage image preview: featured first, then newest upload date.
- Gallery page: newest images first.
- Collections page: featured collections first, then newest upload date.
- Collection detail page: manual `sortOrder` first, then title.

The ordering works best when your `images.json` and `collections.json` include:

```text
featured
sortOrder
uploadDate
```

The updated n8n v2 workflow outputs these fields.


## Licence and copyright update

The Licence page now includes:

- Dynamic copyright year using JavaScript.
- Free image licence.
- Attribution guidance.
- Paid prompt-pack licence.
- Restrictions on prompt resale and image library repackaging.
- Prohibited uses.
- AI-generated content disclaimer.
- Ko-fi/payment note.
- No exclusivity.
- No warranty.
- Terms update notice.
