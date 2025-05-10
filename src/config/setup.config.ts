import { promises as fs } from 'fs';
import path from 'path';

const CONFIG_FILE_PATH = path.join(process.cwd(), 'app.config.json');

export interface AppConfig {
  databaseType?: string;
  databaseConfig?: any; // This will store specific DB connection details
  adminUser?: {
    username: string;
    email: string;
    // Password should be hashed and stored securely, not in plain text here
  };
  siteSettings?: {
    siteName: string;
    tagline: string;
  };
  isSetupComplete: boolean;
}

export const saveAppConfig = async (config: AppConfig): Promise<void> => {
  try {
    const data = JSON.stringify({ ...config, isSetupComplete: true }, null, 2);
    await fs.writeFile(CONFIG_FILE_PATH, data, 'utf8');
    console.log('Application configuration saved successfully.');
  } catch (error) {
    console.error('Error saving application configuration:', error);
    throw new Error('Failed to save application configuration.');
  }
};

export const loadAppConfig = async (): Promise<AppConfig | null> => {
  try {
    if ((await fs.stat(CONFIG_FILE_PATH)).isFile()) {
      const data = await fs.readFile(CONFIG_FILE_PATH, 'utf8');
      const config = JSON.parse(data) as AppConfig;
      console.log('Application configuration loaded successfully.');
      return config;
    }
    return null;
  } catch (error) {
    // If file doesn't exist, it's a fresh setup
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      console.log('No existing configuration file found. Starting fresh setup.');
      return null;
    }
    console.error('Error loading application configuration:', error);
    // In case of other errors, it might be problematic
    throw new Error('Failed to load application configuration.');
  }
};

// Function to check if setup is complete
export const checkSetupStatus = async (): Promise<boolean> => {
  const config = await loadAppConfig();
  return config?.isSetupComplete || false;
};

