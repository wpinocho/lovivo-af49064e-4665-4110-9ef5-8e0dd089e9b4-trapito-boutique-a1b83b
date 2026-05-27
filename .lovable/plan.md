# Bug

`CheckoutUI` pasa `deliveryFee` **ya en centavos** (`Math.round(shipping * 100)`), pero `StripePayment` lo vuelve a multiplicar por 100. Resultado: con envío de $99, restamos 990 000 centavos del `amountCents`, `subtotalCents` queda en 0, y `elements.update({ amount: 9900 })` hace que el wallet muestre **MXN 99** en lugar de **MXN 348**.

# Cambios — solo `src/components/StripePayment.tsx`

Tratar `deliveryFee` como ya-en-centavos en las tres ocurrencias:

### 1. `handleExpressShippingAddressChange` (~línea 749)
```ts
const subtotalCents = Math.max(0, (amountCents || 0) - (deliveryFee || 0))
```

### 2. `handleExpressShippingRateChange` (~línea 779)
```ts
const subtotalCents = Math.max(0, (amountCents || 0) - (deliveryFee || 0))
```

### 3. Fallback de `handleExpressCheckoutConfirm` (~línea 590)
```ts
const walletShipCents = typeof walletShipRate?.amount === 'number'
  ? walletShipRate.amount
  : (deliveryFee || 0)
```

No tocar `delivery_fee: deliveryFee` (línea 219) — esa va al backend tal cual.

# Verificación
1. Carrito $249, form vacío → Google Pay → elegir dirección → Total **MX$348**.
2. Link → "Pagar MXN 348.00".
3. Cancelar wallet → botón vuelve al monto del form ($249 si vacío, $348 si shipping aplicado).
4. Confirmar → backend recibe `delivery_fee: 9900` (centavos).
