
import React from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '@/contexts/SettingsContext';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const Header: React.FC = () => {
  const { language, setLanguage, theme, setTheme, translations } = useSettings();
  const t = translations.nav;

  const mainRoutes = [
    { name: t.home, path: '/' },
    { name: t.cv, path: '/cv' },
    { name: t.portfolio, path: '/portfolio' },
    { name: t.apps, path: '/applications' },
    { name: t.training, path: '/training' },
    { name: t.blog, path: '/blog' },
  ];

  const moreRoutes = [
    { name: t.about, path: '/about' },
    { name: t.achievements, path: '/achievements' },
    { name: t.literature, path: '/literature' },
    { name: t.press, path: '/press' },
    { name: t.resources, path: '/resources' },
    { name: t.contact, path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link 
            to="/" 
            className={`text-2xl font-bold text-gradient ${language === 'ar' ? 'font-arabic' : ''}`}
          >
            {language === 'ar' ? 'أحمد جمال' : 'Ahmed Jamal'}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {mainRoutes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {route.name}
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  {language === 'ar' ? 'المزيد' : 'More'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {moreRoutes.map((route) => (
                  <DropdownMenuItem key={route.path} asChild>
                    <Link to={route.path}>{route.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="font-medium"
          >
            {language === 'en' ? 'العربية' : 'English'}
          </Button>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side={language === 'ar' ? 'right' : 'left'}>
              <nav className="flex flex-col gap-4 mt-8">
                {[...mainRoutes, ...moreRoutes].map((route) => (
                  <Link
                    key={route.path}
                    to={route.path}
                    className="text-lg font-medium py-2 hover:text-primary transition-colors"
                  >
                    {route.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
