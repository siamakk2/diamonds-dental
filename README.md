# Diamond's Dental Inc. — La Habra, CA

Bilingual (English/Spanish) website for Diamond's Dental Inc., a general,
restorative, cosmetic and orthodontic dental practice at 331 E La Habra Blvd,
La Habra, CA 90631 · (562) 448-3018.

## Structure

- `index.html` — home: practice overview, photos, services, insurance, FAQ
- `services.html` — treatment detail (`/services`)
- `office.html` — office photos, hours, map, first visit (`/office`)
- `contact.html` — appointment request form, insurance (`/contact`)
- `style.css` / `app.js` — design system and shared behaviour
- `assets/` — practice logo and office photography
- `llms.txt` — structured practice summary for AI assistants and answer engines
- `robots.txt`, `sitemap.xml` — crawler directives
- `vercel.json` — clean URLs and asset caching

Static site, no build step. Deployed on Vercel from `main`.

## Pending

- Replace `OFFICE_EMAIL` in `app.js` with the real office address
- Optional About section once a dentist bio is provided
