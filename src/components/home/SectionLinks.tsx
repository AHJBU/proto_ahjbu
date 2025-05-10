
import React from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '@/contexts/SettingsContext';
import { 
  User, 
  FileText, 
  Image, 
  Phone, 
  BookOpen,
  Book,
  Calendar
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface SectionLink {
  path: string;
  icon: React.ElementType;
  name: keyof typeof import('@/contexts/SettingsContext').defaultTranslations.en.nav;
}

const SectionLinks: React.FC = () => {
  const { translations } = useSettings();
  const t = translations.nav;

  const sections: SectionLink[] = [
    { path: '/cv', icon: FileText, name: 'cv' },
    { path: '/portfolio', icon: Image, name: 'portfolio' },
    { path: '/training', icon: Calendar, name: 'training' },
    { path: '/blog', icon: BookOpen, name: 'blog' },
    { path: '/about', icon: User, name: 'about' },
    { path: '/contact', icon: Phone, name: 'contact' }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 bg-secondary/50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">
          {translations.home.exploreTitle || (translations.language === 'ar' ? 'استكشف' : 'Explore')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Link to={section.path} key={section.path}>
              <Card className="card-hover h-full">
                <CardContent className="flex flex-col items-center justify-center p-8 h-full">
                  <section.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-center">{t[section.name]}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionLinks;
