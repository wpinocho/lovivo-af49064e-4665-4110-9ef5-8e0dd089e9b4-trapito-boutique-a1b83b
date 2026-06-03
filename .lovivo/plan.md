# Store Plan — Trapito

## 1. Brand & Context
- Brand name: TRAPITO
- Product / category: Ropa de bebé premium — rompers, conjuntos de lino, overoles; lino y algodón natural
- Target audience: Madres mexicanas 25-38 años, baby showers, regalos de recién nacido, compradores conscientes
- Market / region: México (CDMX, Monterrey, Guadalajara, Mérida). Envío nacional.
- Tone & voice: Cálido, editorial, íntimo. No folclórico. No agresivo. Estética Konges Sløjd × Mi Golondrina × Liewood.
- Key positioning bullets:
  - "Babywear mexicano contemporáneo" — no souvenir, sí iconografía artesanal
  - Lino + algodón OEKO-TEX
  - Bordados con motivos de la tradición artesanal mexicana (NO son a mano — NO decir "bordado a mano")
  - Empaque de regalo premium incluido
  - Prendas heredables, para guardar y pasar
  - 0-12 meses, 3 siluetas: romper / conjuntos de lino (camisa+bloomer) / overol
- ⚠️ REGLA DE COPY: NUNCA decir "bordado a mano", "hecho a mano", "artesanos" como autores del bordado. El bordado es por máquina pero con DISEÑOS de iconografía artesanal mexicana auténtica.

## 2. Design System
- Colors (HSL CSS vars): crema(33 57% 92%), crudo(34 43% 88%), lino(33 39% 82%), rosa-polvo(3 57% 80%), vino(342 47% 33%), oliva(72 36% 34%), oliva-oscuro(73 36% 25%), mostaza(38 60% 56%), verde-tenue(110 23% 74%), tinta(20 9% 15%), tinta-suave(21 16% 37%)
- Typography: Fraunces (display/headings, optical sizing, italic support) + Inter (body/UI)
- Eyebrows: `.eyebrow` class = Inter 11px, uppercase, tracking 0.2em, color oliva or tinta-suave
- Hero headline: Fraunces 64px desktop, 38px mobile, tracking -0.02em, line-height 1.05
- Buttons: primary=bg-oliva text-crema rounded-sm; secondary=border-oliva text-oliva rounded-sm
- Cards: rounded-2xl; Hero images: rounded-3xl; Buttons: rounded-sm
- Background: always crema or crudo — NEVER white
- Shadows: imperceptible / none
- Copy rules: NEVER em dash; NEVER all-caps except eyebrows; max 2 fonts; NEVER "bordado a mano"
- `.scrollbar-none` utility added to index.css (hide scrollbar for carousels)

## 3. Active Plan
### Próximas mejoras PDP — PENDING
- Propuestas: (1) Reseñas con fotos + estrellas, (2) sección "Así llega tu pedido", (3) historia de la prenda
- Decisión pendiente del owner antes de implementar

## 4. Recent Changes
- 2026-06-03 — Precios actualizados: 4 Kits $1,190 / 4 Overoles $990 / 4 Rompers $890 (ya estaban)
- 2026-06-03 — TrapitoHistoria: imagen v4 generada CON 4 reference_images reales (Kit de chile) — bebé recién nacido en brazos de mamá, camisa crema con chile bordado en pecho, short verde sage con chile bordado, luz ventana perfecta, fondo lino crema
- 2026-06-02 — TrapitoHistoria: imagen v3 generada CON reference_images reales (4 fotos Kit de chile) — bebé en lino verde con chile bordado visible en camisa Y short, manos mamá sobre sábana crema, luz ventana perfecta
- 2026-06-02 — TrapitoHistoria: imagen v2 generada CON reference_images reales del Kit de chile — bebé despierto en brazos, conjunto verde+chile bordeado visible, luz ventana, match perfecto con producto real
- 2026-06-02 — TrapitoHistoria: nueva imagen lifestyle (bebé dormido en conjunto lino verde+chile bordado, brazos mamá, luz natural)
- 2026-06-02 — TrapitoPackaging: imagen de empaque reemplazada con nueva foto (conjunto lino crema+verde+chile bordado en caja abierta)
- 2026-06-02 — COMPLETADO: Eliminadas todas las menciones de "bordado a mano" en 3 archivos (Hero badge, Hero alt, Historia copy+alt, PDP benefit bullet)
- 2026-06-02 — TrapitoCategorias: nuevas imágenes reales de las 3 categorías + "Sets kimono" renombrado a "Conjuntos de lino"
- 2026-05-28 — TrapitoTestimonios: updated 3 testimonial texts to more natural/authentic copy
- 2026-05-28 — PDP sticky bar: bg-tinta solid, single-row mobile (image+title+comprar/price)
- 2026-05-28 — PDP gallery mobile: full-bleed (-mx-6), reduced top padding, thumbnails with carousel API sync
- 2026-05-28 — TrapitoRelatedProducts: full-bleed carousel on mobile (-mx-6 + pl-6), card peek with 70vw width
- 2026-05-28 — TrapitoRelatedProducts: carousel + filtra por tipo de producto (romper/kimono/overol) + acepta productTags prop
- 2026-05-28 — ProductPageUI: pasa productTags a TrapitoRelatedProducts para filtrar por colección real
- 2026-05-28 — TrapitoProductos: muestra los 12 productos, renombrado "Nuestros productos", botón "Agregar al carrito" funcional (useCart + openCart)

## 5. Image Inventory
- Logo: https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/temp_1779899822544_9bb8b9d3/1779899822544-i6kkb5mefds.png
- **Hero baby (REAL PHOTO)**: https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/2951759c-e79e-4fd2-b408-bf60182e438e/1779985000373-sw44cedayzi.webp
- **Historia Lifestyle v4 (AI — CON 4 reference_images reales Kit de chile)**: https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/af49064e-4665-4110-9ef5-8e0dd089e9b4/historia-lifestyle-v4.webp — Bebé recién nacido en brazos mamá, camisa crema+chile bordado, short verde sage+chile bordado, luz ventana, lino crema. ✅ ACTIVA
- **Historia Lifestyle v3 (DEPRECATED)**: https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/af49064e-4665-4110-9ef5-8e0dd089e9b4/historia-lifestyle-v3.webp ⚠️ Reemplazada por v4
- **Historia Lifestyle v2 (DEPRECATED)**: https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/af49064e-4665-4110-9ef5-8e0dd089e9b4/historia-lifestyle-v2.webp ⚠️ Reemplazada por v3
- **Historia Lifestyle v1 (DEPRECATED)**: https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/af49064e-4665-4110-9ef5-8e0dd089e9b4/historia-lifestyle.webp ⚠️ Sin referencia real
- **Brand Story OLD (DEPRECATED)**: https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/af49064e-4665-4110-9ef5-8e0dd089e9b4/brand-story.webp ⚠️ Ya no se usa
- **Packaging (REAL PHOTO — nueva)**: https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/2951759c-e79e-4fd2-b408-bf60182e438e/1780441100857-hzp3nn512i4.webp
- **Collection Overoles (REAL — new)**: https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/2951759c-e79e-4fd2-b408-bf60182e438e/1780434644279-ljqrm7rcf2i.webp
- **Collection Conjuntos de lino (REAL — new)**: https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/2951759c-e79e-4fd2-b408-bf60182e438e/1780434644279-svol4owvr5.webp
- **Collection Rompers (REAL — new)**: https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/2951759c-e79e-4fd2-b408-bf60182e438e/1780434644279-mgic12rq78r.webp
- Products: All 12 products have individual multi-image galleries

## 6. Known Issues
- 2026-05-27 — EcommerceTemplate header now has bg-crema — if homepage also renders it, may cause double header. But IndexUI wraps its own header, so EcommerceTemplate header is hidden on homepage. OK.
- ⚠️ PROTOCOLO IMAGEGEN: SIEMPRE usar ecommerce--list-data(type='products') primero + pasar reference_images reales al generar imágenes con productos. Sin referencia → imagen genérica que no se parece al producto.

## 7. Pending / Future Sessions
- [high] Mejoras PDP: reseñas con fotos, sección unboxing, o historia de prenda (definir con owner)
- [high] Style Cart and Checkout pages with Trapito design
- [med] Add scroll-triggered fade-in animations (Intersection Observer)
- [med] Mobile nav refinements (hamburger menu for EcommerceTemplate)
- [med] Blog page with Trapito styling
- [low] Instagram feed section (real integration)
- [low] Size guide modal (optional, accordion is good for now)
- [low] "Guía de tallas" standalone page