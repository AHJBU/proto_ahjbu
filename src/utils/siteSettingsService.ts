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
  try {
    const response = await fetch('/all_site_variables.json');
    if (!response.ok) throw new Error('Failed to fetch site settings');
    const data = await response.json();
    return data.siteSettings;
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
    // Get the full vars object first
    const varsRes = await fetch('/all_site_variables.json');
    if (!varsRes.ok) throw new Error('Failed to fetch site variables');
    const allVars = await varsRes.json();
    const newVars = {
      ...allVars,
      siteSettings: {
        ...allVars.siteSettings,
        ...settings
      }
    };
    const response = await fetch('/api/site-variables', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newVars),
    });
    if (!response.ok) throw new Error('Failed to update site settings');
    // Return the updated siteSettings only
    return newVars.siteSettings;
  } catch (error) {
    console.error('Error updating site settings:', error);
    throw error;
  }
};

/**
 * Reset site settings to defaults
 * @returns Promise<SiteSettings>
 */
export default {
  getSiteSettings,
  updateSiteSettings
};
