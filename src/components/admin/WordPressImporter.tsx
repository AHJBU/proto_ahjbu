
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Loader2, Link as LinkIcon, Import } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import ScrollReveal from '@/components/ui/scroll-reveal';

const WordPressImporter: React.FC = () => {
  const [wpUrl, setWpUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [syncEnabled, setSyncEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [postUrl, setPostUrl] = useState('');
  const [importingPost, setImportingPost] = useState(false);
  
  const handleConnect = () => {
    if (!wpUrl) {
      toast({
        title: "Error",
        description: "Please enter your WordPress site URL",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API connection
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Success",
        description: "Successfully connected to WordPress site"
      });
    }, 1500);
  };
  
  const handleImportPost = () => {
    if (!postUrl) {
      toast({
        title: "Error",
        description: "Please enter a WordPress post URL",
        variant: "destructive"
      });
      return;
    }
    
    setImportingPost(true);
    
    // Simulate post import
    setTimeout(() => {
      setImportingPost(false);
      setPostUrl('');
      toast({
        title: "Post imported",
        description: "WordPress post has been successfully imported"
      });
    }, 2000);
  };

  return (
    <ScrollReveal>
      <Card>
        <CardHeader>
          <CardTitle>WordPress Integration</CardTitle>
          <CardDescription>
            Connect to your WordPress site to import blog posts or set up automatic synchronization.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">WordPress Connection</h3>
            <div className="space-y-2">
              <Label htmlFor="wp-url">WordPress Site URL</Label>
              <Input 
                id="wp-url" 
                placeholder="https://yoursite.com" 
                value={wpUrl}
                onChange={(e) => setWpUrl(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key (Optional)</Label>
              <Input 
                id="api-key" 
                placeholder="Enter API key for authentication" 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center">
              <Button 
                onClick={handleConnect} 
                disabled={isLoading || !wpUrl}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Connecting..." : "Connect to WordPress"}
              </Button>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="sync-enabled" 
                  checked={syncEnabled}
                  onCheckedChange={setSyncEnabled}
                />
                <Label htmlFor="sync-enabled">Enable Auto-Sync</Label>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Import Single Post</h3>
            <p className="text-sm text-muted-foreground">
              Import a single post from WordPress by entering its URL below.
            </p>
            <div className="flex space-x-2">
              <div className="flex-1">
                <Input 
                  placeholder="https://yoursite.com/your-post"
                  value={postUrl}
                  onChange={(e) => setPostUrl(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleImportPost}
                disabled={importingPost || !postUrl}
              >
                {importingPost && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {importingPost ? "Importing..." : "Import"}
              </Button>
            </div>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-md">
            <div className="flex items-start space-x-3">
              <LinkIcon className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">WordPress REST API Integration</h4>
                <p className="text-sm text-muted-foreground">
                  This feature uses the WordPress REST API to fetch content. Make sure your WordPress site has REST API enabled and properly configured.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </ScrollReveal>
  );
};

export default WordPressImporter;
