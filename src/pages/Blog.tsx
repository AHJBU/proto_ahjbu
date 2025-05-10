import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useSettings } from '@/contexts/SettingsContext';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from '@/components/ui/separator';
import { Search, Calendar, ArrowRight } from 'lucide-react';

// Mock blog data
const blogPosts = [
  {
    id: 1,
    title: 'The Future of Web Development: Trends to Watch in 2025',
    excerpt: 'Explore the upcoming trends in web development, from AI integration to enhanced user experiences and the evolution of frontend frameworks.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?q=80&w=1074&auto=format&fit=crop',
    date: '2025-04-15',
    author: 'Ahmed Jamal',
    category: 'web-development',
    tags: ['React', 'AI', 'Web Trends', 'Frontend']
  },
  {
    id: 2,
    title: 'Mastering Mobile UX Design: Key Principles for Developers',
    excerpt: 'Learn the essential principles of mobile UX design to create intuitive, user-friendly applications that stand out in a crowded marketplace.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=1170&auto=format&fit=crop',
    date: '2025-04-02',
    author: 'Ahmed Jamal',
    category: 'design',
    tags: ['UX Design', 'Mobile', 'UI', 'Design Principles']
  },
  {
    id: 3,
    title: 'The Power of Social Media Analytics for Business Growth',
    excerpt: 'Discover how to leverage social media analytics to drive business growth, understand your audience, and optimize your digital marketing strategy.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1074&auto=format&fit=crop',
    date: '2025-03-20',
    author: 'Ahmed Jamal',
    category: 'social-media',
    tags: ['Analytics', 'Marketing', 'Social Media', 'Business Strategy']
  },
  {
    id: 4,
    title: 'Building Cross-Platform Applications with Flutter',
    excerpt: 'A comprehensive guide to developing high-performance, visually attractive cross-platform applications using Flutter and Dart.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1074&auto=format&fit=crop',
    date: '2025-03-08',
    author: 'Ahmed Jamal',
    category: 'mobile-development',
    tags: ['Flutter', 'Mobile Development', 'Cross-Platform', 'Dart']
  },
  {
    id: 5,
    title: 'SEO Strategies Every Developer Should Know',
    excerpt: 'Learn the essential SEO techniques that developers should implement to ensure their websites rank well in search engines and attract organic traffic.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: 'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?q=80&w=1074&auto=format&fit=crop',
    date: '2025-02-25',
    author: 'Ahmed Jamal',
    category: 'seo',
    tags: ['SEO', 'Web Development', 'Digital Marketing', 'Content Strategy']
  },
  {
    id: 6,
    title: 'Creating Effective Visual Content for Digital Marketing',
    excerpt: 'Explore strategies for creating compelling visual content that enhances your digital marketing efforts and engages your target audience.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1170&auto=format&fit=crop',
    date: '2025-02-10',
    author: 'Ahmed Jamal',
    category: 'design',
    tags: ['Visual Content', 'Digital Marketing', 'Design', 'Branding']
  }
];

// Categories
const categories = [
  { value: 'all', label: { en: 'All Categories', ar: 'جميع الفئات' } },
  { value: 'web-development', label: { en: 'Web Development', ar: 'تطوير الويب' } },
  { value: 'design', label: { en: 'Design', ar: 'التصميم' } },
  { value: 'mobile-development', label: { en: 'Mobile Development', ar: 'تطوير الموبايل' } },
  { value: 'social-media', label: { en: 'Social Media', ar: 'وسائل التواصل الاجتماعي' } },
  { value: 'seo', label: { en: 'SEO', ar: 'تحسين محركات البحث' } }
];

// Extract all unique tags from blog posts
const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

const Blog: React.FC = () => {
  const { translations, language } = useSettings();
  const navigate = useNavigate();
  const t = translations.blog;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return language === 'ar' 
      ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` 
      : new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePostClick = (id: number) => {
    navigate(`/blog/${id}`);
  };

  return (
    <Layout>
      <section className="py-12 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-3">{t.title}</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.subtitle}</p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={t.search}
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="w-full md:w-auto">
              <Select 
                defaultValue="all"
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder={language === 'ar' ? 'اختر الفئة' : 'Select category'} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {language === 'ar' ? category.label.ar : category.label.en}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Blog Posts */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {filteredPosts.map(post => (
                  <Card 
                    key={post.id} 
                    className="overflow-hidden card-hover cursor-pointer transition-all hover:shadow-lg"
                    onClick={() => handlePostClick(post.id)}
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3 aspect-video md:aspect-auto">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{formatDate(post.date)}</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                        <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                        <Button variant="ghost" className="px-0">
                          {t.readMore}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    {language === 'ar' ? 'لا توجد مقالات متطابقة مع بحثك' : 'No articles match your search'}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Categories */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">{t.categories}</h3>
                  <div className="space-y-2">
                    {categories.slice(1).map(category => (
                      <div 
                        key={category.value}
                        className="flex items-center justify-between cursor-pointer hover:text-primary transition-colors"
                        onClick={() => setSelectedCategory(category.value)}
                      >
                        <span>{language === 'ar' ? category.label.ar : category.label.en}</span>
                        <span className="text-muted-foreground">
                          {blogPosts.filter(post => post.category === category.value).length}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">{t.popularTags}</h3>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="cursor-pointer">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Posts */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    {language === 'ar' ? 'أحدث المقالات' : 'Recent Posts'}
                  </h3>
                  <div className="space-y-4">
                    {blogPosts.slice(0, 3).map(post => (
                      <div key={post.id} className="flex gap-3">
                        <div className="w-16 h-16 flex-shrink-0">
                          <img 
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div>
                          <Link to={`/blog/${post.id}`}>
                            <h4 className="font-medium line-clamp-2 hover:text-primary transition-colors">
                              {post.title}
                            </h4>
                          </Link>
                          <p className="text-sm text-muted-foreground">{formatDate(post.date)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
