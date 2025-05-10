
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Home,
  FileText,
  Image,
  User,
  MessageSquare,
  Book,
  BookOpen,
  Calendar,
  Settings,
  LogOut,
  Search,
  Save,
  Database
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import SearchDialog from '@/components/search/SearchDialog';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const { user, logout } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  // Sidebar links
  const sidebarLinks = [
    { name: 'Dashboard', icon: Home, path: '/admin' },
    { name: 'Profile', icon: User, path: '/admin/profile' },
    { name: 'Resume/CV', icon: FileText, path: '/admin/cv' },
    { name: 'Portfolio', icon: Image, path: '/admin/portfolio' },
    { name: 'Applications', icon: FileText, path: '/admin/applications' },
    { name: 'Training', icon: Calendar, path: '/admin/training' },
    { name: 'Blog', icon: BookOpen, path: '/admin/blog' },
    { name: 'Achievements', icon: Book, path: '/admin/achievements' },
    { name: 'Messages', icon: MessageSquare, path: '/admin/messages' },
    { name: 'Backup', icon: Database, path: '/admin/backup' },
    { name: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Top Navigation */}
      <div className="bg-background border-b sticky top-0 z-10">
        <div className="container py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gradient">Admin Dashboard</h1>
            <Button 
              variant="outline" 
              size="sm"
              className="hidden md:flex"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-4 w-4 mr-2" />
              Search...
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            {user && (
              <div className="hidden md:block text-sm mr-4">
                <span className="text-muted-foreground">Signed in as </span>
                <span className="font-medium">{user.name}</span>
              </div>
            )}
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSearchOpen(true)}
              className="md:hidden"
            >
              <Search className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <div className="bg-background rounded-lg border shadow-sm p-4 sticky top-24">
              <nav className="space-y-2">
                {sidebarLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="flex items-center py-2 px-3 text-sm rounded-md hover:bg-secondary hover:text-primary transition-colors"
                  >
                    <link.icon className="h-4 w-4 mr-2" />
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-12 md:col-span-9 lg:col-span-10">
            <div className="bg-background rounded-lg border shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6">{title}</h2>
              {children}
            </div>
          </div>
        </div>
      </div>
      
      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
};

export default AdminLayout;
