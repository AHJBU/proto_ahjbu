
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Edit, Trash2, Plus, Search, FileDown, Upload, Eye } from 'lucide-react';
import { Switch } from "@/components/ui/switch"
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EnhancedFileUpload from '@/components/admin/EnhancedFileUpload';
import ScrollReveal from '@/components/ui/scroll-reveal';

// Mock resources data
const resources = [
  {
    id: 1,
    title: 'Curriculum Vitae (CV)',
    description: 'Official and updated curriculum vitae',
    category: 'CV',
    type: 'PDF',
    size: '1.2 MB',
    downloadable: true,
    featured: true,
    downloads: 145
  },
  {
    id: 2,
    title: 'Web Design Basics - A Simple Guide',
    description: 'A comprehensive guide to web design basics for beginners',
    category: 'Design',
    type: 'PDF',
    size: '3.5 MB',
    downloadable: true,
    featured: false,
    downloads: 87
  },
  {
    id: 3,
    title: 'Project Plan Template',
    description: 'Ready-to-use template for planning digital projects',
    category: 'Templates',
    type: 'DOCX',
    size: '0.8 MB',
    downloadable: true,
    featured: false,
    downloads: 63
  },
  {
    id: 4,
    title: 'React.js Fundamentals - Slides',
    description: 'Presentation slides from React.js workshop',
    category: 'Development',
    type: 'PPTX',
    size: '5.2 MB',
    downloadable: true,
    featured: true,
    downloads: 104
  },
  {
    id: 5,
    title: 'UX Design Wireframes',
    description: 'Collection of editable UX design wireframes',
    category: 'Design',
    type: 'AI',
    size: '15.7 MB',
    downloadable: false,
    featured: false,
    downloads: 0
  }
];

const AdminResources: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  
  const filteredResources = searchQuery
    ? resources.filter(resource => 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : resources;

  const handleEdit = (id: number) => {
    toast({
      title: "Edit Resource",
      description: `Editing resource with ID: ${id}`,
    });
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Delete Resource",
      description: `Deleting resource with ID: ${id}`,
      variant: "destructive",
    });
  };

  const handleToggleDownloadable = (id: number, currentValue: boolean) => {
    toast({
      title: `${currentValue ? 'Disable' : 'Enable'} Downloads`,
      description: `${currentValue ? 'Disabled' : 'Enabled'} downloads for resource with ID: ${id}`,
    });
  };

  const handleToggleFeatured = (id: number, currentValue: boolean) => {
    toast({
      title: `${currentValue ? 'Unmark' : 'Mark'} as Featured`,
      description: `${currentValue ? 'Removed from' : 'Added to'} featured resources for resource with ID: ${id}`,
    });
  };

  const handleView = (id: number) => {
    toast({
      title: "View Resource",
      description: `Viewing resource with ID: ${id}`,
    });
  };
  
  const handleFileUploadSuccess = (url: string, metadata: any) => {
    toast({
      title: "File Uploaded Successfully",
      description: `The file has been uploaded to: ${url}`,
    });
    setUploadDialogOpen(false);
  };

  const getTotalDownloads = () => {
    return resources.reduce((sum, resource) => sum + resource.downloads, 0);
  };

  const getDownloadableCount = () => {
    return resources.filter(resource => resource.downloadable).length;
  };

  return (
    <AdminLayout title="Files & Resources">
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search resources..."
            className="pl-10 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload New Resource
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Upload New Resource</DialogTitle>
              <DialogDescription>
                Upload a file to make it available in your resources library.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label htmlFor="resource-title">Resource Title</Label>
                <Input id="resource-title" placeholder="Enter a title for this resource" />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="resource-category">Category</Label>
                <Select>
                  <SelectTrigger id="resource-category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cv">CV</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="templates">Templates</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <EnhancedFileUpload 
                endpoint="/api/upload/resources"
                label="Resource File"
                accept="*/*"
                maxSize={50}
                category="resources"
                allowTags={true}
                allowDescription={true}
                onSuccess={handleFileUploadSuccess}
                onError={(error) => toast({
                  title: "Upload Error",
                  description: error,
                  variant: "destructive"
                })}
              />
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Switch id="resource-downloadable" defaultChecked />
                  <Label htmlFor="resource-downloadable">Make available for download</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="resource-featured" />
                  <Label htmlFor="resource-featured">Feature on resources page</Label>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setUploadDialogOpen(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Resources</p>
                <p className="text-3xl font-bold">{resources.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Downloads Available</p>
                <p className="text-3xl font-bold">{getDownloadableCount()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Featured Resources</p>
                <p className="text-3xl font-bold">{resources.filter(r => r.featured).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Downloads</p>
                <p className="text-3xl font-bold">{getTotalDownloads()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CV Resource Management */}
      <Card className="mb-6 bg-primary/5 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle>CV Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="space-y-4">
              <div>
                <p className="font-medium">Current CV File</p>
                <p className="text-sm text-muted-foreground">ahmed-jamal-cv-2023.pdf (1.2 MB)</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Switch id="cv-downloadable" defaultChecked />
                  <label htmlFor="cv-downloadable">Allow CV downloads</label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="cv-featured" defaultChecked />
                  <label htmlFor="cv-featured">Show as featured resource</label>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Last updated: May 1, 2023 • 145 downloads</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                Preview CV
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload New CV
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload New CV</DialogTitle>
                    <DialogDescription>
                      Update your CV to make it available for download.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="py-4">
                    <EnhancedFileUpload 
                      endpoint="/api/upload/cv"
                      label="CV File"
                      accept=".pdf,.docx,.doc"
                      maxSize={10}
                      category="cv"
                      allowTags={false}
                      allowDescription={true}
                      onSuccess={(url, metadata) => {
                        toast({
                          title: "CV Updated",
                          description: "Your CV has been successfully updated.",
                        });
                      }}
                    />
                  </div>
                  
                  <DialogFooter>
                    <Button type="button" variant="outline">Cancel</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>

      <ScrollReveal>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>All Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Downloadable</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Downloads</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredResources.map((resource) => (
                  <TableRow key={resource.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <FileDown className="h-4 w-4 text-muted-foreground" />
                        {resource.title}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{resource.description}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {resource.category}
                      </Badge>
                    </TableCell>
                    <TableCell>{resource.type}</TableCell>
                    <TableCell>{resource.size}</TableCell>
                    <TableCell>
                      <Switch 
                        checked={resource.downloadable}
                        onCheckedChange={() => handleToggleDownloadable(resource.id, resource.downloadable)}
                      />
                    </TableCell>
                    <TableCell>
                      <Switch 
                        checked={resource.featured}
                        onCheckedChange={() => handleToggleFeatured(resource.id, resource.featured)}
                      />
                    </TableCell>
                    <TableCell>{resource.downloads}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleView(resource.id)}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(resource.id)}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(resource.id)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </ScrollReveal>
    </AdminLayout>
  );
};

export default AdminResources;

// Add missing imports
const Label = ({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
    {children}
  </label>
);

import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
