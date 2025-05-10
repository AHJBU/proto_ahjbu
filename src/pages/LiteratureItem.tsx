
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useSettings } from '@/contexts/SettingsContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const LiteratureItem: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { language, translations } = useSettings();
  
  // Mock literature item data
  const item = {
    id: parseInt(id || '1'),
    title: language === 'ar' ? 'رحلة في عالم التصميم' : 'Journey in the World of Design',
    category: language === 'ar' ? 'مقالات' : 'Articles',
    image: '/placeholder.svg',
    content: language === 'ar'
      ? `<p>في عالم التصميم، نجد أنفسنا في رحلة مستمرة من الاستكشاف والإبداع. التصميم ليس مجرد عملية تقنية، بل هو فن يجمع بين الجمال والوظيفة، بين الإبداع والمنطق.</p>
         <p>عندما بدأت رحلتي في عالم التصميم، كنت أرى الأمور بشكل مختلف. كنت أركز على الأدوات والتقنيات، متجاهلاً الفلسفة والهدف وراء كل تصميم. مع مرور الوقت، أدركت أن التصميم الجيد يتجاوز الشكل الجميل؛ إنه يحل المشكلات ويخلق تجارب ذات معنى.</p>
         <p>في العصر الرقمي، أصبح دور المصمم أكثر أهمية من أي وقت مضى. نحن نشكل كيفية تفاعل الناس مع العالم من حولهم، كيف يتنقلون عبر المعلومات، وكيف يتواصلون مع بعضهم البعض.</p>
         <p>التصميم رحلة لا تنتهي من التعلم والنمو. كل مشروع هو فرصة لاستكشاف أفكار جديدة، لتجربة أساليب مختلفة، ولإيجاد حلول مبتكرة للتحديات القديمة والجديدة.</p>
         <p>أؤمن أن أفضل التصاميم هي تلك التي تجمع بين الجمال والبساطة والوظيفة. التصميم الجيد يجب أن يكون غير مرئي بطريقة ما - يعمل بسلاسة لدرجة أن المستخدم لا يلاحظ حتى كم هو جيد.</p>
         <p>وفي النهاية، التصميم هو عن التواصل. إنه عن إيصال الأفكار والمشاعر والقيم من خلال العناصر المرئية. عندما ننجح في ذلك، نخلق تجارب تترك أثراً دائماً.</p>`
      : `<p>In the world of design, we find ourselves on a continuous journey of exploration and creativity. Design is not merely a technical process; it is an art that combines beauty and function, creativity and logic.</p>
         <p>When I began my journey in the world of design, I saw things differently. I focused on tools and techniques, neglecting the philosophy and purpose behind each design. Over time, I realized that good design goes beyond beautiful form; it solves problems and creates meaningful experiences.</p>
         <p>In the digital age, the designer's role has become more important than ever. We shape how people interact with the world around them, how they navigate through information, and how they communicate with each other.</p>
         <p>Design is a never-ending journey of learning and growth. Each project is an opportunity to explore new ideas, to experiment with different approaches, and to find innovative solutions to old and new challenges.</p>
         <p>I believe that the best designs are those that combine beauty, simplicity, and functionality. Good design should be invisible in a way - working so seamlessly that the user doesn't even notice how good it is.</p>
         <p>In the end, design is about communication. It's about conveying ideas, emotions, and values through visual elements. When we succeed in that, we create experiences that leave a lasting impact.</p>`,
    date: '2023-05-10',
    author: language === 'ar' ? 'أحمد جمال' : 'Ahmed Jamal',
    tags: [
      language === 'ar' ? 'تصميم' : 'Design',
      language === 'ar' ? 'إبداع' : 'Creativity',
      language === 'ar' ? 'فلسفة' : 'Philosophy'
    ]
  };

  return (
    <Layout>
      <div className="container py-12">
        <Link to="/literature">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'العودة إلى الكتابات' : 'Back to Literature'}
          </Button>
        </Link>

        <article>
          <Badge className="mb-4">{item.category}</Badge>
          <h1 className="text-4xl font-bold mb-4">{item.title}</h1>
          <div className="flex items-center text-muted-foreground mb-8">
            <span>{item.author}</span>
            <span className="mx-2">•</span>
            <span>
              {new Date(item.date).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          
          {/* Featured Image */}
          <img 
            src={item.image} 
            alt={item.title}
            className="w-full h-auto max-h-[500px] object-cover rounded-lg mb-8"
          />
          
          {/* Content */}
          <div 
            className="prose prose-lg max-w-none dark:prose-invert mb-8"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {item.tags.map((tag, index) => (
              <Badge key={index} variant="outline">{tag}</Badge>
            ))}
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default LiteratureItem;
