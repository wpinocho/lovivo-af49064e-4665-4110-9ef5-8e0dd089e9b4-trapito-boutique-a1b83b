import { Instagram, Facebook } from 'lucide-react';
import { TrapitoBrandLogo } from './TrapitoBrandLogo';

const footerLinks = {
  Tienda: ['Rompers', 'Sets Kimono', 'Overoles', 'Sets de regalo', 'Tallas 0-12M'],
  Ayuda: ['Guía de tallas', 'Cuidado de prendas', 'Envíos y devoluciones', 'Contacto'],
  Marca: ['Nuestra historia', 'Proceso artesanal', 'Sustentabilidad', 'Programa de regalos'],
};

export const TrapitoFooter = () => {
  return (
    <footer className="bg-oliva-oscuro text-crema">
      <div className="trapito-container py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-12">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <TrapitoBrandLogo variant="light" size="md" />
            <div className="flex gap-4 mt-6">
              <a href="#" aria-label="Instagram" className="text-crema/60 hover:text-crema transition-colors duration-200">
                <Instagram className="h-4.5 w-4.5" strokeWidth={1.5} />
              </a>
              <a href="#" aria-label="Facebook" className="text-crema/60 hover:text-crema transition-colors duration-200">
                <Facebook className="h-4.5 w-4.5" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-inter text-xs font-semibold tracking-widest uppercase text-crema/50 mb-5">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-inter text-sm text-crema/75 hover:text-crema transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          className="border-t mb-7"
          style={{ borderColor: 'hsl(3 57% 80% / 0.2)' }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-inter text-[12px] text-crema/50">
            © 2026 Trapito. Diseñado con cariño en México.
          </p>
          <div className="flex gap-4">
            {['Términos', 'Privacidad', 'Cookies'].map((item) => (
              <a key={item} href="#" className="font-inter text-[12px] text-crema/50 hover:text-crema/80 transition-colors duration-200">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};