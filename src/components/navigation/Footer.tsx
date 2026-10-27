import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Phone, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { siteConfig } from '@/app/config';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
      {/* Upper footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Overview */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
                <Cpu className="h-5 w-5" aria-hidden="true" />
              </div>
              <span className="font-extrabold text-white text-xl tracking-tight">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {siteConfig.tagline}. High-end smartphones, ultrabooks, audio gear, and gadgets curated for Bangladesh.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Verified Frontend Prototype</span>
            </div>
          </div>

          {/* Catalog Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Catalog
            </h4>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.footerNav.shop.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Project & Info */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Platform Info
            </h4>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.footerNav.info.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 p-3 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
              <p className="font-semibold text-slate-200 mb-1">Poisha Accounting</p>
              <p className="text-slate-400">
                All prices are represented in integer poisha (1 BDT = 100 poisha) and formatted with Intl.NumberFormat.
              </p>
            </div>
          </div>

          {/* Bangladesh Contact & Support */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Bangladesh Contact
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-emerald-400 shrink-0" aria-hidden="true" />
                <span>{siteConfig.contact.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-emerald-400 shrink-0" aria-hidden="true" />
                <span>{siteConfig.contact.email}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{siteConfig.contact.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-emerald-400 shrink-0" aria-hidden="true" />
                <span>{siteConfig.contact.supportHours}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800/80 bg-slate-950 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 text-center sm:text-left">
          <p>
            © {currentYear} {siteConfig.name} Prototype. Built for Bangladesh Tech E-Commerce.
          </p>
          <p className="text-slate-400">
            Frontend demonstration with mock catalog and BDT pricing.
          </p>
        </div>
      </div>
    </footer>
  );
};
