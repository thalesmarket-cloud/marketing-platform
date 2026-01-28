
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  onAdminClick?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onAdminClick }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.location.reload()}>
            <div className="w-10 h-10 bg-[#0074B7] flex items-center justify-center rounded-lg text-white font-bold text-2xl">
              T
            </div>
            <div className="flex flex-col">
              <span className="text-[#0074B7] font-bold text-lg tracking-tight leading-none">THALES</span>
              <span className="text-[#1BB4EA] text-xs font-semibold tracking-widest">INFORMATIQUE</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-bold text-[#0074B7] uppercase tracking-wider">Célébration</p>
              <p className="text-sm font-semibold text-slate-500">30 Ans d'Histoire</p>
            </div>
            <button 
              onClick={onAdminClick}
              className="p-2 text-slate-400 hover:text-[#0074B7] transition-colors"
              title="Accès Admin"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        {children}
      </main>

      <footer className="bg-white border-t py-6 text-center text-slate-500 text-sm">
        <p>© 2025 Thalès Informatique - Services Internes</p>
      </footer>
    </div>
  );
};

export default Layout;
