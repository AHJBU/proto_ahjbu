import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input, Select } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

interface AppearanceSettingsProps {
  siteVars: any;
  setSiteVars: (vars: any) => void;
}

const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({ siteVars, setSiteVars }) => {
  const [edit, setEdit] = useState({
    logo: '',
    favicon: '',
    defaultTheme: '',
    theme: '',
    themeOptions: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (siteVars && siteVars.siteSettings && siteVars.adminSettings) {
      setEdit({
        logo: siteVars.siteSettings.logo || '',
        favicon: siteVars.siteSettings.favicon || '',
        defaultTheme: siteVars.siteSettings.defaultTheme || '',
        theme: siteVars.siteSettings.theme || '',
        themeOptions: siteVars.adminSettings.themeOptions || [],
      });
      setLoading(false);
    }
  }, [siteVars]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    let latestVars = siteVars;
    try {
      const res = await fetch('/all_site_variables.json');
      if (res.ok) latestVars = await res.json();
    } catch {}
    const newVars = {
      ...latestVars,
      siteSettings: {
        ...latestVars.siteSettings,
        logo: edit.logo,
        favicon: edit.favicon,
        defaultTheme: edit.defaultTheme,
        theme: edit.theme,
      }
    };
    setSiteVars(newVars);
    try {
      const res = await fetch('/api/site-variables', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVars),
      });
      if (!res.ok) throw new Error('فشل في حفظ إعدادات المظهر');
      toast({ title: 'تم الحفظ بنجاح', description: 'تم تحديث إعدادات المظهر بنجاح 🎉' });
    } catch (err: any) {
      toast({ title: 'خطأ في الحفظ', description: err.message, variant: 'destructive' });
    }
  };

  if (loading) return <div className="container py-8">...جاري التحميل</div>;


  return (
    <Card className="shadow-xl border-0">
      <CardHeader>
        <CardTitle className="text-xl font-bold mb-2 text-center">إعدادات المظهر</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="font-semibold">شعار الموقع (logo)</label>
          <Input name="logo" value={edit.logo} onChange={handleChange} className="mt-1" />
        </div>
        <div>
          <label className="font-semibold">Favicon</label>
          <Input name="favicon" value={edit.favicon} onChange={handleChange} className="mt-1" />
        </div>
        <div>
          <label className="font-semibold">الثيم الافتراضي</label>
          <select name="defaultTheme" value={edit.defaultTheme} onChange={handleChange} className="mt-1 w-full">
            <option value="">اختر الثيم</option>
            {edit.themeOptions.map((opt: any) => (
              <option key={opt.id} value={opt.id}>{opt.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-semibold">الثيم الحالي</label>
          <select name="theme" value={edit.theme} onChange={handleChange} className="mt-1 w-full">
            <option value="">اختر الثيم</option>
            {edit.themeOptions.map((opt: any) => (
              <option key={opt.id} value={opt.id}>{opt.name}</option>
            ))}
          </select>
        </div>
        <Button className="w-full" onClick={handleSave}>حفظ إعدادات المظهر</Button>
      </CardContent>
    </Card>
  );
};

export default AppearanceSettings;
