
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useSettings } from '@/contexts/SettingsContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileDown, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Resources: React.FC = () => {
  const { language, translations } = useSettings();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  // Mock resources data
  const resources = [
    {
      id: 1,
      title: language === 'ar' ? 'السيرة الذاتية' : 'Curriculum Vitae (CV)',
      description: language === 'ar' 
        ? 'السيرة الذاتية الرسمية والمحدثة' 
        : 'Official and updated curriculum vitae',
      category: language === 'ar' ? 'سيرة ذاتية' : 'CV',
      type: 'PDF',
      size: '1.2 MB',
      downloadable: true,
      featured: true,
      icon: '/placeholder.svg'
    },
    {
      id: 2,
      title: language === 'ar' ? 'أساسيات تصميم الويب - دليل مبسط' : 'Web Design Basics - A Simple Guide',
      description: language === 'ar' 
        ? 'دليل شامل لأساسيات تصميم الويب للمبتدئين' 
        : 'A comprehensive guide to web design basics for beginners',
      category: language === 'ar' ? 'تصميم' : 'Design',
      type: 'PDF',
      size: '3.5 MB',
      downloadable: true,
      featured: false,
      icon: '/placeholder.svg'
    },
    {
      id: 3,
      title: language === 'ar' ? 'قالب خطة مشروع' : 'Project Plan Template',
      description: language === 'ar' 
        ? 'قالب جاهز لتخطيط المشاريع الرقمية' 
        : 'Ready-to-use template for planning digital projects',
      category: language === 'ar' ? 'قوالب' : 'Templates',
      type: 'DOCX',
      size: '0.8 MB',
      downloadable: true,
      featured: false,
      icon: '/placeholder.svg'
    },
    {
      id: 4,
      title: language === 'ar' ? 'أساسيات React.js - شرائح العرض' : 'React.js Fundamentals - Slides',
      description: language === 'ar' 
        ? 'شرائح عرض تقديمي من ورشة عمل React.js' 
        : 'Presentation slides from React.js workshop',
      category: language === 'ar' ? 'تطوير' : 'Development',
      type: 'PPTX',
      size: '5.2 MB',
      downloadable: true,
      featured: true,
      icon: '/placeholder.svg'
    },
    {
      id: 5,
      title: language === 'ar' ? 'مخططات تصميم UX' : 'UX Design Wireframes',
      description: language === 'ar' 
        ? 'مجموعة من مخططات تصميم UX القابلة للتعديل' 
        : 'Collection of editable UX design wireframes',
      category: language === 'ar' ? 'تصميم' : 'Design',
      type: 'AI',
      size: '15.7 MB',
      downloadable: false,
      featured: false,
      icon: '/placeholder.svg'
    }
  ];
  
  const categories = Array.from(new Set(resources.map(resource => resource.category)));
  
  const filteredResources = resources.filter((resource) => {
    // Filter by search term
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by selected categories
    const matchesCategory = selectedCategories.length === 0 || 
                          selectedCategories.includes(resource.category);
    
    return matchesSearch && matchesCategory;
  });

  const featuredResources = filteredResources.filter(resource => resource.featured);
  const regularResources = filteredResources.filter(resource => !resource.featured);

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-2">
          {language === 'ar' ? 'الملفات والموارد' : 'Files & Resources'}
        </h1>
        <p className="text-muted-foreground mb-8">
          {language === 'ar' 
            ? 'مجموعة من الملفات والموارد المفيدة للتحميل والاستخدام'
            : 'A collection of useful files and resources for download and use'}
        </p>
        
        {/* Featured CV Download */}
        <Card className="mb-8 bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
                  <FileDown className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    {language === 'ar' ? 'السيرة الذاتية الرسمية' : 'Official CV / Resume'}
                  </h3>
                  <p className="text-muted-foreground">
                    {language === 'ar' ? 'آخر تحديث: مايو 2023' : 'Last updated: May 2023'}
                  </p>
                </div>
              </div>
              <Button>
                <FileDown className="mr-2 h-4 w-4" />
                {language === 'ar' ? 'تحميل السيرة الذاتية' : 'Download CV'}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder={language === 'ar' ? 'بحث عن موارد...' : 'Search resources...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                {language === 'ar' ? 'تصفية حسب الفئة' : 'Filter by Category'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {categories.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedCategories([...selectedCategories, category]);
                    } else {
                      setSelectedCategories(selectedCategories.filter(item => item !== category));
                    }
                  }}
                >
                  {category}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Resources Tabs */}
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">
              {language === 'ar' ? 'جميع الموارد' : 'All Resources'}
            </TabsTrigger>
            <TabsTrigger value="featured">
              {language === 'ar' ? 'المميزة' : 'Featured'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map(resource => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  language={language}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="featured" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredResources.map(resource => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  language={language}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

interface ResourceCardProps {
  resource: {
    id: number;
    title: string;
    description: string;
    category: string;
    type: string;
    size: string;
    downloadable: boolean;
    featured: boolean;
    icon: string;
  };
  language: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, language }) => {
  return (
    <Card className={resource.featured ? "border-primary/20" : ""}>
      <CardContent className="p-6">
        <div className="flex items-start">
          <div className="h-12 w-12 rounded bg-muted flex items-center justify-center mr-4">
            <img src={resource.icon} alt="" className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold mb-1">{resource.title}</h3>
              <Badge variant="outline" className="ml-2">
                {resource.type}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">{resource.size}</span>
              {resource.downloadable ? (
                <Button size="sm">
                  <FileDown className="mr-2 h-3 w-3" />
                  {language === 'ar' ? 'تحميل' : 'Download'}
                </Button>
              ) : (
                <Button size="sm" disabled>
                  {language === 'ar' ? 'غير متاح للتحميل' : 'Not Available'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Resources;
