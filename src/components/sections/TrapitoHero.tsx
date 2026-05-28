import { MapPin, Gift, Leaf } from 'lucide-react';

export const TrapitoHero = () => {
  return (
    <section className="bg-crema section-padding overflow-hidden">
      <div className="trapito-container">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-center">

          {/* Text Column */}
          <div className="order-1 lg:order-1 max-w-xl">
            <p className="eyebrow text-oliva mb-5">
              Babywear Mexicano · Lino + Algodón
            </p>

            <h1
              className="font-fraunces text-[38px] sm:text-[52px] lg:text-[64px] text-tinta leading-[1.05] tracking-[-0.02em] mb-6"
            >
              Para los pequeños de hoy,<br />
              <em className="font-fraunces-italic font-light">con raíces de siempre.</em>
            </h1>

            <p className="font-inter text-[17px] leading-[1.65] text-tinta-suave mb-10 max-w-[480px]">
              Ropa de bebé hecha en lino y algodón natural, con bordados mexicanos pensados para guardar, regalar y recordar.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <a
                href="/#productos"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-oliva text-crema font-inter font-medium text-sm tracking-wide rounded-sm hover:bg-oliva-oscuro transition-colors duration-300"
              >
                Explorar la tienda
              </a>
              <a
                href="/#packaging"
                className="inline-flex items-center justify-center px-7 py-3.5 border border-oliva text-oliva font-inter font-medium text-sm tracking-wide rounded-sm hover:bg-oliva hover:text-crema transition-colors duration-300"
              >
                Ver set de regalo
              </a>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {[
                { icon: <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />, label: 'Hecho en México' },
                { icon: <Gift className="h-3.5 w-3.5" strokeWidth={1.75} />, label: 'Empaque de regalo' },
                { icon: <Leaf className="h-3.5 w-3.5" strokeWidth={1.75} />, label: 'Lino + algodón natural' },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-tinta-suave">
                  <span className="text-oliva">{icon}</span>
                  <span className="font-inter text-xs font-medium tracking-wide">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image Column */}
          <div className="order-first lg:order-2">
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-verde-tenue">
                <img
                  src="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/af49064e-4665-4110-9ef5-8e0dd089e9b4/hero-baby.webp"
                  alt="Bebé recién nacido durmiendo con romper de lino bordado a mano de Trapito"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              {/* Decorative badge */}
              <div className="absolute -bottom-4 -left-4 bg-rosa-polvo rounded-2xl px-4 py-3 shadow-sm">
                <p className="font-fraunces text-vino text-sm font-medium leading-tight">Bordado<br />a mano</p>
              </div>
              <div className="absolute -top-3 -right-3 bg-crudo rounded-full h-16 w-16 flex items-center justify-center shadow-sm">
                <p className="font-fraunces text-oliva text-[10px] text-center leading-tight font-medium">100%<br />lino</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};