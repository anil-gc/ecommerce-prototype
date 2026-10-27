import React from 'react';
import { Info } from 'lucide-react';
import { siteConfig } from '@/app/config';

export const DemoNotice: React.FC = () => {
  return (
    <aside
      aria-label="Demo Disclaimer"
      id="demo-disclaimer"
      className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            Demo
          </span>
          <span className="text-slate-300">
            {siteConfig.demoNotice}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-slate-400 text-[11px]">
          <Info className="h-3 w-3 shrink-0" aria-hidden="true" />
          <span>Simulated Bangladesh Taka (BDT) Storefront</span>
        </div>
      </div>
    </aside>
  );
};
