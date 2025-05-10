import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import BlogPostEditor from '@/components/admin/BlogPostEditor';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const AdminBlogPostEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:4000/api/blog/${id}`);
        if (!response.ok) throw new Error('لم يتم العثور على التدوينة');
        const data = await response.json();
        setPost(data);
      } catch (err: any) {
        toast({ title: 'خطأ', description: err.message, variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleSave = async (postData: any) => {
    setSaving(true);
    try {
      const response = await fetch(`http://localhost:4000/api/blog/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });
      if (!response.ok) throw new Error('فشل التعديل!');
      toast({ title: 'تم الحفظ', description: 'تم تعديل التدوينة بنجاح.' });
      navigate('/admin/blog');
    } catch (err: any) {
      toast({ title: 'خطأ', description: err.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="تعديل التدوينة">
      <div className="max-w-3xl mx-auto">
        {loading ? (
          <div className="text-center text-gray-500">جاري تحميل التدوينة...</div>
        ) : post ? (
          <BlogPostEditor post={post} onSave={handleSave} />
        ) : null}
        {saving && <div className="text-center text-gray-500 mt-2">جاري الحفظ...</div>}
      </div>
    </AdminLayout>
  );
};

export default AdminBlogPostEdit;
