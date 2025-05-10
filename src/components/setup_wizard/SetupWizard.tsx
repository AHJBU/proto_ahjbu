import React, { useState, useEffect } from 'react';
import { saveAppConfig, loadAppConfig, checkSetupStatus, AppConfig } from '../../config/setup.config';

// Placeholder for a hashing function - in a real app, use a proper library like bcrypt
const simpleHash = async (password: string): Promise<string> => {
  // IMPORTANT: This is NOT a secure hash. Replace with bcrypt or similar in a real application.
  // For demonstration purposes only.
  // To use bcrypt, you would typically do this on the server-side.
  // Since this is a frontend-only example for now, we'll simulate.
  return `hashed_${password}`;
};

const SetupWizard: React.FC = () => {
  const [step, setStep] = useState(0); // Start at step 0 for loading/checking status
  const [isLoading, setIsLoading] = useState(true);
  const [isSetupAlreadyComplete, setIsSetupAlreadyComplete] = useState(false);
  const [dbConfig, setDbConfig] = useState<AppConfig['databaseConfig']>({ type: 'mysql' });
  const [adminUser, setAdminUser] = useState({ username: '', email: '', password: '' });
  const [siteSettings, setSiteSettings] = useState({ siteName: '', tagline: '' });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const setupComplete = await checkSetupStatus();
        if (setupComplete) {
          setIsSetupAlreadyComplete(true);
        } else {
          // If not complete, try to load any partial config (e.g., if user abandoned mid-setup)
          const existingConfig = await loadAppConfig();
          if (existingConfig) {
            if (existingConfig.databaseConfig) setDbConfig(existingConfig.databaseConfig);
            // Do not load admin password for security reasons, user should re-enter
            if (existingConfig.adminUser) setAdminUser(prev => ({ ...prev, username: existingConfig.adminUser?.username || '', email: existingConfig.adminUser?.email || '' }));
            if (existingConfig.siteSettings) setSiteSettings(existingConfig.siteSettings);
          }
          setStep(1); // Proceed to first step of wizard
        }
      } catch (err) {
        setError('Failed to check application status. Please try refreshing.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    checkStatus();
  }, []);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleDbConfigChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setDbConfig({ ...dbConfig, [e.target.name]: e.target.value });
  };

  const handleAdminUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminUser({ ...adminUser, [e.target.name]: e.target.value });
  };

  const handleSiteSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSiteSettings({ ...siteSettings, [e.target.name]: e.target.value });
  };

  const testConnection = async () => {
    // Placeholder for actual connection test logic
    // This would involve making an API call to a backend that tries to connect
    // to the database with the provided credentials.
    alert(`Simulating test connection for ${dbConfig?.type}. In a real app, this would verify credentials.`);
    // For now, assume success
    return true;
  };

  const handleDatabaseStepNext = async () => {
    const connectionSuccessful = await testConnection();
    if (connectionSuccessful) {
      nextStep();
    } else {
      setError('Database connection failed. Please check your settings.');
    }
  };

  const renderDatabaseFields = () => {
    const currentType = dbConfig?.type || 'mysql';
    switch (currentType) {
      case 'mysql':
        return (
          <>
            <div><label>Host: <input type="text" name="host" value={dbConfig?.host || ''} onChange={handleDbConfigChange} /></label></div>
            <div><label>Port: <input type="number" name="port" value={dbConfig?.port || 3306} onChange={handleDbConfigChange} /></label></div>
            <div><label>Username: <input type="text" name="username" value={dbConfig?.username || ''} onChange={handleDbConfigChange} /></label></div>
            <div><label>Password: <input type="password" name="password" value={dbConfig?.password || ''} onChange={handleDbConfigChange} /></label></div>
            <div><label>Database Name: <input type="text" name="databaseName" value={dbConfig?.databaseName || ''} onChange={handleDbConfigChange} /></label></div>
          </>
        );
      case 'supabase':
        return (
          <>
            <div><label>Project URL: <input type="text" name="projectUrl" value={dbConfig?.projectUrl || ''} onChange={handleDbConfigChange} /></label></div>
            <div><label>Anon Key: <input type="text" name="anonKey" value={dbConfig?.anonKey || ''} onChange={handleDbConfigChange} /></label></div>
            <div><label>Service Role Key (Optional): <input type="text" name="serviceRoleKey" value={dbConfig?.serviceRoleKey || ''} onChange={handleDbConfigChange} /></label></div>
          </>
        );
      case 'firebase':
        return (
          <>
            <div><label>Firebase Config (JSON): <textarea name="firebaseConfig" value={dbConfig?.firebaseConfig || ''} onChange={handleDbConfigChange} rows={5}></textarea></label></div>
            <p className="text-xs text-muted-foreground">Enter the Firebase project configuration object here.</p>
          </>
        );
      case 'localstorage':
        return <p>Local Storage will be used. No specific configuration needed. <br/><strong>Note:</strong> Data is stored in the browser and can be lost. Suitable for testing/demo only.</p>; 
      default:
        return <p>Please select a database type.</p>;
    }
  };

  const handleSubmit = async () => {
    setError(null);
    if (!adminUser.username || !adminUser.password || !adminUser.email) {
        setError("Admin username, email, and password are required.");
        return;
    }
    if (!siteSettings.siteName) {
        setError("Site name is required.");
        return;
    }

    try {
      // In a real app, password hashing should happen on the backend before saving.
      // For this example, we simulate it. The actual password should not be stored in config.
      const hashedPassword = await simpleHash(adminUser.password);
      
      const finalConfig: AppConfig = {
        databaseType: dbConfig?.type,
        databaseConfig: { ...dbConfig }, // Store relevant DB config fields
        adminUser: {
          username: adminUser.username,
          email: adminUser.email,
          // password: hashedPassword, // DO NOT store plain or even client-hashed password in a client-accessible config file.
                                    // This part of user creation would typically be an API call.
        },
        siteSettings: siteSettings,
        isSetupComplete: true,
      };

      // Remove password from the config that will be saved to the file, if it exists
      if (finalConfig.databaseConfig?.password) {
        delete finalConfig.databaseConfig.password; 
        // Ideally, connection strings/sensitive parts are handled by backend using env vars after setup.
      }

      await saveAppConfig(finalConfig);
      alert('Setup Complete! Application configured successfully.');
      setIsSetupAlreadyComplete(true); // Update state to reflect completion
      // Potentially redirect to login page or dashboard
      // window.location.href = '/admin/login'; 
    } catch (err) {
      console.error('Failed to save configuration:', err);
      setError(`Failed to save configuration: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  if (isLoading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Loading configuration...</div>;
  }

  if (isSetupAlreadyComplete) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Application Already Configured</h2>
        <p>The application setup has already been completed. If you need to change settings, please use the admin panel.</p>
        {/* Optionally, provide a link to the admin panel or homepage */}
      </div>
    );
  }

  const renderStepContent = () => {
    switch (step) {
      case 1: // Welcome
        return (
          <div>
            <h2>Welcome to the Setup Wizard</h2>
            <p>This wizard will guide you through the initial setup of your application. This process will configure your database, create an administrator account, and set up basic site settings.</p>
            <button onClick={nextStep} style={{ padding: '10px 20px', marginTop: '10px' }}>Start Setup</button>
          </div>
        );
      case 2: // Database Configuration
        return (
          <div>
            <h2>Step 2: Database Configuration</h2>
            <p>Select your preferred database and provide the necessary connection details. For cloud services like Supabase or Firebase, ensure you have your project credentials ready.</p>
            <div style={{ margin: '10px 0' }}>
              <label>Database Type: </label>
              <select name="type" value={dbConfig?.type || 'mysql'} onChange={handleDbConfigChange} style={{ padding: '8px', marginLeft: '5px' }}>
                <option value="mysql">MySQL</option>
                <option value="supabase">Supabase</option>
                <option value="firebase">Firebase</option>
                <option value="localstorage">Local Storage (Demo)</option>
              </select>
            </div>
            <div style={{ margin: '10px 0', padding: '10px', border: '1px solid #eee', borderRadius: '4px' }}>
              {renderDatabaseFields()}
            </div>
            {dbConfig?.type !== 'localstorage' && <button onClick={testConnection} style={{ padding: '10px', marginRight: '10px' }}>Test Connection</button>}
            <button onClick={prevStep} style={{ padding: '10px', marginRight: '10px' }}>Previous</button>
            <button onClick={handleDatabaseStepNext} style={{ padding: '10px' }}>Next</button>
          </div>
        );
      case 3: // Admin Account Creation
        return (
          <div>
            <h2>Step 3: Admin Account Creation</h2>
            <p>Create the primary administrator account for managing your application.</p>
            <div style={{ margin: '5px 0' }}><label>Username: <input type="text" name="username" value={adminUser.username} onChange={handleAdminUserChange} style={{ padding: '8px', width: '90%' }} /></label></div>
            <div style={{ margin: '5px 0' }}><label>Email: <input type="email" name="email" value={adminUser.email} onChange={handleAdminUserChange} style={{ padding: '8px', width: '90%' }} /></label></div>
            <div style={{ margin: '5px 0' }}><label>Password: <input type="password" name="password" value={adminUser.password} onChange={handleAdminUserChange} style={{ padding: '8px', width: '90%' }} /></label></div>
            <button onClick={prevStep} style={{ padding: '10px', marginRight: '10px' }}>Previous</button>
            <button onClick={nextStep} style={{ padding: '10px' }}>Next</button>
          </div>
        );
      case 4: // Basic Site Settings
        return (
          <div>
            <h2>Step 4: Basic Site Settings</h2>
            <p>Configure the basic name and tagline for your website.</p>
            <div style={{ margin: '5px 0' }}><label>Site Name: <input type="text" name="siteName" value={siteSettings.siteName} onChange={handleSiteSettingsChange} style={{ padding: '8px', width: '90%' }} /></label></div>
            <div style={{ margin: '5px 0' }}><label>Tagline (Optional): <input type="text" name="tagline" value={siteSettings.tagline} onChange={handleSiteSettingsChange} style={{ padding: '8px', width: '90%' }} /></label></div>
            <button onClick={prevStep} style={{ padding: '10px', marginRight: '10px' }}>Previous</button>
            <button onClick={handleSubmit} style={{ padding: '10px', backgroundColor: '#28a745', color: 'white' }}>Finish Setup</button>
          </div>
        );
      default:
        return <div>Loading setup or unknown step... Please wait or refresh.</div>;
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: '40px auto', border: '1px solid #ccc', borderRadius: '8px', fontFamily: 'Arial, sans-serif', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <h1 style={{ textAlign: 'center', borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '20px' }}>Application Setup</h1>
      {error && <p style={{ color: 'red', textAlign: 'center', padding: '10px', border: '1px solid red', borderRadius: '4px' }}>Error: {error}</p>}
      <div style={{ padding: '0 20px 20px 20px' }}>
        {renderStepContent()}
      </div>
      {step > 0 && step <= 4 && (
        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9em', color: '#555', borderTop: '1px solid #eee', paddingTop: '15px' }}>
          Step {step} of 4
        </div>
      )}
    </div>
  );
};

export default SetupWizard;

