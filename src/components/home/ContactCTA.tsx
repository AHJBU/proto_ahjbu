
import React from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, Phone, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from '@/components/ui/scroll-reveal';

const ContactCTA: React.FC = () => {
  const { language } = useSettings();
  const navigate = useNavigate();
  
  const title = language === 'ar' ? 'تواصل معي' : 'Get In Touch';
  const description = language === 'ar' 
    ? 'هل لديك مشروع أو فكرة تريد مناقشتها؟ أنا هنا للمساعدة وتحويل أفكارك إلى واقع'
    : 'Have a project or an idea you want to discuss? I\'m here to help and turn your ideas into reality';
  const buttonText = language === 'ar' ? 'ارسل رسالة' : 'Send a Message';
  
  const contactInfo = [
    { 
      icon: Mail, 
      text: 'example@email.com', 
      label: language === 'ar' ? 'البريد الإلكتروني' : 'Email'
    },
    { 
      icon: Phone, 
      text: '+123 456 7890', 
      label: language === 'ar' ? 'الهاتف' : 'Phone'
    },
    { 
      icon: MessageSquare, 
      text: language === 'ar' ? 'استجابة سريعة' : 'Fast Response', 
      label: language === 'ar' ? 'التواصل' : 'Communication'
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 bg-gradient-to-br from-primary/10 to-transparent">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal className="slide-up">
            <h2 className="text-4xl font-bold mb-4">{title}</h2>
            <div className="h-1 w-20 bg-primary rounded-full mb-6"></div>
            <p className="text-lg mb-8 max-w-md">{description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {contactInfo.map((item, index) => (
                <ScrollReveal key={index} delay={index * 0.1} className="blur-in">
                  <div className="flex flex-col items-center p-4 bg-background rounded-lg border shadow-sm hover-lift">
                    <div className="bg-primary/10 p-3 rounded-full mb-3">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium mb-1">{item.label}</h3>
                    <p className="text-sm text-center text-muted-foreground">{item.text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            
            <Button 
              size="lg" 
              onClick={() => navigate('/contact')}
              className="group animate-pulse-slow"
            >
              {buttonText}
              <ArrowRight className={`ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 ${language === 'ar' ? 'rotate-180' : ''}`} />
            </Button>
          </ScrollReveal>
          
          <ScrollReveal className="slide-in" delay={0.3}>
            <div className="relative h-full flex items-center justify-center">
              {/* Abstract decorative element */}
              <div className="absolute w-64 h-64 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl opacity-70"></div>
              <div className="absolute w-48 h-48 bg-gradient-to-l from-blue-500/20 to-purple-500/20 rounded-full blur-2xl opacity-70 animate-pulse"></div>
              
              <div className="relative z-10 bg-background border rounded-2xl p-8 shadow-xl w-full max-w-md transform hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-semibold mb-2 text-center">
                  {language === 'ar' ? 'جاهز للتحدث؟' : 'Ready to talk?'}
                </h3>
                <p className="text-center text-muted-foreground mb-6">
                  {language === 'ar' ? 'انقر للانتقال إلى نموذج الاتصال الآمن' : 'Click to navigate to the secure contact form'}
                </p>
                <Button 
                  variant="default" 
                  className="w-full" 
                  size="lg"
                  onClick={() => navigate('/contact')}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  {language === 'ar' ? 'انتقل إلى نموذج الاتصال' : 'Go to Contact Form'}
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
