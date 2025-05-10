
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from "@/components/ui/use-toast";
import { fileUploadService } from '@/utils/fileUploadService';
import { Loader2, Upload, X, Check, Image as ImageIcon, FilePlus, FileText } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface EnhancedFileUploadProps {
  endpoint: string;
  onSuccess?: (url: string, metadata: any) => void;
  onError?: (error: string) => void;
  accept?: string;
  maxSize?: number; // in MB
  label?: string;
  allowMultiple?: boolean;
  className?: string;
  category: string;
  allowTags?: boolean;
  allowDescription?: boolean;
  // For backward compatibility with the old interface
  onFileSelected?: (file: File) => void;
  initialPreview?: string;
  previewType?: string;
  maxSizeMB?: number;
}

const EnhancedFileUpload: React.FC<EnhancedFileUploadProps> = ({
  endpoint,
  onSuccess,
  onError,
  accept = "image/*",
  maxSize = 5, // default 5MB
  maxSizeMB, // backward compatibility
  label = "Upload File",
  allowMultiple = false,
  className = "",
  category,
  allowTags = false,
  allowDescription = false,
  onFileSelected, // backward compatibility
  initialPreview, // backward compatibility
  previewType // backward compatibility
}) => {
  // Use maxSizeMB for backward compatibility if provided
  const effectiveMaxSize = maxSizeMB || maxSize;
  
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(initialPreview || null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Reset states
    setError(null);
    setPreview(null);
    setUploadComplete(false);
    
    // Support the legacy onFileSelected callback
    if (onFileSelected) {
      onFileSelected(file);
      return;
    }
    
    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      // For non-image files, set a generic preview
      setPreview('non-image');
    }
  };
  
  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setError('No file selected');
      return;
    }
    
    setIsUploading(true);
    setProgress(0);
    
    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 5, 90));
    }, 200);
    
    try {
      const allowedTypes = accept.split(',').map(type => type.trim());
      
      const result = await fileUploadService.upload(file, endpoint, {
        category,
        description: description || undefined,
        tags: tags.length > 0 ? tags : undefined,
        allowedTypes: allowedTypes[0] === '*/*' ? undefined : allowedTypes,
        maxSize: effectiveMaxSize
      });
      
      // Clear progress simulation
      clearInterval(progressInterval);
      
      if (!result.success) {
        setError(result.error || 'Upload failed');
        onError?.(result.error || 'Upload failed');
        toast({
          variant: "destructive",
          title: "Upload failed",
          description: result.error,
        });
      } else {
        setProgress(100);
        setUploadComplete(true);
        if (result.url && result.metadata) {
          onSuccess?.(result.url, result.metadata);
        }
        toast({
          title: "Upload successful",
          description: "Your file has been uploaded successfully.",
        });
      }
    } catch (err) {
      clearInterval(progressInterval);
      const errorMessage = (err as Error).message || "Upload failed";
      setError(errorMessage);
      onError?.(errorMessage);
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: errorMessage,
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleReset = () => {
    setPreview(null);
    setProgress(0);
    setError(null);
    setUploadComplete(false);
    setDescription('');
    setTags([]);
    setTagInput('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const renderPreview = () => {
    if (!preview) return null;
    
    if (preview === 'non-image') {
      return (
        <div className="mt-2 bg-muted/30 rounded-md p-4 flex items-center justify-center">
          <FileText className="h-10 w-10 text-muted-foreground" />
        </div>
      );
    }
    
    return (
      <div className="mt-2 relative">
        <img 
          src={preview} 
          alt="Preview" 
          className={`rounded-md object-contain ${previewType === 'large' ? 'max-h-60' : 'max-h-40'}`}
        />
        {!isUploading && (
          <button 
            onClick={handleReset}
            className="absolute top-1 right-1 rounded-full bg-black/50 text-white p-1 hover:bg-black/80"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  };
  
  return (
    <div className={className}>
      <Label htmlFor="file-upload">{label}</Label>
      
      {!preview ? (
        <Card className="mt-2 cursor-pointer border-dashed hover:bg-muted/30 transition-colors">
          <label 
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center p-6 cursor-pointer"
          >
            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
            <span className="text-sm text-muted-foreground">
              Click or drag file to upload
            </span>
            <span className="text-xs text-muted-foreground mt-1">
              Maximum file size: {effectiveMaxSize}MB
            </span>
          </label>
        </Card>
      ) : (
        <>
          {renderPreview()}
          
          {allowDescription && (
            <div className="mt-4">
              <Label htmlFor="file-description">Description</Label>
              <Textarea
                id="file-description"
                placeholder="Enter file description..."
                className="mt-1"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isUploading || uploadComplete}
              />
            </div>
          )}
          
          {allowTags && (
            <div className="mt-4">
              <Label htmlFor="file-tags">Tags</Label>
              <div className="flex mt-1 gap-2">
                <Input
                  id="file-tags"
                  placeholder="Add tags..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  disabled={isUploading || uploadComplete}
                />
                <Button 
                  type="button" 
                  size="sm"
                  onClick={handleAddTag}
                  disabled={!tagInput || isUploading || uploadComplete}
                >
                  Add
                </Button>
              </div>
              
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {tags.map(tag => (
                    <Badge key={tag} variant="outline" className="px-2 py-1">
                      {tag}
                      <button 
                        onClick={() => handleRemoveTag(tag)} 
                        className="ml-1 text-muted-foreground hover:text-destructive"
                        disabled={isUploading || uploadComplete}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* If using the legacy onFileSelected, don't show upload controls */}
          {!onFileSelected && (
            <>
              {isUploading && (
                <div className="mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-muted-foreground">{progress}%</span>
                  </div>
                </div>
              )}
              
              {uploadComplete && (
                <div className="flex items-center mt-4 text-sm text-green-600">
                  <Check className="h-4 w-4 mr-1" />
                  Upload complete
                </div>
              )}
              
              {error && (
                <div className="text-sm text-destructive mt-4">{error}</div>
              )}
              
              <div className="mt-4 flex justify-end gap-2">
                {!uploadComplete && (
                  <Button 
                    variant="outline" 
                    onClick={handleReset}
                    disabled={isUploading}
                  >
                    Cancel
                  </Button>
                )}
                
                {!isUploading && !uploadComplete ? (
                  <Button 
                    onClick={handleUpload}
                    disabled={!preview}
                  >
                    Upload
                  </Button>
                ) : uploadComplete ? (
                  <Button 
                    variant="outline"
                    onClick={handleReset}
                  >
                    Upload Another
                  </Button>
                ) : null}
              </div>
            </>
          )}
        </>
      )}
      
      <Input
        ref={fileInputRef}
        id="file-upload"
        type="file"
        accept={accept}
        multiple={allowMultiple}
        className="hidden"
        onChange={handleFileChange}
        disabled={isUploading}
      />
    </div>
  );
};

export default EnhancedFileUpload;
