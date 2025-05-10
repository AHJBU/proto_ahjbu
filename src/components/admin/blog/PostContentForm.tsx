
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface PostContentFormProps {
  title: string;
  content: string;
  excerpt: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onExcerptChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const PostContentForm: React.FC<PostContentFormProps> = ({
  title,
  content,
  excerpt,
  onTitleChange,
  onContentChange,
  onExcerptChange
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Post Title</Label>
        <Input
          id="title"
          name="title"
          value={title}
          onChange={onTitleChange}
          placeholder="Enter post title"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          value={content}
          onChange={onContentChange}
          placeholder="Write your post content here..."
          className="min-h-[300px]"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          value={excerpt}
          onChange={onExcerptChange}
          placeholder="Write a brief excerpt for your post..."
          className="min-h-[100px]"
        />
        <p className="text-xs text-muted-foreground">
          A short summary of your post. If left empty, an excerpt will be generated automatically.
        </p>
      </div>
    </div>
  );
};
