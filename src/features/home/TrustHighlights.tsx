import React from 'react';
import { Coins, Truck, CheckCircle2, Layers } from 'lucide-react';

export const TrustHighlights: React.FC = () => {
  const highlights = [
    {
      icon: <Coins className="h-6 w-6 text-emerald-600" aria-hidden="true" />,
      title: 'BDT Poisha Precision',
      description:
        'All monetary values are calculated in integer poisha to eliminate floating-point rounding errors across Bangladesh pricing.',
    },
    {
      icon: <Truck className="h-6 w-6 text-emerald-600" aria-hidden="true" />,
      title: 'Regional Delivery Demo',
      description:
        'Configurable delivery rules for Inside Dhaka (৳60) and Outside Dhaka (৳120) with transparent cost breakdowns.',
    },
    {
      icon: <CheckCircle2 className="h-6 w-6 text-emerald-600" aria-hidden="true" />,
      title: 'Structured Specs',
      description:
        'Key hardware specifications like display type, processor, memory, and battery capacity stored in typed structures.',
    },
    {
      icon: <Layers className="h-6 w-6 text-emerald-600" aria-hidden="true" />,
      title: 'Asynchronous Service',
      description:
        'Isolated catalog service boundary with TanStack Query caching, keeping UI decoupled from fixtures or backend APIs.',
    },
  ];

  return (
    <section className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow"
            >
              <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
