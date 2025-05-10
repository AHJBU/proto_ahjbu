
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import EnhancedFileUpload from '@/components/admin/EnhancedFileUpload';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import { 
  Save, 
  Settings, 
  Globe, 
  Palette, 
  Shield, 
  Share2, 
  Layers, 
  Code, 
  Search,
  Eye,
  RefreshCw,
  Sun,
  Moon,
  Monitor
} from 'lucide-react';

// Theme options
const colorThemes = [
  { id: 'default', name: 'Default Purple', primary: '#9b87f5', secondary: '#7E69AB', accent: '#1EAEDB' },
  { id: 'blue', name: 'Ocean Blue', primary: '#3b82f6', secondary: '#1e40af', accent: '#38bdf8' },
  { id: 'green', name: 'Fresh Green', primary: '#10b981', secondary: '#059669', accent: '#34d399' },
  { id: 'amber', name: 'Warm Amber', primary: '#f59e0b', secondary: '#d97706', accent: '#fbbf24' },
  { id: 'rose', name: 'Rosy Pink', primary: '#f43f5e', secondary: '#be123c', accent: '#fb7185' },
  { id: 'violet', name: 'Deep Violet', primary: '#8b5cf6', secondary: '#6d28d9', accent: '#a78bfa' },
  { id: 'slate', name: 'Classic Slate', primary: '#64748b', secondary: '#475569', accent: '#94a3b8' },
  { id: 'custom', name: 'Custom Theme', primary: '', secondary: '', accent: '' },
];

const AdminSettings: React.FC = () => {
  const { settings, updateSettings } = useSiteSettings();
  
  // Site settings state
  const [siteSettings, setSiteSettings] = useState({
    siteName: settings.siteName || 'Ahmed Jamal Digital Hub',
    tagline: settings.tagline || 'Digital Specialist & Consultant',
    language: settings.language || 'ar',
    timezone: settings.timezone || 'Asia/Riyadh',
    dateFormat: settings.dateFormat || 'DD/MM/YYYY',
    timeFormat: settings.timeFormat || '24h',
    favicon: settings.favicon || '/favicon.ico',
  });
  
  // Theme settings state
  const [themeSettings, setThemeSettings] = useState({
    theme: 'default',
    primaryColor: '#9b87f5',
    secondaryColor: '#7E69AB',
    accentColor: '#1EAEDB',
    fontFamily: 'Inter',
    enableDarkMode: true,
    defaultMode: 'system', // 'light', 'dark', or 'system'
    borderRadius: 'medium',
  });
  
  // SEO settings state
  const [seoSettings, setSeoSettings] = useState({
    metaTitle: 'Ahmed Jamal | Digital Hub',
    metaDescription: 'Ahmed Jamal\'s professional portfolio - Expertise in social media, graphic design, video editing, programming, web/app development, training and consulting',
    metaKeywords: 'ahmed jamal, digital specialist, consultant, web development, app development, social media, graphic design',
    ogImage: '/assets/og-image.jpg',
    twitterHandle: '@ahmed_jamal',
    googleAnalyticsId: '',
    enableIndexing: true,
  });
  
  // Update site settings from context on component mount
  useEffect(() => {
    if (settings) {
      setSiteSettings({
        siteName: settings.siteName || 'Ahmed Jamal Digital Hub',
        tagline: settings.tagline || 'Digital Specialist & Consultant',
        language: settings.language || 'ar',
        timezone: settings.timezone || 'Asia/Riyadh',
        dateFormat: settings.dateFormat || 'DD/MM/YYYY',
        timeFormat: settings.timeFormat || '24h',
        favicon: settings.favicon || '/favicon.ico',
      });
    }
  }, [settings]);
  
  // Load selected theme
  const handleThemeChange = (themeId: string) => {
    const selectedTheme = colorThemes.find(theme => theme.id === themeId);
    if (selectedTheme) {
      setThemeSettings({
        ...themeSettings,
        theme: themeId,
        primaryColor: selectedTheme.primary,
        secondaryColor: selectedTheme.secondary,
        accentColor: selectedTheme.accent,
      });
    }
  };
  
  // Handle color picker change
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setThemeSettings({
      ...themeSettings,
      [name]: value,
      theme: 'custom', // Switch to custom theme when colors are changed
    });
  };
  
  // Handle site settings change
  const handleSiteSettingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSiteSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle SEO settings change
  const handleSEOSettingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSeoSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle toggle change
  const handleToggleChange = (name: string, checked: boolean, settingType: 'seo' | 'theme') => {
    if (settingType === 'seo') {
      setSeoSettings(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setThemeSettings(prev => ({
        ...prev,
        [name]: checked
      }));
    }
  };
  
  // Apply theme changes immediately
  useEffect(() => {
    // In a real app, this would apply CSS variables to the document root
    document.documentElement.style.setProperty('--color-primary', themeSettings.primaryColor);
    document.documentElement.style.setProperty('--color-secondary', themeSettings.secondaryColor);
    document.documentElement.style.setProperty('--color-accent', themeSettings.accentColor);
  }, [themeSettings.primaryColor, themeSettings.secondaryColor, themeSettings.accentColor]);
  
  // Handle save site settings
  const handleSaveSiteSettings = () => {
    updateSettings({
      siteName: siteSettings.siteName,
      tagline: siteSettings.tagline,
      language: siteSettings.language,
      timezone: siteSettings.timezone,
      dateFormat: siteSettings.dateFormat,
      timeFormat: siteSettings.timeFormat,
      favicon: siteSettings.favicon,
    });
    
    toast({
      title: 'Settings Saved',
      description: 'Your site settings have been updated successfully.',
    });
  };
  
  // Handle save theme settings
  const handleSaveThemeSettings = () => {
    // In a real app, this would save theme settings to database
    toast({
      title: 'Theme Saved',
      description: 'Your theme settings have been updated successfully.',
    });
  };
  
  // Handle save SEO settings
  const handleSaveSEOSettings = () => {
    // In a real app, this would save SEO settings to database
    toast({
      title: 'SEO Settings Saved',
      description: 'Your SEO settings have been updated successfully.',
    });
  };
  
  // Handle favicon upload success
  const handleFaviconSuccess = (url: string) => {
    setSiteSettings({
      ...siteSettings,
      favicon: url
    });
    
    toast({
      title: 'Favicon Updated',
      description: 'Your site favicon has been updated successfully.',
    });
  };
  
  // Handle OG image upload success
  const handleOGImageSuccess = (url: string) => {
    setSeoSettings({
      ...seoSettings,
      ogImage: url
    });
    
    toast({
      title: 'OG Image Updated',
      description: 'Your Open Graph image has been updated successfully.',
    });
  };

  return (
    <AdminLayout title="Site Settings">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="seo">SEO & Sharing</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                Site Settings
              </CardTitle>
              <CardDescription>
                Configure general settings for your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    name="siteName"
                    value={siteSettings.siteName}
                    onChange={handleSiteSettingChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    name="tagline"
                    value={siteSettings.tagline}
                    onChange={handleSiteSettingChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    name="language"
                    value={siteSettings.language}
                    onValueChange={(value) => setSiteSettings({...siteSettings, language: value})}
                  >
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ar">Arabic</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    name="timezone"
                    value={siteSettings.timezone}
                    onValueChange={(value) => setSiteSettings({...siteSettings, timezone: value})}
                  >
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Riyadh">Riyadh (GMT+3)</SelectItem>
                      <SelectItem value="Europe/London">London (GMT)</SelectItem>
                      <SelectItem value="America/New_York">New York (GMT-5)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Tokyo (GMT+9)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select
                    name="dateFormat"
                    value={siteSettings.dateFormat}
                    onValueChange={(value) => setSiteSettings({...siteSettings, dateFormat: value})}
                  >
                    <SelectTrigger id="dateFormat">
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timeFormat">Time Format</Label>
                  <Select
                    name="timeFormat"
                    value={siteSettings.timeFormat}
                    onValueChange={(value) => setSiteSettings({...siteSettings, timeFormat: value})}
                  >
                    <SelectTrigger id="timeFormat">
                      <SelectValue placeholder="Select time format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                      <SelectItem value="24h">24-hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="favicon">Site Favicon</Label>
                <div className="flex items-start space-x-4">
                  <div className="border rounded-md p-3 bg-background">
                    <img 
                      src={siteSettings.favicon} 
                      alt="Current favicon" 
                      className="w-8 h-8"
                    />
                  </div>
                  <div className="flex-1">
                    <EnhancedFileUpload
                      endpoint="/api/uploads/favicon"
                      onSuccess={handleFaviconSuccess}
                      accept="image/png,image/jpeg,image/ico"
                      maxSize={1}
                      label="Upload Favicon"
                      category="site"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Recommended size: 32x32px or 64x64px, PNG or ICO format
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleSaveSiteSettings}>
                  <Save className="mr-2 h-4 w-4" />
                  Save General Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="mr-2 h-5 w-5" />
                  Theme Colors
                </CardTitle>
                <CardDescription>
                  Customize the color scheme of your website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Select Theme</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {colorThemes.filter(t => t.id !== 'custom').map((theme) => (
                      <div
                        key={theme.id}
                        className={`
                          p-4 rounded-md cursor-pointer border-2 transition-all
                          ${themeSettings.theme === theme.id ? 'border-primary' : 'border-transparent hover:border-muted'}
                        `}
                        onClick={() => handleThemeChange(theme.id)}
                      >
                        <div className="flex space-x-2 mb-2">
                          <div 
                            className="w-6 h-6 rounded-full" 
                            style={{ backgroundColor: theme.primary }}
                          />
                          <div 
                            className="w-6 h-6 rounded-full" 
                            style={{ backgroundColor: theme.secondary }}
                          />
                          <div 
                            className="w-6 h-6 rounded-full" 
                            style={{ backgroundColor: theme.accent }}
                          />
                        </div>
                        <p className="text-sm font-medium">{theme.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <Label>Custom Colors</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="primaryColor">Primary Color</Label>
                      <div className="flex">
                        <Input
                          type="color"
                          id="primaryColor"
                          name="primaryColor"
                          value={themeSettings.primaryColor}
                          onChange={handleColorChange}
                          className="w-12 h-10 p-1"
                        />
                        <Input
                          type="text"
                          value={themeSettings.primaryColor}
                          onChange={handleColorChange}
                          name="primaryColor"
                          className="w-full ml-2"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="secondaryColor">Secondary Color</Label>
                      <div className="flex">
                        <Input
                          type="color"
                          id="secondaryColor"
                          name="secondaryColor"
                          value={themeSettings.secondaryColor}
                          onChange={handleColorChange}
                          className="w-12 h-10 p-1"
                        />
                        <Input
                          type="text"
                          value={themeSettings.secondaryColor}
                          onChange={handleColorChange}
                          name="secondaryColor"
                          className="w-full ml-2"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="accentColor">Accent Color</Label>
                      <div className="flex">
                        <Input
                          type="color"
                          id="accentColor"
                          name="accentColor"
                          value={themeSettings.accentColor}
                          onChange={handleColorChange}
                          className="w-12 h-10 p-1"
                        />
                        <Input
                          type="text"
                          value={themeSettings.accentColor}
                          onChange={handleColorChange}
                          name="accentColor"
                          className="w-full ml-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  Theme Settings
                </CardTitle>
                <CardDescription>
                  Configure theme appearance and behavior
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fontFamily">Font Family</Label>
                  <Select
                    value={themeSettings.fontFamily}
                    onValueChange={(value) => setThemeSettings({...themeSettings, fontFamily: value})}
                  >
                    <SelectTrigger id="fontFamily">
                      <SelectValue placeholder="Select font family" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inter">Inter (Modern)</SelectItem>
                      <SelectItem value="IBM Plex Sans Arabic">IBM Plex Sans Arabic</SelectItem>
                      <SelectItem value="Noto Sans Arabic">Noto Sans Arabic</SelectItem>
                      <SelectItem value="Cairo">Cairo</SelectItem>
                      <SelectItem value="Tajawal">Tajawal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="borderRadius">Border Radius</Label>
                  <Select
                    value={themeSettings.borderRadius}
                    onValueChange={(value) => setThemeSettings({...themeSettings, borderRadius: value})}
                  >
                    <SelectTrigger id="borderRadius">
                      <SelectValue placeholder="Select border radius" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None (0px)</SelectItem>
                      <SelectItem value="small">Small (4px)</SelectItem>
                      <SelectItem value="medium">Medium (8px)</SelectItem>
                      <SelectItem value="large">Large (12px)</SelectItem>
                      <SelectItem value="full">Full (9999px)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-medium">Dark Mode</h3>
                    <p className="text-sm text-muted-foreground">
                      Enable dark mode toggle for your website
                    </p>
                  </div>
                  <Switch 
                    checked={themeSettings.enableDarkMode}
                    onCheckedChange={(checked) => handleToggleChange('enableDarkMode', checked, 'theme')}
                  />
                </div>
                
                {themeSettings.enableDarkMode && (
                  <div className="pl-6 border-l space-y-4">
                    <div className="space-y-2">
                      <Label>Default Theme Mode</Label>
                      <div className="flex space-x-4">
                        <div
                          className={`
                            flex flex-col items-center border rounded-md p-4 cursor-pointer transition-all
                            ${themeSettings.defaultMode === 'light' ? 'border-primary bg-muted/50' : 'border-border hover:border-muted'}
                          `}
                          onClick={() => setThemeSettings({...themeSettings, defaultMode: 'light'})}
                        >
                          <Sun className="h-8 w-8 mb-2" />
                          <span className="text-sm font-medium">Light</span>
                        </div>
                        
                        <div
                          className={`
                            flex flex-col items-center border rounded-md p-4 cursor-pointer transition-all
                            ${themeSettings.defaultMode === 'dark' ? 'border-primary bg-muted/50' : 'border-border hover:border-muted'}
                          `}
                          onClick={() => setThemeSettings({...themeSettings, defaultMode: 'dark'})}
                        >
                          <Moon className="h-8 w-8 mb-2" />
                          <span className="text-sm font-medium">Dark</span>
                        </div>
                        
                        <div
                          className={`
                            flex flex-col items-center border rounded-md p-4 cursor-pointer transition-all
                            ${themeSettings.defaultMode === 'system' ? 'border-primary bg-muted/50' : 'border-border hover:border-muted'}
                          `}
                          onClick={() => setThemeSettings({...themeSettings, defaultMode: 'system'})}
                        >
                          <Monitor className="h-8 w-8 mb-2" />
                          <span className="text-sm font-medium">System</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <div className="flex justify-end w-full">
                  <Button variant="outline" className="mr-2" onClick={() => {
                    handleThemeChange('default');
                    setThemeSettings({
                      ...themeSettings,
                      fontFamily: 'Inter',
                      borderRadius: 'medium',
                      enableDarkMode: true,
                      defaultMode: 'system',
                    });
                  }}>
                    Reset to Default
                  </Button>
                  <Button onClick={handleSaveThemeSettings}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Theme Settings
                  </Button>
                </div>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="mr-2 h-5 w-5" />
                  Theme Preview
                </CardTitle>
                <CardDescription>
                  Preview how your theme will look
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md p-6 mb-4">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold" style={{ color: themeSettings.primaryColor }}>
                        Sample Heading
                      </h2>
                      <Button style={{ 
                        backgroundColor: themeSettings.primaryColor,
                        borderColor: themeSettings.primaryColor
                      }}>
                        Primary Button
                      </Button>
                    </div>
                    
                    <p className="text-muted-foreground">
                      This is a sample paragraph showing how text will appear with your current theme settings.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border rounded-md p-4" style={{
                        borderColor: themeSettings.secondaryColor,
                        borderWidth: '2px'
                      }}>
                        <h3 className="text-lg font-medium" style={{ color: themeSettings.secondaryColor }}>
                          Secondary Color
                        </h3>
                        <p className="text-sm">Sample card with secondary color.</p>
                      </div>
                      
                      <div className="border rounded-md p-4" style={{
                        borderColor: themeSettings.accentColor,
                        borderWidth: '2px'
                      }}>
                        <h3 className="text-lg font-medium" style={{ color: themeSettings.accentColor }}>
                          Accent Color
                        </h3>
                        <p className="text-sm">Sample card with accent color.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* SEO Settings */}
        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="mr-2 h-5 w-5" />
                SEO & Meta Settings
              </CardTitle>
              <CardDescription>
                Configure search engine optimization and social sharing settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  name="metaTitle"
                  value={seoSettings.metaTitle}
                  onChange={handleSEOSettingChange}
                />
                <p className="text-xs text-muted-foreground">
                  Recommended length: 50-60 characters
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  name="metaDescription"
                  value={seoSettings.metaDescription}
                  onChange={handleSEOSettingChange}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  Recommended length: 150-160 characters
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="metaKeywords">Meta Keywords</Label>
                <Input
                  id="metaKeywords"
                  name="metaKeywords"
                  value={seoSettings.metaKeywords}
                  onChange={handleSEOSettingChange}
                />
                <p className="text-xs text-muted-foreground">
                  Separate keywords with commas
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-base font-medium mb-4">Social Media Sharing</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="ogImage">Open Graph Image</Label>
                    <div className="mt-2">
                      {seoSettings.ogImage && (
                        <img 
                          src={seoSettings.ogImage} 
                          alt="OG Preview" 
                          className="mb-4 rounded-md border h-32 object-cover" 
                        />
                      )}
                      <EnhancedFileUpload
                        endpoint="/api/uploads/og-image"
                        onSuccess={handleOGImageSuccess}
                        accept="image/*"
                        maxSize={2}
                        label="Upload OG Image"
                        category="site"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Recommended size: 1200x630 pixels
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="twitterHandle">Twitter Username</Label>
                      <Input
                        id="twitterHandle"
                        name="twitterHandle"
                        value={seoSettings.twitterHandle}
                        onChange={handleSEOSettingChange}
                        placeholder="@username"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                      <Input
                        id="googleAnalyticsId"
                        name="googleAnalyticsId"
                        value={seoSettings.googleAnalyticsId}
                        onChange={handleSEOSettingChange}
                        placeholder="G-XXXXXXXXXX"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium">Allow Search Indexing</h3>
                  <p className="text-sm text-muted-foreground">
                    Allow search engines to index your website
                  </p>
                </div>
                <Switch 
                  checked={seoSettings.enableIndexing}
                  onCheckedChange={(checked) => handleToggleChange('enableIndexing', checked, 'seo')}
                />
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleSaveSEOSettings}>
                  <Save className="mr-2 h-4 w-4" />
                  Save SEO Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Advanced Settings */}
        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="mr-2 h-5 w-5" />
                Advanced Settings
              </CardTitle>
              <CardDescription>
                Configure advanced settings for your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="customHeader">Custom Header Code</Label>
                <Textarea
                  id="customHeader"
                  placeholder="<!-- Add custom code to be inserted in the <head> section -->"
                  className="font-mono text-xs"
                  rows={6}
                />
                <p className="text-xs text-muted-foreground">
                  Custom HTML, JavaScript, or CSS to be inserted in the <code>&lt;head&gt;</code> section
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="customFooter">Custom Footer Code</Label>
                <Textarea
                  id="customFooter"
                  placeholder="<!-- Add custom code to be inserted before the closing </body> tag -->"
                  className="font-mono text-xs"
                  rows={6}
                />
                <p className="text-xs text-muted-foreground">
                  Custom HTML or JavaScript to be inserted before the closing <code>&lt;/body&gt;</code> tag
                </p>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-base font-medium">Cache & Performance</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Browser Caching</h4>
                    <p className="text-sm text-muted-foreground">
                      Enable browser caching for improved performance
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Image Optimization</h4>
                    <p className="text-sm text-muted-foreground">
                      Automatically optimize images for web
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Minify HTML/CSS/JS</h4>
                    <p className="text-sm text-muted-foreground">
                      Minify code for faster loading
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex justify-start">
                  <Button variant="outline">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Clear Cache
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-end">
                <Button onClick={() => {
                  toast({
                    title: 'Advanced Settings Saved',
                    description: 'Your advanced settings have been updated successfully.',
                  });
                }}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Advanced Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminSettings;
