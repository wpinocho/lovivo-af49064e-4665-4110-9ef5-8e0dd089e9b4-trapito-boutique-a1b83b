import { Sprout, Scissors, Gift, Heart } from 'lucide-react';

const usps = [
  {
    icon: <Sprout className="h-7 w-7" strokeWidth={1.5} />,
    title: 'Telas naturales',
    desc: 'Lino y algodón premium, suave para la piel del bebé.',
  },
  {
    icon: <Scissors className="h-7 w-7" strokeWidth={1.5} />,
    title: 'Bordado a mano',
    desc: 'Cada motivo está bordado por artesanos mexicanos.',
  },
  {
    icon: <Gift className="h-7 w-7" strokeWidth={1.5} />,
    title: 'Listo para regalar',
    desc: 'Llega en caja premium con papel seda y tarjeta.',
  },
  {
    icon: <Heart className="h-7 w-7" strokeWidth={1.5} />,
    title: 'Para guardar siempre',
    desc: 'Prendas heredables, hechas para durar.',
  },
];

export const TrapitoUSPs = () => {
  return (
    <section className="bg-crudo section-padding">
      <div className="trapito-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {usps.map(({ icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center gap-4">
              <div className="text-oliva">{icon}</div>
              <div>
                <h3 className="font-fraunces text-[17px] text-tinta mb-1.5">{title}</h3>
                <p className="font-inter text-[13px] text-tinta-suave leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};