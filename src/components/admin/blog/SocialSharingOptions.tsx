
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

interface SocialPlatforms {
  facebook: boolean;
  twitter: boolean;
  linkedin: boolean;
  pinterest: boolean;
}

interface SocialSharingOptionsProps {
  socialShareEnabled: boolean;
  socialPlatforms: SocialPlatforms;
  onSocialShareChange: (checked: boolean) => void;
  onPlatformToggle: (platform: keyof SocialPlatforms) => void;
}

export const SocialSharingOptions: React.FC<SocialSharingOptionsProps> = ({
  socialShareEnabled,
  socialPlatforms,
  onSocialShareChange,
  onPlatformToggle
}) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label>Social Media Sharing</Label>
        <Switch
          checked={socialShareEnabled}
          onCheckedChange={onSocialShareChange}
        />
      </div>
      
      {socialShareEnabled && (
        <div className="pl-6 border-l space-y-2 mt-4">
          <p className="text-sm text-muted-foreground">
            Select platforms to share this post:
          </p>
          
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={socialPlatforms.facebook ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => onPlatformToggle('facebook')}
            >
              Facebook
            </Badge>
            <Badge
              variant={socialPlatforms.twitter ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => onPlatformToggle('twitter')}
            >
              Twitter
            </Badge>
            <Badge
              variant={socialPlatforms.linkedin ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => onPlatformToggle('linkedin')}
            >
              LinkedIn
            </Badge>
            <Badge
              variant={socialPlatforms.pinterest ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => onPlatformToggle('pinterest')}
            >
              Pinterest
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
};
