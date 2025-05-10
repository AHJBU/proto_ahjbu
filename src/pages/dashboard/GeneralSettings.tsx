import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

interface GeneralSettingsProps {
  siteVars: any;
  setSiteVars: (vars: any) => void;
}

const GeneralSettings: React.FC<GeneralSettingsProps> = ({ siteVars, setSiteVars }) => {
  const [edit, setEdit] = useState({
    siteName: '',
    contactEmail: '',
    tagline: '',
    language: '',
    timezone: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (siteVars) {
      setEdit({
        siteName: siteVars.siteSettings.siteName || '',
        contactEmail: siteVars.siteSettings.contactEmail || '',
        tagline: siteVars.siteSettings.tagline || '',
        language: siteVars.siteSettings.language || '',
        timezone: siteVars.siteSettings.timezone || '',
      });
      setLoading(false);
    }
  }, [siteVars]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        siteName: edit.siteName,
        contactEmail: edit.contactEmail,
        tagline: edit.tagline,
        language: edit.language,
        timezone: edit.timezone,
      },
    };
    setSiteVars(newVars);
    try {
      const res = await fetch('/api/site-variables', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVars),
      });
      if (!res.ok) throw new Error('فشل في حفظ الإعدادات');
      toast({ title: 'تم الحفظ بنجاح', description: 'تم تحديث الإعدادات العامة بنجاح 🎉' });
    } catch (err: any) {
      toast({ title: 'خطأ في الحفظ', description: err.message, variant: 'destructive' });
    }
  };

  if (loading) return <div className="container py-8">...جاري التحميل</div>;


  return (
    <Card className="shadow-xl border-0">
      <CardHeader>
        <CardTitle className="text-xl font-bold mb-2 text-center">إعدادات عامة</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="font-semibold">اسم الموقع</label>
          <Input name="siteName" value={edit.siteName} onChange={handleChange} className="mt-1" />
        </div>
        <div>
          <label className="font-semibold">البريد الإلكتروني</label>
          <Input name="contactEmail" value={edit.contactEmail} onChange={handleChange} className="mt-1" />
        </div>
        <div>
          <label className="font-semibold">الوصف المختصر (Tagline)</label>
          <Input name="tagline" value={edit.tagline} onChange={handleChange} className="mt-1" />
        </div>
        <div>
          <label className="font-semibold">اللغة</label>
          <Input name="language" value={edit.language} onChange={handleChange} className="mt-1" />
        </div>
        <div>
          <label className="font-semibold">المنطقة الزمنية</label>
          <Input name="timezone" value={edit.timezone} onChange={handleChange} className="mt-1" />
        </div>
        <Button className="w-full" onClick={handleSave}>حفظ الإعدادات</Button>
      </CardContent>
    </Card>
  );
};

export default GeneralSettings;
