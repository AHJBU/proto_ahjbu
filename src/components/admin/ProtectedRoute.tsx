
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, needsTwoFactor } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    // Debug logging to help troubleshoot auth issues
    console.log("Protected Route Auth State:", { isAuthenticated, isLoading, needsTwoFactor, path: location.pathname });
  }, [isAuthenticated, isLoading, needsTwoFactor, location.pathname]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-lg">Loading authentication status...</p>
        </div>
      </div>
    );
  }
  
  // If 2FA is required, redirect to the 2FA page
  if (needsTwoFactor) {
    console.log("2FA required, redirecting to verification page");
    return <Navigate to="/admin/two-factor" state={{ from: location.pathname }} replace />;
  }
  
  if (!isAuthenticated) {
    // Redirect to login page but save the location they were trying to access
    console.log("Not authenticated, redirecting to login page");
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }
  
  console.log("User authenticated, rendering protected content");
  return <>{children}</>;
};

export default ProtectedRoute;
