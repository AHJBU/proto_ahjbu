
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/contexts/SettingsContext";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();
  const { language } = useSettings();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="container flex flex-col items-center justify-center min-h-[70vh] py-12 text-center">
        <h1 className="text-9xl font-bold text-primary mb-6">404</h1>
        <p className="text-2xl mb-8">
          {language === 'ar' 
            ? 'عذراً، الصفحة التي تبحث عنها غير موجودة' 
            : 'Sorry, the page you are looking for does not exist'}
        </p>
        <Button asChild size="lg">
          <a href="/">
            {language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
          </a>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
