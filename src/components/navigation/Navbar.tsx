import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Cpu, ShoppingBag } from 'lucide-react';
import { siteConfig } from '@/app/config';
import { cn } from '@/utils/cn';
import { useCartStore } from '@/features/cart/cartStore';
import { MobileMenu } from './MobileMenu';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItemCount());

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-lg p-1"
            aria-label={`${siteConfig.name} Home`}
          >
            <div className="h-9 w-9 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center font-bold shadow-xs group-hover:bg-slate-800 transition-colors">
              <Cpu className="h-5 w-5 text-emerald-400" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-slate-900 text-xl tracking-tight leading-none group-hover:text-emerald-700 transition-colors">
                {siteConfig.name}
              </span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wide uppercase mt-0.5">
                Bangladesh Tech
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1 lg:gap-2"
          >
            {siteConfig.navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'px-3.5 py-2 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600',
                    isActive
                      ? 'bg-slate-100 text-slate-900 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Action / Context Area (Working Cart + Catalog Link + Mobile Menu Trigger) */}
          <div className="flex items-center gap-3">
            <Link
              to="/shop"
              className="hidden lg:inline-flex items-center justify-center px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              Catalog
            </Link>

            {/* Cart Link with Badge */}
            <Link
              to="/cart"
              aria-label={`Shopping cart containing ${totalItems} ${totalItems === 1 ? 'item' : 'items'}`}
              className="relative p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-emerald-600 text-white text-[11px] font-extrabold flex items-center justify-center ring-2 ring-white animate-in zoom-in-50 duration-150">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

            {/* Mobile hamburger button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
};
