
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useSettings } from '@/contexts/SettingsContext';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';

// Mock data for application
const applications = [
  {
    id: 1,
    title: 'Task Manager Pro',
    description: 'A productivity app for organizing tasks and projects with team collaboration features.',
    image: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?q=80&w=1074&auto=format&fit=crop',
    category: 'web',
    platforms: ['web', 'ios', 'android']
  },
  {
    id: 2,
    title: 'Design Portfolio',
    description: 'A showcase app for designers to display their work with custom galleries and themes.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1064&auto=format&fit=crop',
    category: 'web',
    platforms: ['web']
  },
  {
    id: 3,
    title: 'Fitness Tracker',
    description: 'Track workouts, nutrition, and progress with personalized fitness goals and plans.',
    image: 'https://images.unsplash.com/photo-1483817101829-339b08e8d83f?q=80&w=1074&auto=format&fit=crop',
    category: 'mobile',
    platforms: ['ios', 'android']
  },
  {
    id: 4,
    title: 'Language Learning App',
    description: 'Interactive language courses with speech recognition and personalized learning paths.',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1171&auto=format&fit=crop',
    category: 'mobile',
    platforms: ['ios', 'android']
  },
  {
    id: 5,
    title: 'Social Media Dashboard',
    description: 'Manage all your social media accounts from one place with analytics and scheduling.',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1074&auto=format&fit=crop',
    category: 'web',
    platforms: ['web']
  },
  {
    id: 6,
    title: 'Recipe Finder',
    description: 'Discover recipes based on ingredients you have, dietary restrictions, and preferences.',
    image: 'https://images.unsplash.com/photo-1505935428862-770b6f24f629?q=80&w=1167&auto=format&fit=crop',
    category: 'mobile',
    platforms: ['ios', 'android']
  }
];

const Applications: React.FC = () => {
  const { translations, language } = useSettings();
  const t = translations.applications;
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || app.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <section className="py-12 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-3">{t.title}</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.subtitle}</p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={language === 'ar' ? 'بحث في التطبيقات...' : 'Search applications...'}
                className="pl-10 w-full sm:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Tabs defaultValue="all" onValueChange={setActiveCategory} className="w-full sm:w-auto">
              <TabsList className="grid grid-cols-2 sm:grid-cols-3 w-full sm:w-auto">
                <TabsTrigger value="all">{language === 'ar' ? 'الكل' : 'All'}</TabsTrigger>
                <TabsTrigger value="web">{language === 'ar' ? 'تطبيقات الويب' : 'Web Apps'}</TabsTrigger>
                <TabsTrigger value="mobile">{language === 'ar' ? 'تطبيقات الموبايل' : 'Mobile Apps'}</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Applications Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApplications.map(app => (
              <Link to={`/applications/${app.id}`} key={app.id} className="focus:outline-none">
                <Card className="overflow-hidden h-full card-hover">
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={app.image} 
                      alt={app.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105" 
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{app.title}</h3>
                    <p className="text-muted-foreground">{app.description}</p>
                  </CardContent>
                  <CardFooter className="px-6 pb-6 pt-0 flex justify-between items-center">
                    <div className="flex gap-2">
                      {app.platforms.includes('web') && (
                        <span className="inline-flex items-center rounded-full px-2 py-1 text-xs bg-primary/10 text-primary">
                          {language === 'ar' ? 'ويب' : 'Web'}
                        </span>
                      )}
                      {app.platforms.includes('ios') && (
                        <span className="inline-flex items-center rounded-full px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                          iOS
                        </span>
                      )}
                      {app.platforms.includes('android') && (
                        <span className="inline-flex items-center rounded-full px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          Android
                        </span>
                      )}
                    </div>
                    <Button variant="outline" size="sm">{t.viewDetails}</Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>

          {filteredApplications.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {language === 'ar' ? 'لا توجد تطبيقات متطابقة مع بحثك' : 'No applications match your search'}
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Applications;
