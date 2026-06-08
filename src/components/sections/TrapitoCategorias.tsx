const categories = [
  {
    name: 'Overoles',
    desc: 'Peto de lino con hombros ajustables y bordado artesanal al frente. Cómodos para gatear y explorar.',
    image: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/2951759c-e79e-4fd2-b408-bf60182e438e/1780434644279-ljqrm7rcf2i.webp',
    href: '/collections/overoles',
    badge: '4 modelos',
  },
  {
    name: 'Conjuntos de lino',
    desc: 'Camisa henley con bloomer a juego. Bordados únicos adelante y atrás. El conjunto más completo de la colección.',
    image: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/2951759c-e79e-4fd2-b408-bf60182e438e/1780434644279-svol4owvr5.webp',
    href: '/collections/kit-camisa-y-shorts',
    badge: '4 modelos',
  },
  {
    name: 'Rompers de lino',
    desc: 'Pelele sin manga con botones de nácar y bordado mexicano. Fresquito y fácil de poner.',
    image: 'https://ptgmltivisbtvmoxwnhd.supabase.co/storage/v1/object/public/message-images/2951759c-e79e-4fd2-b408-bf60182e438e/1780434644279-mgic12rq78r.webp',
    href: '/collections/rompers-de-lino',
    badge: '4 modelos',
  },
];

export const TrapitoCategorias = () => {
  return (
    <section id="colecciones" className="bg-crema section-padding-lg">
      <div className="trapito-container">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <p className="eyebrow text-oliva mb-4">Colección Cápsula</p>
          <h2 className="font-fraunces text-[36px] md:text-[44px] text-tinta leading-tight tracking-[-0.02em] mb-4">
            Tres siluetas, doce piezas.
          </h2>
          <p className="font-inter text-base text-tinta-suave max-w-md mx-auto leading-relaxed">
            Diseños cómodos para bebés de 0 a 12 meses, con detalles artesanales.
          </p>
        </div>

        {/* Carousel — swipeable on mobile, grid on desktop */}
        <div className="overflow-x-auto -mx-5 px-5 scrollbar-none md:overflow-visible md:mx-0 md:px-0">
          <div className="flex gap-5 pb-3 md:grid md:grid-cols-3 md:gap-8 md:pb-0">
            {categories.map((cat) => (
              <a
                key={cat.name}
                href={cat.href}
                className="group block flex-none w-[78vw] sm:w-[56vw] md:w-auto"
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
      </div>
    </section>
  );
};