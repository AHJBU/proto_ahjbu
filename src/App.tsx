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
import { checkSetupStatus } from "./config/setup.config";

// Public Pages - Lazy Loaded
const Index = React.lazy(() => import("./pages/Index"));
const CV = React.lazy(() => import("./pages/CV"));
const Portfolio = React.lazy(() => import("./pages/Portfolio"));
const PortfolioDetails = React.lazy(() => import("./pages/PortfolioDetails"));
const Contact = React.lazy(() => import("./pages/Contact"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Applications = React.lazy(() => import("./pages/Applications"));
const ApplicationDetails = React.lazy(() => import("./pages/ApplicationDetails"));
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
  console.log("Rendering LoadingFallback");
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '1.5rem' }}>
      Loading page...
    </div>
  );
};

const App: React.FC = () => {
  console.log("App component rendering");
  const [isSetupComplete, setIsSetupComplete] = useState<boolean | null>(null);
  const [isLoadingSetupStatus, setIsLoadingSetupStatus] = useState(true);

  useEffect(() => {
    console.log("App useEffect for fetchSetupStatus triggered");
    const fetchSetupStatus = async () => {
      console.log("fetchSetupStatus called");
      try {
        const status = await checkSetupStatus();
        console.log("checkSetupStatus returned:", status);
        setIsSetupComplete(status);
      } catch (error) {
        console.error("Error checking setup status:", error);
        setIsSetupComplete(false); // Assume setup is needed if status check fails
      } finally {
        console.log("fetchSetupStatus finished");
        setIsLoadingSetupStatus(false);
      }
    };
    fetchSetupStatus();
  }, []);

  if (isLoadingSetupStatus) {
    console.log("App rendering LoadingFallback due to isLoadingSetupStatus");
    return <LoadingFallback />;
  }
  console.log("isLoadingSetupStatus is false. isSetupComplete:", isSetupComplete);

  return (
    <QueryClientProvider client={queryClient}>
      {console.log("Rendering QueryClientProvider")}
      <SettingsProvider>
        {console.log("Rendering SettingsProvider")}
        <TooltipProvider>
          {console.log("Rendering TooltipProvider")}
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {console.log("Rendering BrowserRouter")}
            <Suspense fallback={<LoadingFallback />}>
              {console.log("Rendering Suspense. isSetupComplete:", isSetupComplete)}
              {isSetupComplete === false ? (
                <>
                  {console.log("Setup is NOT complete, rendering SetupWizard routes")}
                  <Routes>
                    <Route path="/*" element={<SetupWizard />} />
                  </Routes>
                </>
              ) : (
                <>
                  {console.log("Setup IS complete, rendering main app routes with AuthProvider")}
                  <AuthProvider>
                    {console.log("Rendering AuthProvider")}
                    <SiteSettingsProvider>
                      {console.log("Rendering SiteSettingsProvider")}
                      <ProfileProvider>
                        {console.log("Rendering ProfileProvider")}
                        <Routes>
                          {console.log("Rendering main Routes")}
                          {/* Public Routes */}
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

                          {/* Admin Auth Routes */}
                          <Route path="/admin/login" element={<AdminLogin />} />
                          <Route path="/admin/two-factor" element={<AdminTwoFactor />} />

                          {/* Protected Admin Routes */}
                          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
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
                        {console.log("Finished rendering main Routes")}
                      </ProfileProvider>
                      {console.log("Finished rendering ProfileProvider")}
                    </SiteSettingsProvider>
                    {console.log("Finished rendering SiteSettingsProvider")}
                  </AuthProvider>
                  {console.log("Finished rendering AuthProvider")}
                </>
              )}
            </Suspense>
            {console.log("Finished rendering Suspense")}
          </BrowserRouter>
          {console.log("Finished rendering BrowserRouter")}
        </TooltipProvider>
        {console.log("Finished rendering TooltipProvider")}
      </SettingsProvider>
      {console.log("Finished rendering SettingsProvider")}
    </QueryClientProvider>
  );
};

export default App;

