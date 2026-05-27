import { ReactNode } from 'react'
import { PageTemplate } from './PageTemplate'
import { BrandLogoLeft } from '@/components/BrandLogoLeft'
import { SocialLinks } from '@/components/SocialLinks'
import { FloatingCart } from '@/components/FloatingCart'
import { ProfileMenu } from '@/components/ProfileMenu'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { useCartUISafe } from '@/components/CartProvider'
import { useCart } from '@/contexts/CartContext'
import { useCollections } from '@/hooks/useCollections'
import { Input } from '@/components/ui/input'
import { ScrollLink } from '@/components/ScrollLink'

/**
 * EDITABLE TEMPLATE - EcommerceTemplate
 * 
 * Template específico para páginas de ecommerce con header, footer y cart.
 * El agente IA puede modificar completamente el diseño, colores, layout.
 */

interface EcommerceTemplateProps {
  children: ReactNode
  pageTitle?: string
  showCart?: boolean
  className?: string
  headerClassName?: string
  footerClassName?: string
  layout?: 'default' | 'full-width' | 'centered'
  hideFloatingCartOnMobile?: boolean
}

export const EcommerceTemplate = ({
  children,
  pageTitle,
  showCart = true,
  className,
  headerClassName,
  footerClassName,
  layout = 'default',
  hideFloatingCartOnMobile = false
}: EcommerceTemplateProps) => {
  const cartUI = useCartUISafe()
  const openCart = cartUI?.openCart ?? (() => {})
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()
  const { hasCollections, loading: loadingCollections } = useCollections()

  const header = (
    <div className={`bg-crema border-b border-lino py-3 ${headerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <BrandLogoLeft />

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-6">
              {!loadingCollections && hasCollections && (
                <ScrollLink 
                  to="/#collections" 
                  className="font-inter text-sm text-tinta-suave hover:text-tinta transition-colors"
                >
                  Colecciones
                </ScrollLink>
              )}
              <ScrollLink 
                to="/#products" 
                className="font-inter text-sm text-tinta-suave hover:text-tinta transition-colors"
              >
                Productos
              </ScrollLink>
              <Link 
                to="/blog" 
                className="font-inter text-sm text-tinta-suave hover:text-tinta transition-colors"
              >
                Blog
              </Link>
            </nav>
          </div>

          {/* Profile & Cart */}
          <div className="flex items-center space-x-2">
            <ProfileMenu />
            
            {showCart && (
              <Button
                variant="ghost"
                size="icon"
                onClick={openCart}
                className="relative"
                aria-label="Ver carrito"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-vino text-crema text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Page Title */}
        {pageTitle && (
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-foreground">
              {pageTitle}
            </h1>
          </div>
        )}
      </div>
    </div>
  )

  const footer = (
    <div className={`bg-tinta text-crema py-12 ${footerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <BrandLogoLeft />
            <p className="mt-4 font-inter text-sm text-crema/60 leading-relaxed">
              Ropa de bebé mexicana contemporánea.<br/>Lino y algodón natural, bordado a mano.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-fraunces text-base font-medium mb-4 text-crema">Tienda</h3>
            <div className="space-y-2">
              <Link 
                to="/" 
                className="block font-inter text-sm text-crema/60 hover:text-crema transition-colors"
              >
                Inicio
              </Link>
              <Link 
                to="/blog" 
                className="block font-inter text-sm text-crema/60 hover:text-crema transition-colors"
              >
                Blog
              </Link>
              <Link 
                to="/terminos-y-condiciones" 
                className="block font-inter text-sm text-crema/60 hover:text-crema transition-colors"
              >
                Términos y Condiciones
              </Link>
              <Link 
                to="/aviso-de-privacidad" 
                className="block font-inter text-sm text-crema/60 hover:text-crema transition-colors"
              >
                Aviso de Privacidad
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-fraunces text-base font-medium mb-4 text-crema">Síguenos</h3>
            <SocialLinks />
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-crema/20 text-center text-crema/50">
          <p className="font-inter text-xs">&copy; 2025 Trapito. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <PageTemplate 
        header={header}
        footer={footer}
        className={className}
        layout={layout}
      >
        {children}
      </PageTemplate>
      
      {showCart && <FloatingCart hideOnMobile={hideFloatingCartOnMobile} />}
    </>
  )
}