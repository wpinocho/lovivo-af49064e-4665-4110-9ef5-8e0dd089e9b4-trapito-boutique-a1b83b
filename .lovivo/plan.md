# Store Plan — Trapito

## 1. Brand & Context
- Brand name: TRAPITO
- Product / category: Ropa de bebé premium — rompers, conjuntos de lino, overoles; lino y algodón natural
- Target audience: Madres mexicanas 25-38 años, baby showers, regalos de recién nacido, compradores conscientes
- Market / region: México (CDMX, Monterrey, Guadalajara, Mérida). Envío nacional.
- Tone & voice: Cálido, editorial, íntimo. No folclórico. No agresivo. Estética Konges Sløjd × Mi Golondrina × Liewood.
- Key positioning bullets:
  - "Ropa creada para ellos, pensada en tus raíces" — tagline principal
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
- 2026-06-08 — TrapitoHistoria: imagen reemplazada por foto real del usuario (bebé de pie, Overol Tecuán azul marino, sonriendo, con planta y canasto)
- 2026-06-08 — TrapitoHistoria: título cambiado a "México en la piel."
- 2026-06-08 — TrapitoHistoria: imagen actualizada a bebé 8 meses usando Overol Tecuán azul marino (foto editorial con plantas y cobija de lino)
- 2026-06-08 — TrapitoProductos: corregida lógica de agrupamiento — Kits tienen tags:null, ahora se detectan por title.startsWith('kit'); Rompers por tag 'romper'. Las 3 secciones ahora muestran productos correctamente.
- 2026-06-08 — TrapitoCategorias + TrapitoProductos: "Conjuntos de lino" renombrado a "Kits: bloomer y camisa de lino" para coincidir con la nomenclatura del usuario.
- 2026-06-08 — TrapitoCategorias: clicks ahora hacen scroll suave a grupos por categoría en TrapitoProductos (productos-overoles / productos-conjuntos / productos-rompers). No más 404.
- 2026-06-08 — TrapitoProductos: productos agrupados en 3 secciones con ID de ancla (overoles / conjuntos / rompers) y subheader por grupo.
- 2026-06-08 — Todas las descripciones culturales de los 11 productos actualizadas (4 Kits + 3 Overoles + 4 Rompers). Cada producto tiene ahora 2-3 líneas de contexto cultural ajustado a su motivo.
- 2026-06-08 — Tagline del logo (TrapitoBrandLogo) actualizado a "ropa creada para ellos, pensada en tus raíces"
- 2026-06-08 — Overol Jaguar renombrado a "Overol Tecuán" + descripción cultural de las máscaras de Tecuán
- 2026-06-08 — Hero eyebrow cambiado a "Ropita de bebé con alma mexicana"
- 2026-06-04 — Precios de VARIANTES corregidos en los 8 productos afectados: 4 Kits (variantes $1,190) + 4 Overoles (variantes $990).
- 2026-06-03 — Precios actualizados: 4 Kits $1,190 / 4 Overoles $990 / 4 Rompers $890
- 2026-06-03 — TrapitoHistoria: imagen v4 generada CON 4 reference_images reales (Kit de chile)
- 2026-06-02 — TrapitoPackaging: imagen de empaque reemplazada con nueva foto

## 5. Image Inventory
- Logo: https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/temp_1779899822544_9bb8b9d3/1779899822544-i6kkb5mefds.png
- **Hero baby (REAL PHOTO)**: https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/2951759c-e79e-4fd2-b408-bf60182e438e/1779985000373-sw44cedayzi.webp
- **Historia Lifestyle v6 (bebé de pie + Overol Tecuán — ACTIVA, FOTO REAL)**: https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/2951759c-e79e-4fd2-b408-bf60182e438e/1780944021876-kni6bk94b2.webp ✅ ACTIVA
- **Historia Lifestyle v5 (deprecated)**: https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/af49064e-4665-4110-9ef5-8e0dd089e9b4/historia-bebe-overol.webp ❌ DEPRECATED
- **Packaging (REAL PHOTO — nueva)**: https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/2951759c-e79e-4fd2-b408-bf60182e438e/1780441100857-hzp3nn512i4.webp
- **Collection Overoles (REAL — new)**: https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/2951759c-e79e-4fd2-b408-bf60182e438e/1780434644279-ljqrm7rcf2i.webp
- **Collection Conjuntos de lino (REAL — new)**: https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/2951759c-e79e-4fd2-b408-bf60182e438e/1780434644279-svol4owvr5.webp
- **Collection Rompers (REAL — new)**: https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/2951759c-e79e-4fd2-b408-bf60182e438e/1780434644279-mgic12rq78r.webp
- Products: All 12 products have individual multi-image galleries

## 6. Known Issues
- ⚠️ TAGS KITS: Los 4 productos Kit (chile, cactus, escarabajo, milpa) tienen tags:null en la DB. El frontend los detecta por title.startsWith('kit'). Si se crean kits con otro naming, no se agruparán correctamente.
- 2026-05-27 — EcommerceTemplate header now has bg-crema — if homepage also renders it, may cause double header. OK since IndexUI wraps its own header.
- ⚠️ PROTOCOLO PRECIOS: Al actualizar precios, siempre actualizar TANTO `price` del producto COMO `variants_config` con los precios de cada variante.
- ⚠️ PROTOCOLO IMAGEGEN: SIEMPRE usar ecommerce--list-data(type='products') primero + pasar reference_images reales al generar imágenes con productos.

## 7. Pending / Future Sessions
- [high] Mejoras PDP: reseñas con fotos, sección unboxing, o historia de prenda (definir con owner)
- [high] Style Cart and Checkout pages with Trapito design
- [med] Add scroll-triggered fade-in animations (Intersection Observer)
- [med] Mobile nav refinements (hamburger menu for EcommerceTemplate)
- [med] Blog page with Trapito styling
- [low] Instagram feed section (real integration)
- [low] Size guide modal (optional, accordion is good for now)
- [low] "Guía de tallas" standalone page