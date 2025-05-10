/**
 * Service for managing site settings
 * In a real application, this would interact with a backend API
 */

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  siteAuthor: string;
  favicon: string;
  logo: string;
  defaultLanguage: 'en' | 'ar';
  defaultTheme: 'light' | 'dark' | 'system';
  maintenanceMode: boolean;
  contactEmail: string;
  tagline: string;
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: string;
}

// Default settings
const defaultSettings: SiteSettings = {
  siteName: 'Ahmed Jamal - Portfolio & Blog',
  siteDescription: 'Personal portfolio and blog showcasing my work and thoughts.',
  siteAuthor: 'Ahmed Jamal',
  favicon: '/favicon.ico',
  logo: '/images/logo.png',
  defaultLanguage: 'en',
  defaultTheme: 'light',
  maintenanceMode: false,
  contactEmail: 'contact@ahmedjamal.com',
  tagline: 'Digital Specialist & Consultant',
  language: 'ar',
  timezone: 'Asia/Riyadh',
  dateFormat: 'DD/MM/YYYY',
  timeFormat: '24h',
};

/**
 * Get all site settings
 * @returns Promise<SiteSettings>
 */
export const getSiteSettings = async (): Promise<SiteSettings> => {
  // In a real app, this would fetch from API or database
  try {
    const savedSettings = localStorage.getItem('site_settings');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
    return defaultSettings;
  } catch (error) {
    console.error('Error getting site settings:', error);
    return defaultSettings;
  }
};

/**
 * Update site settings
 * @param settings Partial<SiteSettings>
 * @returns Promise<SiteSettings>
 */
export const updateSiteSettings = async (settings: Partial<SiteSettings>): Promise<SiteSettings> => {
  try {
    const currentSettings = await getSiteSettings();
    const updatedSettings = { ...currentSettings, ...settings };
    
    // In a real app, this would be an API call
    localStorage.setItem('site_settings', JSON.stringify(updatedSettings));
    
    // Update document title if site name changed
    if (settings.siteName) {
      document.title = settings.siteName;
    }
    
    // Update favicon if changed
    if (settings.favicon && settings.favicon !== currentSettings.favicon) {
      const existingLink = document.querySelector('link[rel="icon"]');
      if (existingLink) {
        existingLink.setAttribute('href', settings.favicon);
      } else {
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = settings.favicon;
        document.head.appendChild(link);
      }
    }
    
    return updatedSettings;
  } catch (error) {
    console.error('Error updating site settings:', error);
    throw error;
  }
};

/**
 * Reset site settings to defaults
 * @returns Promise<SiteSettings>
 */
export const resetSiteSettings = async (): Promise<SiteSettings> => {
  try {
    // In a real app, this would be an API call
    localStorage.setItem('site_settings', JSON.stringify(defaultSettings));
    
    // Update document title
    document.title = defaultSettings.siteName;
    
    // Reset favicon
    const existingLink = document.querySelector('link[rel="icon"]');
    if (existingLink) {
      existingLink.setAttribute('href', defaultSettings.favicon);
    }
    
    return defaultSettings;
  } catch (error) {
    console.error('Error resetting site settings:', error);
    throw error;
  }
};

export default {
  getSiteSettings,
  updateSiteSettings,
  resetSiteSettings
};
