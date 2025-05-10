
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, Users, ChevronLeft } from 'lucide-react';
import ScrollReveal from '@/components/ui/scroll-reveal';

// Mock training data (in a real app, this would come from your database)
const trainingItems = [
  {
    id: 1,
    title: 'Advanced React Development Workshop',
    category: 'Development',
    date: '2025-06-15',
    endDate: '2025-06-16',
    location: 'Dubai, UAE',
    image: '/placeholder.svg',
    gallery: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    duration: '2 days',
    attendees: 25,
    description: 'A comprehensive workshop covering advanced React concepts, state management, and performance optimization techniques.',
    detailedDescription: `
      <p>This intensive two-day workshop is designed for developers who are already familiar with React basics and want to take their skills to the next level. The workshop covers:</p>
      
      <h3>Day 1: Advanced React Concepts</h3>
      <ul>
        <li>Advanced hooks and custom hook patterns</li>
        <li>Context API best practices</li>
        <li>React performance optimization techniques</li>
        <li>Testing React components effectively</li>
      </ul>
      
      <h3>Day 2: State Management and Architecture</h3>
      <ul>
        <li>State management approaches (Redux, Zustand, Jotai)</li>
        <li>Data fetching strategies</li>
        <li>Building scalable React applications</li>
        <li>Handling complex forms and validation</li>
      </ul>
      
      <p>Each participant will receive a certificate of completion, workshop materials, and access to a private GitHub repository with example code and exercises.</p>
    `,
    features: {
      hasGallery: true,
      hasVideo: true,
      hasSchedule: true,
      hasLocation: true,
      hasAttendees: true
    }
  },
  // Additional training items would be defined here
];

const TrainingDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const training = trainingItems.find(item => item.id === Number(id));
  
  if (!training) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Training not found</h1>
          <Button asChild>
            <Link to="/training">Back to Training</Link>
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
            <Link to="/training">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Training
            </Link>
          </Button>
          
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{training.title}</h1>
            <div className="flex flex-wrap gap-4">
              {training.features.hasSchedule && (
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{formatDate(training.date)}{training.endDate ? ` - ${formatDate(training.endDate)}` : ''}</span>
                </div>
              )}
              
              {training.features.hasLocation && (
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{training.location}</span>
                </div>
              )}
              
              {training.duration && (
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{training.duration}</span>
                </div>
              )}
              
              {training.features.hasAttendees && (
                <div className="flex items-center text-muted-foreground">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{training.attendees} Attendees</span>
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ScrollReveal delay={0.1}>
              <div className="mb-8">
                <div className="aspect-video w-full overflow-hidden rounded-lg">
                  <img 
                    src={training.image} 
                    alt={training.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <Tabs defaultValue="overview" className="mb-8">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  {training.features.hasGallery && (
                    <TabsTrigger value="gallery">Gallery</TabsTrigger>
                  )}
                  {training.features.hasVideo && (
                    <TabsTrigger value="video">Video</TabsTrigger>
                  )}
                </TabsList>
                
                <TabsContent value="overview">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: training.detailedDescription }} />
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {training.features.hasGallery && (
                  <TabsContent value="gallery">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {training.gallery.map((image, index) => (
                            <div key={index} className="aspect-video overflow-hidden rounded-md">
                              <img 
                                src={image}
                                alt={`${training.title} - Gallery Image ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                )}
                
                {training.features.hasVideo && (
                  <TabsContent value="video">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="aspect-video w-full">
                          <iframe
                            src={training.video.replace('watch?v=', 'embed/')}
                            title={`${training.title} - Video`}
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
                  <h3 className="text-xl font-semibold mb-4">Training Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Category</h4>
                      <Badge variant="outline">{training.category}</Badge>
                    </div>
                    
                    {training.features.hasSchedule && (
                      <div>
                        <h4 className="font-medium">Date</h4>
                        <p>{formatDate(training.date)}{training.endDate ? ` - ${formatDate(training.endDate)}` : ''}</p>
                      </div>
                    )}
                    
                    {training.features.hasLocation && (
                      <div>
                        <h4 className="font-medium">Location</h4>
                        <p>{training.location}</p>
                      </div>
                    )}
                    
                    {training.duration && (
                      <div>
                        <h4 className="font-medium">Duration</h4>
                        <p>{training.duration}</p>
                      </div>
                    )}
                    
                    {training.features.hasAttendees && (
                      <div>
                        <h4 className="font-medium">Attendees</h4>
                        <p>{training.attendees} participants</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Interested in this training?</h3>
                  <p className="text-muted-foreground mb-4">
                    If you're interested in attending this training or organizing a similar one for your team, get in touch.
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

export default TrainingDetails;
