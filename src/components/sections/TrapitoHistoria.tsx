export const TrapitoHistoria = () => {
  return (
    <section id="historia" className="bg-lino section-padding-lg">
      <div className="trapito-container">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-16 items-center">

          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-verde-tenue">
              <img
                src="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/af49064e-4665-4110-9ef5-8e0dd089e9b4/historia-lifestyle-v4.webp"
                alt="Bebé en brazos sostenido por mamá, usando conjunto de lino verde con chile bordado — Trapito"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <p className="eyebrow text-oliva mb-5">Nuestra historia</p>
            <h2 className="font-fraunces text-[38px] md:text-[44px] text-tinta leading-tight tracking-[-0.02em] mb-7">
              México en la piel.
            </h2>
            <div className="space-y-5 max-w-[540px]">
              <p className="font-inter text-base text-tinta leading-[1.75]">
                Trapito nace de querer vestir a nuestros bebés con prendas que se sientan tan bien como se ven. Lino fresco, algodón natural y bordados con iconografía de la tradición artesanal mexicana que cuentan pedacitos de México: el caimán del pantano, la bugambilia del patio, el maíz del campo.
              </p>
              <p className="font-inter text-base text-tinta leading-[1.75]">
                Cada pieza está pensada para regalarse en un baby shower, guardarse como recuerdo o pasarse al siguiente bebé de la familia. Porque las raíces se heredan con cariño.
              </p>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-1 mt-8 font-inter text-sm font-medium text-oliva hover:text-oliva-oscuro transition-colors duration-200"
            >
              Conoce nuestro proceso →
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};