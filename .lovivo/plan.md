# Store Plan — Trapito

## 1. Brand & Context
- Brand name: TRAPITO
- Product / category: Ropa de bebé premium — rompers, sets kimono, overoles; lino y algodón natural
- Target audience: Madres mexicanas 25-38 años, baby showers, regalos de recién nacido, compradores conscientes
- Market / region: México (CDMX, Monterrey, Guadalajara, Mérida). Envío nacional.
- Tone & voice: Cálido, editorial, íntimo. No folclórico. No agresivo. Estética Konges Sløjd × Mi Golondrina × Liewood.
- Key positioning bullets:
  - "Babywear mexicano contemporáneo" — no souvenir, sí artesanía auténtica
  - Lino + algodón OEKO-TEX, bordado a mano por artesanos
  - Empaque de regalo premium incluido
  - Prendas heredables, para guardar y pasar
  - 0-12 meses, 3 siluetas: romper / set kimono / overol

## 2. Design System
- Colors (HSL CSS vars): crema(33 57% 92%), crudo(34 43% 88%), lino(33 39% 82%), rosa-polvo(3 57% 80%), vino(342 47% 33%), oliva(72 36% 34%), oliva-oscuro(73 36% 25%), mostaza(38 60% 56%), verde-tenue(110 23% 74%), tinta(20 9% 15%), tinta-suave(21 16% 37%)
- Typography: Fraunces (display/headings, optical sizing, italic support) + Inter (body/UI)
- Eyebrows: Inter 11px, uppercase, tracking 0.2em, color oliva or vino
- Hero headline: Fraunces 64px desktop, 38px mobile, tracking -0.02em, line-height 1.05
- Buttons: primary=bg-oliva text-crema; secondary=border-oliva text-oliva; pill=rounded-sm
- Cards: rounded-2xl; Hero images: rounded-3xl; Buttons: rounded-sm
- Background: always crema or crudo — NEVER white
- Shadows: imperceptible / none
- Copy rules: NEVER em dash; NEVER all-caps except eyebrows; max 2 fonts

## 3. Active Plan
### Homepage MVP — completed 2026-05-27
- Status: done
- Files: src/index.css, tailwind.config.ts, src/pages/ui/IndexUI.tsx, src/pages/Index.tsx, src/components/sections/*, src/components/BrandLogoLeft.tsx, index.html

## 4. Recent Changes
- 2026-05-27 — Full design system (index.css + tailwind.config.ts) with Trapito palette + Fraunces font
- 2026-05-27 — Created 12 products: 4 rompers, 4 sets kimono, 4 overoles (all with AI-generated images)
- 2026-05-27 — Created 3 collections: Rompers de Lino, Sets Kimono, Overoles
- 2026-05-27 — Built 10 section components in src/components/sections/
- 2026-05-27 — Rewrote IndexUI.tsx with full Trapito landing page (12 sections)
- 2026-05-27 — Updated BrandLogoLeft.tsx with Trapito logo
- 2026-05-27 — Updated SEO meta tags (Index.tsx + index.html)
- 2026-05-27 — Added Fraunces font to index.html Google Fonts import
- 2026-05-27 — Generated hero-baby.jpg, brand-story.jpg, packaging.jpg (AI)

## 5. Image Inventory
- Logo: https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/temp_1779899822544_9bb8b9d3/1779899822544-i6kkb5mefds.png
- Hero baby: /hero-baby.jpg (also Supabase URL)
- Brand story: /brand-story.jpg
- Packaging: /packaging.jpg
- Cat Rompers: https://...1779899822545-layt2mkpcua.png
- Cat Kimono: https://...1779899822545-s23vyafcqkb.png
- Cat Overoles: https://...1779899822545-qk7s7uxc6u.png
- Products: romper-caiman, romper-papaya, romper-pinata, romper-venado, kimono-bugambilia, kimono-xolo, kimono-quetzal, kimono-chile (all in Supabase)
- Overol products: 4 products use cat-overol.jpg (need individual shots — next session)

## 6. Known Issues
- 2026-05-27 — Overol products (Maíz, Magey, Volcán, Nopal) share the same category image. Individual product images needed (hit image generation limit in this session).
- 2026-05-27 — EcommerceTemplate still renders on inner pages (Product, Cart, Checkout) — that's fine, Trapito header/footer style only applies to homepage via IndexUI

## 7. Pending / Future Sessions
- [high] Generate individual images for 4 overol products
- [high] Style the Product Detail Page (PDP) with Trapito design
- [high] Style Cart and Checkout with Trapito colors
- [med] Add scroll-triggered fade-in animations (Intersection Observer)
- [med] Mobile nav refinements
- [med] Blog page with Trapito styling
- [low] Instagram feed section (real integration)
- [low] Size guide modal
- [low] "Guía de tallas" page