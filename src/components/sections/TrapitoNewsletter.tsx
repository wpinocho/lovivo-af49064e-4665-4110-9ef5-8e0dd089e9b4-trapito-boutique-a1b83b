import { useState } from 'react';

export const TrapitoNewsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="bg-rosa-polvo section-padding">
      <div className="trapito-container">
        <div className="max-w-[560px] mx-auto text-center">
          <p className="eyebrow text-vino mb-4">Lista de regalos</p>
          <h2 className="font-fraunces text-[30px] md:text-[36px] text-vino tracking-[-0.02em] mb-5">
            ¿Esperas un bebé?
          </h2>
          <p className="font-inter text-base text-tinta leading-relaxed mb-8">
            Suscríbete y recibe una guía gratis para armar tu lista de regalos de baby shower, además de un 10% de descuento en tu primera compra.
          </p>

          {submitted ? (
            <div className="bg-crema/80 rounded-sm px-6 py-4 inline-block">
              <p className="font-fraunces text-vino text-lg">¡Gracias! Revisa tu correo.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                required
                className="flex-1 min-w-0 px-4 py-3 bg-crema border border-crudo rounded-sm font-inter text-sm text-tinta placeholder:text-tinta-suave focus:outline-none focus:border-oliva transition-colors duration-200"
              />
              <button
                type="submit"
                className="px-7 py-3 bg-vino text-crema font-inter font-medium text-sm tracking-wide rounded-sm hover:bg-[hsl(342_47%_27%)] transition-colors duration-300 whitespace-nowrap"
              >
                Recibir guía
              </button>
            </form>
          )}

          <p className="font-inter text-[11px] text-tinta-suave mt-4 tracking-wide">
            Sin spam. Solo cosas bonitas.
          </p>
        </div>
      </div>
    </section>
  );
};