import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Upload, X } from 'lucide-react';
import { getAboutData, updateAboutData, AboutData } from '@/services/contentService'; // Import service
import { useToast } from "@/components/ui/use-toast";

const AdminAbout: React.FC = () => {
  const { toast } = useToast();
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // States for individual fields to manage edits
  const [introEn, setIntroEn] = useState('');
  const [introAr, setIntroAr] = useState('');
  const [storyEn, setStoryEn] = useState('');
  const [storyAr, setStoryAr] = useState('');
  const [visionEn, setVisionEn] = useState('');
  const [visionAr, setVisionAr] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  // Add states for quotes and video if they are part of AboutData or separate

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getAboutData();
        setAboutData(data);
        // Initialize editable fields
        if (data) {
          // For simplicity, assuming 'content' in AboutData is a structured object or needs parsing
          // Based on the original defaultValue, it seems 'content' might be a single block
          // Let's assume 'content' is a string for now, and 'title' is also part of it or managed elsewhere
          // The provided AboutData interface has title, content, imageUrl.
          // The original form had intro, story, vision. We need to map these.
          // For this example, let's assume AboutData.content is a JSON string with these fields
          // Or, more realistically, AboutData should be extended.
          // For now, I'll map them to separate fields if they were part of a single 'content' JSON
          // If they are separate fields in a more complex AboutData, this would be direct.
          // Let's simplify and assume `content` is a string for the main intro for now
          // and `title` is the main title. The form has more granular fields.
          // This implies `AboutData` needs to be richer or we manage these fields separately.

          // Let's assume AboutData is structured like this for the example to work with the form:
          // interface AboutData {
          //   title: string; // Overall page title, e.g., "About Ahmed Jamal"
          //   introduction: { en: string, ar: string };
          //   story: { en: string, ar: string };
          //   vision: { en: string, ar: string };
          //   imageUrl: string; // Main image for about page
          //   quotes: Array<{textEn: string, textAr: string, author: string}>;
          //   videoUrl: string;
          // }
          // For now, I'll use placeholder logic for setting form fields from a simplified AboutData
          setIntroEn(data.content || 'Default intro EN'); // Placeholder mapping
          setIntroAr('Default intro AR'); // Placeholder mapping
          setStoryEn('Default story EN'); // Placeholder mapping
          setStoryAr('Default story AR'); // Placeholder mapping
          setVisionEn('Default vision EN'); // Placeholder mapping
          setVisionAr('Default vision AR'); // Placeholder mapping
          setImageUrl(data.imageUrl || '/placeholder.svg');
        }
      } catch (err) {
        setError('Failed to load about data.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSaveChanges = async () => {
    // Construct the AboutData object from the form states
    // This needs to match the actual structure expected by updateAboutData
    // For this example, I'll use a simplified structure based on the form fields
    // This part needs careful mapping based on the final AboutData structure
    const updatedData: AboutData = {
      // title: aboutData?.title || "About Me", // Assuming title is managed or static for this form part
      title: "About Me Updated", // Example title
      content: JSON.stringify({ // Storing structured content as JSON string for simplicity here
        introduction: { en: introEn, ar: introAr },
        story: { en: storyEn, ar: storyAr },
        vision: { en: visionEn, ar: visionAr },
      }),
      imageUrl: imageUrl,
      // quotes and videoUrl would be handled similarly if part of this save operation
    };

    try {
      setIsLoading(true);
      const success = await updateAboutData(updatedData);
      if (success) {
        setAboutData(updatedData); // Update local state with saved data
        toast({ title: "Success", description: "About page content updated successfully." });
      } else {
        setError('Failed to save about data.');
        toast({ variant: "destructive", title: "Error", description: "Failed to save about data." });
      }
    } catch (err) {
      setError('An error occurred while saving.');
      toast({ variant: "destructive", title: "Error", description: "An error occurred while saving." });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !aboutData) return <AdminLayout title="About Me"><p>Loading content...</p></AdminLayout>;
  if (error) return <AdminLayout title="About Me"><p>Error: {error}</p></AdminLayout>;

  return (
    <AdminLayout title="About Me">
      <Tabs defaultValue="content">
        <TabsList className="mb-6">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="quotes">Quotes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Introduction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="intro-en">Introduction (English)</Label>
                <Textarea 
                  id="intro-en"
                  placeholder="Enter your introduction in English"
                  className="min-h-[100px]"
                  value={introEn} // Controlled component
                  onChange={(e) => setIntroEn(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="intro-ar">Introduction (Arabic)</Label>
                <Textarea 
                  id="intro-ar"
                  placeholder="Enter your introduction in Arabic"
                  className="min-h-[100px]"
                  value={introAr} // Controlled component
                  onChange={(e) => setIntroAr(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>My Story</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="story-en">My Story (English)</Label>
                <Textarea 
                  id="story-en"
                  placeholder="Enter your story in English"
                  className="min-h-[200px]"
                  value={storyEn} // Controlled component
                  onChange={(e) => setStoryEn(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="story-ar">My Story (Arabic)</Label>
                <Textarea 
                  id="story-ar"
                  placeholder="Enter your story in Arabic"
                  className="min-h-[200px]"
                  value={storyAr} // Controlled component
                  onChange={(e) => setStoryAr(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>My Vision</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="vision-en">Vision (English)</Label>
                <Textarea 
                  id="vision-en"
                  placeholder="Enter your vision in English"
                  className="min-h-[100px]"
                  value={visionEn} // Controlled component
                  onChange={(e) => setVisionEn(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vision-ar">Vision (Arabic)</Label>
                <Textarea 
                  id="vision-ar"
                  placeholder="Enter your vision in Arabic"
                  className="min-h-[100px]"
                  value={visionAr} // Controlled component
                  onChange={(e) => setVisionAr(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button onClick={handleSaveChanges} disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="media" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Main Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="main-image-url">Main Image URL</Label>
                    <Input 
                        id="main-image-url"
                        placeholder="Enter URL for the main image"
                        value={imageUrl} // Controlled component
                        onChange={(e) => setImageUrl(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                {imageUrl && <img src={imageUrl} alt="Main visual" className="mt-2 rounded-md max-h-60" />}
                 <div className="border-2 border-dashed rounded-lg p-8 text-center mt-4">
                    <div className="mx-auto flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium">Upload Image</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Ideally, integrate a file upload component here.
                    </p>
                    <Button disabled>Upload Image (Not Implemented)</Button>
                    </div>
                </div>
            </CardContent>
          </Card>
          {/* Photo Gallery and Video Introduction sections would be implemented similarly, 
              likely with their own state management and service calls if they are complex entities.
              For simplicity, they are left as placeholders here. 
          */}
        </TabsContent>
        
        <TabsContent value="quotes" className="space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Inspiring Quotes</CardTitle>
                <Button size="sm" disabled> 
                    <Plus className="h-4 w-4 mr-2" />
                    Add Quote (Not Implemented)
                </Button>
                </CardHeader>
                <CardContent>
                <p className="text-muted-foreground">Quote management will be implemented here, connecting to the contentService.</p>
                {/* Placeholder for quote items */}
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminAbout;

