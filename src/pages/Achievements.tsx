
import React, { useEffect, useRef } from 'react';
import Layout from '@/components/layout/Layout';
import { useSettings } from '@/contexts/SettingsContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Achievements: React.FC = () => {
  const { language, translations } = useSettings();
  const animatedItems = useRef<(HTMLElement | null)[]>([]);
  
  // Mock achievements data
  const achievements = [
    {
      id: 1,
      title: language === 'ar' ? 'جائزة أفضل مصمم للعام' : 'Best Designer of the Year Award',
      category: language === 'ar' ? 'تصميم' : 'Design',
      image: '/placeholder.svg',
      summary: language === 'ar' 
        ? 'حصلت على جائزة أفضل مصمم للعام 2023 من مؤسسة التصميم العالمية'
        : 'Received the Best Designer of the Year 2023 award from Global Design Institute',
      date: '2023'
    },
    {
      id: 2,
      title: language === 'ar' ? 'شهادة تطوير الويب المتقدمة' : 'Advanced Web Development Certification',
      category: language === 'ar' ? 'تطوير' : 'Development',
      image: '/placeholder.svg',
      summary: language === 'ar'
        ? 'أكملت شهادة تطوير الويب المتقدمة مع التركيز على تقنيات الواجهة الأمامية الحديثة'
        : 'Completed Advanced Web Development certification focusing on modern frontend technologies',
      date: '2022'
    },
    {
      id: 3,
      title: language === 'ar' ? 'جائزة أفضل تطبيق' : 'Best App Award',
      category: language === 'ar' ? 'تطبيقات' : 'Apps',
      image: '/placeholder.svg',
      summary: language === 'ar'
        ? 'فاز تطبيق "المساعد الذكي" بجائزة أفضل تطبيق في معرض التكنولوجيا'
        : '"Smart Assistant" app won Best App Award at the Tech Expo',
      date: '2021'
    },
    {
      id: 4,
      title: language === 'ar' ? 'المتحدث الرئيسي' : 'Keynote Speaker',
      category: language === 'ar' ? 'تدريب' : 'Training',
      image: '/placeholder.svg',
      summary: language === 'ar'
        ? 'كنت المتحدث الرئيسي في مؤتمر تقنيات الويب 2023'
        : 'Was the keynote speaker at Web Technologies Conference 2023',
      date: '2023'
    }
  ];

  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    animatedItems.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      animatedItems.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <Layout>
      <div className="container py-12">
        {/* Enhanced header section with animation */}
        <div className="slide-up mb-8">
          <h1 className="text-4xl font-bold mb-2">
            {language === 'ar' ? 'الإنجازات والنجاحات' : 'Achievements & Success Stories'}
          </h1>
          <p className="text-muted-foreground">
            {language === 'ar' 
              ? 'استعراض أبرز الإنجازات والجوائز والقصص الناجحة في مسيرتي المهنية'
              : 'Showcasing key achievements, awards, and success stories throughout my professional journey'}
          </p>
          
          {/* Decorative underline */}
          <div className="h-1 w-20 bg-primary mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <Link 
              to={`/achievements/${achievement.id}`} 
              key={achievement.id}
              className="block"
              ref={(el) => animatedItems.current[index] = el as HTMLElement}
            >
              <Card className="overflow-hidden h-full hover-lift animate-reveal">
                <div className="aspect-video relative overflow-hidden group">
                  <img 
                    src={achievement.image} 
                    alt={achievement.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Badge className="absolute top-3 right-3 z-10">
                    {achievement.category}
                  </Badge>
                  <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 text-sm">
                    <span>{achievement.date}</span>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
                  <p className="text-muted-foreground mb-2">{achievement.summary}</p>
                  <p className="text-sm font-medium">{achievement.date}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Achievements;
