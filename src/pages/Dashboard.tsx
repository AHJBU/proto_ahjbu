import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const Dashboard: React.FC = () => {
  const [siteVars, setSiteVars] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState({
    siteName: '',
    contactEmail: '',
    tagline: ''
  });

  useEffect(() => {
    fetch('/all_site_variables.json')
      .then(res => res.json())
      .then(data => {
        setSiteVars(data);
        setEdit({
          siteName: data.siteSettings.siteName,
          contactEmail: data.siteSettings.contactEmail,
          tagline: data.siteSettings.tagline
        });
        setLoading(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setSiteVars((prev: any) => ({
      ...prev,
      siteSettings: {
        ...prev.siteSettings,
        siteName: edit.siteName,
        contactEmail: edit.contactEmail,
        tagline: edit.tagline
      }
    }));
    toast({ title: 'تم الحفظ بنجاح', description: 'تم تحديث الإعدادات مؤقتاً (بدون حفظ دائم)' });
  };

  if (loading) return <div className="container py-12">...جاري التحميل</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-100 dark:from-gray-900 dark:to-purple-900">
      <div className="container py-12">
        <Card className="max-w-xl mx-auto shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-3xl font-bold mb-2 text-center">لوحة تحكم الموقع (تجريبية)</CardTitle>
            <p className="text-muted-foreground text-center">إعدادات عامة - نسخة أولية</p>
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
            <Button className="w-full" onClick={handleSave}>حفظ الإعدادات</Button>
            <div className="text-xs text-muted-foreground text-center">لن يتم حفظ التعديلات بشكل دائم في هذه النسخة التجريبية</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
