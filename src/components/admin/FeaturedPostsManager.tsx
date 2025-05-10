
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import ScrollReveal from '@/components/ui/scroll-reveal';

// Mock blog posts data (in a real app this would come from the database)
const mockBlogPosts = [
  {
    id: 1,
    title: 'Design Trends for 2025',
    category: 'Design',
    publishDate: '2025-04-20',
    views: 452,
    featured: true
  },
  {
    id: 2,
    title: 'Introduction to React Hooks',
    category: 'Development',
    publishDate: '2025-04-15',
    views: 321,
    featured: false
  },
  {
    id: 3,
    title: 'Mastering Social Media Marketing',
    category: 'Marketing',
    publishDate: '2025-04-10',
    views: 287,
    featured: true
  },
  {
    id: 4,
    title: 'The Future of Mobile App Design',
    category: 'Design',
    publishDate: '2025-04-05',
    views: 178,
    featured: false
  },
  {
    id: 5,
    title: 'Building Accessible Websites',
    category: 'Development',
    publishDate: '2025-03-28',
    views: 215,
    featured: false
  }
];

const FeaturedPostsManager: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState(mockBlogPosts);
  
  const handleToggleFeatured = (id: number) => {
    // Check how many posts are already featured
    const featuredPosts = blogPosts.filter(post => post.featured);
    const post = blogPosts.find(p => p.id === id);
    
    if (!post) return;
    
    // If trying to feature a post but already have 2 featured posts
    if (!post.featured && featuredPosts.length >= 2) {
      toast({
        title: "Featured limit reached",
        description: "You can only feature up to 2 posts on the homepage. Please unfeature another post first.",
        variant: "destructive"
      });
      return;
    }
    
    // Update the post's featured status
    setBlogPosts(posts => 
      posts.map(p => 
        p.id === id ? { ...p, featured: !p.featured } : p
      )
    );
    
    toast({
      title: post.featured ? "Post removed from featured" : "Post added to featured",
      description: `"${post.title}" ${post.featured ? "will no longer be" : "will now be"} displayed on the homepage.`,
    });
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <ScrollReveal>
      <Card>
        <CardHeader>
          <CardTitle>Manage Featured Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted-foreground">
              Select up to 2 posts to feature on the homepage. Featured posts will be displayed in the "Latest Articles" section.
            </p>
            <Badge variant="outline">
              {blogPosts.filter(post => post.featured).length}/2 Featured
            </Badge>
          </div>
          
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead className="text-right">Featured</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{post.category}</Badge>
                    </TableCell>
                    <TableCell>{formatDate(post.publishDate)}</TableCell>
                    <TableCell>{post.views}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Switch 
                          id={`featured-${post.id}`}
                          checked={post.featured}
                          onCheckedChange={() => handleToggleFeatured(post.id)}
                        />
                        <Label htmlFor={`featured-${post.id}`} className="sr-only">
                          Featured
                        </Label>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button variant="outline" className="mr-2">Cancel</Button>
            <Button onClick={() => {
              toast({
                title: "Settings saved",
                description: "Your featured posts have been updated successfully."
              });
            }}>
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </ScrollReveal>
  );
};

export default FeaturedPostsManager;
