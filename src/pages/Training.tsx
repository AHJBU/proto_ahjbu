
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useSettings } from '@/contexts/SettingsContext';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, Users, Search } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Mock training data
const trainings = [
  {
    id: 1,
    title: 'Modern Web Development with React',
    description: 'Learn how to build modern, responsive web applications with React.js, including state management, routing, and API integration.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1170&auto=format&fit=crop',
    category: 'webDev',
    level: 'intermediate',
    duration: '24 hours',
    audience: 'Web developers, Frontend engineers',
    details: 'This comprehensive workshop covers the fundamentals of React.js and advanced concepts including hooks, context API, and Redux. Participants will build a complete web application from scratch.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 2,
    title: 'UX/UI Design Fundamentals',
    description: 'Master the principles of user experience and interface design to create intuitive, attractive, and effective digital products.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1064&auto=format&fit=crop',
    category: 'design',
    level: 'beginner',
    duration: '16 hours',
    audience: 'Designers, Product managers',
    details: 'This hands-on course will guide you through the principles of effective UX/UI design, usability testing, and creating user-centered digital experiences that delight your audience.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 3,
    title: 'Mobile App Development with Flutter',
    description: 'Learn to build beautiful, natively compiled applications for mobile from a single codebase using Flutter and Dart.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1074&auto=format&fit=crop',
    category: 'mobileDev',
    level: 'intermediate',
    duration: '30 hours',
    audience: 'Mobile developers, Programmers',
    details: 'From setup to deployment, this comprehensive course covers everything you need to build professional-quality mobile apps with Flutter that run on both iOS and Android.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 4,
    title: 'Social Media Marketing Strategies',
    description: 'Develop effective social media marketing strategies to build brand awareness, engage with your audience, and drive conversions.',
    image: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=1074&auto=format&fit=crop',
    category: 'social',
    level: 'beginner',
    duration: '12 hours',
    audience: 'Marketers, Business owners',
    details: 'Learn how to leverage various social media platforms, create engaging content, analyze performance metrics, and optimize your social media presence for business growth.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 5,
    title: 'Advanced Backend Development with Node.js',
    description: 'Master server-side JavaScript using Node.js, Express, and MongoDB to build scalable and robust backend systems.',
    image: 'https://images.unsplash.com/photo-1503252947848-7338d3f92f31?q=80&w=1074&auto=format&fit=crop',
    category: 'webDev',
    level: 'advanced',
    duration: '20 hours',
    audience: 'Backend developers, Full-stack developers',
    details: 'This intensive course focuses on building high-performance, secure backend systems with Node.js, including authentication, authorization, database integration, and API development.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 6,
    title: 'Digital Illustration for Beginners',
    description: 'Learn the fundamentals of digital illustration using industry-standard tools and techniques to bring your creative ideas to life.',
    image: 'https://images.unsplash.com/photo-1560157368-946d9c8f7cb6?q=80&w=1135&auto=format&fit=crop',
    category: 'design',
    level: 'beginner',
    duration: '15 hours',
    audience: 'Aspiring illustrators, Graphic designers',
    details: 'This beginner-friendly course covers the basics of digital illustration, including composition, color theory, drawing techniques, and how to use professional illustration software.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
];

const Training: React.FC = () => {
  const { translations, language } = useSettings();
  const t = translations.training;
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeLevel, setActiveLevel] = useState('all');
  const [selectedTraining, setSelectedTraining] = useState<typeof trainings[0] | null>(null);

  const filteredTrainings = trainings.filter(training => {
    const matchesSearch = training.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          training.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || training.category === activeCategory;
    const matchesLevel = activeLevel === 'all' || training.level === activeLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleRegisterInterest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: language === 'ar' ? "تم تسجيل اهتمامك بنجاح" : "Interest registered successfully",
      description: language === 'ar' 
        ? "سنتواصل معك قريبًا بخصوص هذه الدورة التدريبية" 
        : "We will contact you soon about this training course",
    });
  };

  return (
    <Layout>
      <section className="py-12 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-3">{t.title}</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.subtitle}</p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={language === 'ar' ? 'بحث في الدورات التدريبية...' : 'Search trainings...'}
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Tabs defaultValue="all" onValueChange={setActiveCategory} className="w-full sm:w-auto">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="all">{t.categories.all}</TabsTrigger>
                  <TabsTrigger value="webDev">{t.categories.webDev}</TabsTrigger>
                  <TabsTrigger value="mobileDev">{t.categories.mobileDev}</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Tabs defaultValue="all" onValueChange={setActiveLevel} className="w-full sm:w-auto">
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="all">{t.levels.all}</TabsTrigger>
                  <TabsTrigger value="beginner">{t.levels.beginner}</TabsTrigger>
                  <TabsTrigger value="intermediate">{t.levels.intermediate}</TabsTrigger>
                  <TabsTrigger value="advanced">{t.levels.advanced}</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Trainings Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrainings.map(training => (
              <Card key={training.id} className="overflow-hidden h-full card-hover">
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={training.image} 
                    alt={training.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105" 
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant={training.level === 'beginner' ? 'outline' : (training.level === 'intermediate' ? 'secondary' : 'default')}>
                      {t.levels[training.level as keyof typeof t.levels]}
                    </Badge>
                    <Badge variant="outline">{t.categories[training.category as keyof typeof t.categories]}</Badge>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{training.title}</h3>
                  <p className="text-muted-foreground mb-4">{training.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{training.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{training.audience}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-0 flex justify-between">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline"
                        onClick={() => setSelectedTraining(training)}
                      >
                        {t.viewDetails}
                      </Button>
                    </DialogTrigger>
                    {selectedTraining && (
                      <DialogContent className="sm:max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{selectedTraining.title}</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4 space-y-4">
                          <div className="aspect-video w-full">
                            <iframe 
                              src={selectedTraining.videoUrl} 
                              title={selectedTraining.title}
                              className="w-full h-full"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                          
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-muted-foreground">{t.level}</p>
                              <p className="font-medium">{t.levels[selectedTraining.level as keyof typeof t.levels]}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">{t.duration}</p>
                              <p className="font-medium">{selectedTraining.duration}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">{t.audience}</p>
                              <p className="font-medium">{selectedTraining.audience}</p>
                            </div>
                          </div>
                          
                          <p>{selectedTraining.details}</p>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="w-full">{t.registerInterest}</Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  {language === 'ar' ? 'سجل اهتمامك' : 'Register Your Interest'}
                                </DialogTitle>
                              </DialogHeader>
                              <form onSubmit={handleRegisterInterest} className="space-y-4 mt-4">
                                <div>
                                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                                    {language === 'ar' ? 'الاسم' : 'Name'}
                                  </label>
                                  <Input id="name" required />
                                </div>
                                <div>
                                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                                    {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                                  </label>
                                  <Input id="email" type="email" required />
                                </div>
                                <div>
                                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                                    {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                                  </label>
                                  <Input id="phone" />
                                </div>
                                <div>
                                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                                    {language === 'ar' ? 'رسالة (اختياري)' : 'Message (optional)'}
                                  </label>
                                  <Textarea id="message" />
                                </div>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button variant="outline">
                                      {language === 'ar' ? 'إلغاء' : 'Cancel'}
                                    </Button>
                                  </DialogClose>
                                  <Button type="submit">
                                    {language === 'ar' ? 'إرسال' : 'Submit'}
                                  </Button>
                                </DialogFooter>
                              </form>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </DialogContent>
                    )}
                  </Dialog>
                  
                  <Button>
                    {t.registerInterest}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {filteredTrainings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {language === 'ar' ? 'لا توجد دورات تدريبية متطابقة مع بحثك' : 'No training courses match your search'}
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Training;
