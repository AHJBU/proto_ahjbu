
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: React.ReactNode;
}

interface AuthorProfileProps {
  name: string;
  bio: string;
  avatar?: string;
  socialLinks?: SocialLink[];
}

const AuthorProfile: React.FC<AuthorProfileProps> = ({ 
  name, 
  bio, 
  avatar,
  socialLinks = [] 
}) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="pt-6 p-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border">
            {avatar ? (
              <AvatarImage src={avatar} alt={name} />
            ) : (
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            )}
          </Avatar>
          
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{bio}</p>
            
            {socialLinks.length > 0 && (
              <div className="flex gap-2 mt-2">
                {socialLinks.map((link) => (
                  <Button 
                    key={link.id} 
                    variant="outline" 
                    size="sm"
                    className="h-8 w-8 p-0"
                    asChild
                  >
                    <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                      {link.icon}
                    </a>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthorProfile;
