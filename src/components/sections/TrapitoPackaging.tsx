export const TrapitoPackaging = () => {
  return (
    <section id="packaging" className="bg-oliva section-padding-lg">
      <div className="trapito-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Text */}
          <div>
            <p className="eyebrow text-rosa-polvo mb-5">Empaque de regalo</p>
            <h2 className="font-fraunces text-[38px] md:text-[48px] text-crema leading-tight tracking-[-0.02em] mb-7">
              Listo para sorprender<br />
              <em className="font-fraunces-italic font-light">desde la caja.</em>
            </h2>
            <p className="font-inter text-base text-crema/80 leading-[1.75] mb-8 max-w-[440px]">
              Cada Trapito llega en una caja premium con papel seda estampado, sticker de marca, bolsita de manta y una tarjeta de agradecimiento. Sin envoltura extra, sin esfuerzo. Solo entregar.
            </p>

            {/* Bullet list */}
            <ul className="space-y-3 mb-10">
              {[
                'Caja rígida con cierre magnético',
                'Papel seda con patrón mexicano',
                'Tarjeta personalizable con tu mensaje',
                'Bolsita de manta para reutilizar',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 font-inter text-sm text-crema/90">
                  <span className="h-1.5 w-1.5 rounded-full bg-rosa-polvo flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="inline-flex items-center justify-center px-7 py-3.5 bg-crema text-oliva font-inter font-medium text-sm tracking-wide rounded-sm hover:bg-crudo transition-colors duration-300"
            >
              Personalizar tu regalo
            </a>
          </div>

          {/* Image */}
          <div>
            <div className="aspect-square rounded-3xl overflow-hidden bg-crudo">
              <img
                src="https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/product-images/af49064e-4665-4110-9ef5-8e0dd089e9b4/packaging.jpg"
                alt="Caja de regalo premium Trapito con papel seda estampado y prenda de bebé"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};