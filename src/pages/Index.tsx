
import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import SectionLinks from '@/components/home/SectionLinks';
import LatestWorks from '@/components/home/LatestWorks';
import LatestBlogPosts from '@/components/home/LatestBlogPosts';
import ContactCTA from '@/components/home/ContactCTA';
import ScrollReveal from '@/components/ui/scroll-reveal';

const Index: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <SectionLinks />
      <LatestWorks />
      
      {/* Enhanced blog posts section */}
      <ScrollReveal>
        <div className="py-16 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
            <LatestBlogPosts />
          </div>
        </div>
      </ScrollReveal>
      
      {/* Enhanced contact section */}
      <ScrollReveal>
        <div className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container">
            <ContactCTA />
          </div>
        </div>
      </ScrollReveal>
    </Layout>
  );
};

export default Index;
