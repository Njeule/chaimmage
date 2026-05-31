# PromptWagon Website

React + Vite + Tailwind site for PromptWagon, a creative AI asset marketplace for free AI images and premium prompt packs.

## Live brand details

- Brand: PromptWagon
- Website: https://promptwagon.com
- Contact: info@promptwagon.com
- Ko-fi/shop: https://ko-fi.com/promptwagon
- Prompt pack price: $2.99

## Assets included

The project now includes:

- `public/logo.png` — PromptWagon full logo
- `public/icon.png` — PromptWagon icon/favicon

## Environment variables

Create a `.env` file or set these in your hosting dashboard:

```env
VITE_IMAGES_JSON_URL=https://assets.promptwagon.com/data/images.json
VITE_COLLECTIONS_JSON_URL=https://assets.promptwagon.com/data/collections.json
VITE_KOFI_URL=https://ko-fi.com/promptwagon
```

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The production output folder is:

```text
dist
```

## Cloudflare Pages settings

- Framework preset: Vite
- Build command: `npm run build`
- Build output directory: `dist`

## Notes

The site is configured for the live PromptWagon brand, pricing, shop URL, contact email, logo, icon, and launch licence terms.
