
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { useSettings } from '@/contexts/SettingsContext';
import { SecureContactForm } from '@/components/contact/SecureContactForm';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScrollReveal from '@/components/ui/scroll-reveal';

// In a real application, this would be fetched from your backend
const contactSettings = {
  email: "contact@ahmedjamal.com",
  phone: "+1 234 567 890",
  address: "123 Main Street, New York, NY 10001",
  hours: "Mon - Fri: 9:00 AM - 5:00 PM",
  socialLinks: [
    { name: "Twitter", url: "https://twitter.com" },
    { name: "LinkedIn", url: "https://linkedin.com" },
    { name: "GitHub", url: "https://github.com" }
  ],
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343035!2d-74.00425882346288!3d40.71275427132847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a1642787adf%3A0x181ed5393bde7d54!2sOne%20World%20Trade%20Center!5e0!3m2!1sen!2sus!4v1688389517650!5m2!1sen!2sus"
};

const Contact: React.FC = () => {
  const { language } = useSettings();

  return (
    <Layout>
      <div className="container py-12">
        <ScrollReveal>
          <h1 className="text-4xl font-bold mb-2">
            {language === 'ar' ? 'اتصل بي' : 'Contact Me'}
          </h1>
          <p className="text-muted-foreground text-lg mb-10">
            {language === 'ar' 
              ? 'أرسل لي رسالة وسأرد عليك في أقرب وقت ممكن.'
              : 'Send me a message and I\'ll get back to you as soon as possible.'}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ScrollReveal delay={0.1} className="lg:col-span-2">
            <SecureContactForm recipientEmail={contactSettings.email} />
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">
                    {language === 'ar' ? 'معلومات الاتصال' : 'Contact Information'}
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium">
                          {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                        </h3>
                        <a 
                          href={`mailto:${contactSettings.email}`}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {contactSettings.email}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-primary mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium">
                          {language === 'ar' ? 'الهاتف' : 'Phone'}
                        </h3>
                        <a 
                          href={`tel:${contactSettings.phone.replace(/\s/g, '')}`}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {contactSettings.phone}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium">
                          {language === 'ar' ? 'العنوان' : 'Address'}
                        </h3>
                        <p className="text-muted-foreground">
                          {contactSettings.address}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-primary mr-3 mt-0.5" />
                      <div>
                        <h3 className="font-medium">
                          {language === 'ar' ? 'ساعات العمل' : 'Working Hours'}
                        </h3>
                        <p className="text-muted-foreground">
                          {contactSettings.hours}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">
                    {language === 'ar' ? 'تابعني على' : 'Follow Me On'}
                  </h2>
                  
                  <div className="flex flex-wrap gap-2">
                    {contactSettings.socialLinks.map((link, index) => (
                      <Button key={index} variant="outline" asChild size="sm">
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          {link.name}
                          <ExternalLink className="ml-2 h-3 w-3" />
                        </a>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <div className="aspect-square md:aspect-video w-full rounded-lg overflow-hidden">
                <iframe
                  src={contactSettings.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Map location"
                ></iframe>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
