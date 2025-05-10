import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CalendarIcon, ArrowLeft, Tag } from 'lucide-react';
import ShareButtons from '@/components/blog/ShareButtons';
import AuthorProfile from '@/components/blog/AuthorProfile';
import { Twitter, Facebook, Linkedin, Github, Instagram, Youtube } from 'lucide-react';
import ScrollReveal from '@/components/ui/scroll-reveal';

import { getBlogPostById } from '@/services/contentService';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!id) throw new Error('No post ID provided');
        const fetchedPost = await getBlogPostById(id);
        if (!fetchedPost) throw new Error('Blog post not found');
        setPost(fetchedPost);
        document.title = fetchedPost.title;
      } catch (err: any) {
        setError(err.message || 'Failed to load post');
        setPost(null);
      } finally {
        setLoading(false);
        setCurrentUrl(window.location.href);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-secondary rounded w-3/4"></div>
            <div className="h-4 bg-secondary rounded w-1/2"></div>
            <div className="h-96 bg-secondary rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Error</h1>
          <p className="mb-8">{error}</p>
          <Link to="/blog">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
          <Link to="/blog">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  // Function to convert markdown-like content to HTML
  const renderContent = () => {
    let content = post.content;
    
    // Basic markdown-like transformations
    // Headers
    content = content.replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold my-4">$1</h1>');
    content = content.replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold my-4">$1</h2>');
    content = content.replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold my-3">$1</h3>');
    
    // Bold and italic
    content = content.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    content = content.replace(/\_(.+?)\_/g, '<em>$1</em>');
    
    // Lists
    content = content.replace(/^- (.+)$/gm, '<li>$1</li>');
    content = content.replace(/(<li>.+<\/li>\n)+/g, '<ul class="list-disc ml-6 my-4">$&</ul>');
    
    // Images
    content = content.replace(/!\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1" class="my-6 rounded-lg w-full">');
    
    // Links
    content = content.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>');
    
    // Paragraphs
    content = content.replace(/^(?!<[h|u|l|i|p])(.+)$/gm, '<p class="my-4">$1</p>');
    
    // Return as HTML
    return { __html: content };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Layout>
      <article className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <Link to="/blog" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <div className="mb-6">
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-3 text-muted-foreground mb-4">
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-1" />
                  <span>{post.category.replace('-', ' ')}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-8">
              <img 
                src={post.image} 
                alt={post.title} 
                className="object-cover w-full h-full"
              />
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Main Content */}
            <ScrollReveal delay={0.3} className="md:col-span-8">
              <div className="prose dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={renderContent()} />
              </div>
              
              <div className="flex flex-wrap gap-2 my-8">
                {post.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              {/* Share buttons */}
              <div className="my-8">
                <h3 className="text-lg font-medium mb-2">Share this article</h3>
                <ShareButtons title={post.title} url={currentUrl} showLabel={true} />
              </div>
              
              <Separator />
              
              {/* Author Info */}
              <div className="my-8">
                <AuthorProfile 
                  name={post.author.name} 
                  bio={post.author.bio} 
                  avatar={post.author.avatar}
                  socialLinks={post.author.socialLinks}
                />
              </div>
            </ScrollReveal>
            
            {/* Sidebar */}
            <ScrollReveal delay={0.4} className="md:col-span-4">
              <div className="space-y-8 sticky top-24">
                {/* Table of Contents */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Table of Contents</h3>
                    <ScrollArea className="h-56">
                      <nav className="space-y-1">
                        <a href="#introduction" className="block text-sm py-1 hover:text-primary">Introduction</a>
                        <a href="#ai-powered-development" className="block text-sm py-1 hover:text-primary">1. AI-Powered Development</a>
                        <a href="#web-assembly" className="block text-sm py-1 hover:text-primary">2. Web Assembly Goes Mainstream</a>
                        <a href="#headless-architecture" className="block text-sm py-1 hover:text-primary">3. The Rise of Headless Architecture</a>
                        <a href="#pwas" className="block text-sm py-1 hover:text-primary">4. Progressive Web Apps Become Standard</a>
                        <a href="#low-code" className="block text-sm py-1 hover:text-primary">5. Low-Code and No-Code Development</a>
                        <a href="#accessibility" className="block text-sm py-1 hover:text-primary">6. Enhanced Focus on Accessibility</a>
                        <a href="#webxr" className="block text-sm py-1 hover:text-primary">7. WebXR for Immersive Experiences</a>
                      </nav>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;
