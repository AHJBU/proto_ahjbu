
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface SeoFormProps {
  seoTitle: string;
  seoDescription: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const SeoForm: React.FC<SeoFormProps> = ({
  seoTitle,
  seoDescription,
  onTitleChange,
  onDescriptionChange
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="seoTitle">SEO Title</Label>
        <Input
          id="seoTitle"
          name="seoTitle"
          value={seoTitle}
          onChange={onTitleChange}
          placeholder="SEO optimized title (if different from post title)"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="seoDescription">Meta Description</Label>
        <Textarea
          id="seoDescription"
          name="seoDescription"
          value={seoDescription}
          onChange={onDescriptionChange}
          placeholder="Meta description for search engines"
          className="min-h-[80px]"
        />
      </div>
    </div>
  );
};
