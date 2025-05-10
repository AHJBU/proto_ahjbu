
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useSettings } from '@/contexts/SettingsContext';
import { useProfile } from '@/contexts/ProfileContext';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CV: React.FC = () => {
  const { language } = useSettings();
  const { profileData } = useProfile();
  console.log('CV render - profileData:', profileData);

  const pageTitle = language === 'ar' ? 'السيرة الذاتية' : 'Curriculum Vitae';
  const downloadText = language === 'ar' ? 'تحميل السيرة الذاتية' : 'Download CV';

  // جلب البيانات من الملف الشخصي
  const experienceItems = profileData.workExperience || [];
  const educationItems = profileData.education || [];
  const skills = profileData.skills || [];

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
                <p className="text-muted-foreground">{profileData.name}</p>
              </div>
              <div>
                <p className="font-semibold">{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</p>
                <p className="text-muted-foreground">{profileData.email}</p>
              </div>
              <div>
                <p className="font-semibold">{language === 'ar' ? 'الموقع' : 'Location'}</p>
                <p className="text-muted-foreground">{profileData.address}</p>
              </div>
              <div>
                <p className="font-semibold">{language === 'ar' ? 'الموقع الإلكتروني' : 'Website'}</p>
                <p className="text-muted-foreground">{profileData.website}</p>
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
                  <p className="text-sm text-muted-foreground mb-2">{language === 'ar' ? item.startDate + (item.endDate ? ' - ' + item.endDate : '') : item.startDate + (item.endDate ? ' - ' + item.endDate : '')}</p>
                  <p>{item.description}</p>
                  <p className="text-sm text-muted-foreground mt-2">{item.location}</p>
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
                  <p className="text-sm text-muted-foreground">{language === 'ar' ? item.startDate + (item.endDate ? ' - ' + item.endDate : '') : item.startDate + (item.endDate ? ' - ' + item.endDate : '')}</p>
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
