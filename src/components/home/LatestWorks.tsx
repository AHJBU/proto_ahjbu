
import React from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for demonstration
const mockWorks = [
  {
    id: 1,
    title: {
      en: 'Brand Identity Design',
      ar: 'تصميم هوية بصرية'
    },
    image: '/placeholder.svg',
    category: {
      en: 'Graphic Design',
      ar: 'تصميم جرافيك'
    }
  },
  {
    id: 2,
    title: {
      en: 'Mobile App Development',
      ar: 'تطوير تطبيق جوال'
    },
    image: '/placeholder.svg',
    category: {
      en: 'App Development',
      ar: 'تطوير تطبيقات'
    }
  },
  {
    id: 3,
    title: {
      en: 'Website Redesign',
      ar: 'إعادة تصميم موقع إلكتروني'
    },
    image: '/placeholder.svg',
    category: {
      en: 'Web Development',
      ar: 'تطوير ويب'
    }
  }
];

const LatestWorks: React.FC = () => {
  const { language } = useSettings();
  
  const sectionTitle = language === 'ar' ? 'أحدث الأعمال' : 'Latest Works';
  const viewAllText = language === 'ar' ? 'عرض كل الأعمال' : 'View All Works';

  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">{sectionTitle}</h2>
          <Link to="/portfolio">
            <Button variant="ghost" className="group">
              {viewAllText}
              <ArrowRight className={`ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 ${language === 'ar' ? 'rotate-180' : ''}`} />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockWorks.map((work) => (
            <Link to={`/portfolio/${work.id}`} key={work.id}>
              <Card className="overflow-hidden card-hover h-full">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={work.image} 
                    alt={work.title[language as keyof typeof work.title]} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardContent className="pt-4">
                  <h3 className="text-xl font-semibold mb-2">
                    {work.title[language as keyof typeof work.title]}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {work.category[language as keyof typeof work.category]}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestWorks;
