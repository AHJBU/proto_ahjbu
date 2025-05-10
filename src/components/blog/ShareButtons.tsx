
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Copy, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Share2 
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { copyToClipboard, shareOnTwitter, shareOnFacebook, shareOnLinkedIn, shareOnWhatsApp } from '@/utils/blogUtils';

interface ShareButtonsProps {
  title: string;
  url: string;
  showLabel?: boolean;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url, showLabel = false }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopyLink = async () => {
    const success = await copyToClipboard(url);
    
    if (success) {
      setCopied(true);
      toast({
        title: "Link copied",
        description: "The article link has been copied to your clipboard.",
      });
      
      setTimeout(() => setCopied(false), 3000);
    } else {
      toast({
        title: "Copy failed",
        description: "Unable to copy the link. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          url,
        });
      } else {
        handleCopyLink();
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        {navigator.share && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleShare}
                aria-label="Share"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share</p>
            </TooltipContent>
          </Tooltip>
        )}

        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size={showLabel ? "default" : "icon"}
              onClick={handleCopyLink}
              aria-label="Copy link"
            >
              <Copy className="h-4 w-4" />
              {showLabel && <span className="ml-2">Copy Link</span>}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Copy link</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => shareOnTwitter(url, title)}
              aria-label="Share on Twitter"
            >
              <Twitter className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share on Twitter</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => shareOnFacebook(url)}
              aria-label="Share on Facebook"
            >
              <Facebook className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share on Facebook</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => shareOnLinkedIn(url, title)}
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share on LinkedIn</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ShareButtons;
