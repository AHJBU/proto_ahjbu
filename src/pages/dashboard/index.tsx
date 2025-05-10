import React, { useEffect, useState } from 'react';
import GeneralSettings from './GeneralSettings';
import SeoSettings from './SeoSettings';
import AppearanceSettings from './AppearanceSettings';
import AdvancedSettings from './AdvancedSettings';
import PortfolioSettings from './PortfolioSettings';
import ProfileSettings from './ProfileSettings';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const Dashboard: React.FC = () => {
  const [siteVars, setSiteVars] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('general');

  useEffect(() => {
    fetch('/all_site_variables.json')
      .then(res => res.json())
      .then(data => {
        setSiteVars(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container py-12">...جاري التحميل</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-100 dark:from-gray-900 dark:to-purple-900">
      <div className="container py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">لوحة تحكم الموقع</h1>
            <p className="text-muted-foreground">إدارة إعدادات الموقع بسهولة</p>
          </div>
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="flex justify-center mb-4">
              <TabsTrigger value="general">إعدادات عامة</TabsTrigger>
              <TabsTrigger value="appearance">المظهر</TabsTrigger>
              <TabsTrigger value="portfolio">البورتفوليو</TabsTrigger>
              <TabsTrigger value="seo">تحسين محركات البحث</TabsTrigger>
              <TabsTrigger value="profile">السيرة الذاتية</TabsTrigger>
              <TabsTrigger value="advanced">خيارات متقدمة</TabsTrigger>
            </TabsList>
            <TabsContent value="general">
              <GeneralSettings siteVars={siteVars} setSiteVars={setSiteVars} />
            </TabsContent>
            <TabsContent value="appearance">
              <AppearanceSettings siteVars={siteVars} setSiteVars={setSiteVars} />
            </TabsContent>
            <TabsContent value="portfolio">
              <PortfolioSettings siteVars={siteVars} setSiteVars={setSiteVars} />
            </TabsContent>
            <TabsContent value="seo">
              <SeoSettings siteVars={siteVars} setSiteVars={setSiteVars} />
            </TabsContent>
            <TabsContent value="profile">
              <ProfileSettings siteVars={siteVars} setSiteVars={setSiteVars} />
            </TabsContent>
            <TabsContent value="advanced">
              <AdvancedSettings siteVars={siteVars} setSiteVars={setSiteVars} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
