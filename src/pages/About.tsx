
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useSettings } from '@/contexts/SettingsContext';
import { Card, CardContent } from '@/components/ui/card';

const About: React.FC = () => {
  const { language, translations } = useSettings();
  
  // Mock about data
  const aboutData = {
    intro: language === 'ar'
      ? `أنا أحمد جمال، محترف رقمي متعدد المهارات مع أكثر من 10 سنوات من الخبرة في مجالات التصميم والتطوير ووسائل التواصل الاجتماعي. أؤمن بقوة الإبداع والتكنولوجيا في إحداث تأثير إيجابي وتحويل الأفكار إلى واقع ملموس.`
      : `I am Ahmed Jamal, a multidisciplinary digital professional with over 10 years of experience in design, development, and social media. I believe in the power of creativity and technology to make a positive impact and transform ideas into tangible reality.`,
    story: language === 'ar'
      ? `بدأت رحلتي المهنية كمصمم جرافيك، وسرعان ما اكتشفت شغفي بالويب والتطبيقات. مع مرور السنوات، توسعت مهاراتي لتشمل تطوير الويب، وتصميم تجربة المستخدم، وإدارة وسائل التواصل الاجتماعي، والتدريب. أستمتع بالعمل في مشاريع متنوعة تتحدى قدراتي وتوسع آفاقي المهنية.

أؤمن بأن أفضل النتائج تأتي من الجمع بين الإبداع التصميمي والحلول التقنية القوية. هذه الفلسفة هي ما يوجه عملي سواء كنت أصمم هوية بصرية، أو أطور تطبيقًا، أو أقدم دورة تدريبية.

خارج العمل، أنا شغوف بالسفر واستكشاف ثقافات جديدة، وقراءة الكتب في مجموعة متنوعة من الموضوعات، وممارسة التصوير الفوتوغرافي.`
      : `I started my professional journey as a graphic designer, and quickly discovered my passion for web and applications. Over the years, my skills expanded to include web development, user experience design, social media management, and training. I enjoy working on diverse projects that challenge my abilities and expand my professional horizons.

I believe that the best results come from combining creative design and strong technical solutions. This philosophy is what guides my work whether I'm designing a visual identity, developing an application, or delivering a training course.

Outside of work, I'm passionate about traveling and exploring new cultures, reading books on a variety of subjects, and practicing photography.`,
    vision: language === 'ar'
      ? `أسعى دائمًا للابتكار والتعلم المستمر في كل ما أقوم به. رؤيتي هي المساهمة في تشكيل مستقبل رقمي أكثر إبداعًا وشمولية من خلال تصميمات وحلول تقنية تركز على الإنسان.`
      : `I constantly strive for innovation and continuous learning in everything I do. My vision is to contribute to shaping a more creative and inclusive digital future through human-centered designs and technical solutions.`,
    quotes: [
      {
        text: language === 'ar' 
          ? 'التصميم هو ليس كيف يبدو الشيء. التصميم هو كيف يعمل.'
          : 'Design is not just what it looks like. Design is how it works.',
        author: 'Steve Jobs'
      },
      {
        text: language === 'ar'
          ? 'الإبداع هو رؤية ما لا يراه الآخرون.'
          : 'Creativity is seeing what others don\'t see.',
        author: 'Anonymous'
      }
    ],
    photoGallery: [
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg'
    ]
  };

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">
            {language === 'ar' ? 'عن أحمد' : 'About Ahmed'}
          </h1>
          
          {/* Introduction */}
          <div className="mb-12">
            <p className="text-xl leading-relaxed mb-6">{aboutData.intro}</p>
            <div className="grid grid-cols-3 gap-4">
              {aboutData.photoGallery.map((photo, index) => (
                <img 
                  key={index}
                  src={photo}
                  alt={`Ahmed Jamal - ${index + 1}`}
                  className="rounded-lg w-full h-auto"
                />
              ))}
            </div>
          </div>
          
          {/* My Story */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              {language === 'ar' ? 'قصتي' : 'My Story'}
            </h2>
            <div className="prose prose-lg dark:prose-invert">
              {aboutData.story.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          
          {/* Vision */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              {language === 'ar' ? 'رؤيتي' : 'My Vision'}
            </h2>
            <p className="text-lg">{aboutData.vision}</p>
          </div>
          
          {/* Quotes */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">
              {language === 'ar' ? 'اقتباسات ملهمة' : 'Inspiring Quotes'}
            </h2>
            {aboutData.quotes.map((quote, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <blockquote className="italic text-lg mb-2">"{quote.text}"</blockquote>
                  <p className="text-right font-medium">— {quote.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
