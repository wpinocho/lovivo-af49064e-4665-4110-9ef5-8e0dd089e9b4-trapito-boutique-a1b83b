const testimonios = [
  {
    text: 'Lo regalamos en el baby shower de mi hermana y a todas les gusto mucho.',
    name: 'María F.',
    city: 'CDMX',
  },
  {
    text: 'Me gusto mucho la tela del de venadito. Sigan asi!',
    name: 'Renata L.',
    city: 'Mérida',
  },
  {
    text: 'Por fin ropa mexicana que no se vea comprada en el aeropuerto.',
    name: 'Sofía A.',
    city: 'Monterrey',
  },
];

export const TrapitoTestimonios = () => {
  return (
    <section className="bg-crudo section-padding-lg">
      <div className="trapito-container">
        {/* Header */}
        <div className="text-center mb-12 md:mb-14">
          <p className="eyebrow text-oliva mb-3">Lo que dicen</p>
          <h2 className="font-fraunces text-[32px] md:text-[40px] text-tinta tracking-[-0.02em]">
            Para regalar, guardar y recordar.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonios.map((t, i) => (
            <div
              key={i}
              className="relative bg-crema rounded-2xl p-8 overflow-hidden"
            >
              {/* Decorative quote */}
              <span className="absolute top-2 left-4 font-fraunces text-[72px] leading-none text-rosa-polvo/70 select-none">
                "
              </span>
              <p className="font-fraunces-italic text-[16px] text-tinta leading-[1.65] relative z-10 mt-4 mb-6">
                {t.text}
              </p>
              <div className="border-t border-lino pt-4">
                <p className="font-inter text-[12px] text-tinta-suave tracking-wide">
                  {t.name} · {t.city}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};