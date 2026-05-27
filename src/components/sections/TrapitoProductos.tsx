import { Link } from 'react-router-dom';
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex';

interface TrapitoProductosProps {
  logic: UseIndexLogicReturn;
}

const BADGE_MAP: Record<string, { label: string; bgClass: string; textClass: string }> = {
  bestseller: { label: 'Bestseller', bgClass: 'bg-mostaza', textClass: 'text-tinta' },
  nuevo: { label: 'Nuevo', bgClass: 'bg-vino', textClass: 'text-crema' },
};

export const TrapitoProductos = ({ logic }: TrapitoProductosProps) => {
  const { filteredProducts, loading } = logic;

  return (
    <section id="productos" className="bg-crudo section-padding-lg">
      <div className="trapito-container">
        {/* Header */}
        <div className="mb-10 md:mb-12">
          <p className="eyebrow text-oliva mb-3">Favoritos</p>
          <h2 className="font-fraunces text-[32px] md:text-[40px] text-tinta tracking-[-0.02em]">
            Las piezas que más se regalan.
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-lino rounded-2xl aspect-square animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.slice(0, 8).map((product) => {
              const tags: string[] = (product as any).tags ?? [];
              const badgeTag = tags.find((t) => BADGE_MAP[t]);
              const badgeInfo = badgeTag ? BADGE_MAP[badgeTag] : null;
              const images: string[] = (product as any).images ?? [];
              const image = images[0];
              const isKimono = tags.includes('kimono');
              const material = isKimono ? 'lino · set kimono' : tags.includes('overol') ? 'lino · overol' : 'lino · romper';

              return (
                <Link
                  key={product.id}
                  to={`/productos/${(product as any).slug}`}
                  className="group block"
                >
                  {/* Image */}
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-lino mb-3">
                    {image ? (
                      <img
                        src={image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-out"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl opacity-40">👕</div>
                    )}
                    {badgeInfo && (
                      <div className={`absolute top-3 left-3 rounded-sm px-2 py-0.5 text-[10px] font-inter font-semibold tracking-wide ${badgeInfo.bgClass} ${badgeInfo.textClass}`}>
                        {badgeInfo.label}
                      </div>
                    )}
                    {/* Hover CTA */}
                    <div className="absolute inset-x-0 bottom-0 bg-oliva/90 text-crema py-2.5 text-center font-inter text-xs font-medium tracking-wide translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                      Agregar al carrito
                    </div>
                  </div>

                  {/* Info */}
                  <h3 className="font-fraunces text-[15px] text-tinta mb-0.5">{product.title}</h3>
                  <p className="font-fraunces-italic text-[12px] text-tinta-suave mb-1">
                    {material} · 0-3M / 3-6M / 6-12M
                  </p>
                  <p className="font-fraunces text-[16px] font-medium text-tinta">
                    ${product.price.toLocaleString('es-MX')} MXN
                  </p>
                </Link>
              );
            })}
          </div>
        )}

        {/* See All CTA */}
        <div className="text-center mt-12">
          <a
            href="/#colecciones"
            className="inline-flex items-center gap-2 font-inter text-sm font-medium text-oliva border border-oliva rounded-sm px-7 py-3 hover:bg-oliva hover:text-crema transition-colors duration-300"
          >
            Ver todas las colecciones
          </a>
        </div>
      </div>
    </section>
  );
};