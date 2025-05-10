
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import WordPressImportExport from '@/components/admin/WordPressImportExport';
import FeaturedPostsManager from '@/components/admin/FeaturedPostsManager';
import ScrollReveal from '@/components/ui/scroll-reveal';
import { Plus, FileText, Archive, Settings, Rss } from 'lucide-react';
import AdminBlogPostList from './AdminBlogPostList';

const AdminBlog: React.FC = () => {
  const navigate = useNavigate();
  
  const handleNewPost = () => {
    navigate('/admin/blog/new');
  };
  
  return (
    <AdminLayout title="Blog Management">
      <Tabs defaultValue="all-posts" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="all-posts">All Posts</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="import-export">Import/Export</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        {/* All Posts Tab */}
        <TabsContent value="all-posts">
          <AdminBlogPostList />
        </TabsContent>
        
        {/* Drafts Tab */}
        <TabsContent value="drafts">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Draft Posts</CardTitle>
                <CardDescription>
                  Edit and manage your unpublished draft posts
                </CardDescription>
              </div>
              <Button onClick={handleNewPost}>
                <Plus className="mr-2 h-4 w-4" />
                New Post
              </Button>
            </CardHeader>
            <CardContent>
              {/* Draft posts will be loaded here */}
              <p className="text-center py-8 text-muted-foreground">Loading drafts...</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Featured Posts Tab */}
        <TabsContent value="featured">
          <FeaturedPostsManager />
        </TabsContent>
        
        {/* Categories Tab */}
        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Blog Categories</CardTitle>
              <CardDescription>
                Manage categories for your blog posts
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Category management interface */}
              <p className="text-center py-8 text-muted-foreground">Category management coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Import/Export Tab */}
        <TabsContent value="import-export">
          <WordPressImportExport />
        </TabsContent>
        
        {/* Settings Tab */}
        <TabsContent value="settings">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Blog Settings
                </CardTitle>
                <CardDescription>
                  Configure general settings for your blog
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">Blog settings coming soon...</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Rss className="h-5 w-5 mr-2" />
                  RSS Feed
                </CardTitle>
                <CardDescription>
                  Configure and manage RSS/Atom feeds for your blog
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">RSS Feed URL</h3>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value="https://ahmed-jamal-digital-hub.lovable.app/rss.xml"
                      readOnly
                      className="flex-1 px-3 py-2 border rounded-md text-sm bg-muted"
                    />
                    <Button variant="outline" size="sm">
                      Copy
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Atom Feed URL</h3>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value="https://ahmed-jamal-digital-hub.lovable.app/atom.xml"
                      readOnly
                      className="flex-1 px-3 py-2 border rounded-md text-sm bg-muted"
                    />
                    <Button variant="outline" size="sm">
                      Copy
                    </Button>
                  </div>
                </div>
                
                <Button className="w-full" variant="outline">
                  <Rss className="mr-2 h-4 w-4" />
                  Configure Feed Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminBlog;
