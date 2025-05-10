
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useSettings } from '@/contexts/SettingsContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Download, ExternalLink } from 'lucide-react';

// Mock data for the application details
const getApplicationDetails = (id: number) => {
  const applications = {
    1: {
      title: 'Task Manager Pro',
      description: 'A comprehensive productivity app designed to help individuals and teams organize tasks, manage projects, and boost productivity.',
      fullDescription: 'Task Manager Pro is a robust task management application built with React and Node.js. It features real-time updates, team collaboration, file attachments, and integrations with popular tools like Google Calendar, Slack, and Microsoft Teams. The application helps users stay organized with customizable workflows, priority settings, and deadline tracking.',
      image: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?q=80&w=1074&auto=format&fit=crop',
      category: 'web',
      platforms: ['web', 'ios', 'android'],
      features: [
        'Task creation with due dates, priorities, and tags',
        'Project management with Kanban boards',
        'Team collaboration with comments and assignments',
        'File attachments and document sharing',
        'Calendar view for deadlines and schedules',
        'Customizable dashboards and reports',
        'Mobile synchronization for on-the-go access'
      ],
      technologies: [
        'React.js and Redux for frontend',
        'Node.js and Express for backend',
        'MongoDB for database',
        'WebSockets for real-time updates',
        'React Native for mobile apps',
        'AWS for hosting and storage'
      ],
      screenshots: [
        'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?q=80&w=1074&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1170&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1172&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=1170&auto=format&fit=crop'
      ],
      downloadLinks: [
        { name: 'Web App', url: 'https://taskmanagerpro.example.com', type: 'web' },
        { name: 'App Store', url: 'https://apps.apple.com/example', type: 'ios' },
        { name: 'Google Play', url: 'https://play.google.com/store/example', type: 'android' }
      ],
      testimonials: [
        {
          name: 'Sarah Johnson',
          position: 'Project Manager at Tech Solutions',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1074&auto=format&fit=crop',
          quote: 'Task Manager Pro has transformed how our team collaborates. The real-time updates and intuitive interface have significantly boosted our productivity.'
        },
        {
          name: 'Michael Chen',
          position: 'Freelance Designer',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1170&auto=format&fit=crop',
          quote: 'As a freelancer juggling multiple projects, this app has been a game-changer for keeping track of deadlines and client requirements.'
        }
      ]
    },
    // Additional application details would be defined here for other IDs
  };

  // Return detailed information for the application with the given ID
  return applications[id as keyof typeof applications] || null;
};

const ApplicationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { translations, language } = useSettings();
  const t = translations.applications;
  
  const appDetails = getApplicationDetails(Number(id));
  
  if (!appDetails) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">
            {language === 'ar' ? 'تطبيق غير موجود' : 'Application Not Found'}
          </h1>
          <Link to="/applications">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {language === 'ar' ? 'العودة إلى التطبيقات' : 'Back to Applications'}
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-12">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link to="/applications">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {language === 'ar' ? 'العودة إلى التطبيقات' : 'Back to Applications'}
            </Button>
          </Link>
        </div>
        
        {/* App Header */}
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          <div className="md:w-1/2 aspect-video relative overflow-hidden rounded-lg">
            <img 
              src={appDetails.image} 
              alt={appDetails.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-3">{appDetails.title}</h1>
            <p className="text-lg text-muted-foreground mb-4">{appDetails.description}</p>
            
            {/* Platform Tags */}
            <div className="flex gap-3 mb-6">
              {appDetails.platforms.includes('web') && (
                <span className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-primary/10 text-primary">
                  {language === 'ar' ? 'ويب' : 'Web'}
                </span>
              )}
              {appDetails.platforms.includes('ios') && (
                <span className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                  iOS
                </span>
              )}
              {appDetails.platforms.includes('android') && (
                <span className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                  Android
                </span>
              )}
            </div>
            
            {/* Download Links */}
            <div className="space-y-3">
              <h3 className="font-semibold">{language === 'ar' ? 'روابط التحميل والزيارة' : 'Download & Visit Links'}</h3>
              <div className="flex flex-wrap gap-3">
                {appDetails.downloadLinks.map((link, index) => (
                  <a href={link.url} target="_blank" rel="noopener noreferrer" key={index}>
                    <Button variant={link.type === 'web' ? 'default' : 'outline'}>
                      {link.type === 'web' ? (
                        <ExternalLink className="mr-2 h-4 w-4" />
                      ) : (
                        <Download className="mr-2 h-4 w-4" />
                      )}
                      {link.name}
                    </Button>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        {/* Detailed Information Tabs */}
        <Tabs defaultValue="description" className="mb-10">
          <TabsList className="grid grid-cols-3 w-full md:w-auto">
            <TabsTrigger value="description">
              {language === 'ar' ? 'الوصف' : 'Description'}
            </TabsTrigger>
            <TabsTrigger value="features">
              {t.features}
            </TabsTrigger>
            <TabsTrigger value="technologies">
              {t.technologies}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <div className="prose dark:prose-invert max-w-none">
              <p>{appDetails.fullDescription}</p>
            </div>
          </TabsContent>
          
          <TabsContent value="features" className="mt-6">
            <ul className="space-y-2">
              {appDetails.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
          
          <TabsContent value="technologies" className="mt-6">
            <ul className="space-y-2">
              {appDetails.technologies.map((tech, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>{tech}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
        
        {/* Screenshots */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t.screenshots}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {appDetails.screenshots.map((screenshot, index) => (
              <div key={index} className="aspect-video overflow-hidden rounded-lg">
                <img 
                  src={screenshot} 
                  alt={`${appDetails.title} screenshot ${index + 1}`} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Testimonials */}
        <div>
          <h2 className="text-2xl font-bold mb-6">{t.testimonials}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {appDetails.testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div>
                      <p className="italic mb-4">"{testimonial.quote}"</p>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ApplicationDetails;
