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
- `.scrollbar-none` utility added to index.css (hide scrollbar for carousels)

## 3. Active Plan
### All homepage sections — completed 2026-05-28
- Hero: real baby photo (green linen romper with deer embroidery)
- Categorias: real product photos (overoles, kimonos, rompers) — swipeable carousel on mobile
- Historia: AI-generated artisan embroidery photo (hands + deer motif on sage green linen)
- Packaging: real photo
- Productos: shows all 12, "Agregar al carrito" funcional, imagen → PDP

### PDP mobile — completed 2026-05-28
- Gallery: full-bleed on mobile (-mx-6), thumbnails below carousel with API sync
- Sticky bar: solid bg-tinta (no opacity), single-row layout on mobile
- Related products: full-bleed carousel with card peek on mobile

## 4. Recent Changes
- 2026-05-28 — TrapitoTestimonios: updated 3 testimonial texts to more natural/authentic copy
- 2026-05-28 — PDP sticky bar: bg-tinta solid, single-row mobile (image+title+comprar/price)
- 2026-05-28 — PDP gallery mobile: full-bleed (-mx-6), reduced top padding, thumbnails with carousel API sync
- 2026-05-28 — TrapitoRelatedProducts: full-bleed carousel on mobile (-mx-6 + pl-6), card peek with 70vw width
- 2026-05-28 — TrapitoRelatedProducts: carousel + filtra por tipo de producto (romper/kimono/overol) + acepta productTags prop
- 2026-05-28 — ProductPageUI: pasa productTags a TrapitoRelatedProducts para filtrar por colección real
- 2026-05-28 — TrapitoProductos: muestra los 12 productos, renombrado "Nuestros productos", botón "Agregar al carrito" funcional (useCart + openCart)
- 2026-05-28 — TrapitoCategorias: carrusel swipeable en mobile (overflow-x-auto + snap), grid en desktop
- 2026-05-28 — index.css: añadida clase .scrollbar-none para carruseles
- 2026-05-28 — Generated artisan embroidery image for TrapitoHistoria (hands + deer on linen hoop)
- 2026-05-28 — Replaced hero image with user-uploaded real lifestyle photo (baby in green romper)
- 2026-05-27 — Generated 3 collection images (flatlay editorial) using product references
- 2026-05-27 — Updated packaging image in TrapitoPackaging.tsx with user-uploaded real photo
- 2026-05-27 — Full PDP redesign: Fraunces title, crema/crudo bg, oliva buttons, stars rating
- 2026-05-27 — Added sticky bar redesign: bg-tinta text-crema, CTA = bg-crema text-tinta

## 5. Image Inventory
- Logo: https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/temp_1779899822544_9bb8b9d3/1779899822544-i6kkb5mefds.png
- **Hero baby (REAL PHOTO)**: https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/2951759c-e79e-4fd2-b408-bf60182e438e/1779985000373-sw44cedayzi.webp
- **Brand Story (AI — artisan hands)**: https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/af49064e-4665-4110-9ef5-8e0dd089e9b4/brand-story.webp
- Packaging (REAL PHOTO): https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/2951759c-e79e-4fd2-b408-bf60182e438e/1779907514878-iifo91wm43.webp
- **Collection Overoles (REAL)**: https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/2951759c-e79e-4fd2-b408-bf60182e438e/1779981567518-ch4t0nk71gt.webp
- **Collection Kimono (REAL)**: https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/2951759c-e79e-4fd2-b408-bf60182e438e/1779981567518-ktiddj8yec9.webp
- **Collection Rompers (REAL)**: https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/2951759c-e79e-4fd2-b408-bf60182e438e/1779981567518-8p77etf0262.webp
- Products: All 12 products have individual multi-image galleries (5 images each)

## 6. Known Issues
- 2026-05-27 — EcommerceTemplate header now has bg-crema — if homepage also renders it, may cause double header. But IndexUI wraps its own header, so EcommerceTemplate header is hidden on homepage. OK.

## 7. Pending / Future Sessions
- [high] Style Cart and Checkout pages with Trapito design
- [med] Add scroll-triggered fade-in animations (Intersection Observer)
- [med] Mobile nav refinements (hamburger menu for EcommerceTemplate)
- [med] Blog page with Trapito styling
- [low] Instagram feed section (real integration)
- [low] Size guide modal (optional, accordion is good for now)
- [low] "Guía de tallas" standalone page