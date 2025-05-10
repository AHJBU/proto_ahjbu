
import React from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  data?: {
    headline?: string;
    subheadline?: string;
    bio?: string;
    ctaText?: string;
    profileImage?: string;
  };
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  const { language, translations } = useSettings();
  const t = translations.home;
  const navigate = useNavigate();

  // Use data from props if available, otherwise use translations
  const headline = data?.headline || t.headline;
  const subheadline = data?.subheadline || t.subheadline;
  const bio = data?.bio || t.bio;
  const ctaText = data?.ctaText || t.cta;
  
  // Default placeholder image if none provided
  const profileImage = data?.profileImage || '/placeholder.svg';

  return (
    <section className="py-20 px-4 sm:px-6 overflow-hidden relative">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className={`${language === 'ar' ? 'order-2' : 'order-1'} slide-up`} style={{ animationDelay: '0.1s' }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gradient">
              {headline}
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-6 slide-in" style={{ animationDelay: '0.3s' }}>
              {subheadline}
            </h2>
            <p className="text-lg mb-8 max-w-md slide-in" style={{ animationDelay: '0.5s' }}>
              {bio}
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/portfolio')}
              className="group slide-in hover-lift"
              style={{ animationDelay: '0.7s' }}
            >
              {ctaText}
              <ArrowRight className={`ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 ${language === 'ar' ? 'rotate-180' : ''}`} />
            </Button>
          </div>
          <div className={`${language === 'ar' ? 'order-1' : 'order-2'} flex justify-center blur-in`} style={{ animationDelay: '0.3s' }}>
            <div className="relative animate-float">
              {/* Enhanced image effect with multiple layers */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/60 to-blue-600/60 opacity-70 blur-2xl animate-pulse-slow"></div>
              <div className="absolute -inset-2 rounded-full bg-gradient-to-l from-primary/30 to-blue-600/30 opacity-50 blur-xl" style={{ animationDelay: '2s' }}></div>
              <img 
                src={profileImage} 
                alt={headline} 
                className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full relative z-10 border-4 border-background shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mb-10 -ml-10"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -mt-20 -mr-20"></div>
    </section>
  );
};

export default Hero;
