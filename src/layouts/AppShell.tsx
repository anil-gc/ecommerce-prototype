import React from 'react';
import { Outlet } from 'react-router-dom';
import { SkipToContent } from '@/components/navigation/SkipToContent';
import { DemoNotice } from '@/components/feedback/DemoNotice';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';

export const AppShell: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-600 selection:text-white">
      {/* Keyboard Accessibility */}
      <SkipToContent />

      {/* Demo Disclosure Banner */}
      <DemoNotice />

      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Area */}
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
