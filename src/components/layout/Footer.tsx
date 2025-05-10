
import React from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '@/contexts/SettingsContext';
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const { language, translations } = useSettings();
  const t = translations.footer;
  const nav = translations.nav;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Logo Column */}
          <div className="col-span-1">
            <Link to="/" className="text-2xl font-bold text-gradient">
              {language === 'ar' ? 'أحمد جمال' : 'Ahmed Jamal'}
            </Link>
            <p className="mt-4 text-muted-foreground">
              {language === 'ar' 
                ? 'محترف رقمي متخصص في وسائل التواصل الاجتماعي والتصميم والتطوير والتدريب'
                : 'Digital professional specializing in social media, design, development, and training'}
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">
              {language === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <ul className="space-y-2">
              {['cv', 'portfolio', 'applications', 'training', 'blog', 'contact'].map((link) => (
                <li key={link}>
                  <Link 
                    to={`/${link === 'cv' ? 'cv' : link}`} 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {nav[link === 'applications' ? 'apps' : link as keyof typeof nav]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">
              {language === 'ar' ? 'استكشف' : 'Explore'}
            </h3>
            <ul className="space-y-2">
              {['about', 'achievements', 'literature', 'press', 'resources'].map((link) => (
                <li key={link}>
                  <Link 
                    to={`/${link}`} 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {nav[link as keyof typeof nav]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">
              {language === 'ar' ? 'تواصل معنا' : 'Connect'}
            </h3>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="YouTube" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {currentYear} Ahmed Jamal. {t.rights}.</p>
          <p className="mt-2">{t.madeWith} ❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
