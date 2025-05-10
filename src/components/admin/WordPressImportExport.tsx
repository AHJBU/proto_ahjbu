
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Upload, RotateCw, AlertTriangle, Check } from 'lucide-react';
import ScrollReveal from '@/components/ui/scroll-reveal';

const WordPressImportExport: React.FC = () => {
  const [wpUrl, setWpUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [importStatus, setImportStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [exportStatus, setExportStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [syncSettings, setSyncSettings] = useState({
    importImages: true,
    importComments: true,
    preserveFormatting: true,
    syncCategories: true,
    syncTags: true
  });
  
  // Mock WordPress posts (in a real app, these would come from the API)
  const wordpressPosts = [
    {
      id: 1,
      title: 'How to Build a React Application',
      date: '2025-04-10',
      status: 'publish',
      imported: false
    },
    {
      id: 2,
      title: 'Introduction to Tailwind CSS',
      date: '2025-04-08',
      status: 'publish',
      imported: true
    },
    {
      id: 3,
      title: 'Setting Up a WordPress API',
      date: '2025-04-05',
      status: 'publish',
      imported: false
    },
    {
      id: 4,
      title: 'Advanced WordPress Development',
      date: '2025-04-01',
      status: 'draft',
      imported: false
    }
  ];
  
  // Mock local posts that could be exported
  const localPosts = [
    {
      id: 101,
      title: 'The Future of Web Development',
      date: '2025-04-15',
      status: 'published',
      exported: false
    },
    {
      id: 102,
      title: 'Mastering Mobile UX Design',
      date: '2025-04-02',
      status: 'published',
      exported: true
    }
  ];
  
  const handleConnectWordPress = () => {
    if (!wpUrl || !apiKey) {
      toast({
        title: "Validation Error",
        description: "Please enter WordPress URL and API key",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you would validate the connection here
    toast({
      title: "WordPress Connected",
      description: "Successfully connected to WordPress site.",
    });
  };
  
  const handleImport = () => {
    setImportStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setImportStatus('success');
      toast({
        title: "Import Complete",
        description: "Successfully imported WordPress posts.",
      });
    }, 2000);
  };
  
  const handleExport = () => {
    setExportStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setExportStatus('success');
      toast({
        title: "Export Complete",
        description: "Successfully exported posts to WordPress.",
      });
    }, 2000);
  };
  
  const handleToggleSetting = (key: keyof typeof syncSettings) => {
    setSyncSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="import">
        <TabsList className="mb-4">
          <TabsTrigger value="import">Import from WordPress</TabsTrigger>
          <TabsTrigger value="export">Export to WordPress</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="import">
          <ScrollReveal>
            <Card>
              <CardHeader>
                <CardTitle>WordPress Connection</CardTitle>
                <CardDescription>
                  Connect to your WordPress site to import posts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="wpUrl">WordPress Site URL</Label>
                      <Input
                        id="wpUrl"
                        placeholder="https://example.com"
                        value={wpUrl}
                        onChange={(e) => setWpUrl(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="apiKey">API Key</Label>
                      <Input
                        id="apiKey"
                        type="password"
                        placeholder="Enter API key"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={handleConnectWordPress}
                    className="w-full sm:w-auto"
                  >
                    Connect to WordPress
                  </Button>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Available WordPress Posts</CardTitle>
                <CardDescription>
                  Select posts to import from your WordPress site
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox id="select-all" />
                      </TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Imported</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {wordpressPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell>
                          <Checkbox id={`select-${post.id}`} disabled={post.imported} />
                        </TableCell>
                        <TableCell>{post.title}</TableCell>
                        <TableCell>{new Date(post.date).toLocaleDateString()}</TableCell>
                        <TableCell>{post.status}</TableCell>
                        <TableCell>
                          {post.imported ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            "—"
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    toast({
                      title: "Refreshing...",
                      description: "Fetching latest posts from WordPress.",
                    });
                  }}
                >
                  <RotateCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
                <Button 
                  onClick={handleImport}
                  disabled={importStatus === 'loading'}
                >
                  {importStatus === 'loading' ? (
                    <>
                      <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                      Importing...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Import Selected
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            {importStatus === 'success' && (
              <Alert className="mt-6 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-900">
                <Check className="h-4 w-4" />
                <AlertTitle>Import Successful</AlertTitle>
                <AlertDescription>
                  Selected posts have been imported successfully.
                </AlertDescription>
              </Alert>
            )}
            
            {importStatus === 'error' && (
              <Alert className="mt-6" variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Import Failed</AlertTitle>
                <AlertDescription>
                  There was an error importing the selected posts. Please try again.
                </AlertDescription>
              </Alert>
            )}
          </ScrollReveal>
        </TabsContent>
        
        <TabsContent value="export">
          <ScrollReveal>
            <Card>
              <CardHeader>
                <CardTitle>Export Posts to WordPress</CardTitle>
                <CardDescription>
                  Select local posts to export to your WordPress site
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox id="select-all-export" />
                      </TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Exported</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {localPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell>
                          <Checkbox id={`select-export-${post.id}`} disabled={post.exported} />
                        </TableCell>
                        <TableCell>{post.title}</TableCell>
                        <TableCell>{new Date(post.date).toLocaleDateString()}</TableCell>
                        <TableCell>{post.status}</TableCell>
                        <TableCell>
                          {post.exported ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            "—"
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  onClick={handleExport}
                  disabled={exportStatus === 'loading'}
                >
                  {exportStatus === 'loading' ? (
                    <>
                      <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Export Selected
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            {exportStatus === 'success' && (
              <Alert className="mt-6 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-900">
                <Check className="h-4 w-4" />
                <AlertTitle>Export Successful</AlertTitle>
                <AlertDescription>
                  Selected posts have been exported to WordPress successfully.
                </AlertDescription>
              </Alert>
            )}
            
            {exportStatus === 'error' && (
              <Alert className="mt-6" variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Export Failed</AlertTitle>
                <AlertDescription>
                  There was an error exporting the selected posts. Please try again.
                </AlertDescription>
              </Alert>
            )}
          </ScrollReveal>
        </TabsContent>
        
        <TabsContent value="settings">
          <ScrollReveal>
            <Card>
              <CardHeader>
                <CardTitle>Synchronization Settings</CardTitle>
                <CardDescription>
                  Configure how posts are imported and exported
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Import Images</h4>
                      <p className="text-sm text-muted-foreground">
                        Download and import images from WordPress posts
                      </p>
                    </div>
                    <Switch 
                      checked={syncSettings.importImages}
                      onCheckedChange={() => handleToggleSetting('importImages')}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Import Comments</h4>
                      <p className="text-sm text-muted-foreground">
                        Import comments along with posts
                      </p>
                    </div>
                    <Switch 
                      checked={syncSettings.importComments}
                      onCheckedChange={() => handleToggleSetting('importComments')}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Preserve Formatting</h4>
                      <p className="text-sm text-muted-foreground">
                        Keep original HTML formatting from WordPress
                      </p>
                    </div>
                    <Switch 
                      checked={syncSettings.preserveFormatting}
                      onCheckedChange={() => handleToggleSetting('preserveFormatting')}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Sync Categories</h4>
                      <p className="text-sm text-muted-foreground">
                        Map WordPress categories to local categories
                      </p>
                    </div>
                    <Switch 
                      checked={syncSettings.syncCategories}
                      onCheckedChange={() => handleToggleSetting('syncCategories')}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Sync Tags</h4>
                      <p className="text-sm text-muted-foreground">
                        Import and use WordPress tags
                      </p>
                    </div>
                    <Switch 
                      checked={syncSettings.syncTags}
                      onCheckedChange={() => handleToggleSetting('syncTags')}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="postStatus">Default Status for Imported Posts</Label>
                  <Select defaultValue="draft">
                    <SelectTrigger id="postStatus" className="mt-1">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={() => {
                  toast({
                    title: "Settings Saved",
                    description: "Your WordPress sync settings have been updated.",
                  });
                }}>
                  Save Settings
                </Button>
              </CardFooter>
            </Card>
          </ScrollReveal>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WordPressImportExport;
