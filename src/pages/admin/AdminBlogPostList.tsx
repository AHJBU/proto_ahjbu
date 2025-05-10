
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
const mockBlogPosts = [
  {
    id: 1,
    title: 'Getting Started with React and Tailwind CSS',
    excerpt: 'Learn how to set up and use React with Tailwind CSS for rapid development.',
    status: 'published',
    publishDate: '2025-04-20',
    category: 'Web Development',
    author: 'Ahmed Jamal',
    tags: ['React', 'Tailwind CSS', 'Frontend'],
    image: '/assets/blog1.jpg',
    views: 452,
    comments: 8
  },
  {
    id: 2,
    title: 'The Future of Mobile App Development',
    excerpt: 'Exploring upcoming trends and technologies that will shape mobile app development.',
    status: 'published',
    publishDate: '2025-04-15',
    category: 'App Development',
    author: 'Ahmed Jamal',
    tags: ['Mobile', 'App Development', 'Trends'],
    image: '/assets/blog2.jpg',
    views: 321,
    comments: 5
  },
  {
    id: 3,
    title: 'Effective Social Media Strategies for 2025',
    excerpt: 'Discover the most effective social media strategies to grow your audience in 2025.',
    status: 'draft',
    publishDate: null,
    category: 'Social Media',
    author: 'Ahmed Jamal',
    tags: ['Social Media', 'Marketing', 'Digital Strategy'],
    image: '/assets/blog3.jpg',
    views: 0,
    comments: 0
  },
  {
    id: 4,
    title: 'Advanced UI/UX Design Principles',
    excerpt: 'Master advanced UI/UX design principles to create exceptional user experiences.',
    status: 'scheduled',
    publishDate: '2025-05-01',
    category: 'Design',
    author: 'Ahmed Jamal',
    tags: ['Design', 'UI/UX', 'User Experience'],
    image: '/assets/blog4.jpg',
    views: 0,
    comments: 0
  },
  {
    id: 5,
    title: 'SEO Tactics for 2025',
    excerpt: 'The latest SEO tactics to improve your website ranking in search engines.',
    status: 'draft',
    publishDate: null,
    category: 'SEO',
    author: 'Ahmed Jamal',
    tags: ['SEO', 'Digital Marketing', 'Web Traffic'],
    image: '/assets/blog5.jpg',
    views: 0,
    comments: 0
  }
];

// Mock categories
const mockCategories = [
  { id: 1, name: 'Web Development', count: 5 },
  { id: 2, name: 'App Development', count: 3 },
  { id: 3, name: 'Design', count: 4 },
  { id: 4, name: 'Social Media', count: 2 },
  { id: 5, name: 'SEO', count: 1 }
];

const AdminBlogPostList: React.FC = () => {
  const [posts, setPosts] = useState(mockBlogPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
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
  
  // Handle deleting a post
  const handleDeletePost = (id: number) => {
    setIsLoading(true);
    
    // In a real app, this would be an API call to delete the post
    setTimeout(() => {
      setPosts(posts.filter(post => post.id !== id));
      
      toast({
        title: "Post Deleted",
        description: "The blog post has been deleted successfully.",
      });
      
      setIsLoading(false);
    }, 500);
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
          <Select value={statusFilter || ''} onValueChange={(value) => setStatusFilter(value || null)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Drafts</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={categoryFilter || ''} onValueChange={(value) => setCategoryFilter(value || null)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
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
