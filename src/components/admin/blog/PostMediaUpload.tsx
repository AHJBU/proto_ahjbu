
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Image, FileVideo } from 'lucide-react';
import EnhancedFileUpload from '@/components/admin/EnhancedFileUpload';

interface PostMediaUploadProps {
  featuredImage: string;
  videoBackground: string;
  isVideoBackground: boolean;
  onImageUpload: (url: string) => void;
  onVideoUpload: (url: string) => void;
  onRemoveMedia: () => void;
}

export const PostMediaUpload: React.FC<PostMediaUploadProps> = ({
  featuredImage,
  videoBackground,
  isVideoBackground,
  onImageUpload,
  onVideoUpload,
  onRemoveMedia
}) => {
  return (
    <Tabs defaultValue="image">
      <TabsList className="w-full mb-4">
        <TabsTrigger value="image" className="flex-1">
          <Image className="h-4 w-4 mr-2" />
          Image
        </TabsTrigger>
        <TabsTrigger value="video" className="flex-1">
          <FileVideo className="h-4 w-4 mr-2" />
          Video
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="image">
        {featuredImage ? (
          <div className="space-y-2">
            <img
              src={featuredImage}
              alt="Featured"
              className="rounded-md border w-full object-cover h-40"
            />
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                size="sm"
                onClick={onRemoveMedia}
              >
                Remove
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onImageUpload(featuredImage)}
              >
                Change
              </Button>
            </div>
          </div>
        ) : (
          <EnhancedFileUpload
            endpoint="/api/uploads/blog"
            onSuccess={onImageUpload}
            accept="image/*"
            maxSize={5}
            label="Upload Featured Image"
            category="blog"
          />
        )}
      </TabsContent>
      
      <TabsContent value="video">
        {videoBackground ? (
          <div className="space-y-2">
            <div className="border rounded-md p-4 text-center">
              <FileVideo className="h-10 w-10 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">Video Background Selected</p>
              <p className="text-xs text-muted-foreground">{videoBackground}</p>
            </div>
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                size="sm"
                onClick={onRemoveMedia}
              >
                Remove
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onVideoUpload(videoBackground)}
              >
                Change
              </Button>
            </div>
          </div>
        ) : (
          <EnhancedFileUpload
            endpoint="/api/uploads/blog-video"
            onSuccess={onVideoUpload}
            accept="video/*,.gif"
            maxSize={20}
            label="Upload Video or GIF"
            category="blog"
          />
        )}
        
        <p className="text-xs text-muted-foreground mt-2">
          Upload a video or GIF to use as the background for this post.
          Supported formats: MP4, WebM, GIF.
        </p>
      </TabsContent>
    </Tabs>
  );
};
