const categories = [
  {
    name: 'Rompers de lino',
    desc: 'Peleles sin manga con bordados mexicanos. Frescos y fáciles de poner.',
    image: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/2951759c-e79e-4fd2-b408-bf60182e438e/1779981567518-8p77etf0262.webp',
    href: '/#productos',
    badge: '4 modelos',
  },
  {
    name: 'Sets kimono',
    desc: 'Blusa cruzada con bloomer a juego. Suaves para los primeros meses.',
    image: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/2951759c-e79e-4fd2-b408-bf60182e438e/1779981567518-ktiddj8yec9.webp',
    href: '/#productos',
    badge: '4 modelos',
  },
  {
    name: 'Overoles',
    desc: 'Tirantes ajustables con bolsa frontal bordada. Para crecer cómodos.',
    image: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/2951759c-e79e-4fd2-b408-bf60182e438e/1779981567518-ch4t0nk71gt.webp',
    href: '/#productos',
    badge: '4 modelos',
  },
];

export const TrapitoCategorias = () => {
  return (
    <section id="colecciones" className="bg-crema section-padding-lg">
      <div className="trapito-container">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="eyebrow text-oliva mb-4">Colección Cápsula</p>
          <h2 className="font-fraunces text-[36px] md:text-[44px] text-tinta leading-tight tracking-[-0.02em] mb-4">
            Tres siluetas, doce piezas.
          </h2>
          <p className="font-inter text-base text-tinta-suave max-w-md mx-auto leading-relaxed">
            Diseños cómodos para bebés de 0 a 12 meses, con detalles artesanales.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href={cat.href}
              className="group block"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-lino mb-4">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                {/* Badge */}
                <div className="absolute bottom-4 left-4 bg-crema/95 rounded-sm px-2.5 py-1">
                  <span className="font-inter text-[11px] font-medium text-vino tracking-wide">{cat.badge}</span>
                </div>
              </div>
              {/* Text */}
              <h3 className="font-fraunces text-[22px] text-tinta mb-1.5">{cat.name}</h3>
              <p className="font-inter text-sm text-tinta-suave leading-relaxed mb-3">{cat.desc}</p>
              <span className="font-inter text-sm font-medium text-oliva group-hover:text-oliva-oscuro transition-colors duration-200">
                Ver colección →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};