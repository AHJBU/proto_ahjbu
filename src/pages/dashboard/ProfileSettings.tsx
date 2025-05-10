import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

interface ProfileSettingsProps {
  siteVars: any;
  setSiteVars: (vars: any) => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ siteVars, setSiteVars }) => {
  const [edit, setEdit] = useState({
    nameAr: '', nameEn: '', titleAr: '', titleEn: '', bioAr: '', bioEn: '', addressAr: '', addressEn: '', email: '', phone: '', website: '', avatar: '', coverImage: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (siteVars && siteVars.profileData) {
      setEdit({
        nameAr: siteVars.profileData.nameAr || '',
        nameEn: siteVars.profileData.nameEn || '',
        titleAr: siteVars.profileData.titleAr || '',
        titleEn: siteVars.profileData.titleEn || '',
        bioAr: siteVars.profileData.bioAr || '',
        bioEn: siteVars.profileData.bioEn || '',
        addressAr: siteVars.profileData.addressAr || '',
        addressEn: siteVars.profileData.addressEn || '',
        email: siteVars.profileData.email || '',
        phone: siteVars.profileData.phone || '',
        website: siteVars.profileData.website || '',
        avatar: siteVars.profileData.avatar || '',
        coverImage: siteVars.profileData.coverImage || ''
      });
      setLoading(false);
    }
  }, [siteVars]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      profileData: {
        ...latestVars.profileData,
        ...edit
      }
    };
    setSiteVars(newVars);
    try {
      const res = await fetch('/api/site-variables', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVars),
      });
      if (!res.ok) throw new Error('فشل في حفظ إعدادات السيرة الذاتية');
      toast({ title: 'تم الحفظ بنجاح', description: 'تم تحديث إعدادات السيرة الذاتية بنجاح 🎉' });
    } catch (err: any) {
      toast({ title: 'خطأ في الحفظ', description: err.message, variant: 'destructive' });
    }
  };
  if (loading) return <div className="container py-8">...جاري التحميل</div>;

  return (
    <Card className="shadow-xl border-0">
      <CardHeader>
        <CardTitle className="text-xl font-bold mb-2 text-center">إعدادات السيرة الذاتية</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold">الاسم (عربي)</label>
            <Input name="nameAr" value={edit.nameAr} onChange={handleChange} />
          </div>
          <div>
            <label className="font-semibold">Name (EN)</label>
            <Input name="nameEn" value={edit.nameEn} onChange={handleChange} />
          </div>
          <div>
            <label className="font-semibold">المسمى الوظيفي (عربي)</label>
            <Input name="titleAr" value={edit.titleAr} onChange={handleChange} />
          </div>
          <div>
            <label className="font-semibold">Title (EN)</label>
            <Input name="titleEn" value={edit.titleEn} onChange={handleChange} />
          </div>
          <div className="col-span-2">
            <label className="font-semibold">نبذة (عربي)</label>
            <Textarea name="bioAr" value={edit.bioAr} onChange={handleChange} />
          </div>
          <div className="col-span-2">
            <label className="font-semibold">Bio (EN)</label>
            <Textarea name="bioEn" value={edit.bioEn} onChange={handleChange} />
          </div>
          <div>
            <label className="font-semibold">العنوان (عربي)</label>
            <Input name="addressAr" value={edit.addressAr} onChange={handleChange} />
          </div>
          <div>
            <label className="font-semibold">Address (EN)</label>
            <Input name="addressEn" value={edit.addressEn} onChange={handleChange} />
          </div>
          <div>
            <label className="font-semibold">البريد الإلكتروني</label>
            <Input name="email" value={edit.email} onChange={handleChange} />
          </div>
          <div>
            <label className="font-semibold">رقم الجوال</label>
            <Input name="phone" value={edit.phone} onChange={handleChange} />
          </div>
          <div>
            <label className="font-semibold">الموقع الإلكتروني</label>
            <Input name="website" value={edit.website} onChange={handleChange} />
          </div>
          <div>
            <label className="font-semibold">الصورة الشخصية (avatar)</label>
            <Input name="avatar" value={edit.avatar} onChange={handleChange} />
          </div>
          <div className="col-span-2">
            <label className="font-semibold">صورة الغلاف (coverImage)</label>
            <Input name="coverImage" value={edit.coverImage} onChange={handleChange} />
          </div>
        </div>
        <Button className="w-full" onClick={handleSave}>حفظ إعدادات السيرة الذاتية</Button>
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;
