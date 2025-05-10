import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import BlogPostEditor from '@/components/admin/BlogPostEditor';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const AdminBlogPostNew: React.FC = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  // Save handler: send to backend API
  const handleSave = async (postData: any) => {
    setSaving(true);
    try {
      const response = await fetch('http://localhost:4000/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });
      if (!response.ok) throw new Error('فشل الحفظ!');
      toast({ title: 'تم الحفظ', description: 'تمت إضافة التدوينة بنجاح.' });
      navigate('/admin/blog');
    } catch (err: any) {
      toast({ title: 'خطأ', description: err.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="إضافة تدوينة جديدة">
      <div className="max-w-3xl mx-auto">
        <BlogPostEditor onSave={handleSave} />
        {saving && <div className="text-center text-gray-500 mt-2">جاري الحفظ...</div>}
      </div>
    </AdminLayout>
  );
};

export default AdminBlogPostNew;
