
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, ExternalLink, ChevronLeft } from 'lucide-react';
import ScrollReveal from '@/components/ui/scroll-reveal';

// Mock press items data
const pressItems = [
  {
    id: 1,
    title: 'Interview on Tech Innovations in 2025',
    publisher: 'Tech Today Magazine',
    date: '2025-03-15',
    image: '/placeholder.svg',
    gallery: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    category: 'Interview',
    externalLink: 'https://example.com/interview',
    description: 'An in-depth interview discussing emerging technology trends and innovations expected to shape the tech landscape in 2025 and beyond.',
    content: `
      <p>In this comprehensive interview with Tech Today Magazine, I shared insights on the most significant technology trends that are likely to shape our digital landscape in 2025.</p>
      
      <blockquote>
        "The convergence of artificial intelligence and IoT devices is creating unprecedented opportunities for smart cities and homes. We're moving beyond simple automation to truly intelligent environments that can anticipate and adapt to human needs."
      </blockquote>
      
      <p>The interview covered several key areas of technology innovation:</p>
      
      <ul>
        <li>The evolution of artificial intelligence and its impact on various industries</li>
        <li>Sustainable technology practices and green computing</li>
        <li>The future of remote work technologies</li>
        <li>Advances in edge computing and decentralized systems</li>
        <li>Emerging trends in cybersecurity for a connected world</li>
      </ul>
      
      <p>We also discussed the importance of ethical considerations in technology development and how professionals can stay ahead in a rapidly evolving field.</p>
    `,
    features: {
      hasGallery: true,
      hasVideo: true,
      hasExternalLink: true
    }
  },
  // Additional press items would be defined here
];

const PressDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const pressItem = pressItems.find(item => item.id === Number(id));
  
  if (!pressItem) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Press item not found</h1>
          <Button asChild>
            <Link to="/press">Back to Press</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <Layout>
      <div className="container py-12">
        <ScrollReveal>
          <Button asChild variant="outline" className="mb-6">
            <Link to="/press">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Press
            </Link>
          </Button>
          
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">{pressItem.title}</h1>
            <div className="flex flex-wrap gap-4 items-center">
              <Badge variant="outline">{pressItem.category}</Badge>
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{formatDate(pressItem.date)}</span>
              </div>
              <span className="text-muted-foreground">{pressItem.publisher}</span>
            </div>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ScrollReveal delay={0.1}>
              <div className="mb-8">
                <div className="aspect-video w-full overflow-hidden rounded-lg">
                  <img 
                    src={pressItem.image} 
                    alt={pressItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <Tabs defaultValue="content" className="mb-8">
                <TabsList className="mb-4">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  {pressItem.features.hasGallery && (
                    <TabsTrigger value="gallery">Gallery</TabsTrigger>
                  )}
                  {pressItem.features.hasVideo && (
                    <TabsTrigger value="video">Video</TabsTrigger>
                  )}
                </TabsList>
                
                <TabsContent value="content">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: pressItem.content }} />
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {pressItem.features.hasGallery && (
                  <TabsContent value="gallery">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {pressItem.gallery.map((image, index) => (
                            <div key={index} className="aspect-video overflow-hidden rounded-md">
                              <img 
                                src={image}
                                alt={`${pressItem.title} - Gallery Image ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                )}
                
                {pressItem.features.hasVideo && (
                  <TabsContent value="video">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="aspect-video w-full">
                          <iframe
                            src={pressItem.video.replace('watch?v=', 'embed/')}
                            title={`${pressItem.title} - Video`}
                            className="w-full h-full"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                )}
              </Tabs>
            </ScrollReveal>
          </div>
          
          <div className="lg:col-span-1">
            <ScrollReveal delay={0.3}>
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Publication Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Publisher</h4>
                      <p>{pressItem.publisher}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Category</h4>
                      <Badge variant="outline">{pressItem.category}</Badge>
                    </div>
                    
                    <div>
                      <h4 className="font-medium">Published Date</h4>
                      <p>{formatDate(pressItem.date)}</p>
                    </div>
                    
                    {pressItem.features.hasExternalLink && (
                      <div>
                        <h4 className="font-medium">Original Publication</h4>
                        <Button asChild variant="outline" className="mt-2">
                          <a href={pressItem.externalLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Original
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Media Inquiries</h3>
                  <p className="text-muted-foreground mb-4">
                    For press inquiries, interviews, or speaking engagements, please get in touch.
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

export default PressDetails;
