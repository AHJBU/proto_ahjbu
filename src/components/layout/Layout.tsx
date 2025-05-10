
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useSettings } from '@/contexts/SettingsContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { language } = useSettings();
  
  return (
    <div className={`min-h-screen flex flex-col ${language === 'ar' ? 'font-arabic' : ''}`}>
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
