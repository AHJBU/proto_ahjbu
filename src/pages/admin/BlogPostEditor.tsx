
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { format } from 'date-fns';

// Import our new components
import { PostContentForm } from '@/components/admin/blog/PostContentForm';
import { PostMetadataForm } from '@/components/admin/blog/PostMetadataForm';
import { PostMediaUpload } from '@/components/admin/blog/PostMediaUpload';
import { AuthorSelector } from '@/components/admin/blog/AuthorSelector';
import { SocialSharingOptions } from '@/components/admin/blog/SocialSharingOptions';
import { SeoForm } from '@/components/admin/blog/SeoForm';
import { PostEditorLayout } from '@/components/admin/blog/PostEditorLayout';

// Mock categories and authors (would come from API/context in real app)
const categories = [
  { id: 1, name: 'Web Development' },
  { id: 2, name: 'App Development' },
  { id: 3, name: 'Design' },
  { id: 4, name: 'Social Media' },
  { id: 5, name: 'SEO' },
  { id: 6, name: 'Digital Marketing' },
];

const authors = [
  { id: 1, name: 'Ahmed Jamal', email: 'ahmed@example.com', avatar: '/assets/avatar.jpg', socialLinks: [
    { platform: 'twitter', url: 'https://twitter.com/ahmedjamal' },
    { platform: 'linkedin', url: 'https://linkedin.com/in/ahmedjamal' },
  ]},
  { id: 2, name: 'Mohammed Hassan', email: 'mohammed@example.com', avatar: '/assets/avatar2.jpg', socialLinks: [] },
  { id: 3, name: 'Sara Ahmed', email: 'sara@example.com', avatar: '/assets/avatar3.jpg', socialLinks: [] },
];

const BlogPostEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [autoSaveInterval, setAutoSaveInterval] = useState<NodeJS.Timeout | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [showAuthorSelect, setShowAuthorSelect] = useState(false);
  
  // Post state
  const [post, setPost] = useState({
    id: '',
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: [] as string[],
    status: 'draft',
    author: authors[0],
    featuredImage: '',
    videoBackground: '',
    isVideoBackground: false,
    publishDate: null as Date | null,
    publishTime: '12:00',
    views: 0,
    allowComments: true,
    seoTitle: '',
    seoDescription: '',
    socialShareEnabled: true,
    socialPlatforms: {
      facebook: true,
      twitter: true,
      linkedin: false,
      pinterest: false,
    }
  });
  
  // Load post if we have an ID
  useEffect(() => {
    if (id) {
      // This would be an API call in a real application
      setIsLoading(true);
      setTimeout(() => {
        // Mock fetch post by ID
        const mockPost = {
          id: id,
          title: 'Sample Post Title',
          content: 'This is a sample post content. In a real application, this would be loaded from a database.',
          excerpt: 'Sample excerpt for the post.',
          category: 'Web Development',
          tags: ['React', 'JavaScript', 'Tutorial'],
          status: 'draft',
          author: authors[0],
          featuredImage: '/assets/blog1.jpg',
          videoBackground: '',
          isVideoBackground: false,
          publishDate: new Date(),
          publishTime: '14:30',
          views: 150,
          allowComments: true,
          seoTitle: 'Sample Post Title | Blog',
          seoDescription: 'Sample meta description for the post.',
          socialShareEnabled: true,
          socialPlatforms: {
            facebook: true,
            twitter: true,
            linkedin: true,
            pinterest: false,
          }
        };
        
        setPost(mockPost);
        setIsLoading(false);
      }, 500);
    }
  }, [id]);
  
  // Setup autosave
  useEffect(() => {
    // Setup autosave every 30 seconds
    const interval = setInterval(() => {
      handleAutosave();
    }, 30000);
    
    setAutoSaveInterval(interval);
    
    // Cleanup on unmount
    return () => {
      if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
      }
    };
  }, [post]);
  
  // Handle autosave
  const handleAutosave = () => {
    if (post.title.trim() === '') return; // Don't save empty posts
    
    // In a real app, this would save to server/database
    console.log('Auto-saving post:', post);
    setLastSavedAt(new Date());
    
    toast({
      title: "Auto-saved",
      description: `Draft saved at ${new Date().toLocaleTimeString()}`,
      duration: 3000,
    });
  };
  
  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPost(prev => ({
      ...prev,
      [name]: value,
      seoTitle: name === 'title' && prev.seoTitle === '' ? value : prev.seoTitle,
    }));
  };
  
  // Handle checkbox changes
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setPost(prev => ({
      ...prev,
      [name]: checked,
    }));
  };
  
  // Handle social platform toggle
  const handleSocialToggle = (platform: keyof typeof post.socialPlatforms) => {
    setPost(prev => ({
      ...prev,
      socialPlatforms: {
        ...prev.socialPlatforms,
        [platform]: !prev.socialPlatforms[platform],
      },
    }));
  };
  
  // Handle publish date select
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setPost(prev => ({
        ...prev,
        publishDate: date,
      }));
    }
  };
  
  // Handle adding a tag
  const handleAddTag = (tag: string) => {
    setPost(prev => ({
      ...prev,
      tags: [...prev.tags, tag],
    }));
  };
  
  // Handle removing a tag
  const handleRemoveTag = (tag: string) => {
    setPost(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag),
    }));
  };
  
  // Handle featured image upload
  const handleImageUpload = (url: string) => {
    setPost(prev => ({
      ...prev,
      featuredImage: url,
      isVideoBackground: false,
    }));
  };
  
  // Handle video background upload
  const handleVideoUpload = (url: string) => {
    setPost(prev => ({
      ...prev,
      videoBackground: url,
      isVideoBackground: true,
    }));
  };

  // Handle media removal
  const handleRemoveMedia = () => {
    setPost(prev => ({
      ...prev,
      featuredImage: '',
      videoBackground: '',
      isVideoBackground: false,
    }));
  };
  
  // Handle author selection
  const handleSelectAuthor = (author: typeof authors[0]) => {
    setPost(prev => ({
      ...prev,
      author: author,
    }));
    setShowAuthorSelect(false);
  };
  
  // Handle save post
  const handleSave = async (status: 'draft' | 'published' | 'scheduled') => {
    // Set the status
    const updatedPost = {
      ...post,
      status: status,
    };
    
    // If scheduling, ensure we have a date
    if (status === 'scheduled' && !updatedPost.publishDate) {
      toast({
        title: "Schedule Error",
        description: "Please select a publish date to schedule this post.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call to save the post
      console.log('Saving post:', updatedPost);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: status === 'published' ? "Post Published" : status === 'scheduled' ? "Post Scheduled" : "Draft Saved",
        description: status === 'published' 
          ? "Your post has been published successfully." 
          : status === 'scheduled'
          ? `Your post has been scheduled for ${format(updatedPost.publishDate!, 'PPP')} at ${updatedPost.publishTime}.`
          : "Your draft has been saved successfully.",
      });
      
      // Navigate back to blog admin
      navigate('/admin/blog');
    } catch (error) {
      console.error('Error saving post:', error);
      toast({
        title: "Error",
        description: "There was an error saving your post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle preview
  const handlePreview = () => {
    // In a real app, this might open a new tab with a preview
    toast({
      title: "Preview Mode",
      description: "Post preview functionality would open in a new tab.",
    });
  };

  // Handle category change
  const handleCategoryChange = (value: string) => {
    setPost(prev => ({
      ...prev,
      category: value
    }));
  };

  return (
    <AdminLayout title={id ? "Edit Blog Post" : "Create Blog Post"}>
      <PostEditorLayout
        id={id}
        title={post.title}
        lastSavedAt={lastSavedAt}
        isLoading={isLoading}
        showSchedule={showSchedule}
        publishDate={post.publishDate}
        publishTime={post.publishTime}
        onBack={() => navigate('/admin/blog')}
        onPreview={handlePreview}
        onSaveDraft={() => handleSave('draft')}
        onToggleSchedule={() => setShowSchedule(!showSchedule)}
        onPublish={() => handleSave('published')}
        onDateSelect={handleDateSelect}
        onTimeChange={handleChange}
        onSchedule={() => handleSave('scheduled')}
      >
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="col-span-3 lg:col-span-2">
            {/* Post Content */}
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <CardTitle>Post Content</CardTitle>
              </CardHeader>
              <CardContent>
                <PostContentForm
                  title={post.title}
                  content={post.content}
                  excerpt={post.excerpt}
                  onTitleChange={handleChange}
                  onContentChange={handleChange}
                  onExcerptChange={handleChange}
                />
              </CardContent>
            </Card>
            
            {/* SEO & Social Sharing */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>SEO & Social Sharing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <SeoForm
                  seoTitle={post.seoTitle}
                  seoDescription={post.seoDescription}
                  onTitleChange={handleChange}
                  onDescriptionChange={handleChange}
                />
                
                <SocialSharingOptions
                  socialShareEnabled={post.socialShareEnabled}
                  socialPlatforms={post.socialPlatforms}
                  onSocialShareChange={(checked) => handleCheckboxChange('socialShareEnabled', checked)}
                  onPlatformToggle={handleSocialToggle}
                />
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Metadata */}
          <div className="col-span-3 lg:col-span-1 space-y-6">
            {/* Post Details */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Post Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <PostMetadataForm
                  category={post.category}
                  categories={categories}
                  tags={post.tags}
                  views={post.views}
                  allowComments={post.allowComments}
                  onCategoryChange={handleCategoryChange}
                  onViewsChange={handleChange}
                  onAllowCommentsChange={(checked) => handleCheckboxChange('allowComments', checked)}
                  onAddTag={handleAddTag}
                  onRemoveTag={handleRemoveTag}
                />
                
                <div className="space-y-2">
                  <label>Author</label>
                  <AuthorSelector
                    author={post.author}
                    authors={authors}
                    showAuthorSelect={showAuthorSelect}
                    setShowAuthorSelect={setShowAuthorSelect}
                    onSelectAuthor={handleSelectAuthor}
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Featured Media */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Featured Media</CardTitle>
              </CardHeader>
              <CardContent>
                <PostMediaUpload
                  featuredImage={post.featuredImage}
                  videoBackground={post.videoBackground}
                  isVideoBackground={post.isVideoBackground}
                  onImageUpload={handleImageUpload}
                  onVideoUpload={handleVideoUpload}
                  onRemoveMedia={handleRemoveMedia}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </PostEditorLayout>
    </AdminLayout>
  );
};

export default BlogPostEditor;
