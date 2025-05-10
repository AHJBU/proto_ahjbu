
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';
import { useSettings } from '@/contexts/SettingsContext';
import { Search as SearchIcon, FileText, Image, Award, Book, Calendar, Users } from 'lucide-react';

export type SearchCategory = 'cv' | 'portfolio' | 'blog' | 'achievements' | 'training' | 'about';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: SearchCategory;
  url: string;
}

// Mock search index - in a real app, this would come from your backend
const mockSearchIndex: SearchResult[] = [
  { 
    id: '1', 
    title: 'Professional Resume', 
    description: 'Ahmed Jamal\'s professional CV with work experience and skills', 
    category: 'cv', 
    url: '/cv' 
  },
  { 
    id: '2', 
    title: 'Web Development Projects', 
    description: 'Collection of web development projects and applications', 
    category: 'portfolio', 
    url: '/portfolio' 
  },
  { 
    id: '3', 
    title: 'Modern UX Design Principles', 
    description: 'Blog post about modern UX design principles and best practices', 
    category: 'blog', 
    url: '/blog/modern-ux' 
  },
  { 
    id: '4', 
    title: 'Best Developer Award 2024', 
    description: 'Achievement for winning the Best Developer Award in 2024', 
    category: 'achievements', 
    url: '/achievements/best-developer-2024' 
  },
  { 
    id: '5', 
    title: 'React Advanced Workshop', 
    description: 'Training session on advanced React concepts and patterns', 
    category: 'training', 
    url: '/training' 
  },
  { 
    id: '6', 
    title: 'About Ahmed Jamal', 
    description: 'Biography and background information about Ahmed Jamal', 
    category: 'about', 
    url: '/about' 
  },
  // Add more mock results as needed
];

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog: React.FC<SearchDialogProps> = ({ open, onOpenChange }) => {
  const { language } = useSettings();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  
  // Filter results based on search query
  const filteredResults = query === '' 
    ? [] 
    : mockSearchIndex.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.description.toLowerCase().includes(query.toLowerCase())
      );
  
  // Group results by category
  const groupedResults = filteredResults.reduce<Record<string, SearchResult[]>>((groups, result) => {
    if (!groups[result.category]) {
      groups[result.category] = [];
    }
    groups[result.category].push(result);
    return groups;
  }, {});
  
  // Get category icon and label
  const getCategoryInfo = (category: SearchCategory) => {
    const categoryMap: Record<SearchCategory, { icon: React.ElementType; label: string; arLabel: string }> = {
      cv: { icon: FileText, label: 'Resume/CV', arLabel: 'السيرة الذاتية' },
      portfolio: { icon: Image, label: 'Portfolio', arLabel: 'معرض الأعمال' },
      blog: { icon: Book, label: 'Blog', arLabel: 'المدونة' },
      achievements: { icon: Award, label: 'Achievements', arLabel: 'الإنجازات' },
      training: { icon: Calendar, label: 'Training', arLabel: 'التدريب' },
      about: { icon: Users, label: 'About', arLabel: 'حول' },
    };
    
    return categoryMap[category];
  };
  
  const handleSelect = (result: SearchResult) => {
    navigate(result.url);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {language === 'ar' ? 'بحث' : 'Search'}
          </DialogTitle>
        </DialogHeader>
        
        <Command className="rounded-lg border shadow-md">
          <CommandInput 
            placeholder={language === 'ar' ? 'ابحث عن شيء...' : 'Search for something...'}
            value={query}
            onValueChange={setQuery}
            className="h-11"
          />
          
          <CommandList>
            <CommandEmpty>
              {language === 'ar' ? 'لا توجد نتائج' : 'No results found'}
            </CommandEmpty>
            
            {Object.entries(groupedResults).map(([category, results]) => (
              <CommandGroup 
                key={category} 
                heading={language === 'ar' 
                  ? getCategoryInfo(category as SearchCategory).arLabel
                  : getCategoryInfo(category as SearchCategory).label
                }
              >
                {results.map(result => {
                  const CategoryIcon = getCategoryInfo(result.category).icon;
                  
                  return (
                    <CommandItem
                      key={result.id}
                      onSelect={() => handleSelect(result)}
                      className="flex items-start py-2"
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                          <CategoryIcon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{result.title}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {result.description}
                          </p>
                        </div>
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
