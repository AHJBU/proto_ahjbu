
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from "@/components/ui/use-toast";
import { uploadFile } from '@/utils/api';
import { Loader2, Upload, X, Check, Image as ImageIcon, FilePlus, FileText } from 'lucide-react';

interface FileUploadProps {
  endpoint: string;
  onSuccess?: (fileUrl: string) => void;
  onError?: (error: any) => void;
  accept?: string;
  maxSize?: number; // in MB
  label?: string;
  allowMultiple?: boolean;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  endpoint,
  onSuccess,
  onError,
  accept = "image/*",
  maxSize = 5, // default 5MB
  label = "Upload File",
  allowMultiple = false,
  className = "",
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [uploadComplete, setUploadComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Reset states
    setError(null);
    setPreview(null);
    setUploadComplete(false);
    
    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds ${maxSize}MB limit`);
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
    
    // Upload file
    handleUpload(file);
  };
  
  const handleUpload = async (file: File) => {
    setIsUploading(true);
    setProgress(0);
    
    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + 5, 90);
        return next;
      });
    }, 200);
    
    try {
      const response = await uploadFile(endpoint, file);
      
      // Clear progress simulation
      clearInterval(progressInterval);
      
      if (response.error) {
        setError(response.error.message);
        onError?.(response.error);
        toast({
          variant: "destructive",
          title: "Upload failed",
          description: response.error.message,
        });
      } else {
        setProgress(100);
        setUploadComplete(true);
        onSuccess?.(response.data?.url || '');
        toast({
          title: "Upload successful",
          description: "Your file has been uploaded successfully.",
        });
      }
    } catch (err) {
      clearInterval(progressInterval);
      const errorMessage = (err as Error).message || "Upload failed";
      setError(errorMessage);
      onError?.(err);
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
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
          className="rounded-md max-h-40 object-contain" 
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
      
      {!preview && !isUploading ? (
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
              Maximum file size: {maxSize}MB
            </span>
          </label>
        </Card>
      ) : (
        <>
          {renderPreview()}
          
          {isUploading && (
            <div className="mt-2">
              <div className="flex items-center space-x-2">
                <div className="w-full bg-muted rounded-full h-2 mt-2">
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
            <div className="flex items-center mt-2 text-sm text-green-600">
              <Check className="h-4 w-4 mr-1" />
              Upload complete
            </div>
          )}
          
          {error && (
            <div className="text-sm text-destructive mt-2">{error}</div>
          )}
          
          {!isUploading && !uploadComplete && !error && (
            <Button 
              size="sm"
              variant="outline"
              className="mt-2"
              onClick={() => fileInputRef.current?.click()}
            >
              Change file
            </Button>
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

export default FileUpload;
