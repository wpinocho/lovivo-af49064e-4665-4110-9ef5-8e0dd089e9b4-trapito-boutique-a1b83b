import { useState, useEffect } from 'react';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import { TrapitoBrandLogo } from './TrapitoBrandLogo';
import { useCart } from '@/contexts/CartContext';
import { useCartUISafe } from '@/components/CartProvider';

export const TrapitoHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { getTotalItems } = useCart();
  const cartUI = useCartUISafe();
  const openCart = cartUI?.openCart ?? (() => {});
  const totalItems = getTotalItems();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Tienda', href: '/#productos' },
    { label: 'Colecciones', href: '/#colecciones' },
    { label: 'Regalo', href: '/#packaging' },
    { label: 'Historia', href: '/#historia' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-crema/95 backdrop-blur-sm shadow-[0_1px_0_0_hsl(33_39%_82%)]'
          : 'bg-crema'
      }`}
    >
      <div className="trapito-container">
        <div className="flex items-center justify-between h-16 md:h-[72px]">

          {/* Left Nav — Desktop */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-inter text-sm font-medium text-tinta-suave hover:text-oliva transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-tinta p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menú"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Center Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <TrapitoBrandLogo size="md" />
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-1">
            <button className="p-2 text-tinta-suave hover:text-oliva transition-colors duration-200" aria-label="Buscar">
              <Search className="h-4.5 w-4.5" strokeWidth={1.5} />
            </button>
            <button className="p-2 text-tinta-suave hover:text-oliva transition-colors duration-200" aria-label="Mi cuenta">
              <User className="h-4.5 w-4.5" strokeWidth={1.5} />
            </button>
            <button
              className="relative p-2 text-tinta-suave hover:text-oliva transition-colors duration-200"
              aria-label="Carrito"
              onClick={openCart}
            >
              <ShoppingBag className="h-4.5 w-4.5" strokeWidth={1.5} />
              <span className="absolute -top-0.5 -right-0.5 bg-oliva text-crema text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center leading-none">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-crema border-t border-lino">
          <nav className="trapito-container py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-inter text-base font-medium text-tinta hover:text-oliva transition-colors duration-200 py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};