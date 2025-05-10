
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Share2 } from 'lucide-react';

interface Author {
  id: number;
  name: string;
  email: string;
  avatar: string;
  socialLinks: {
    platform: string;
    url: string;
  }[];
}

interface AuthorSelectorProps {
  author: Author;
  authors: Author[];
  showAuthorSelect: boolean;
  setShowAuthorSelect: (show: boolean) => void;
  onSelectAuthor: (author: Author) => void;
}

export const AuthorSelector: React.FC<AuthorSelectorProps> = ({
  author,
  authors,
  showAuthorSelect,
  setShowAuthorSelect,
  onSelectAuthor
}) => {
  return (
    <>
      <div className="flex items-center justify-between p-2 border rounded-md">
        <div className="flex items-center">
          <img
            src={author.avatar}
            alt={author.name}
            className="h-8 w-8 rounded-full mr-2"
          />
          <div>
            <p className="text-sm font-medium">{author.name}</p>
            <p className="text-xs text-muted-foreground">{author.email}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={() => setShowAuthorSelect(true)}>
          Change
        </Button>
      </div>
      
      {/* Author Selection Dialog */}
      <Dialog open={showAuthorSelect} onOpenChange={setShowAuthorSelect}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Author</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {authors.map((author) => (
              <div
                key={author.id}
                className="flex items-center justify-between p-4 border rounded-md cursor-pointer hover:bg-secondary/20"
                onClick={() => onSelectAuthor(author)}
              >
                <div className="flex items-center">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="h-10 w-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium">{author.name}</p>
                    <p className="text-sm text-muted-foreground">{author.email}</p>
                  </div>
                </div>
                {author.socialLinks.length > 0 && (
                  <div className="flex gap-2">
                    {author.socialLinks.map((link, i) => (
                      <Button key={i} variant="ghost" size="icon" asChild>
                        <a href={link.url} target="_blank" rel="noreferrer">
                          <Share2 className="h-4 w-4" />
                        </a>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
