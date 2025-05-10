
import React from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import ScrollReveal from '@/components/ui/scroll-reveal';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
  featured?: boolean;
}

interface LatestBlogPostsProps {
  posts?: BlogPost[];
  limit?: number;
}

const mockPosts = [
  {
    id: 1,
    title: 'The Future of Web Development: Trends to Watch in 2025',
    excerpt: 'Explore the upcoming trends in web development, from AI integration to enhanced user experiences.',
    image: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?q=80&w=1074&auto=format&fit=crop',
    date: '2025-04-15',
    author: 'Ahmed Jamal',
    category: 'web-development',
    featured: true
  },
  {
    id: 2,
    title: 'Mastering Mobile UX Design: Key Principles for Developers',
    excerpt: 'Learn the essential principles of mobile UX design to create intuitive, user-friendly applications.',
    image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=1170&auto=format&fit=crop',
    date: '2025-04-02',
    author: 'Ahmed Jamal',
    category: 'design',
    featured: true
  },
];

const LatestBlogPosts: React.FC<LatestBlogPostsProps> = ({ posts, limit = 2 }) => {
  const { language } = useSettings();
  
  const sectionTitle = language === 'ar' ? 'أحدث المقالات' : 'Latest Articles';
  const viewAllText = language === 'ar' ? 'عرض كل المقالات' : 'View All Articles';
  const displayPosts = posts || mockPosts;
  const limitedPosts = displayPosts.slice(0, limit);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return language === 'ar' 
      ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` 
      : new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <section className="py-16 px-4 sm:px-6 bg-secondary/20">
      <div className="container mx-auto">
        <ScrollReveal>
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">{sectionTitle}</h2>
              <div className="h-1 w-20 bg-primary rounded-full"></div>
            </div>
            <Link to="/blog">
              <Button variant="ghost" className="group">
                {viewAllText}
                <ArrowRight className={`ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 ${language === 'ar' ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {limitedPosts.map((post, index) => (
            <ScrollReveal key={post.id} delay={index * 0.1} className="h-full">
              <Link to={`/blog/${post.id}`} className="block h-full">
                <Card className="overflow-hidden h-full hover-lift">
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <Badge className="absolute top-3 right-3">
                      {post.category.replace('-', ' ')}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        {formatDate(post.date)}
                      </div>
                      <div className="flex items-center">
                        <User className="mr-1 h-4 w-4" />
                        {post.author}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="pt-0 pb-6 px-6">
                    <Button variant="ghost" className="px-0 hover:bg-transparent hover:text-primary">
                      {language === 'ar' ? 'قراءة المزيد' : 'Read More'}
                      <ArrowRight className={`ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 ${language === 'ar' ? 'rotate-180' : ''}`} />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestBlogPosts;
