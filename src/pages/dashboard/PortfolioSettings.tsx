import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

interface PortfolioSettingsProps {
  siteVars: any;
  setSiteVars: (vars: any) => void;
}

const PortfolioSettings: React.FC<PortfolioSettingsProps> = ({ siteVars, setSiteVars }) => {
  const [edit, setEdit] = useState({
    categories: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (siteVars && siteVars.mockContent && siteVars.mockContent.portfolioCategories) {
      setEdit({
        categories: siteVars.mockContent.portfolioCategories || [],
      });
      setLoading(false);
    }
  }, [siteVars]);

  const handleCategoryChange = (idx: number, field: string, lang: string, value: string) => {
    const updated = edit.categories.map((cat: any, i: number) =>
      i === idx ? { ...cat, name: { ...cat.name, [lang]: value } } : cat
    );
    setEdit({ ...edit, categories: updated });
  };
  const handleAddCategory = () => {
    setEdit({
      ...edit,
      categories: [...edit.categories, { id: '', name: { en: '', ar: '' } }],
    });
  };
  const handleRemoveCategory = (idx: number) => {
    setEdit({
      ...edit,
      categories: edit.categories.filter((_, i) => i !== idx),
    });
  };
  const handleIdChange = (idx: number, value: string) => {
    const updated = edit.categories.map((cat: any, i: number) =>
      i === idx ? { ...cat, id: value } : cat
    );
    setEdit({ ...edit, categories: updated });
  };
  const handleSave = async () => {
    let latestVars = siteVars;
    try {
      const res = await fetch('/all_site_variables.json');
      if (res.ok) latestVars = await res.json();
    } catch {}
    const newVars = {
      ...latestVars,
      mockContent: {
        ...latestVars.mockContent,
        portfolioCategories: edit.categories,
      },
    };
    setSiteVars(newVars);
    try {
      const res = await fetch('/api/site-variables', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVars),
      });
      if (!res.ok) throw new Error('فشل في حفظ إعدادات البورتفوليو');
      toast({ title: 'تم الحفظ بنجاح', description: 'تم تحديث إعدادات البورتفوليو بنجاح 🎉' });
    } catch (err: any) {
      toast({ title: 'خطأ في الحفظ', description: err.message, variant: 'destructive' });
    }
  };
  if (loading) return <div className="container py-8">...جاري التحميل</div>;

  return (
    <Card className="shadow-xl border-0">
      <CardHeader>
        <CardTitle className="text-xl font-bold mb-2 text-center">إعدادات البورتفوليو</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="font-semibold">تصنيفات البورتفوليو</label>
          {edit.categories.map((cat: any, idx: number) => (
            <div key={idx} className="flex gap-2 items-center mb-2">
              <Input
                placeholder="ID"
                value={cat.id}
                onChange={e => handleIdChange(idx, e.target.value)}
                className="w-24"
              />
              <Input
                placeholder="اسم التصنيف (عربي)"
                value={cat.name.ar}
                onChange={e => handleCategoryChange(idx, 'name', 'ar', e.target.value)}
                className="w-48"
              />
              <Input
                placeholder="Category Name (EN)"
                value={cat.name.en}
                onChange={e => handleCategoryChange(idx, 'name', 'en', e.target.value)}
                className="w-48"
              />
              <Button type="button" variant="destructive" onClick={() => handleRemoveCategory(idx)}>-</Button>
            </div>
          ))}
          <Button type="button" onClick={handleAddCategory}>إضافة تصنيف</Button>
        </div>
        <Button className="w-full" onClick={handleSave}>حفظ إعدادات البورتفوليو</Button>
      </CardContent>
    </Card>
  );
};

export default PortfolioSettings;
