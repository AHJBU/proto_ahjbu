
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, PenLine, Trash2, Eye, Search, Filter, RefreshCw } from 'lucide-react';

// Mock blog posts data
// حذف mockBlogPosts - سيتم جلب التدوينات من الباكند

// Mock categories
const mockCategories = [
  { id: 1, name: 'Web Development', count: 5 },
  { id: 2, name: 'App Development', count: 3 },
  { id: 3, name: 'Design', count: 4 },
  { id: 4, name: 'Social Media', count: 2 },
  { id: 5, name: 'SEO', count: 1 }
];

const AdminBlogPostList: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // جلب التدوينات من الباكند
  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:4000/api/blog');
      if (!response.ok) throw new Error('فشل جلب التدوينات');
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchPosts();
  }, []);
  
  // Filter posts based on search term, status, and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || post.status === statusFilter;
    const matchesCategory = !categoryFilter || post.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });
  
  // Handle creating a new post
  const handleNewPost = () => {
    navigate('/admin/blog/new');
  };

  // Handle editing an existing post
  const handleEditPost = (id: number) => {
    navigate(`/admin/blog/edit/${id}`);
  };

  // حذف تدوينة عبر API
  const handleDeletePost = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/blog/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('فشل حذف التدوينة');
      toast({ title: "تم الحذف", description: "تم حذف التدوينة بنجاح." });
      fetchPosts(); // تحديث القائمة بعد الحذف
    } catch (err: any) {
      toast({ title: 'خطأ', description: err.message, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle view post
  const handleViewPost = (id: number) => {
    window.open(`/blog/${id}`, '_blank');
  };

  
  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter(null);
    setCategoryFilter(null);
  };
  
  // Count posts by status
  const publishedCount = posts.filter(post => post.status === 'published').length;
  const draftCount = posts.filter(post => post.status === 'draft').length;
  const scheduledCount = posts.filter(post => post.status === 'scheduled').length;
  const totalViews = posts.reduce((acc, post) => acc + post.views, 0);
  
  return (
    <AdminLayout title="Blog Posts">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            className="pl-8 w-full md:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <Select value={statusFilter || 'all'} onValueChange={(value) => setStatusFilter(value === 'all' ? null : value)}>
  <SelectTrigger className="w-[150px]">
    <SelectValue placeholder="Status" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="all">All Statuses</SelectItem>
    <SelectItem value="published">Published</SelectItem>
    <SelectItem value="draft">Drafts</SelectItem>
    <SelectItem value="scheduled">Scheduled</SelectItem>
  </SelectContent>
</Select>
          
          <Select value={categoryFilter || 'all'} onValueChange={(value) => setCategoryFilter(value === 'all' ? null : value)}>
  <SelectTrigger className="w-[150px]">
    <SelectValue placeholder="Category" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="all">All Categories</SelectItem>
    {mockCategories.map(category => (
      <SelectItem key={category.id} value={category.name}>
        {category.name}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
          
          {(searchTerm || statusFilter || categoryFilter) && (
            <Button variant="outline" onClick={resetFilters}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          )}
          
          <Button onClick={handleNewPost}>
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Published</p>
              <p className="text-2xl font-bold">{publishedCount}</p>
            </div>
            <Badge variant="default" className="text-sm px-2">Live</Badge>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Drafts</p>
              <p className="text-2xl font-bold">{draftCount}</p>
            </div>
            <Badge variant="outline" className="text-sm px-2">Drafts</Badge>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Scheduled</p>
              <p className="text-2xl font-bold">{scheduledCount}</p>
            </div>
            <Badge variant="secondary" className="text-sm px-2">Upcoming</Badge>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Views</p>
              <p className="text-2xl font-bold">{totalViews}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Blog Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Views</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <p className="text-muted-foreground">No posts found</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        {post.image && (
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-10 h-10 object-cover rounded mr-3"
                          />
                        )}
                        <div>
                          {post.title}
                          <p className="text-xs text-muted-foreground max-w-xs truncate">{post.excerpt}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        post.status === 'published' ? 'default' : 
                        post.status === 'draft' ? 'outline' : 
                        'secondary'
                      }>
                        {post.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{post.category}</TableCell>
                    <TableCell>
                      {post.publishDate ? new Date(post.publishDate).toLocaleDateString() : '—'}
                    </TableCell>
                    <TableCell>{post.views}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleViewPost(post.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleEditPost(post.id)}
                      >
                        <PenLine className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeletePost(post.id)}
                        disabled={isLoading}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminBlogPostList;
