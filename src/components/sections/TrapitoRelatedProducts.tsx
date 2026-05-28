import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { STORE_ID } from '@/lib/config'
import type { Product } from '@/lib/supabase'

interface TrapitoRelatedProductsProps {
  currentProductId: string
  productTags?: string[]
}

const TYPE_TAGS = ['romper', 'kimono', 'overol']

export const TrapitoRelatedProducts = ({ currentProductId, productTags = [] }: TrapitoRelatedProductsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const typeTags = TYPE_TAGS.filter(t => productTags.includes(t))

  const { data: products, isLoading } = useQuery({
    queryKey: ['related-products', currentProductId, typeTags.join(',')],
    queryFn: async () => {
      const { data } = await supabase
        .from('products')
        .select('id, title, slug, price, images, tags')
        .eq('store_id', STORE_ID)
        .eq('status', 'active')
        .neq('id', currentProductId)
        .limit(20)

      const all = (data || []) as Product[]

      if (typeTags.length === 0) return all.slice(0, 6)

      // Filter in JS to avoid column type issues
      const sameType = all.filter(p => {
        const ptags: string[] = (p as any).tags ?? []
        return typeTags.some(t => ptags.includes(t))
      })

      return (sameType.length >= 2 ? sameType : all).slice(0, 6)
    },
    staleTime: 1000 * 60 * 5,
  })

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    const w = scrollRef.current.offsetWidth
    scrollRef.current.scrollBy({ left: dir === 'left' ? -w * 0.8 : w * 0.8, behavior: 'smooth' })
  }

  if (isLoading || !products?.length) return null

  return (
    <section className="mt-20 pt-16 border-t border-lino">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="eyebrow text-oliva mb-2">También te puede gustar</p>
          <h2 className="font-fraunces text-[26px] md:text-[32px] text-tinta tracking-[-0.02em]">
            Más de esta colección.
          </h2>
        </div>
        {/* Arrow nav — desktop only */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-9 h-9 rounded-full border border-lino flex items-center justify-center text-tinta-suave hover:bg-crudo transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-9 h-9 rounded-full border border-lino flex items-center justify-center text-tinta-suave hover:bg-crudo transition-colors"
            aria-label="Siguiente"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="overflow-x-auto flex gap-4 pb-3 snap-x snap-mandatory scroll-smooth scrollbar-none"
      >
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
              className="group block flex-none w-[72vw] sm:w-[46vw] md:w-[32vw] lg:w-[24vw] snap-start"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-crudo mb-3">
                {image ? (
                  <img
                    src={image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl opacity-30">👕</div>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-oliva/90 text-crema py-3 text-center font-inter text-xs font-medium tracking-wide translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  Ver producto
                </div>
              </div>
              <h3 className="font-fraunces text-[16px] text-tinta mb-0.5 leading-snug">{product.title}</h3>
              <p className="font-fraunces-italic text-[12px] text-tinta-suave mb-1.5">{material} · 0-3M / 3-6M / 6-12M</p>
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