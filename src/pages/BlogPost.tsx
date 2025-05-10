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

// Mock blog posts data
const blogPosts = [
  {
    id: 1,
    title: 'The Future of Web Development: Trends to Watch in 2025',
    content: `
# The Future of Web Development: Trends to Watch in 2025

## Introduction

As we move deeper into the digital age, web development continues to evolve at an unprecedented pace. New technologies emerge regularly, changing how developers build websites and web applications. This article explores the most significant web development trends to watch in 2025.

## 1. AI-Powered Development

Artificial Intelligence is no longer just a buzzword; it's becoming an integral part of web development workflows. In 2025, we expect to see:

- **AI Code Assistants**: Tools like GitHub Copilot will become more sophisticated, generating not just snippets but entire components based on natural language descriptions.
- **Automated Testing**: AI will revolutionize testing by automatically generating test cases and identifying potential bugs before they reach production.
- **User Experience Optimization**: AI algorithms will analyze user behavior to make real-time suggestions for improving website performance and conversion rates.

## 2. Web Assembly (WASM) Goes Mainstream

Web Assembly is set to revolutionize web performance:

- **Near-Native Speed**: Applications running at speeds comparable to native apps.
- **Language Diversity**: Developers can write code in languages like Rust, C++, or Go and run it in the browser.
- **Complex Applications**: Enable more resource-intensive applications like video editing, 3D rendering, and scientific simulations to run in browsers.

## 3. The Rise of Headless Architecture

Headless architecture separates the front-end presentation layer from the back-end logic:

- **Content Delivery Flexibility**: Deliver content to any device or platform.
- **Developer Experience**: Front-end developers can work with their preferred frameworks and tools.
- **Performance Optimization**: Serve optimized content for each channel or device.

## 4. Progressive Web Apps (PWAs) Become Standard

PWAs have been around for a while, but they'll become the standard approach for web applications:

- **Offline Functionality**: Enhanced capabilities for offline use.
- **Native-Like Experience**: Improved integrations with device features.
- **Installation Without App Stores**: Direct installation from browsers becoming more seamless.

## 5. Low-Code and No-Code Development

As development tools become more accessible:

- **Citizen Developers**: More non-technical people building web applications.
- **Rapid Prototyping**: Professional developers using low-code tools for quick prototyping.
- **AI Integration**: Low-code platforms leveraging AI to suggest improvements and automate repetitive tasks.

## 6. Enhanced Focus on Accessibility

Web accessibility will take center stage:

- **Regulatory Compliance**: Stricter enforcement of accessibility standards.
- **Built-in Accessibility Tools**: Frameworks and libraries with accessibility features by default.
- **AI-Powered Accessibility**: Automated tools that can identify and fix accessibility issues.

## 7. WebXR for Immersive Experiences

Web-based extended reality (WebXR) will gain traction:

- **Virtual Shopping Experiences**: Try-before-you-buy in virtual environments.
- **3D Interactive Tutorials and Training**: Enhanced learning experiences.
- **Virtual Collaboration**: Web-based collaborative spaces for remote teams.

## Conclusion

The web development landscape in 2025 promises exciting advancements that will change how developers work and how users experience the web. By keeping an eye on these trends, developers can stay ahead of the curve and build cutting-edge websites and applications that meet the evolving needs of users.

Whether you're a seasoned developer or just starting your journey, embracing these technologies and approaches will be key to success in the coming years. The future of web development is bright, and the possibilities are endless.

![Web Development](https://images.unsplash.com/photo-1517292987719-0369a794ec0f)

<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `,
    excerpt: 'Explore the upcoming trends in web development, from AI integration to enhanced user experiences and the evolution of frontend frameworks.',
    image: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?q=80&w=1074&auto=format&fit=crop',
    date: '2025-04-15',
    author: {
      name: 'Ahmed Jamal',
      bio: 'Senior Web Developer and Tech Writer with over 10 years of experience in creating modern web applications and writing about emerging technologies.',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      socialLinks: [
        { name: 'Twitter', icon: <Twitter className="h-4 w-4" />, url: 'https://twitter.com/', id: 'twitter' },
        { name: 'LinkedIn', icon: <Linkedin className="h-4 w-4" />, url: 'https://linkedin.com/', id: 'linkedin' },
        { name: 'GitHub', icon: <Github className="h-4 w-4" />, url: 'https://github.com/', id: 'github' },
      ]
    },
    category: 'web-development',
    tags: ['React', 'AI', 'Web Trends', 'Frontend'],
    relatedPosts: [2, 4, 5]
  },
  // ... other blog posts data
];

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    // In a real app, fetch the post by ID
    const postId = parseInt(id || '1');
    const foundPost = blogPosts.find(p => p.id === postId);
    
    if (foundPost) {
      setPost(foundPost);
      document.title = foundPost.title;
    }
    
    setLoading(false);
    setCurrentUrl(window.location.href);
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

  // Find related posts
  const relatedPosts = post.relatedPosts?.map((id: number) => {
    return blogPosts.find(p => p.id === id);
  }).filter(Boolean) || [];

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
                        <a href="#conclusion" className="block text-sm py-1 hover:text-primary">Conclusion</a>
                      </nav>
                    </ScrollArea>
                  </CardContent>
                </Card>
                
                {/* Related Articles */}
                {relatedPosts.length > 0 && (
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-3">Related Articles</h3>
                      <div className="space-y-4">
                        {relatedPosts.map((relatedPost: any) => (
                          <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`} className="block group">
                            <div className="flex gap-3">
                              <div className="w-16 h-16 overflow-hidden rounded flex-shrink-0">
                                <img 
                                  src={relatedPost.image} 
                                  alt={relatedPost.title}
                                  className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                                />
                              </div>
                              <div>
                                <h4 className="font-medium text-sm group-hover:text-primary line-clamp-2">
                                  {relatedPost.title}
                                </h4>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {formatDate(relatedPost.date)}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;
