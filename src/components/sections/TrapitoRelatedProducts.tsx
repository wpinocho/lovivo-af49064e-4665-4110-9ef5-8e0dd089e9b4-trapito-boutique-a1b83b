import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import type { Product } from '@/lib/supabase'

interface TrapitoRelatedProductsProps {
  currentProductId: string
}

export const TrapitoRelatedProducts = ({ currentProductId }: TrapitoRelatedProductsProps) => {
  const { data: products, isLoading } = useQuery({
    queryKey: ['related-products', currentProductId],
    queryFn: async () => {
      const { data } = await supabase
        .from('products')
        .select('id, title, slug, price, images, tags')
        .neq('id', currentProductId)
        .limit(3)
      return (data || []) as Product[]
    },
    staleTime: 1000 * 60 * 5,
  })

  if (isLoading || !products?.length) return null

  return (
    <section className="mt-20 pt-16 border-t border-lino">
      {/* Header */}
      <div className="mb-8">
        <p className="eyebrow text-oliva mb-2">También te puede gustar</p>
        <h2 className="font-fraunces text-[26px] md:text-[32px] text-tinta tracking-[-0.02em]">
          Otras piezas de la colección.
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-7">
        {products.map((product) => {
          const images: string[] = (product as any).images ?? []
          const image = images[0]
          const tags: string[] = (product as any).tags ?? []
          const material = tags.includes('kimono')
            ? 'lino · set kimono'
            : tags.includes('overol')
            ? 'lino · overol'
            : 'lino · romper'

          return (
            <Link
              key={product.id}
              to={`/productos/${(product as any).slug}`}
              className="group block"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-crudo mb-3">
                {image ? (
                  <img
                    src={image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl opacity-30">
                    👕
                  </div>
                )}
                {/* Hover CTA */}
                <div className="absolute inset-x-0 bottom-0 bg-oliva/90 text-crema py-3 text-center font-inter text-xs font-medium tracking-wide translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  Ver producto
                </div>
              </div>

              {/* Info */}
              <h3 className="font-fraunces text-[16px] text-tinta mb-0.5 leading-snug">
                {product.title}
              </h3>
              <p className="font-fraunces-italic text-[12px] text-tinta-suave mb-1.5">
                {material} · 0-3M / 3-6M / 6-12M
              </p>
              <p className="font-fraunces text-[17px] font-medium text-tinta">
                ${product.price.toLocaleString('es-MX')} MXN
              </p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}