
import { uploadFile } from './api';

interface FileMetadata {
  filename: string;
  originalName: string;
  size: number;
  mimeType: string;
  path: string;
  category: string;
  tags?: string[];
  description?: string;
  uploadDate: Date;
}

interface UploadOptions {
  category: string;
  tags?: string[];
  description?: string;
  allowedTypes?: string[];
  maxSize?: number; // in MB
}

interface UploadResult {
  success: boolean;
  url?: string;
  metadata?: FileMetadata;
  error?: string;
}

/**
 * Enhanced file upload service that handles file validation,
 * uploads to server, and returns structured metadata
 */
export const fileUploadService = {
  /**
   * Upload a file to the server with additional metadata
   */
  async upload(
    file: File, 
    endpoint: string, 
    options: UploadOptions
  ): Promise<UploadResult> {
    // Validate file type
    if (options.allowedTypes && options.allowedTypes.length > 0) {
      const fileType = file.type;
      if (!options.allowedTypes.some(type => fileType.startsWith(type))) {
        return {
          success: false,
          error: `File type not allowed. Allowed types: ${options.allowedTypes.join(', ')}`
        };
      }
    }
    
    // Validate file size
    if (options.maxSize && file.size > options.maxSize * 1024 * 1024) {
      return {
        success: false,
        error: `File size exceeds the ${options.maxSize}MB limit`
      };
    }
    
    try {
      // Upload the file using the api utility
      const formData = new FormData();
      formData.append('file', file);
      
      // Add metadata to form data
      formData.append('category', options.category);
      if (options.tags) formData.append('tags', JSON.stringify(options.tags));
      if (options.description) formData.append('description', options.description);
      
      const response = await uploadFile(endpoint, file);
      
      if (response.error) {
        return {
          success: false,
          error: response.error.message
        };
      }
      
      // Create metadata object from successful response
      const metadata: FileMetadata = {
        filename: response.data?.filename || '',
        originalName: file.name,
        size: file.size,
        mimeType: file.type,
        path: response.data?.url || '',
        category: options.category,
        tags: options.tags,
        description: options.description,
        uploadDate: new Date()
      };
      
      return {
        success: true,
        url: response.data?.url,
        metadata
      };
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message || 'Upload failed'
      };
    }
  },
  
  /**
   * Get file extension from filename or type
   */
  getFileExtension(filename: string): string {
    return filename.split('.').pop()?.toLowerCase() || '';
  },
  
  /**
   * Generate a safe filename
   */
  generateSafeFilename(originalName: string): string {
    const extension = this.getFileExtension(originalName);
    const baseName = originalName
      .replace(`.${extension}`, '')
      .replace(/[^a-z0-9]/gi, '-')
      .toLowerCase();
    
    return `${baseName}-${Date.now()}.${extension}`;
  }
};
