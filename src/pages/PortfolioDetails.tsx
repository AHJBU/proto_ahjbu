
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ScrollReveal from '@/components/ui/scroll-reveal';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Link, ExternalLink, FileText, Play, Image as ImageIcon } from 'lucide-react';

// Mock portfolio item data (in a real app, this would come from your database)
const portfolioItems = [
  {
    id: 1,
    title: {
      en: 'Corporate Website',
      ar: 'موقع شركة'
    },
    category: 'web',
    image: '/placeholder.svg',
    gallery: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: {
      en: 'A responsive corporate website built with React and Tailwind CSS. The project focused on creating a modern, fast-loading interface that showcases the company\'s services and portfolio.',
      ar: 'موقع شركة متجاوب تم بناؤه باستخدام React و Tailwind CSS. ركز المشروع على إنشاء واجهة حديثة وسريعة التحميل تعرض خدمات الشركة وأعمالها.'
    },
    detailedDescription: {
      en: '<p>This project involved creating a complete corporate identity and web presence for a technology firm. The website features multiple sections including a dynamic homepage, services overview, portfolio showcase, team profiles, and a contact system.</p><p>Key features include:</p><ul><li>Responsive design that works seamlessly across all devices</li><li>Animation effects to enhance user engagement</li><li>Custom content management system</li><li>Integrated blog with search functionality</li><li>Multi-language support</li></ul>',
      ar: '<p>تضمن هذا المشروع إنشاء هوية مؤسسية كاملة وتواجد على الويب لشركة تكنولوجيا. يحتوي الموقع على أقسام متعددة بما في ذلك صفحة رئيسية ديناميكية، ونظرة عامة على الخدمات، وعرض المحفظة، وملفات تعريف الفريق، ونظام الاتصال.</p><p>الميزات الرئيسية تشمل:</p><ul><li>تصميم متجاوب يعمل بسلاسة عبر جميع الأجهزة</li><li>تأثيرات الرسوم المتحركة لتحسين مشاركة المستخدم</li><li>نظام إدارة محتوى مخصص</li><li>مدونة متكاملة مع وظيفة البحث</li><li>دعم متعدد اللغات</li></ul>'
    },
    technologies: ['React', 'Tailwind CSS', 'Node.js', 'MongoDB'],
    client: 'TechCorp Inc.',
    completionDate: '2024-03-15',
    url: 'https://example.com',
    features: {
      hasGallery: true,
      hasVideo: true,
      hasTechnologies: true,
      hasClientInfo: true,
      hasLiveDemo: true
    }
  },
  // Additional portfolio items would be defined here
];

const PortfolioDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const portfolioItem = portfolioItems.find(item => item.id === Number(id));
  
  const [activeTab, setActiveTab] = useState('overview');
  
  if (!portfolioItem) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Portfolio item not found</h1>
          <Button asChild>
            <Link to="/portfolio">Back to Portfolio</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container py-12">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">{portfolioItem.title.en}</h1>
              <div className="flex items-center gap-2">
                <Badge>{portfolioItem.category === 'web' ? 'Web Development' : portfolioItem.category === 'app' ? 'App Development' : 'Design'}</Badge>
                {portfolioItem.features.hasClientInfo && (
                  <span className="text-muted-foreground">Client: {portfolioItem.client}</span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm">
                <Link to="/portfolio">Back to Portfolio</Link>
              </Button>
              {portfolioItem.features.hasLiveDemo && (
                <Button asChild size="sm">
                  <a href={portfolioItem.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ScrollReveal>
              <div className="mb-8">
                <div className="aspect-video w-full overflow-hidden rounded-lg">
                  <img 
                    src={portfolioItem.image} 
                    alt={portfolioItem.title.en}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-8">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  {portfolioItem.features.hasGallery && (
                    <TabsTrigger value="gallery">Gallery</TabsTrigger>
                  )}
                  {portfolioItem.features.hasVideo && (
                    <TabsTrigger value="video">Video</TabsTrigger>
                  )}
                  {portfolioItem.features.hasTechnologies && (
                    <TabsTrigger value="technologies">Technologies</TabsTrigger>
                  )}
                </TabsList>
                
                <TabsContent value="overview">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: portfolioItem.detailedDescription.en }} />
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {portfolioItem.features.hasGallery && (
                  <TabsContent value="gallery">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {portfolioItem.gallery.map((image, index) => (
                            <div key={index} className="aspect-video overflow-hidden rounded-md">
                              <img 
                                src={image}
                                alt={`${portfolioItem.title.en} - Gallery Image ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                )}
                
                {portfolioItem.features.hasVideo && (
                  <TabsContent value="video">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="aspect-video w-full">
                          <iframe
                            src={portfolioItem.video.replace('watch?v=', 'embed/')}
                            title={`${portfolioItem.title.en} - Video`}
                            className="w-full h-full"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                )}
                
                {portfolioItem.features.hasTechnologies && (
                  <TabsContent value="technologies">
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="text-xl font-semibold mb-4">Technologies Used</h3>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {portfolioItem.technologies.map((tech, index) => (
                            <Badge key={index} variant="secondary">{tech}</Badge>
                          ))}
                        </div>
                        
                        {portfolioItem.completionDate && (
                          <div className="mb-4">
                            <h4 className="font-medium">Completion Date</h4>
                            <p>{new Date(portfolioItem.completionDate).toLocaleDateString('en-US', { 
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                )}
              </Tabs>
            </ScrollReveal>
          </div>
          
          <div className="lg:col-span-1">
            <ScrollReveal delay={0.2}>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Project Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Category</h4>
                      <p>{portfolioItem.category === 'web' ? 'Web Development' : portfolioItem.category === 'app' ? 'App Development' : 'Design'}</p>
                    </div>
                    
                    {portfolioItem.features.hasClientInfo && (
                      <div>
                        <h4 className="font-medium">Client</h4>
                        <p>{portfolioItem.client}</p>
                      </div>
                    )}
                    
                    {portfolioItem.completionDate && (
                      <div>
                        <h4 className="font-medium">Completed</h4>
                        <p>{new Date(portfolioItem.completionDate).toLocaleDateString('en-US', { 
                          year: 'numeric',
                          month: 'long'
                        })}</p>
                      </div>
                    )}
                    
                    {portfolioItem.features.hasGallery && (
                      <div>
                        <h4 className="font-medium">Media</h4>
                        <div className="flex gap-2 mt-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setActiveTab('gallery')}
                          >
                            <ImageIcon className="h-4 w-4 mr-2" />
                            Images ({portfolioItem.gallery.length})
                          </Button>
                          
                          {portfolioItem.features.hasVideo && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => setActiveTab('video')}
                            >
                              <Play className="h-4 w-4 mr-2" />
                              Video
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {portfolioItem.features.hasLiveDemo && (
                      <div>
                        <h4 className="font-medium">Links</h4>
                        <div className="flex gap-2 mt-2">
                          <Button asChild variant="outline" size="sm">
                            <a href={portfolioItem.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Visit Website
                            </a>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Need a similar project?</h3>
                  <p className="text-muted-foreground mb-4">
                    If you're interested in developing a similar project, feel free to get in touch.
                  </p>
                  <Button asChild>
                    <Link to="/contact">Contact Me</Link>
                  </Button>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PortfolioDetails;
