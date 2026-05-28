import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { EcommerceTemplate } from "@/templates/EcommerceTemplate"
import {
  ShoppingCart,
  ArrowLeft,
  Plus,
  Minus,
  Truck,
  RotateCcw,
  Gift,
  Leaf,
  Sparkles,
  Heart,
  ChevronRight,
  Lock,
} from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { SellingPlan } from "@/lib/supabase"
import { VolumeBadge } from "@/components/ui/VolumeBadge"
import { BOGOLabel } from "@/components/ui/BOGOLabel"
import { intervalLabel } from "@/lib/subscription-utils"
import ProductExpressCheckout from "@/components/ProductExpressCheckout"
import { SEO } from "@/components/SEO"
import { useSettings } from "@/contexts/SettingsContext"
import { productJsonLd, breadcrumbJsonLd, plainText } from "@/lib/seo/jsonld"
import { TrapitoRelatedProducts } from "@/components/sections/TrapitoRelatedProducts"

/**
 * EDITABLE UI COMPONENT - ProductPageUI (Trapito PDP)
 *
 * Diseño completo con identidad Trapito: fondo crema, Fraunces, botones oliva,
 * estrellas, bullets de beneficios, guía de tallas, FAQ, productos relacionados.
 * Lógica intacta — solo presentación.
 */

interface ProductPageUIProps {
  logic: {
    product: any
    loading: boolean
    notFound: boolean
    selected: Record<string, string>
    quantity: number
    matchingVariant: any
    currentPrice: number
    currentCompareAt: number | null
    currentImage: string | null
    inStock: boolean
    handleOptionSelect: (optionName: string, value: string) => void
    handleQuantityChange: (quantity: number) => void
    handleAddToCart: () => void
    handleNavigateBack: () => void
    isOptionValueAvailable: (optionName: string, value: string) => boolean
    [key: string]: any
  }
}

// ——— Inline sub-components ———

const StarRating = () => (
  <div className="flex items-center gap-2">
    <div className="flex gap-px">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className="text-mostaza text-[15px] leading-none">★</span>
      ))}
    </div>
    <span className="font-fraunces text-sm text-tinta font-medium">4.9</span>
    <span className="font-inter text-xs text-tinta-suave">· 47 reseñas</span>
  </div>
)

const BENEFITS = [
  { icon: Leaf, benefit: "Lino + algodón OEKO-TEX", feature: "Sin químicos en piel sensible" },
  { icon: Sparkles, benefit: "Bordado a mano", feature: "Por artesanos mexicanos" },
  { icon: Gift, benefit: "Empaque de regalo premium", feature: "Incluido sin costo adicional" },
  { icon: Heart, benefit: "Pieza heredable", feature: "Para guardar y pasar de generación" },
]

const TRUST_ITEMS = [
  { icon: Gift, label: "Empaque de regalo incluido" },
  { icon: Truck, label: "Envío 2-5 días hábiles" },
  { icon: RotateCcw, label: "30 días para devoluciones" },
]

// ——— Main component ———

export const ProductPageUI = ({ logic }: ProductPageUIProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [expressAvailable, setExpressAvailable] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const { ref: ctaRef, inView: ctaInView } = useInView({ threshold: 0 })

  const displayImage =
    selectedImage ||
    logic.displayImages?.[0] ||
    logic.currentImage ||
    "/placeholder.svg"

  useEffect(() => {
    setSelectedImage(null)
  }, [logic.matchingVariant])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // ——— Loading skeleton ———
  if (logic.loading) {
    return (
      <EcommerceTemplate>
        <div className="bg-crema min-h-screen">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <Skeleton className="aspect-[4/5] rounded-3xl lg:col-span-7 bg-crudo" />
              <div className="space-y-4 lg:col-span-5">
                <Skeleton className="h-3 w-20 bg-crudo" />
                <Skeleton className="h-10 w-3/4 bg-crudo" />
                <Skeleton className="h-4 w-32 bg-crudo" />
                <Skeleton className="h-8 w-28 bg-crudo" />
                <Skeleton className="h-24 w-full bg-crudo" />
                <Skeleton className="h-14 w-full bg-crudo" />
                <Skeleton className="h-14 w-full bg-crudo" />
              </div>
            </div>
          </div>
        </div>
      </EcommerceTemplate>
    )
  }

  // ——— Not found ———
  if (logic.notFound) {
    return (
      <EcommerceTemplate>
        <div className="bg-crema min-h-screen flex items-center justify-center">
          <div className="text-center py-16 px-6">
            <p className="eyebrow text-oliva mb-4">Error 404</p>
            <h1 className="font-fraunces text-[36px] text-tinta tracking-tight mb-4">
              Producto no encontrado
            </h1>
            <p className="font-inter text-tinta-suave mb-8 max-w-sm mx-auto">
              El producto que buscas no existe o ha sido eliminado.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-oliva text-crema font-inter font-medium text-sm tracking-wide rounded-sm hover:bg-oliva-oscuro transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Link>
          </div>
        </div>
      </EcommerceTemplate>
    )
  }

  if (!logic.product) return null

  const discountPct =
    logic.currentCompareAt && logic.currentCompareAt > logic.currentPrice
      ? Math.round(
          ((logic.currentCompareAt - logic.currentPrice) /
            logic.currentCompareAt) *
            100
        )
      : 0

  const vendor = logic.product.vendor || logic.product.product_type

  const { storeName, currencyCode } = useSettings()
  const product = logic.product
  const seoTitle = product.title
  const seoDescription =
    plainText(product.description, 160) ||
    `Compra ${product.title} en ${storeName}.`
  const seoImage = product.images?.[0]
  const productSchema = productJsonLd(product, {
    storeName,
    currencyCode,
    inStock: !!logic.inStock,
    price: logic.currentPrice,
  })
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Inicio", path: "/" },
    { name: "Productos", path: "/" },
    { name: product.title, path: `/productos/${product.slug}` },
  ])

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonicalPath={`/productos/${product.slug}`}
        ogImage={seoImage}
        ogType="product"
        storeName={storeName}
        jsonLd={[productSchema, breadcrumbs]}
      />
      <EcommerceTemplate hideFloatingCartOnMobile>
        <div className="bg-crema min-h-screen">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-8 md:py-12">

            {/* ——— Breadcrumbs ——— */}
            <nav
              aria-label="Breadcrumb"
              className="mb-7 hidden md:flex items-center gap-1.5 font-inter text-xs text-tinta-suave"
            >
              <Link to="/" className="hover:text-tinta transition-colors">
                Inicio
              </Link>
              <ChevronRight className="h-3 w-3" />
              <Link to="/" className="hover:text-tinta transition-colors">
                Productos
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-tinta truncate max-w-[280px]">
                {logic.product.title}
              </span>
            </nav>

            {/* Mobile back */}
            <button
              type="button"
              onClick={logic.handleNavigateBack}
              className="md:hidden mb-5 inline-flex items-center gap-1.5 font-inter text-sm text-tinta-suave hover:text-tinta transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Seguir comprando
            </button>

            {/* ——— Main grid ——— */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

              {/* ====== GALLERY ====== */}
              <div className="lg:col-span-7 lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-7rem)]">

                {/* Desktop */}
                <div className="hidden md:block">
                  <div
                    className="relative w-full aspect-[4/5] lg:max-h-[76vh] rounded-3xl overflow-hidden bg-crudo cursor-zoom-in group"
                    onMouseEnter={() => setIsZoomed(true)}
                    onMouseLeave={() => setIsZoomed(false)}
                  >
                    <img
                      src={displayImage}
                      alt={logic.product.title}
                      className={cn(
                        "w-full h-full object-contain transition-transform duration-500 ease-out",
                        isZoomed ? "scale-110" : "scale-100"
                      )}
                    />
                    {discountPct > 0 && (
                      <div className="absolute top-4 left-4 bg-vino text-crema text-[11px] font-inter font-semibold px-2.5 py-1 rounded-sm">
                        -{discountPct}%
                      </div>
                    )}
                  </div>

                  {/* Thumbnails */}
                  {logic.displayImages && logic.displayImages.length > 1 && (
                    <div className="flex gap-3 mt-4">
                      {logic.displayImages.map((img: string, index: number) => {
                        const isActive =
                          selectedImage === img ||
                          (!selectedImage && logic.currentImage === img) ||
                          (!selectedImage && !logic.currentImage && index === 0)
                        return (
                          <button
                            key={index}
                            onClick={() => setSelectedImage(img)}
                            className={cn(
                              "shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all bg-crudo",
                              isActive
                                ? "border-oliva"
                                : "border-transparent hover:border-lino"
                            )}
                            aria-label={`Ver imagen ${index + 1}`}
                          >
                            <img
                              src={img}
                              alt={`${logic.product.title} ${index + 1}`}
                              loading="lazy"
                              className="w-full h-full object-contain"
                            />
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Mobile carousel */}
                {logic.displayImages && logic.displayImages.length > 1 ? (
                  <div className="md:hidden">
                    <Carousel className="w-full">
                      <CarouselContent>
                        {logic.displayImages.map((img: string, index: number) => (
                          <CarouselItem key={index}>
                            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-crudo">
                              <img
                                src={img}
                                alt={`${logic.product.title} ${index + 1}`}
                                loading="lazy"
                                className="w-full h-full object-contain"
                              />
                              {discountPct > 0 && index === 0 && (
                                <div className="absolute top-3 left-3 bg-vino text-crema text-[11px] font-inter font-semibold px-2.5 py-1 rounded-sm">
                                  -{discountPct}%
                                </div>
                              )}
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-2" />
                      <CarouselNext className="right-2" />
                    </Carousel>
                  </div>
                ) : (
                  <div className="md:hidden relative aspect-[4/5] rounded-2xl overflow-hidden bg-crudo">
                    <img
                      src={displayImage}
                      alt={logic.product.title}
                      className="w-full h-full object-contain"
                    />
                    {discountPct > 0 && (
                      <div className="absolute top-3 left-3 bg-vino text-crema text-[11px] font-inter font-semibold px-2.5 py-1 rounded-sm">
                        -{discountPct}%
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* ====== INFO COLUMN ====== */}
              <div className="lg:col-span-5 space-y-7">

                {/* ——— Title block ——— */}
                <div className="space-y-2">
                  <p className="eyebrow text-oliva">
                    {vendor ? vendor : "Trapito · Babywear"}
                  </p>
                  <h1 className="font-fraunces text-[30px] md:text-[38px] lg:text-[40px] text-tinta tracking-[-0.02em] leading-[1.08]">
                    {logic.product.title}
                  </h1>
                  <StarRating />

                  {/* Price */}
                  <div className="flex items-baseline gap-3 pt-1">
                    <span className="font-fraunces text-[28px] text-tinta font-medium">
                      {logic.formatMoney(logic.currentPrice)}
                    </span>
                    {logic.currentCompareAt &&
                      logic.currentCompareAt > logic.currentPrice && (
                        <>
                          <span className="font-inter text-sm text-tinta-suave line-through">
                            {logic.formatMoney(logic.currentCompareAt)}
                          </span>
                          {discountPct > 0 && (
                            <span className="font-inter text-sm font-medium text-vino">
                              Ahorra {discountPct}%
                            </span>
                          )}
                        </>
                      )}
                  </div>

                  {/* Promo badges */}
                  {logic.product?.id && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      <VolumeBadge productId={logic.product.id} />
                      <BOGOLabel productId={logic.product.id} />
                    </div>
                  )}
                </div>

                {/* ——— Benefit bullets ——— */}
                <div className="py-5 border-y border-lino space-y-3">
                  {BENEFITS.map(({ icon: Icon, benefit, feature }) => (
                    <div key={benefit} className="flex items-start gap-3">
                      <Icon
                        className="h-4 w-4 text-oliva mt-0.5 shrink-0"
                        strokeWidth={1.75}
                      />
                      <p className="font-inter text-[13.5px] text-tinta leading-snug">
                        <span className="font-medium">{benefit}</span>
                        <span className="text-tinta-suave"> — {feature}</span>
                      </p>
                    </div>
                  ))}
                </div>

                {/* ——— Selling Plan Selector ——— */}
                {logic.sellingPlans && logic.sellingPlans.length > 0 && (
                  <div className="space-y-3">
                    <p className="eyebrow text-tinta-suave">Tipo de compra</p>
                    <div className="space-y-2">
                      <label
                        className={cn(
                          "flex items-center justify-between p-4 rounded-sm border cursor-pointer transition-all",
                          !logic.selectedPlan
                            ? "border-oliva bg-oliva/5"
                            : "border-lino hover:border-tinta-suave/40"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="selling-plan"
                            checked={!logic.selectedPlan}
                            onChange={() => logic.setSelectedPlan(null)}
                            className="w-4 h-4 accent-oliva"
                          />
                          <span className="font-inter text-sm font-medium text-tinta">
                            Compra única
                          </span>
                        </div>
                        <span className="font-fraunces text-sm font-medium text-tinta">
                          {logic.formatMoney(logic.currentPrice)}
                        </span>
                      </label>

                      {logic.sellingPlans.map((plan: SellingPlan) => {
                        const subPrice =
                          logic.subscriptionPrice &&
                          logic.selectedPlan?.id === plan.id
                            ? logic.subscriptionPrice
                            : plan.discount_type === "percentage" &&
                              plan.discount_value
                            ? logic.currentPrice * (1 - plan.discount_value / 100)
                            : plan.discount_type === "fixed" && plan.discount_value
                            ? Math.max(0, logic.currentPrice - plan.discount_value)
                            : logic.currentPrice

                        return (
                          <label
                            key={plan.id}
                            className={cn(
                              "flex items-center justify-between p-4 rounded-sm border cursor-pointer transition-all",
                              logic.selectedPlan?.id === plan.id
                                ? "border-oliva bg-oliva/5"
                                : "border-lino hover:border-tinta-suave/40"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                name="selling-plan"
                                checked={logic.selectedPlan?.id === plan.id}
                                onChange={() => logic.setSelectedPlan(plan)}
                                className="w-4 h-4 accent-oliva"
                              />
                              <div>
                                <span className="font-inter text-sm font-medium text-tinta">
                                  {plan.name}
                                </span>
                                {plan.discount_value && plan.discount_value > 0 && (
                                  <span className="ml-2 font-inter text-xs text-vino font-medium">
                                    -{plan.discount_value}
                                    {plan.discount_type === "percentage" ? "%" : ""}
                                  </span>
                                )}
                              </div>
                            </div>
                            <span className="font-fraunces text-sm font-medium text-tinta">
                              {logic.formatMoney(subPrice)}/
                              {intervalLabel(plan.interval, plan.interval_count)}
                            </span>
                          </label>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* ——— Product Options (size, etc.) ——— */}
                {logic.product.options && logic.product.options.length > 0 && (
                  <div className="space-y-5">
                    {logic.product.options.map((option: any) => (
                      <div key={option.name} className="space-y-2.5">
                        <div className="flex items-baseline justify-between">
                          <p className="eyebrow text-tinta-suave">{option.name}</p>
                          {logic.selected[option.name] && (
                            <span className="font-inter text-xs text-tinta-suave">
                              {logic.selected[option.name]}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {option.values.map((value: string) => {
                            const isSelected = logic.selected[option.name] === value
                            const isAvailable = logic.isOptionValueAvailable(
                              option.name,
                              value
                            )
                            return (
                              <button
                                key={value}
                                type="button"
                                disabled={!isAvailable}
                                onClick={() =>
                                  logic.handleOptionSelect(option.name, value)
                                }
                                className={cn(
                                  "min-w-[3rem] px-4 h-11 rounded-sm border font-inter text-sm font-medium transition-all",
                                  isSelected
                                    ? "border-oliva bg-oliva text-crema"
                                    : "border-lino bg-crema text-tinta hover:border-oliva",
                                  !isAvailable &&
                                    "opacity-40 cursor-not-allowed line-through"
                                )}
                              >
                                {value}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* ——— Quantity ——— */}
                <div className="space-y-2.5">
                  <p className="eyebrow text-tinta-suave">Cantidad</p>
                  <div className="inline-flex items-center border border-lino rounded-sm overflow-hidden">
                    <button
                      type="button"
                      onClick={() =>
                        logic.handleQuantityChange(Math.max(1, logic.quantity - 1))
                      }
                      disabled={logic.quantity <= 1}
                      className="w-11 h-11 flex items-center justify-center bg-crema hover:bg-crudo transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      aria-label="Disminuir"
                    >
                      <Minus className="h-3.5 w-3.5 text-tinta" />
                    </button>
                    <div className="w-12 h-11 flex items-center justify-center font-inter font-medium text-tinta tabular-nums border-x border-lino bg-crema">
                      {logic.quantity}
                    </div>
                    <button
                      type="button"
                      onClick={() => logic.handleQuantityChange(logic.quantity + 1)}
                      className="w-11 h-11 flex items-center justify-center bg-crema hover:bg-crudo transition-colors"
                      aria-label="Aumentar"
                    >
                      <Plus className="h-3.5 w-3.5 text-tinta" />
                    </button>
                  </div>
                </div>

                {/* ——— CTAs ——— */}
                <div ref={ctaRef} className="flex flex-col gap-3">
                  {logic.inStock &&
                    logic.canAddToCart &&
                    !logic.selectedPlan && (
                      <>
                        <ProductExpressCheckout
                          product={logic.product}
                          variant={logic.matchingVariant}
                          sellingPlan={logic.selectedPlan}
                          quantity={logic.quantity}
                          unitPrice={logic.currentPrice}
                          onAvailabilityChange={setExpressAvailable}
                        />
                        {expressAvailable && (
                          <div className="flex items-center gap-3 py-1">
                            <div className="flex-1 h-px bg-lino" />
                            <span className="font-inter text-xs text-tinta-suave uppercase tracking-widest">
                              o
                            </span>
                            <div className="flex-1 h-px bg-lino" />
                          </div>
                        )}
                      </>
                    )}

                  {logic.inStock && (
                    <button
                      type="button"
                      onClick={logic.handleBuyNow}
                      className="w-full h-14 bg-oliva text-crema font-inter font-medium text-sm tracking-wide rounded-sm hover:bg-oliva-oscuro transition-colors duration-300"
                    >
                      Comprar ahora
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={logic.handleAddToCart}
                    disabled={!logic.inStock}
                    className={cn(
                      "w-full h-14 font-inter font-medium text-sm tracking-wide rounded-sm border transition-colors duration-300 flex items-center justify-center gap-2",
                      logic.inStock
                        ? "border-oliva text-oliva bg-crema hover:bg-oliva hover:text-crema"
                        : "border-lino text-tinta-suave bg-crema cursor-not-allowed opacity-60"
                    )}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {logic.inStock
                      ? logic.selectedPlan
                        ? `Suscribirse — ${logic.formatMoney(
                            logic.subscriptionPrice || logic.currentPrice
                          )}/${intervalLabel(
                            logic.selectedPlan.interval,
                            logic.selectedPlan.interval_count
                          )}`
                        : "Agregar al carrito"
                      : "Agotado"}
                  </button>

                  {!logic.inStock && (
                    <div className="text-center">
                      <span className="font-inter text-xs text-tinta-suave">
                        Este producto está agotado temporalmente
                      </span>
                    </div>
                  )}
                </div>

                {/* ——— Trust line ——— */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  {TRUST_ITEMS.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-1.5">
                      <Icon className="h-3.5 w-3.5 text-oliva shrink-0" strokeWidth={1.75} />
                      <span className="font-inter text-[12px] text-tinta-suave">{label}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-oliva shrink-0" strokeWidth={1.75} />
                    <span className="font-inter text-[12px] text-tinta-suave">Pago seguro</span>
                  </div>
                </div>

                {/* ——— Accordions ——— */}
                <Accordion
                  type="single"
                  collapsible
                  defaultValue="description"
                  className="border-t border-lino"
                >
                  {logic.product.description && (
                    <AccordionItem value="description" className="border-lino">
                      <AccordionTrigger className="font-inter text-xs font-semibold uppercase tracking-[0.15em] text-tinta hover:no-underline py-4">
                        Descripción
                      </AccordionTrigger>
                      <AccordionContent>
                        <div
                          className="font-inter text-sm text-tinta-suave leading-relaxed prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: logic.product.description }}
                        />
                      </AccordionContent>
                    </AccordionItem>
                  )}

                  {/* Size guide */}
                  <AccordionItem value="sizes" className="border-lino">
                    <AccordionTrigger className="font-inter text-xs font-semibold uppercase tracking-[0.15em] text-tinta hover:no-underline py-4">
                      Guía de tallas
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <p className="font-inter text-sm text-tinta-suave leading-relaxed">
                          Nuestras tallas son generosas. Si tu bebé está en un punto
                          de quiebre, recomendamos subir una talla.
                        </p>
                        <table className="w-full font-inter text-sm">
                          <thead>
                            <tr className="border-b border-lino">
                              <th className="text-left py-2 font-semibold text-tinta text-xs">Talla</th>
                              <th className="text-left py-2 font-semibold text-tinta text-xs">Peso aprox.</th>
                              <th className="text-left py-2 font-semibold text-tinta text-xs">Longitud</th>
                            </tr>
                          </thead>
                          <tbody className="text-tinta-suave">
                            {[
                              { talla: "0-3M", peso: "3-6 kg", long: "56-62 cm" },
                              { talla: "3-6M", peso: "6-8 kg", long: "62-68 cm" },
                              { talla: "6-12M", peso: "8-12 kg", long: "68-80 cm" },
                            ].map((row) => (
                              <tr key={row.talla} className="border-b border-lino/60">
                                <td className="py-2.5 font-medium text-tinta">{row.talla}</td>
                                <td className="py-2.5">{row.peso}</td>
                                <td className="py-2.5">{row.long}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Care */}
                  <AccordionItem value="care" className="border-lino">
                    <AccordionTrigger className="font-inter text-xs font-semibold uppercase tracking-[0.15em] text-tinta hover:no-underline py-4">
                      Cuidado de la prenda
                    </AccordionTrigger>
                    <AccordionContent className="space-y-2">
                      <p className="font-inter text-sm text-tinta-suave leading-relaxed">
                        Lavado suave a mano o máquina en ciclo delicado, agua fría (30°C máx).
                        Secado al aire, alejado del sol directo. Sin secadora.
                      </p>
                      <p className="font-inter text-sm text-tinta-suave leading-relaxed">
                        El lino suaviza con cada lavada. Las primeras dos o tres veces
                        puede haber una ligera contracción natural del tejido.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  {/* FAQ */}
                  <AccordionItem value="faq" className="border-lino">
                    <AccordionTrigger className="font-inter text-xs font-semibold uppercase tracking-[0.15em] text-tinta hover:no-underline py-4">
                      Preguntas frecuentes
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        {[
                          {
                            q: "¿De qué material están hechas las prendas?",
                            a: "Lino 100% y algodón natural con certificación OEKO-TEX Standard 100. Sin colorantes tóxicos, sin acabados químicos. Seguro para la piel más sensible.",
                          },
                          {
                            q: "¿Los bordados son realmente a mano?",
                            a: "Sí. Cada pieza es bordada individualmente por artesanos mexicanos. Por eso cada prenda tiene mínimas variaciones — señal de que es auténtica.",
                          },
                          {
                            q: "¿Llega en empaque de regalo?",
                            a: "Siempre. Cada pedido incluye caja premium con papel seda, sticker Trapito, bolsita de tela y tarjeta personalizada sin costo adicional.",
                          },
                          {
                            q: "¿Cuándo llega mi pedido?",
                            a: "Enviamos a todo México. 2-5 días hábiles a CDMX, Monterrey y Guadalajara. Hasta 7 días para el resto del país. Recibirás tracking por correo.",
                          },
                        ].map(({ q, a }) => (
                          <div key={q}>
                            <p className="font-inter text-sm font-medium text-tinta mb-1">{q}</p>
                            <p className="font-inter text-sm text-tinta-suave leading-relaxed">{a}</p>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Shipping */}
                  <AccordionItem value="shipping" className="border-b-0 border-lino">
                    <AccordionTrigger className="font-inter text-xs font-semibold uppercase tracking-[0.15em] text-tinta hover:no-underline py-4">
                      Envíos y devoluciones
                    </AccordionTrigger>
                    <AccordionContent className="space-y-2">
                      <p className="font-inter text-sm text-tinta-suave leading-relaxed">
                        Envío a toda la República Mexicana. Tiempo estimado: 2-5 días
                        hábiles en zonas metropolitanas, hasta 7 días en otras ciudades.
                      </p>
                      <p className="font-inter text-sm text-tinta-suave leading-relaxed">
                        Tienes 30 días naturales para solicitar cambio o devolución sin
                        costo. La prenda debe estar sin uso y con etiquetas.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            {/* ——— Related products ——— */}
            {logic.product?.id && (
              <TrapitoRelatedProducts
                currentProductId={logic.product.id}
                productTags={(logic.product as any).tags ?? []}
              />
            )}

          </div>
        </div>

        {/* ====== STICKY BAR ====== */}
        {logic.inStock && (
          <div
            className={cn(
              "fixed bottom-0 left-0 right-0 z-50 bg-tinta/97 backdrop-blur-sm border-t border-tinta transition-transform duration-300 ease-out pb-[env(safe-area-inset-bottom)]",
              ctaInView ? "translate-y-full" : "translate-y-0"
            )}
          >
            <div className="max-w-[1280px] mx-auto px-6 py-3">
              {/* Desktop */}
              <div className="hidden md:flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-crudo shrink-0">
                    <img
                      src={displayImage}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-fraunces text-sm text-crema truncate">
                      {logic.product.title}
                    </h3>
                    <span className="font-fraunces text-base font-medium text-crema">
                      {logic.formatMoney(logic.currentPrice)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={logic.handleBuyNow}
                    className="h-10 px-6 bg-crema text-tinta font-inter font-medium text-sm rounded-sm hover:bg-lino transition-colors"
                  >
                    Comprar ahora
                  </button>
                  <button
                    type="button"
                    onClick={logic.handleAddToCart}
                    className="h-10 px-6 border border-crema/40 text-crema font-inter font-medium text-sm rounded-sm hover:border-crema transition-colors flex items-center gap-2"
                  >
                    <ShoppingCart className="h-3.5 w-3.5" />
                    Agregar
                  </button>
                </div>
              </div>

              {/* Mobile */}
              <div className="md:hidden space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-crudo shrink-0">
                    <img
                      src={displayImage}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2 flex-1 min-w-0">
                    <h3 className="font-fraunces text-sm text-crema truncate">
                      {logic.product.title}
                    </h3>
                    <span className="font-fraunces text-sm font-medium text-crema shrink-0">
                      {logic.formatMoney(logic.currentPrice)}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={logic.handleBuyNow}
                    className="flex-1 h-10 bg-crema text-tinta font-inter font-medium text-sm rounded-sm hover:bg-lino transition-colors"
                  >
                    Comprar ahora
                  </button>
                  <button
                    type="button"
                    onClick={logic.handleAddToCart}
                    className="flex-1 h-10 border border-crema/40 text-crema font-inter font-medium text-sm rounded-sm hover:border-crema transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ShoppingCart className="h-3.5 w-3.5" />
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </EcommerceTemplate>
    </>
  )
}