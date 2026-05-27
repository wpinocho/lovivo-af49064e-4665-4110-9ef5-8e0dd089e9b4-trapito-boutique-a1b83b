import { HeadlessIndex } from '@/components/headless/HeadlessIndex';
import { IndexUI } from '@/pages/ui/IndexUI';
import { SEO } from '@/components/SEO';
import { useSettings } from '@/contexts/SettingsContext';
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo/jsonld';

const Index = () => {
  const { storeName, socialLinks } = useSettings();
  return (
    <>
      <SEO
        title="Trapito — Babywear Mexicano Contemporáneo | Lino y Algodón Natural"
        description="Ropa de bebé premium en lino y algodón natural con bordados mexicanos hechos a mano. Diseñada para los 0-12 meses. Llega en caja de regalo lista para sorprender."
        canonicalPath="/"
        jsonLd={[organizationJsonLd('Trapito', socialLinks), websiteJsonLd('Trapito')]}
      />
      <HeadlessIndex>
        {(logic) => <IndexUI logic={logic} />}
      </HeadlessIndex>
    </>
  );
};

export default Index;