
import { toast } from "@/components/ui/use-toast";

// Base URL for API requests
// This can be replaced with the actual API URL when ready
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Interface for API response
interface ApiResponse<T> {
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: unknown;
  };
}

// Generic API request function
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(`API Error (${response.status}):`, data);
      
      // Show error toast
      toast({
        variant: "destructive",
        title: "Error",
        description: data.message || `Request failed with status ${response.status}`,
      });
      
      return {
        error: {
          message: data.message || `Request failed with status ${response.status}`,
          code: data.code || `${response.status}`,
          details: data.details || null,
        },
      };
    }

    return { data };
  } catch (error) {
    console.error("API Request Error:", error);
    
    // Show error toast for unexpected errors
    toast({
      variant: "destructive",
      title: "Connection Error",
      description: "Failed to connect to the server. Please check your internet connection.",
    });
    
    return {
      error: {
        message: (error as Error).message || "An unexpected error occurred",
        details: error,
      },
    };
  }
}

// Convenience methods for different HTTP methods
export const api = {
  get: <T>(endpoint: string, options: Omit<RequestInit, "method"> = {}) =>
    apiRequest<T>(endpoint, { ...options, method: "GET" }),
    
  post: <T>(endpoint: string, data: unknown, options: Omit<RequestInit, "method" | "body"> = {}) =>
    apiRequest<T>(endpoint, { ...options, method: "POST", body: JSON.stringify(data) }),
    
  put: <T>(endpoint: string, data: unknown, options: Omit<RequestInit, "method" | "body"> = {}) =>
    apiRequest<T>(endpoint, { ...options, method: "PUT", body: JSON.stringify(data) }),
    
  patch: <T>(endpoint: string, data: unknown, options: Omit<RequestInit, "method" | "body"> = {}) =>
    apiRequest<T>(endpoint, { ...options, method: "PATCH", body: JSON.stringify(data) }),
    
  delete: <T>(endpoint: string, options: Omit<RequestInit, "method"> = {}) =>
    apiRequest<T>(endpoint, { ...options, method: "DELETE" }),
};

// File upload helper
export async function uploadFile(
  endpoint: string,
  file: File,
  options: Omit<RequestInit, "method" | "body"> = {}
) {
  const formData = new FormData();
  formData.append('file', file);
  
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      method: "POST",
      body: formData,
      // Don't set content-type here, let the browser set it with the boundary
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(`Upload Error (${response.status}):`, data);
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: data.message || `Upload failed with status ${response.status}`,
      });
      
      return {
        error: {
          message: data.message || `Upload failed with status ${response.status}`,
          code: data.code || `${response.status}`,
          details: data.details || null,
        },
      };
    }

    return { data };
  } catch (error) {
    console.error("Upload Error:", error);
    toast({
      variant: "destructive",
      title: "Upload Error",
      description: "Failed to upload file. Please try again.",
    });
    
    return {
      error: {
        message: (error as Error).message || "An unexpected error occurred during upload",
        details: error,
      },
    };
  }
}
