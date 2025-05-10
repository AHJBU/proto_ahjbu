
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useSettings } from '@/contexts/SettingsContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink } from 'lucide-react';

const Press: React.FC = () => {
  const { language, translations } = useSettings();
  
  // Mock press data
  const pressItems = [
    {
      id: 1,
      title: language === 'ar' ? 'مقابلة حول مستقبل التصميم الرقمي' : 'Interview on the Future of Digital Design',
      outlet: language === 'ar' ? 'مجلة التقنية الحديثة' : 'Modern Tech Magazine',
      type: language === 'ar' ? 'مقابلة' : 'Interview',
      date: '2023-06-10',
      image: '/placeholder.svg',
      excerpt: language === 'ar' 
        ? 'تحدثت عن اتجاهات التصميم المستقبلية وتأثير الذكاء الاصطناعي على المجال'
        : 'Discussed future design trends and the impact of AI on the field',
      link: 'https://example.com/interview'
    },
    {
      id: 2,
      title: language === 'ar' ? 'عرض تقديمي في مؤتمر التكنولوجيا' : 'Presentation at Tech Conference',
      outlet: language === 'ar' ? 'مؤتمر التكنولوجيا العالمي' : 'Global Tech Conference',
      type: language === 'ar' ? 'فيديو' : 'Video',
      date: '2023-05-15',
      image: '/placeholder.svg',
      excerpt: language === 'ar'
        ? 'قدمت عرضًا حول تطوير واجهات المستخدم الحديثة باستخدام React'
        : 'Delivered a presentation on modern UI development using React',
      link: 'https://example.com/presentation',
      videoEmbed: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Example YouTube embed URL
    },
    {
      id: 3,
      title: language === 'ar' ? 'مقال حول تجربة المستخدم' : 'Article on User Experience',
      outlet: language === 'ar' ? 'مدونة UX العربية' : 'UX Blog',
      type: language === 'ar' ? 'مقال' : 'Article',
      date: '2023-04-22',
      image: '/placeholder.svg',
      excerpt: language === 'ar'
        ? 'كتبت مقالًا حول أهمية تجربة المستخدم في تصميم التطبيقات الحديثة'
        : 'Wrote an article about the importance of user experience in modern app design',
      link: 'https://example.com/article'
    },
    {
      id: 4,
      title: language === 'ar' ? 'بودكاست حول ريادة الأعمال التقنية' : 'Podcast on Tech Entrepreneurship',
      outlet: language === 'ar' ? 'بودكاست رواد التقنية' : 'Tech Founders Podcast',
      type: language === 'ar' ? 'بودكاست' : 'Podcast',
      date: '2023-03-18',
      image: '/placeholder.svg',
      excerpt: language === 'ar'
        ? 'شاركت في حلقة بودكاست حول تجربتي في ريادة الأعمال التقنية والتحديات التي واجهتها'
        : 'Participated in a podcast episode about my experience in tech entrepreneurship and the challenges I faced',
      link: 'https://example.com/podcast',
      audioEmbed: 'https://soundcloud.com/soundcloud-for-business/episode-1-welcome-to-first-on-soundcloud'
    }
  ];

  const categories = [
    { id: 'all', name: language === 'ar' ? 'الكل' : 'All' },
    { id: 'interview', name: language === 'ar' ? 'مقابلات' : 'Interviews' },
    { id: 'article', name: language === 'ar' ? 'مقالات' : 'Articles' },
    { id: 'video', name: language === 'ar' ? 'فيديو' : 'Videos' },
    { id: 'podcast', name: language === 'ar' ? 'بودكاست' : 'Podcasts' }
  ];

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-2">
          {language === 'ar' ? 'الصحافة والإعلام' : 'Press & Media'}
        </h1>
        <p className="text-muted-foreground mb-8">
          {language === 'ar' 
            ? 'تغطية إعلامية، مقابلات، ومشاركات في وسائل الإعلام المختلفة'
            : 'Media coverage, interviews, and appearances across various outlets'}
        </p>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList>
            {categories.map(category => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map(category => (
            <TabsContent key={category.id} value={category.id} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pressItems
                  .filter(item => category.id === 'all' || item.type.toLowerCase().includes(category.id.toLowerCase()))
                  .map(item => (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="aspect-video relative">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-3 right-3">
                          {item.type}
                        </Badge>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {item.outlet} • {new Date(item.date).toLocaleDateString(
                            language === 'ar' ? 'ar-SA' : 'en-US', 
                            { year: 'numeric', month: 'long', day: 'numeric' }
                          )}
                        </p>
                        <p className="mb-4">{item.excerpt}</p>
                        
                        {/* Media Embeds */}
                        {item.videoEmbed && (
                          <div className="mb-4 aspect-video">
                            <iframe
                              width="100%"
                              height="100%"
                              src={item.videoEmbed}
                              title={item.title}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="rounded-lg"
                            ></iframe>
                          </div>
                        )}
                        
                        {item.audioEmbed && (
                          <div className="mb-4">
                            <iframe
                              width="100%"
                              height="100"
                              scrolling="no"
                              frameBorder="no"
                              src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/684407723&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
                              className="rounded-lg"
                            ></iframe>
                          </div>
                        )}
                        
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary hover:underline"
                        >
                          {language === 'ar' ? 'اقرأ المزيد' : 'Read More'}
                          <ExternalLink className="h-4 w-4 ml-1" />
                        </a>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};

export default Press;
