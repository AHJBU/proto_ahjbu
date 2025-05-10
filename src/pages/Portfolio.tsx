
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useSettings } from '@/contexts/SettingsContext';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import ScrollReveal from '@/components/ui/scroll-reveal';

const Portfolio: React.FC = () => {
  const { language } = useSettings();
  
  // Categories for filtering
  const categories = [
    { id: 'all', name: { en: 'All', ar: 'الكل' } },
    { id: 'graphic', name: { en: 'Graphic Design', ar: 'تصميم جرافيك' } },
    { id: 'web', name: { en: 'Web Development', ar: 'تطوير ويب' } },
    { id: 'app', name: { en: 'App Development', ar: 'تطوير تطبيقات' } },
    { id: 'video', name: { en: 'Video Editing', ar: 'مونتاج فيديو' } }
  ];
  
  // Mock projects data
  const projects = [
    {
      id: 1,
      title: {
        en: 'Corporate Website',
        ar: 'موقع شركة'
      },
      category: 'web',
      image: '/placeholder.svg',
      description: {
        en: 'Responsive corporate website built with React',
        ar: 'موقع شركة متجاوب تم بناؤه باستخدام React'
      },
      features: {
        hasGallery: true,
        hasVideo: true,
        hasTechnologies: true,
        hasClientInfo: true,
        hasLiveDemo: true
      }
    },
    {
      id: 2,
      title: {
        en: 'Mobile Shopping App',
        ar: 'تطبيق تسوق للجوال'
      },
      category: 'app',
      image: '/placeholder.svg',
      description: {
        en: 'E-commerce mobile application for Android and iOS',
        ar: 'تطبيق للتجارة الإلكترونية لأندرويد و iOS'
      },
      features: {
        hasGallery: true,
        hasVideo: false,
        hasTechnologies: true,
        hasClientInfo: true,
        hasLiveDemo: false
      }
    },
    {
      id: 3,
      title: {
        en: 'Brand Identity',
        ar: 'هوية بصرية'
      },
      category: 'graphic',
      image: '/placeholder.svg',
      description: {
        en: 'Complete brand identity design for a tech startup',
        ar: 'تصميم هوية بصرية كاملة لشركة ناشئة في مجال التكنولوجيا'
      },
      features: {
        hasGallery: true,
        hasVideo: false,
        hasTechnologies: false,
        hasClientInfo: true,
        hasLiveDemo: false
      }
    },
    {
      id: 4,
      title: {
        en: 'Promotional Video',
        ar: 'فيديو ترويجي'
      },
      category: 'video',
      image: '/placeholder.svg',
      description: {
        en: 'Product launch video with motion graphics',
        ar: 'فيديو إطلاق منتج مع رسومات متحركة'
      },
      features: {
        hasGallery: false,
        hasVideo: true,
        hasTechnologies: false,
        hasClientInfo: true,
        hasLiveDemo: true
      }
    },
    {
      id: 5,
      title: {
        en: 'Marketing Campaign Design',
        ar: 'تصميم حملة تسويقية'
      },
      category: 'graphic',
      image: '/placeholder.svg',
      description: {
        en: 'Social media marketing campaign visuals',
        ar: 'تصاميم حملة تسويقية عبر وسائل التواصل الاجتماعي'
      },
      features: {
        hasGallery: true,
        hasVideo: false,
        hasTechnologies: false,
        hasClientInfo: true,
        hasLiveDemo: false
      }
    },
    {
      id: 6,
      title: {
        en: 'E-learning Platform',
        ar: 'منصة تعليم إلكتروني'
      },
      category: 'web',
      image: '/placeholder.svg',
      description: {
        en: 'Interactive learning platform with course management',
        ar: 'منصة تعليمية تفاعلية مع نظام إدارة الدورات'
      },
      features: {
        hasGallery: true,
        hasVideo: true,
        hasTechnologies: true,
        hasClientInfo: false,
        hasLiveDemo: true
      }
    }
  ];

  const [activeCategory, setActiveCategory] = useState('all');
  
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const pageTitle = language === 'ar' ? 'معرض الأعمال' : 'Portfolio';

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-10">{pageTitle}</h1>
        
        {/* Category Filter */}
        <ScrollReveal>
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map(category => (
              <Badge 
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className="cursor-pointer text-sm py-2 px-4"
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name[language as keyof typeof category.name]}
              </Badge>
            ))}
          </div>
        </ScrollReveal>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ScrollReveal key={project.id} delay={0.1 * index}>
              <Link to={`/portfolio/${project.id}`}>
                <Card className="overflow-hidden card-hover h-full transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title[language as keyof typeof project.title]} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 text-white">
                        <Badge variant="secondary" className="mb-2">
                          {project.category === 'web' ? 'Web Development' : 
                           project.category === 'app' ? 'App Development' :
                           project.category === 'graphic' ? 'Graphic Design' : 
                           'Video Editing'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {project.title[language as keyof typeof project.title]}
                    </h3>
                    <p className="text-muted-foreground">
                      {project.description[language as keyof typeof project.description]}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Portfolio;
