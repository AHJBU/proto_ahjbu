
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface TagInputProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

const TagInput: React.FC<TagInputProps> = ({ tags, onAddTag, onRemoveTag }) => {
  const [tagInput, setTagInput] = useState('');
  
  const handleAddTag = () => {
    if (tagInput.trim() === '') return;
    if (tags.includes(tagInput.trim())) {
      toast({
        title: "Tag already exists",
        description: "This tag has already been added.",
        variant: "destructive",
      });
      return;
    }
    
    onAddTag(tagInput.trim());
    setTagInput('');
  };
  
  return (
    <div className="space-y-2">
      <Label>Tags</Label>
      <div className="flex gap-2">
        <Input
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          placeholder="Add tag..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddTag();
            }
          }}
        />
        <Button type="button" size="sm" onClick={handleAddTag}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="px-2 py-1">
              {tag}
              <button
                className="ml-1"
                onClick={() => onRemoveTag(tag)}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagInput;
