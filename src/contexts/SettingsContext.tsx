
import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'ar' | 'en';
type Theme = 'light' | 'dark';

interface SettingsContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  translations: Record<string, any>;
}

export const defaultTranslations = {
  en: {
    nav: {
      home: "Home",
      cv: "Resume",
      portfolio: "Portfolio",
      apps: "Applications",
      training: "Training",
      blog: "Blog",
      contact: "Contact",
      about: "About Me",
      achievements: "Achievements",
      literature: "Literature",
      press: "Press",
      resources: "Resources"
    },
    home: {
      headline: "Ahmed Jamal",
      subheadline: "Digital Professional",
      cta: "View My Work",
      bio: "Expert in social media, graphic design, web development, and training",
      exploreTitle: "Explore"
    },
    applications: {
      title: "Applications",
      subtitle: "Discover my web and mobile applications",
      viewDetails: "View Details",
      features: "Features",
      technologies: "Technologies Used",
      screenshots: "Screenshots",
      download: "Download",
      visitStore: "Visit Store",
      testimonials: "User Testimonials"
    },
    training: {
      title: "Training & Workshops",
      subtitle: "Learn about my training courses and workshops",
      viewDetails: "View Details",
      level: "Level",
      duration: "Duration",
      audience: "Target Audience",
      registerInterest: "Register Interest",
      categories: {
        all: "All Categories",
        webDev: "Web Development",
        mobileDev: "Mobile Development",
        design: "Design",
        social: "Social Media",
        other: "Other"
      },
      levels: {
        beginner: "Beginner",
        intermediate: "Intermediate",
        advanced: "Advanced",
        all: "All Levels"
      }
    },
    blog: {
      title: "Blog",
      subtitle: "Articles & Insights",
      readMore: "Read More",
      postedOn: "Posted on",
      categories: "Categories",
      share: "Share",
      comments: "Comments",
      leaveComment: "Leave a comment",
      search: "Search articles",
      popularTags: "Popular Tags"
    },
    achievements: {
      title: "Achievements & Success Stories",
      subtitle: "Milestones in my professional journey",
      viewDetails: "View Details",
      testimonials: "Testimonials",
      metrics: "Impact Metrics"
    },
    literature: {
      title: "Literature & Quotes",
      subtitle: "Personal writings & favorite quotes",
      readMore: "Read More",
      categories: "Categories",
      tags: "Tags"
    },
    about: {
      title: "About Me",
      subtitle: "Get to know me better",
      story: "My Story",
      passion: "My Passion",
      vision: "My Vision",
      quotes: "Inspirational Quotes"
    },
    press: {
      title: "Press & Media",
      subtitle: "Media appearances and coverage",
      interviews: "Interviews",
      articles: "Articles",
      videos: "Videos",
      audio: "Audio"
    },
    resources: {
      title: "Resources",
      subtitle: "Downloadable files and resources",
      cvDownload: "Download CV",
      categories: "Categories",
      download: "Download",
      fileDetails: "File Details"
    },
    footer: {
      rights: "All Rights Reserved",
      madeWith: "Made with passion"
    },
    common: {
      loading: "Loading...",
      error: "Something went wrong",
      search: "Search",
      filter: "Filter",
      sort: "Sort",
      submit: "Submit",
      cancel: "Cancel",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      add: "Add"
    },
    contact: {
      title: "Contact Me",
      subtitle: "Let's get in touch",
      form: {
        name: "Your Name",
        email: "Your Email",
        subject: "Subject",
        message: "Message",
        submit: "Send Message"
      },
      social: "Connect on Social Media",
      direct: "Direct Contact Methods",
      meeting: "Book a Meeting"
    }
  },
  ar: {
    nav: {
      home: "الرئيسية",
      cv: "السيرة الذاتية",
      portfolio: "الأعمال",
      apps: "التطبيقات",
      training: "التدريب",
      blog: "المدونة",
      contact: "التواصل",
      about: "عني",
      achievements: "الإنجازات",
      literature: "كتابات",
      press: "في الإعلام",
      resources: "الملفات"
    },
    home: {
      headline: "أحمد جمال",
      subheadline: "محترف رقمي",
      cta: "استعرض أعمالي",
      bio: "خبير في وسائل التواصل الاجتماعي والتصميم الجرافيكي وتطوير الويب والتدريب",
      exploreTitle: "استكشف"
    },
    applications: {
      title: "التطبيقات",
      subtitle: "اكتشف تطبيقاتي للويب والموبايل",
      viewDetails: "عرض التفاصيل",
      features: "المميزات",
      technologies: "التقنيات المستخدمة",
      screenshots: "لقطات الشاشة",
      download: "تحميل",
      visitStore: "زيارة المتجر",
      testimonials: "آراء المستخدمين"
    },
    training: {
      title: "التدريب وورش العمل",
      subtitle: "تعرف على دوراتي التدريبية وورش العمل",
      viewDetails: "عرض التفاصيل",
      level: "المستوى",
      duration: "المدة",
      audience: "الفئة المستهدفة",
      registerInterest: "سجل اهتمامك",
      categories: {
        all: "جميع الفئات",
        webDev: "تطوير الويب",
        mobileDev: "تطوير الموبايل",
        design: "التصميم",
        social: "وسائل التواصل الاجتماعي",
        other: "أخرى"
      },
      levels: {
        beginner: "مبتدئ",
        intermediate: "متوسط",
        advanced: "متقدم",
        all: "جميع المستويات"
      }
    },
    blog: {
      title: "المدونة",
      subtitle: "مقالات وأفكار",
      readMore: "اقرأ المزيد",
      postedOn: "نشر بتاريخ",
      categories: "التصنيفات",
      share: "مشاركة",
      comments: "التعليقات",
      leaveComment: "اترك تعليقاً",
      search: "بحث في المقالات",
      popularTags: "العلامات الشائعة"
    },
    achievements: {
      title: "الإنجازات وقصص النجاح",
      subtitle: "معالم في مسيرتي المهنية",
      viewDetails: "عرض التفاصيل",
      testimonials: "الشهادات",
      metrics: "مقاييس التأثير"
    },
    literature: {
      title: "كتابات واقتباسات",
      subtitle: "كتاباتي الشخصية واقتباساتي المفضلة",
      readMore: "اقرأ المزيد",
      categories: "التصنيفات",
      tags: "العلامات"
    },
    about: {
      title: "عني",
      subtitle: "تعرف علي أكثر",
      story: "قصتي",
      passion: "شغفي",
      vision: "رؤيتي",
      quotes: "اقتباسات ملهمة"
    },
    press: {
      title: "الإعلام",
      subtitle: "الظهور الإعلامي والتغطية",
      interviews: "المقابلات",
      articles: "المقالات",
      videos: "الفيديوهات",
      audio: "الصوتيات"
    },
    resources: {
      title: "الملفات",
      subtitle: "ملفات وموارد قابلة للتحميل",
      cvDownload: "تحميل السيرة الذاتية",
      categories: "التصنيفات",
      download: "تحميل",
      fileDetails: "تفاصيل الملف"
    },
    footer: {
      rights: "جميع الحقوق محفوظة",
      madeWith: "صنع بشغف"
    },
    common: {
      loading: "جاري التحميل...",
      error: "حدث خطأ ما",
      search: "بحث",
      filter: "تصفية",
      sort: "ترتيب",
      submit: "إرسال",
      cancel: "إلغاء",
      save: "حفظ",
      delete: "حذف",
      edit: "تعديل",
      add: "إضافة"
    },
    contact: {
      title: "اتصل بي",
      subtitle: "دعنا نتواصل",
      form: {
        name: "الاسم",
        email: "البريد الإلكتروني",
        subject: "الموضوع",
        message: "الرسالة",
        submit: "إرسال الرسالة"
      },
      social: "تواصل عبر وسائل التواصل الاجتماعي",
      direct: "طرق الاتصال المباشر",
      meeting: "حجز موعد"
    }
  }
};

const SettingsContext = createContext<SettingsContextType>({
  language: 'en',
  setLanguage: () => {},
  theme: 'light',
  setTheme: () => {},
  translations: defaultTranslations.en,
});

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('light');
  const [translations, setTranslations] = useState(defaultTranslations.en);

  // Set the language
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setTranslations(defaultTranslations[lang]);
    document.documentElement.lang = lang;
    document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  };

  // Set the theme
  const handleThemeChange = (theme: Theme) => {
    setTheme(theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Initialize settings from local storage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language || 'en';
    const savedTheme = localStorage.getItem('theme') as Theme || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    handleLanguageChange(savedLanguage);
    handleThemeChange(savedTheme);
  }, []);

  // Save settings to local storage when they change
  useEffect(() => {
    localStorage.setItem('language', language);
    localStorage.setItem('theme', theme);
  }, [language, theme]);

  return (
    <SettingsContext.Provider 
      value={{ 
        language, 
        setLanguage: handleLanguageChange, 
        theme, 
        setTheme: handleThemeChange, 
        translations 
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
