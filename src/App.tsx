import React, { Suspense, useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { SiteSettingsProvider } from "@/contexts/SiteSettingsContext";
import { ProfileProvider } from "@/contexts/ProfileContext";

// Import Setup Wizard and config check
const SetupWizard = React.lazy(() => import("./components/setup_wizard/SetupWizard"));
// import { checkSetupStatus } from "./config/setup.config";
// NOTE: Removed due to browser compatibility. Use a static value for now.

// Public Pages - Lazy Loaded
const Index = React.lazy(() => import("./pages/Index"));
const CV = React.lazy(() => import("./pages/CV"));
const Portfolio = React.lazy(() => import("./pages/Portfolio"));
const PortfolioDetails = React.lazy(() => import("./pages/PortfolioDetails"));
const Contact = React.lazy(() => import("./pages/Contact"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Applications = React.lazy(() => import("./pages/Applications"));
const ApplicationDetails = React.lazy(() => import("./pages/ApplicationDetails"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Training = React.lazy(() => import("./pages/Training"));
const TrainingDetails = React.lazy(() => import("./pages/TrainingDetails"));
const Blog = React.lazy(() => import("./pages/Blog"));
const BlogPost = React.lazy(() => import("./pages/BlogPost"));
const Achievements = React.lazy(() => import("./pages/Achievements"));
const AchievementDetails = React.lazy(() => import("./pages/AchievementDetails"));
const Literature = React.lazy(() => import("./pages/Literature"));
const LiteratureItem = React.lazy(() => import("./pages/LiteratureItem"));
const About = React.lazy(() => import("./pages/About"));
const Press = React.lazy(() => import("./pages/Press"));
const PressDetails = React.lazy(() => import("./pages/PressDetails"));
const Resources = React.lazy(() => import("./pages/Resources"));

// Admin Pages - Lazy Loaded
const AdminLogin = React.lazy(() => import("./pages/admin/AdminLogin"));
const AdminTwoFactor = React.lazy(() => import("./pages/admin/AdminTwoFactor"));
const AdminDashboard = React.lazy(() => import("./pages/admin/AdminDashboard"));
const AdminProfile = React.lazy(() => import("./pages/admin/AdminProfile"));
const AdminPersonalProfile = React.lazy(() => import("./pages/admin/AdminPersonalProfile"));
const AdminApplications = React.lazy(() => import("./pages/admin/AdminApplications"));
const AdminTraining = React.lazy(() => import("./pages/admin/AdminTraining"));
const AdminBlog = React.lazy(() => import("./pages/admin/AdminBlog"));
const AdminAchievements = React.lazy(() => import("./pages/admin/AdminAchievements"));
const AdminLiterature = React.lazy(() => import("./pages/admin/AdminLiterature"));
const AdminAbout = React.lazy(() => import("./pages/admin/AdminAbout"));
const AdminPress = React.lazy(() => import("./pages/admin/AdminPress"));
const AdminResources = React.lazy(() => import("./pages/admin/AdminResources"));
const AdminBackup = React.lazy(() => import("./pages/admin/AdminBackup"));
const AdminSettings = React.lazy(() => import("./pages/admin/AdminSettings"));
const AdminCV = React.lazy(() => import("./pages/admin/AdminCV"));
const AdminPortfolio = React.lazy(() => import("./pages/admin/AdminPortfolio"));
const AdminMessages = React.lazy(() => import("./pages/admin/AdminMessages"));
const BlogPostEditor = React.lazy(() => import("./pages/admin/BlogPostEditor"));
const AdminBlogPostList = React.lazy(() => import("./pages/admin/AdminBlogPostList"));
const ProtectedRoute = React.lazy(() => import("./components/admin/ProtectedRoute"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
    },
  },
});

const LoadingFallback = () => {
  console.log('Rendering LoadingFallback');
  console.log("Rendering LoadingFallback");
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '1.5rem' }}>
      Loading page...
    </div>
  );
};

const App: React.FC = () => {
  console.log('Rendering App component');
  const [isSetupComplete, setIsSetupComplete] = useState<boolean | null>(false);
  const [isLoadingSetupStatus, setIsLoadingSetupStatus] = useState(true);

  console.log("App component rendering");
  console.log("isSetupComplete:", isSetupComplete);
  console.log("isLoadingSetupStatus:", isLoadingSetupStatus);

  useEffect(() => {
    console.log("App useEffect for fetchSetupStatus triggered");
    setIsSetupComplete(false);
    setIsLoadingSetupStatus(false);
  }, []);

  if (isLoadingSetupStatus) {
    console.log("App rendering LoadingFallback due to isLoadingSetupStatus");
    return <LoadingFallback />;
  }



  return (
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<LoadingFallback />}>
              <AuthProvider>
                <SiteSettingsProvider>
                  <ProfileProvider>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/cv" element={<CV />} />
                      <Route path="/portfolio" element={<Portfolio />} />
                      <Route path="/portfolio/:id" element={<PortfolioDetails />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/applications" element={<Applications />} />
                      <Route path="/applications/:id" element={<ApplicationDetails />} />
                      <Route path="/training" element={<Training />} />
                      <Route path="/training/:id" element={<TrainingDetails />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/blog/:id" element={<BlogPost />} />
                      <Route path="/achievements" element={<Achievements />} />
                      <Route path="/achievements/:id" element={<AchievementDetails />} />
                      <Route path="/literature" element={<Literature />} />
                      <Route path="/literature/:id" element={<LiteratureItem />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/press" element={<Press />} />
                      <Route path="/press/:id" element={<PressDetails />} />
                      <Route path="/resources" element={<Resources />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/applications" element={<Applications />} />
                      <Route path="/applications/:id" element={<ApplicationDetails />} />
                      <Route path="/training" element={<Training />} />
                      <Route path="/training/:id" element={<TrainingDetails />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/blog/:id" element={<BlogPost />} />
                      <Route path="/achievements" element={<Achievements />} />
                      <Route path="/achievements/:id" element={<AchievementDetails />} />
                      <Route path="/literature" element={<Literature />} />
                      <Route path="/literature/:id" element={<LiteratureItem />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/press" element={<Press />} />
                      <Route path="/press/:id" element={<PressDetails />} />
                      <Route path="/resources" element={<Resources />} />
                          <Route path="/blog/:id" element={<BlogPost />} />
                          <Route path="/achievements" element={<Achievements />} />
                          <Route path="/achievements/:id" element={<AchievementDetails />} />
                          <Route path="/literature" element={<Literature />} />
                          <Route path="/literature/:id" element={<LiteratureItem />} />
                          <Route path="/about" element={<About />} />
                          <Route path="/press" element={<Press />} />
                          <Route path="/press/:id" element={<PressDetails />} />
                          <Route path="/resources" element={<Resources />} />

                          {/* Admin Auth Routes */}
                          <Route path="/admin/login" element={<AdminLogin />} />
                          <Route path="/admin/two-factor" element={<AdminTwoFactor />} />

                          {/* Protected Admin Routes */}
                          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                          <Route path="/admin/personal-profile" element={<ProtectedRoute><AdminPersonalProfile /></ProtectedRoute>} />
                          <Route path="/admin/profile" element={<ProtectedRoute><AdminProfile /></ProtectedRoute>} />
                          <Route path="/admin/cv" element={<ProtectedRoute><AdminCV /></ProtectedRoute>} />
                          <Route path="/admin/portfolio" element={<ProtectedRoute><AdminPortfolio /></ProtectedRoute>} />
                          <Route path="/admin/applications" element={<ProtectedRoute><AdminApplications /></ProtectedRoute>} />
                          <Route path="/admin/training" element={<ProtectedRoute><AdminTraining /></ProtectedRoute>} />
                          
                          <Route path="/admin/blog" element={<ProtectedRoute><AdminBlog /></ProtectedRoute>} />
                          <Route path="/admin/blog/posts" element={<ProtectedRoute><AdminBlogPostList /></ProtectedRoute>} />
                          <Route path="/admin/blog/new" element={<ProtectedRoute><BlogPostEditor /></ProtectedRoute>} />
                          <Route path="/admin/blog/edit/:id" element={<ProtectedRoute><BlogPostEditor /></ProtectedRoute>} />
                          
                          <Route path="/admin/achievements" element={<ProtectedRoute><AdminAchievements /></ProtectedRoute>} />
                          <Route path="/admin/literature" element={<ProtectedRoute><AdminLiterature /></ProtectedRoute>} />
                          <Route path="/admin/about" element={<ProtectedRoute><AdminAbout /></ProtectedRoute>} />
                          <Route path="/admin/press" element={<ProtectedRoute><AdminPress /></ProtectedRoute>} />
                          <Route path="/admin/resources" element={<ProtectedRoute><AdminResources /></ProtectedRoute>} />
                          <Route path="/admin/messages" element={<ProtectedRoute><AdminMessages /></ProtectedRoute>} />
                          <Route path="/admin/backup" element={<ProtectedRoute><AdminBackup /></ProtectedRoute>} />
                          <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
                          
                          {/* 404 Route */}
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </ProfileProvider>
                    </SiteSettingsProvider>
                  </AuthProvider>
                </Suspense>
              </BrowserRouter>
            </TooltipProvider>
          </SettingsProvider>
        </QueryClientProvider>
      );
    };
    
    export default App;
