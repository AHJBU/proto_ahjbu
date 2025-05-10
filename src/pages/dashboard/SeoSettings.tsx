import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

interface SeoSettingsProps {
  siteVars: any;
  setSiteVars: (vars: any) => void;
}

const SeoSettings: React.FC<SeoSettingsProps> = ({ siteVars, setSiteVars }) => {
  const [edit, setEdit] = useState({
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    ogImage: '',
    twitterHandle: '',
    googleAnalyticsId: '',
    enableIndexing: true,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (siteVars && siteVars.adminSettings && siteVars.adminSettings.seoSettings) {
      const s = siteVars.adminSettings.seoSettings;
      setEdit({
        metaTitle: s.metaTitle || '',
        metaDescription: s.metaDescription || '',
        metaKeywords: s.metaKeywords || '',
        ogImage: s.ogImage || '',
        twitterHandle: s.twitterHandle || '',
        googleAnalyticsId: s.googleAnalyticsId || '',
        enableIndexing: s.enableIndexing !== undefined ? s.enableIndexing : true,
      });
      setLoading(false);
    }
  }, [siteVars]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setEdit({ ...edit, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSave = async () => {
    let latestVars = siteVars;
    try {
      const res = await fetch('/all_site_variables.json');
      if (res.ok) latestVars = await res.json();
    } catch {}
    const newVars = {
      ...latestVars,
      adminSettings: {
        ...latestVars.adminSettings,
        seoSettings: {
          ...edit
        }
      }
    };
    setSiteVars(newVars);
    try {
      const res = await fetch('/api/site-variables', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVars),
      });
      if (!res.ok) throw new Error('فشل في حفظ إعدادات السيو');
      toast({ title: 'تم الحفظ بنجاح', description: 'تم تحديث إعدادات السيو بنجاح 🎉' });
    } catch (err: any) {
      toast({ title: 'خطأ في الحفظ', description: err.message, variant: 'destructive' });
    }
  };

  if (loading) return <div className="container py-8">...جاري التحميل</div>;


  return (
    <Card className="shadow-xl border-0">
      <CardHeader>
        <CardTitle className="text-xl font-bold mb-2 text-center">إعدادات السيو (SEO)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="font-semibold">Meta Title</label>
          <Input name="metaTitle" value={edit.metaTitle} onChange={handleChange} className="mt-1" />
        </div>
        <div>
          <label className="font-semibold">Meta Description</label>
          <Input name="metaDescription" value={edit.metaDescription} onChange={handleChange} className="mt-1" />
        </div>
        <div>
          <label className="font-semibold">Meta Keywords</label>
          <Input name="metaKeywords" value={edit.metaKeywords} onChange={handleChange} className="mt-1" />
        </div>
        <div>
          <label className="font-semibold">OG Image</label>
          <Input name="ogImage" value={edit.ogImage} onChange={handleChange} className="mt-1" />
        </div>
        <div>
          <label className="font-semibold">Twitter Handle</label>
          <Input name="twitterHandle" value={edit.twitterHandle} onChange={handleChange} className="mt-1" />
        </div>
        <div>
          <label className="font-semibold">Google Analytics ID</label>
          <Input name="googleAnalyticsId" value={edit.googleAnalyticsId} onChange={handleChange} className="mt-1" />
        </div>
        <div>
          <label className="font-semibold">تفعيل الأرشفة (Indexing)</label>
          <input type="checkbox" name="enableIndexing" checked={edit.enableIndexing} onChange={handleChange} />
        </div>
        <Button className="w-full" onClick={handleSave}>حفظ إعدادات السيو</Button>
      </CardContent>
    </Card>
  );
};

export default SeoSettings;
