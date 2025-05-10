
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useSettings } from '@/contexts/SettingsContext';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CV: React.FC = () => {
  const { language } = useSettings();
  
  const pageTitle = language === 'ar' ? 'السيرة الذاتية' : 'Curriculum Vitae';
  const downloadText = language === 'ar' ? 'تحميل السيرة الذاتية' : 'Download CV';
  
  const experienceItems = [
    {
      id: 1,
      company: language === 'ar' ? 'شركة التقنية المتطورة' : 'Advanced Tech Company',
      position: language === 'ar' ? 'مطور واجهات أمامية' : 'Frontend Developer',
      period: '2020 - Present',
      description: language === 'ar' 
        ? 'تطوير واجهات المستخدم الحديثة باستخدام React وNext.js. تحسين أداء المواقع وتجربة المستخدم.'
        : 'Developing modern user interfaces using React and Next.js. Improving website performance and user experience.'
    },
    {
      id: 2,
      company: language === 'ar' ? 'استوديو التصميم الإبداعي' : 'Creative Design Studio',
      position: language === 'ar' ? 'مصمم جرافيك' : 'Graphic Designer',
      period: '2018 - 2020',
      description: language === 'ar'
        ? 'تصميم هويات بصرية للشركات والعلامات التجارية. إنشاء مواد تسويقية وتصميمات للوسائط الاجتماعية.'
        : 'Designing visual identities for companies and brands. Creating marketing materials and designs for social media.'
    }
  ];

  const educationItems = [
    {
      id: 1,
      institution: language === 'ar' ? 'جامعة التكنولوجيا' : 'University of Technology',
      degree: language === 'ar' ? 'بكالوريوس علوم الحاسوب' : 'Bachelor of Computer Science',
      period: '2014 - 2018'
    }
  ];

  const skills = [
    { name: 'HTML & CSS', level: 95 },
    { name: 'JavaScript', level: 90 },
    { name: 'React', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'Graphic Design', level: 85 },
    { name: 'UI/UX Design', level: 80 }
  ];

  return (
    <Layout>
      <div className="container py-12">
        <div className="mb-10 flex justify-between items-center">
          <h1 className="text-4xl font-bold">{pageTitle}</h1>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            {downloadText}
          </Button>
        </div>

        {/* Personal Info */}
        <Card className="mb-10">
          <CardHeader>
            <CardTitle>{language === 'ar' ? 'المعلومات الشخصية' : 'Personal Information'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="font-semibold">{language === 'ar' ? 'الاسم' : 'Name'}</p>
                <p className="text-muted-foreground">{language === 'ar' ? 'أحمد جمال' : 'Ahmed Jamal'}</p>
              </div>
              <div>
                <p className="font-semibold">{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</p>
                <p className="text-muted-foreground">contact@ahmedjamal.com</p>
              </div>
              <div>
                <p className="font-semibold">{language === 'ar' ? 'الموقع' : 'Location'}</p>
                <p className="text-muted-foreground">{language === 'ar' ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}</p>
              </div>
              <div>
                <p className="font-semibold">{language === 'ar' ? 'الموقع الإلكتروني' : 'Website'}</p>
                <p className="text-muted-foreground">www.ahmedjamal.com</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Experience */}
        <Card className="mb-10">
          <CardHeader>
            <CardTitle>{language === 'ar' ? 'الخبرات العملية' : 'Professional Experience'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {experienceItems.map(item => (
                <div key={item.id} className="relative border-l-2 border-primary pl-6 pb-6">
                  <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-primary"></div>
                  <h3 className="text-xl font-semibold">{item.position}</h3>
                  <p className="text-lg text-primary">{item.company}</p>
                  <p className="text-sm text-muted-foreground mb-2">{item.period}</p>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Education */}
        <Card className="mb-10">
          <CardHeader>
            <CardTitle>{language === 'ar' ? 'التعليم' : 'Education'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {educationItems.map(item => (
                <div key={item.id} className="relative border-l-2 border-primary pl-6 pb-6">
                  <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-primary"></div>
                  <h3 className="text-xl font-semibold">{item.degree}</h3>
                  <p className="text-lg text-primary">{item.institution}</p>
                  <p className="text-sm text-muted-foreground">{item.period}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle>{language === 'ar' ? 'المهارات' : 'Skills'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between">
                    <p>{skill.name}</p>
                    <p>{skill.level}%</p>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CV;
