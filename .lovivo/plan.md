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

### FEATURE: Página pública de rastreo de pedidos (Order Tracking)

**Estado:** Planeado — listo para construir en Craft Mode. Backend ya desplegado.

**Qué quiere el owner (en términos de negocio):**
Que el cliente pueda ver el estado de su pedido (timeline tipo Shopify: Confirmado → Preparando → Enviado → Entregado), la paquetería, número de guía, link de rastreo y fecha estimada de entrega. Accesible desde el link del email de envío, desde "Mis Pedidos" y desde la pantalla de Gracias.

**Backend (YA LISTO, no tocar):**
- Edge function `order-track` acepta `{ token }` o `{ store_id, order_number, email }`.
- Devuelve: timeline / steps[] / current_step / cancelled / carrier / tracking_number / tracking_url / estimated_delivery_at / events[] / display_mode ('detailed' | 'masked').
- Los emails de envío enlazan a `https://{dominio}/orders/track/{checkout_token}`.

**Hallazgos del codebase (importantes):**
1. `callEdge('order-track', payload)` existe en `src/lib/edge.ts` y es público (no requiere auth). ✅ usar este helper.
2. `SEO` component (`src/components/SEO.tsx`) soporta prop `noindex`. ✅ usar `<SEO title="Rastrea tu pedido" noindex />`.
3. `STORE_ID` se importa de `@/lib/config` (ya usado en ThankYou). ✅
4. ⚠️ **`src/adapters/MyOrdersAdapter.tsx` es TIPO C — FORBIDDEN, NO EDITAR.** PERO usa `.from('orders_customer').select('*', ...)` — el `*` ya trae TODOS los campos que la VIEW `orders_customer` exponga. Por lo tanto NO hace falta agregar campos manualmente al select. Si `checkout_token / tracking_number / tracking_url / shipping_carrier / estimated_delivery_at` NO llegan en el objeto order, significa que la VIEW `orders_customer` no los expone (eso sería un cambio de backend, fuera del template). **Acción: verificar en runtime qué campos trae `order` antes de asumir que faltan. NO editar el adapter.**
5. ThankYou (`src/pages/ThankYou.tsx`) ya tiene acceso a `order` y al `checkout_token` (vía `localStorage` CHECKOUT_KEY = `checkout:${STORE_ID}`). Es Tipo B, editable.
6. ⚠️ **Decisión de diseño:** MyOrdersUI y ThankYou usan colores genéricos de plantilla (primary/muted), NO el design system Trapito (crema/oliva/Fraunces). El owner ya pidió antes "no usar colores genéricos de la plantilla". **Recomendación: la nueva página de tracking debe usar el design system Trapito (fondo crema, acentos oliva, headings Fraunces, botones rounded-sm) para mantener coherencia de marca, NO el look genérico de MyOrdersUI.** Confirmar con owner si quiere que también re-estilicemos MyOrdersUI/ThankYou (fuera de scope por ahora).

**Pasos de implementación (Craft Mode):**

1. **Crear `src/pages/OrderTrack.tsx`** (página delgada, Tipo B):
   - Lee `:token` de la URL con `useParams`.
   - Renderiza `<SEO title="Rastrea tu pedido" noindex />` + `<OrderTrackUI token={token} />`.
   - Envuelve en `EcommerceTemplate` (o lo hace OrderTrackUI internamente, como MyOrdersUI).

2. **Crear `src/pages/ui/OrderTrackUI.tsx`** (UI editable, Tipo B):
   - **Modo token** (`/orders/track/:token`): al montar, `callEdge('order-track', { token })`.
   - **Modo lookup** (`/orders/track` sin token): formulario con `order_number` + `email` → `callEdge('order-track', { store_id: STORE_ID, order_number, email })`.
   - **Timeline visual (estilo Shopify):** 4 pasos desde `steps[]`, `current_step` pinta el progreso (●━━●━━○━━○ Confirmado/Preparando/Enviado/Entregado con check ✓ en completados, ● en actual, ○ en pendientes, fecha bajo cada paso). Usar colores Trapito: oliva para completados/activo, lino/crudo para pendientes.
   - Si `cancelled: true` → banner vino (rojo Trapito) "Pedido cancelado".
   - Bloque destacado **"Entrega estimada"** con `estimated_delivery_at`, formato `d MMM yyyy` con `date-fns/locale/es`.
   - Bloque **carrier** (SOLO si `display_mode === 'detailed'`): nombre/logo carrier, `tracking_number` copiable (botón copiar), botón "Rastrear con la paquetería" → `tracking_url` (target _blank).
   - Lista **`events[]` colapsable** (Collapsible shadcn): `occurred_at` + `status_detail` + `location`.
   - Si `display_mode === 'masked'`: ocultar carrier/tracking/eventos, mostrar SOLO timeline + entrega estimada (marca blanca).
   - **Estados:** loading skeleton (Skeleton shadcn), error 404 ("No encontramos tu pedido" + sugerir revisar el link o usar lookup), error genérico (reintentar).
   - Strings en español. Estilo Trapito (fondo crema, headings Fraunces, botones rounded-sm bg-oliva).

3. **Registrar rutas en `src/App.tsx`:**
   ```
   const OrderTrack = lazy(() => import('./pages/OrderTrack'));
   ...
   <Route path="/orders/track" element={<OrderTrack />} />
   <Route path="/orders/track/:token" element={<OrderTrack />} />
   ```
   - ⚠️ Usar `/orders/track/...` (NO `/pedidos/rastrear/...`) porque es la URL que arma Lovivo en los emails (`buildTrackingUrl`).

4. **Conectar `src/pages/ui/MyOrdersUI.tsx`** (Tipo B):
   - Dentro de `OrderCard`, en `CollapsibleContent` después de la dirección de envío:
     - Si `order.checkout_token` existe → botón principal "Rastrear pedido" → `navigate('/orders/track/' + order.checkout_token)`.
     - Si `order.tracking_number` existe → chip secundario con el número; si `order.tracking_url`, link externo "Ver en la paquetería".
     - Si `order.estimated_delivery_at` existe → línea "Entrega estimada: {fecha}" (formato d MMM yyyy, locale es).
   - ⚠️ NO editar MyOrdersAdapter (Tipo C). Confiar en `select('*')`. Verificar en runtime que los campos lleguen; si no llegan, es tema de la VIEW de backend (reportar, no parchear el adapter).

5. **`src/pages/ThankYou.tsx`** (Tipo B, opcional pero recomendado):
   - Agregar en los Action Buttons un CTA "Rastrear mi pedido" → `/orders/track/{checkout_token}` cuando haya token disponible (recuperarlo del snapshot `checkout:${STORE_ID}` en localStorage, igual que ya hace el hydrate).

**Archivos:**
- CREAR: `src/pages/OrderTrack.tsx`
- CREAR: `src/pages/ui/OrderTrackUI.tsx`
- EDITAR: `src/App.tsx` (rutas)
- EDITAR: `src/pages/ui/MyOrdersUI.tsx` (CTA rastrear + chip + entrega estimada)
- EDITAR (opcional): `src/pages/ThankYou.tsx` (CTA rastrear)
- NO TOCAR: `src/adapters/MyOrdersAdapter.tsx` (Tipo C), `HeadlessMyOrders.tsx`, backend.

**Verificación end-to-end (post-build):**
- Email `order_shipped` llega con link `/orders/track/{token}` → abrir → ver timeline en paso "Enviado", carrier, tracking, entrega estimada.
- Esperar/simular webhook de Envia → recargar → eventos nuevos + avance de paso.
- `/mis-pedidos` autenticado → card muestra "Rastrear pedido" + entrega estimada.
- `/orders/track` sin token con order_number + email → lookup funciona.
- `store_settings.tracking_display_mode = 'masked'` → recargar → sin carrier/tracking/eventos.

## 4. Recent Changes
- 2026-06-18 — Fix Meta duplicate conversions: `generateEventId` ahora es determinístico por (eventName, stableId). Purchase usa order_id, ViewContent/AddToCart usan product.id, InitiateCheckout usa order_id || product.id, Search usa el search string. Además: sessionStorage guard en los 3 call sites de trackPurchase (StripePayment ×2, ProductExpressCheckout ×1). Cinturón + tirantes.
- 2026-06-18 — TrapitoPackaging: CTA "Personalizar tu regalo" → "Ver sets", now scrolls to products section
- 2026-06-18 — TrapitoPackaging: description ending updated + "Caja rígida con cierre magnético" → "Caja elegante"
- 2026-06-18 — TrapitoHistoria: CTA "Conoce nuestro proceso" → "Regala un pedacito de México", links to #packaging section
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
- ⚠️ ORDER TRACKING: `orders_customer` VIEW debe exponer checkout_token/tracking_number/tracking_url/shipping_carrier/estimated_delivery_at para que el CTA en MyOrders funcione. El adapter es Tipo C (no editar) y usa select('*'). Si los campos no llegan, es la VIEW de backend la que debe actualizarse.
- ⚠️ TAGS KITS: Los 4 productos Kit (chile, cactus, escarabajo, milpa) tienen tags:null en la DB. El frontend los detecta por title.startsWith('kit'). Si se crean kits con otro naming, no se agruparán correctamente.
- 2026-05-27 — EcommerceTemplate header now has bg-crema — if homepage also renders it, may cause double header. OK since IndexUI wraps its own header.
- ⚠️ PROTOCOLO PRECIOS: Al actualizar precios, siempre actualizar TANTO `price` del producto COMO `variants_config` con los precios de cada variante.
- ⚠️ PROTOCOLO IMAGEGEN: SIEMPRE usar ecommerce--list-data(type='products') primero + pasar reference_images reales al generar imágenes con productos.

## 7. Pending / Future Sessions
- [high] Order Tracking page (spec en Active Plan) — construir en Craft Mode
- [med] ¿Re-estilizar MyOrdersUI + ThankYou con design system Trapito? (hoy usan colores genéricos)
- [high] Mejoras PDP: reseñas con fotos, sección unboxing, o historia de prenda (definir con owner)
- [high] Style Cart and Checkout pages with Trapito design
- [med] Add scroll-triggered fade-in animations (Intersection Observer)
- [med] Mobile nav refinements (hamburger menu for EcommerceTemplate)
- [med] Blog page with Trapito styling
- [low] Instagram feed section (real integration)
- [low] Size guide modal (optional, accordion is good for now)
- [low] "Guía de tallas" standalone page