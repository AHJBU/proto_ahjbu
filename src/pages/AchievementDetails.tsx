
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useSettings } from '@/contexts/SettingsContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

const AchievementDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language, translations } = useSettings();
  
  // Mock achievement data
  const achievement = {
    id: parseInt(id || '1'),
    title: language === 'ar' ? 'جائزة أفضل مصمم للعام' : 'Best Designer of the Year Award',
    category: language === 'ar' ? 'تصميم' : 'Design',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    description: language === 'ar'
      ? 'حصلت على جائزة أفضل مصمم للعام 2023 من مؤسسة التصميم العالمية. تم اختياري من بين أكثر من 500 مصمم محترف بناءً على مجموعة من الأعمال التي قدمتها والتي تضمنت تصميمات لهويات بصرية وواجهات مستخدم وتطبيقات. الجائزة تقديراً للإبداع والابتكار في مجال التصميم الرقمي.'
      : 'Received the Best Designer of the Year 2023 award from Global Design Institute. I was selected among over 500 professional designers based on a portfolio of work that included visual identities, user interfaces, and applications. The award recognizes creativity and innovation in the field of digital design.',
    date: '2023-06-15',
    location: language === 'ar' ? 'دبي، الإمارات العربية المتحدة' : 'Dubai, UAE',
    testimonials: [
      {
        name: language === 'ar' ? 'محمد أحمد' : 'Mohammed Ahmed',
        position: language === 'ar' ? 'مدير المؤسسة' : 'Institute Director',
        quote: language === 'ar'
          ? 'أظهر أحمد مستوى استثنائي من الإبداع والمهارة التقنية في عمله'
          : 'Ahmed demonstrated an exceptional level of creativity and technical skill in his work'
      }
    ],
    metrics: [
      { label: language === 'ar' ? 'عدد المشاركين' : 'Participants', value: '500+' },
      { label: language === 'ar' ? 'عدد الدول' : 'Countries', value: '25' },
      { label: language === 'ar' ? 'المركز' : 'Ranking', value: '1st' }
    ]
  };

  return (
    <Layout>
      <div className="container py-12">
        <Link to="/achievements">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'العودة إلى الإنجازات' : 'Back to Achievements'}
          </Button>
        </Link>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Main content */}
          <div className="w-full md:w-2/3">
            <Badge className="mb-4">{achievement.category}</Badge>
            <h1 className="text-4xl font-bold mb-4">{achievement.title}</h1>
            <p className="text-muted-foreground mb-8">
              {language === 'ar' ? `${achievement.location} • ${achievement.date}` : `${achievement.date} • ${achievement.location}`}
            </p>
            
            {/* Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {achievement.images.map((image, index) => (
                <div key={index} className={index === 0 ? "md:col-span-2" : ""}>
                  <img 
                    src={image} 
                    alt={`${achievement.title} - Image ${index + 1}`}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              ))}
            </div>
            
            {/* Description */}
            <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
              <p>{achievement.description}</p>
            </div>
            
            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {achievement.metrics.map((metric, index) => (
                <Card key={index}>
                  <CardContent className="p-4 text-center">
                    <p className="text-3xl font-bold">{metric.value}</p>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-1/3">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  {language === 'ar' ? 'الشهادات' : 'Testimonials'}
                </h3>
                {achievement.testimonials.map((testimonial, index) => (
                  <div key={index} className="mb-4">
                    <p className="italic mb-2">"{testimonial.quote}"</p>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AchievementDetails;
