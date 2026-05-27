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
- Eyebrows: `.eyebrow` class = Inter 11px, uppercase, tracking 0.2em, color oliva or tinta-suave
- Hero headline: Fraunces 64px desktop, 38px mobile, tracking -0.02em, line-height 1.05
- Buttons: primary=bg-oliva text-crema rounded-sm; secondary=border-oliva text-oliva rounded-sm
- Cards: rounded-2xl; Hero images: rounded-3xl; Buttons: rounded-sm
- Background: always crema or crudo — NEVER white
- Shadows: imperceptible / none
- Copy rules: NEVER em dash; NEVER all-caps except eyebrows; max 2 fonts

## 3. Active Plan
### Collection Images — completed 2026-05-27
- Generated 3 editorial flatlay collection images using real product references
- Updated all 3 collections in DB with new images

## 4. Recent Changes
- 2026-05-27 — Generated 3 collection images (flatlay editorial) using product references
- 2026-05-27 — Updated Rompers de Lino, Sets Kimono, Overoles collections with new images
- 2026-05-27 — Updated packaging image in TrapitoPackaging.tsx with user-uploaded real photo
- 2026-05-27 — Full PDP redesign: Fraunces title, crema/crudo bg, oliva buttons, stars rating
- 2026-05-27 — Added benefit bullets (OEKO-TEX, bordado a mano, empaque, heredable)
- 2026-05-27 — Added trust line below CTA (gift, shipping, returns, lock)
- 2026-05-27 — Added size guide accordion with table (0-3M / 3-6M / 6-12M)
- 2026-05-27 — Added FAQ accordion (material, artisan, packaging, shipping)
- 2026-05-27 — Added care instructions accordion (linen-specific washing tips)
- 2026-05-27 — Added sticky bar redesign: bg-tinta text-crema, CTA = bg-crema text-tinta
- 2026-05-27 — Created TrapitoRelatedProducts component (fetches 3 related products)
- 2026-05-27 — Updated EcommerceTemplate: bg-crema header, bg-tinta footer, vino cart badge
- 2026-05-27 — Full design system (index.css + tailwind.config.ts) with Trapito palette + Fraunces font
- 2026-05-27 — Created 12 products: 4 rompers, 4 sets kimono, 4 overoles (all with AI-generated images)

## 5. Image Inventory
- Logo: https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/temp_1779899822544_9bb8b9d3/1779899822544-i6kkb5mefds.png
- Hero baby: /hero-baby.jpg (also Supabase URL)
- Brand story: /brand-story.jpg
- Packaging (REAL PHOTO): https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/2951759c-e79e-4fd2-b408-bf60182e438e/1779907514878-iifo91wm43.webp
- **Collection Rompers**: https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/af49064e-4665-4110-9ef5-8e0dd089e9b4/rompers-de-lino.webp
- **Collection Kimono**: https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/af49064e-4665-4110-9ef5-8e0dd089e9b4/sets-kimono.webp
- **Collection Overoles**: https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/af49064e-4665-4110-9ef5-8e0dd089e9b4/overoles.webp
- Products: All 12 products have individual multi-image galleries (5 images each)

## 6. Known Issues
- 2026-05-27 — EcommerceTemplate header now has bg-crema — if homepage also renders it, may cause double header. But IndexUI wraps its own header, so EcommerceTemplate header is hidden on homepage (it only renders on inner pages). OK.

## 7. Pending / Future Sessions
- [high] Style Cart and Checkout pages with Trapito design
- [med] Add scroll-triggered fade-in animations (Intersection Observer)
- [med] Mobile nav refinements (hamburger menu for EcommerceTemplate)
- [med] Blog page with Trapito styling
- [low] Instagram feed section (real integration)
- [low] Size guide modal (optional, accordion is good for now)
- [low] "Guía de tallas" standalone page