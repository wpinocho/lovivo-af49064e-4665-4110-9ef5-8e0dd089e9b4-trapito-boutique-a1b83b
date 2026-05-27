import { AnnouncementBar } from '@/components/sections/AnnouncementBar';
import { TrapitoHeader } from '@/components/sections/TrapitoHeader';
import { TrapitoHero } from '@/components/sections/TrapitoHero';
import { TrapitoUSPs } from '@/components/sections/TrapitoUSPs';
import { TrapitoCategorias } from '@/components/sections/TrapitoCategorias';
import { TrapitoProductos } from '@/components/sections/TrapitoProductos';
import { TrapitoHistoria } from '@/components/sections/TrapitoHistoria';
import { TrapitoDetalles } from '@/components/sections/TrapitoDetalles';
import { TrapitoPackaging } from '@/components/sections/TrapitoPackaging';
import { TrapitoTestimonios } from '@/components/sections/TrapitoTestimonios';
import { TrapitoNewsletter } from '@/components/sections/TrapitoNewsletter';
import { TrapitoFooter } from '@/components/sections/TrapitoFooter';
import { FloatingCart } from '@/components/FloatingCart';
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex';

/**
 * TRAPITO — Landing Page UI
 * Boutique premium de ropa de bebé mexicana contemporánea.
 * Todas las secciones están en src/components/sections/
 */

interface IndexUIProps {
  logic: UseIndexLogicReturn;
}

export const IndexUI = ({ logic }: IndexUIProps) => {
  return (
    <div className="min-h-screen bg-crema font-inter">
      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Header */}
      <TrapitoHeader />

      {/* Hero */}
      <TrapitoHero />

      {/* USPs Band */}
      <TrapitoUSPs />

      {/* Categories */}
      <TrapitoCategorias />

      {/* Featured Products */}
      <TrapitoProductos logic={logic} />

      {/* Brand Story */}
      <TrapitoHistoria />

      {/* Craftsmanship Details */}
      <TrapitoDetalles />

      {/* Packaging Section */}
      <TrapitoPackaging />

      {/* Testimonials */}
      <TrapitoTestimonios />

      {/* Newsletter */}
      <TrapitoNewsletter />

      {/* Footer */}
      <TrapitoFooter />

      {/* Floating Cart */}
      <FloatingCart />
    </div>
  );
};