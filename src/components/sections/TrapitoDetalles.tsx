import { Scissors, Feather, Tag, Leaf } from 'lucide-react';

const detalles = [
  { icon: <Scissors className="h-8 w-8" strokeWidth={1.25} />, label: 'Botones de madera natural' },
  { icon: <Feather className="h-8 w-8" strokeWidth={1.25} />, label: 'Bordados hechos a mano' },
  { icon: <Tag className="h-8 w-8" strokeWidth={1.25} />, label: 'Etiqueta tejida personalizada' },
  { icon: <Leaf className="h-8 w-8" strokeWidth={1.25} />, label: 'Telas certificadas OEKO-TEX' },
];

export const TrapitoDetalles = () => {
  return (
    <section className="bg-crema section-padding">
      <div className="trapito-container">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <p className="eyebrow text-oliva mb-3">Artesanía</p>
          <h2 className="font-fraunces text-[30px] md:text-[38px] text-tinta tracking-[-0.02em]">
            Hecho con detalles que se notan.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {detalles.map(({ icon, label }) => (
            <div
              key={label}
              className="bg-lino rounded-2xl aspect-square flex flex-col items-center justify-center gap-4 p-6 hover:bg-crudo transition-colors duration-300"
            >
              <span className="text-oliva">{icon}</span>
              <p className="font-fraunces text-[14px] md:text-[15px] text-tinta text-center leading-tight">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};