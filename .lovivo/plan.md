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

### FEATURE: Página pública de rastreo de pedidos — ✅ COMPLETADO (2026-06-24)

**Archivos creados/editados:**
- ✅ CREADO: `src/pages/OrderTrack.tsx` — wrapper con SEO(noindex) + useParams → OrderTrackUI
- ✅ CREADO: `src/pages/ui/OrderTrackUI.tsx` — UI completa con modo token + modo lookup + timeline Shopify-style + delivery estimate + carrier/tracking + eventos collapsible. Design system Trapito (crema/oliva/Fraunces).
- ✅ EDITADO: `src/App.tsx` — rutas `/orders/track` y `/orders/track/:token`
- ✅ EDITADO: `src/pages/ui/MyOrdersUI.tsx` — botón "Rastrear pedido" + chip paquetería + entrega estimada en OrderCard
- ✅ EDITADO: `src/pages/ThankYou.tsx` — estado `trackToken` + CTA "Rastrear mi pedido" en Action Buttons
- ✅ EDITADO: `src/templates/EcommerceTemplate.tsx` — link "Rastrear pedido" en nav principal + fix footer ("bordado a mano" → "OEKO-TEX")

**Notas de implementación:**
- `display_mode === 'masked'` oculta carrier/tracking/eventos (marca blanca)
- Formulario lookup: order_number + email → callEdge('order-track', { store_id, order_number, email })
- Token mode: callEdge('order-track', { token }) al montar
- MyOrdersUI: campos checkout_token/tracking_url/estimated_delivery_at vienen del select('*') de orders_customer VIEW — si no llegan, es ajuste de backend, NO editar el adapter

## 4. Recent Changes
- 2026-06-24 — Order Tracking completo: OrderTrack.tsx + OrderTrackUI.tsx + rutas App.tsx + MyOrdersUI CTA + ThankYou CTA + nav link + footer fix
- 2026-06-18 — Fix Meta duplicate conversions: `generateEventId` ahora es determinístico por (eventName, stableId). Purchase usa order_id, ViewContent/AddToCart usan product.id, InitiateCheckout usa order_id || product.id, Search usa el search string. Además: sessionStorage guard en los 3 call sites de trackPurchase (StripePayment ×2, ProductExpressCheckout ×1). Cinturón + tirantes.
- 2026-06-18 — TrapitoPackaging: CTA "Personalizar tu regalo" → "Ver sets", now scrolls to products section
- 2026-06-18 — TrapitoPackaging: description ending updated + "Caja rígida con cierre magnético" → "Caja elegante"
- 2026-06-18 — TrapitoHistoria: CTA "Conoce nuestro proceso" → "Regala un pedacito de México", links to #packaging section
- 2026-06-08 — TrapitoHistoria: imagen reemplazada por foto real del usuario (bebé de pie, Overol Tecuán azul marino, sonriendo, con planta y canasto)
- 2026-06-08 — TrapitoHistoria: título cambiado a "México en la piel."
- 2026-06-08 — TrapitoProductos: corregida lógica de agrupamiento — Kits tienen tags:null, ahora se detectan por title.startsWith('kit')
- 2026-06-08 — TrapitoCategorias + TrapitoProductos: "Conjuntos de lino" renombrado a "Kits: bloomer y camisa de lino"
- 2026-06-08 — Todas las descripciones culturales de los 11 productos actualizadas
- 2026-06-08 — Tagline del logo actualizado a "ropa creada para ellos, pensada en tus raíces"
- 2026-06-08 — Overol Jaguar renombrado a "Overol Tecuán" + descripción cultural
- 2026-06-08 — Hero eyebrow cambiado a "Ropita de bebé con alma mexicana"

## 5. Image Inventory
- Logo: https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/temp_1779899822544_9bb8b9d3/1779899822544-i6kkb5mefds.png
- **Hero baby (REAL PHOTO)**: https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/2951759c-e79e-4fd2-b408-bf60182e438e/1779985000373-sw44cedayzi.webp
- **Historia Lifestyle v6 (bebé de pie + Overol Tecuán — ACTIVA, FOTO REAL)**: https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/2951759c-e79e-4fd2-b408-bf60182e438e/1780944021876-kni6bk94b2.webp ✅ ACTIVA
- **Packaging (REAL PHOTO)**: https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/2951759c-e79e-4fd2-b408-bf60182e438e/1780441100857-hzp3nn512i4.webp
- **Collection Overoles**: https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/2951759c-e79e-4fd2-b408-bf60182e438e/1780434644279-ljqrm7rcf2i.webp
- **Collection Conjuntos de lino**: https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/2951759c-e79e-4fd2-b408-bf60182e438e/1780434644279-svol4owvr5.webp
- **Collection Rompers**: https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/2951759c-e79e-4fd2-b408-bf60182e438e/1780434644279-mgic12rq78r.webp
- Products: All 12 products have individual multi-image galleries

## 6. Known Issues
- ⚠️ ORDER TRACKING: `orders_customer` VIEW debe exponer checkout_token/tracking_number/tracking_url/shipping_carrier/estimated_delivery_at para que el CTA en MyOrders funcione. El adapter es Tipo C (no editar) y usa select('*'). Si los campos no llegan, es la VIEW de backend la que debe actualizarse.
- ⚠️ TAGS KITS: Los 4 productos Kit tienen tags:null. El frontend los detecta por title.startsWith('kit').
- 2026-05-27 — EcommerceTemplate header now has bg-crema — if homepage also renders it, may cause double header. OK since IndexUI wraps its own header.
- ⚠️ PROTOCOLO PRECIOS: Al actualizar precios, siempre actualizar TANTO `price` del producto COMO `variants_config`.
- ⚠️ PROTOCOLO IMAGEGEN: SIEMPRE usar ecommerce--list-data(type='products') primero + pasar reference_images reales.

## 7. Pending / Future Sessions
- [high] Mejoras PDP: reseñas con fotos, sección unboxing, o historia de prenda
- [high] Style Cart and Checkout pages with Trapito design
- [med] ¿Re-estilizar MyOrdersUI + ThankYou con design system Trapito? (hoy usan colores genéricos)
- [med] Add scroll-triggered fade-in animations (Intersection Observer)
- [med] Mobile nav refinements (hamburger menu for EcommerceTemplate)
- [med] Blog page with Trapito styling
- [low] Instagram feed section (real integration)
- [low] Size guide modal
- [low] "Guía de tallas" standalone page