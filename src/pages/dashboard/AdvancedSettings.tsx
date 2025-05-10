import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

interface AdvancedSettingsProps {
  siteVars: any;
  setSiteVars: (vars: any) => void;
}

const AdvancedSettings: React.FC<AdvancedSettingsProps> = ({ siteVars, setSiteVars }) => {
  const [edit, setEdit] = useState({
    customHeader: '',
    customFooter: '',
    browserCaching: false,
    imageOptimization: false,
    minify: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (siteVars && siteVars.adminSettings && siteVars.adminSettings.advancedSettings) {
      const adv = siteVars.adminSettings.advancedSettings;
      setEdit({
        customHeader: adv.customHeader || '',
        customFooter: adv.customFooter || '',
        browserCaching: adv.browserCaching ?? false,
        imageOptimization: adv.imageOptimization ?? false,
        minify: adv.minify ?? false,
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
        advancedSettings: {
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
      if (!res.ok) throw new Error('فشل في حفظ الإعدادات المتقدمة');
      toast({ title: 'تم الحفظ بنجاح', description: 'تم تحديث الإعدادات المتقدمة بنجاح 🎉' });
    } catch (err: any) {
      toast({ title: 'خطأ في الحفظ', description: err.message, variant: 'destructive' });
    }
  };

  if (loading) return <div className="container py-8">...جاري التحميل</div>;


  return (
    <Card className="shadow-xl border-0">
      <CardHeader>
        <CardTitle className="text-xl font-bold mb-2 text-center">إعدادات متقدمة</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="font-semibold">Custom Header</label>
          <Input name="customHeader" value={edit.customHeader} onChange={handleChange} className="mt-1" />
        </div>
        <div>
          <label className="font-semibold">Custom Footer</label>
          <Input name="customFooter" value={edit.customFooter} onChange={handleChange} className="mt-1" />
        </div>
        <div>
          <label className="font-semibold">تفعيل كاش المتصفح</label>
          <input type="checkbox" name="browserCaching" checked={edit.browserCaching} onChange={handleChange} />
        </div>
        <div>
          <label className="font-semibold">تحسين الصور تلقائياً</label>
          <input type="checkbox" name="imageOptimization" checked={edit.imageOptimization} onChange={handleChange} />
        </div>
        <div>
          <label className="font-semibold">ضغط الملفات (Minify)</label>
          <input type="checkbox" name="minify" checked={edit.minify} onChange={handleChange} />
        </div>
        <Button className="w-full" onClick={handleSave}>حفظ الإعدادات المتقدمة</Button>
      </CardContent>
    </Card>
  );
};

export default AdvancedSettings;
