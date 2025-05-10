
import React, { createContext, useContext, useEffect, useState } from 'react';
import { SiteSettings, getSiteSettings, updateSiteSettings } from '@/utils/siteSettingsService';

interface SiteSettingsContextType {
  settings: SiteSettings;
  updateSettings: (settings: Partial<SiteSettings>) => Promise<void>;
  isLoading: boolean;
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
};

export const SiteSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const siteSettings = await getSiteSettings();
        setSettings(siteSettings);
        
        // Apply settings
        document.title = siteSettings.siteName;
        
        // Set favicon
        const existingLink = document.querySelector('link[rel="icon"]');
        if (existingLink) {
          existingLink.setAttribute('href', siteSettings.favicon);
        } else {
          const link = document.createElement('link');
          link.rel = 'icon';
          link.href = siteSettings.favicon;
          document.head.appendChild(link);
        }
      } catch (error) {
        console.error('Failed to load site settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleUpdateSettings = async (newSettings: Partial<SiteSettings>) => {
    try {
      if (!settings) return;
      
      const updatedSettings = await updateSiteSettings(newSettings);
      setSettings(updatedSettings);
    } catch (error) {
      console.error('Failed to update site settings:', error);
      throw error;
    }
  };

  if (isLoading || !settings) {
    return <>{children}</>;
  }

  return (
    <SiteSettingsContext.Provider 
      value={{ 
        settings, 
        updateSettings: handleUpdateSettings,
        isLoading 
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
};

export default SiteSettingsContext;
