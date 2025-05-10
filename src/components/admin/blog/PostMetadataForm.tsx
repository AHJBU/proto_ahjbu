
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import TagInput from './TagInput';

interface CategoryOption {
  id: number | string;
  name: string;
}

interface PostMetadataFormProps {
  category: string;
  categories: CategoryOption[];
  tags: string[];
  views: number;
  allowComments: boolean;
  onCategoryChange: (value: string) => void;
  onViewsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAllowCommentsChange: (checked: boolean) => void;
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

export const PostMetadataForm: React.FC<PostMetadataFormProps> = ({
  category,
  categories,
  tags,
  views,
  allowComments,
  onCategoryChange,
  onViewsChange,
  onAllowCommentsChange,
  onAddTag,
  onRemoveTag
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={category}
          onValueChange={onCategoryChange}
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <TagInput 
        tags={tags}
        onAddTag={onAddTag}
        onRemoveTag={onRemoveTag}
      />
      
      <div className="space-y-2">
        <Label>Initial View Count</Label>
        <Input
          type="number"
          name="views"
          value={views}
          onChange={onViewsChange}
          min="0"
        />
        <p className="text-xs text-muted-foreground">
          Set an initial view count for this post
        </p>
      </div>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="allowComments" className="cursor-pointer">Enable Comments</Label>
        <Switch
          id="allowComments"
          checked={allowComments}
          onCheckedChange={onAllowCommentsChange}
        />
      </div>
    </div>
  );
};
