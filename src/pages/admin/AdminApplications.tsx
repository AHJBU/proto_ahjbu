
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, Plus, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface Application {
  id: number;
  title: string;
  category: string;
  platforms: string[];
  status: string;
  lastUpdated: string;
}

// Mock application data
const initialApplications: Application[] = [
  {
    id: 1,
    title: 'Task Manager Pro',
    category: 'web',
    platforms: ['web', 'ios', 'android'],
    status: 'published',
    lastUpdated: '2025-04-15'
  },
  {
    id: 2,
    title: 'Design Portfolio',
    category: 'web',
    platforms: ['web'],
    status: 'published',
    lastUpdated: '2025-04-10'
  },
  {
    id: 3,
    title: 'Fitness Tracker',
    category: 'mobile',
    platforms: ['ios', 'android'],
    status: 'published',
    lastUpdated: '2025-04-05'
  },
  {
    id: 4,
    title: 'Language Learning App',
    category: 'mobile',
    platforms: ['ios', 'android'],
    status: 'draft',
    lastUpdated: '2025-04-02'
  },
  {
    id: 5,
    title: 'Social Media Dashboard',
    category: 'web',
    platforms: ['web'],
    status: 'published',
    lastUpdated: '2025-03-28'
  }
];

const AdminApplications: React.FC = () => {
  const { toast } = useToast();
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentApplication, setCurrentApplication] = useState<Application | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'web',
    platforms: {
      web: false,
      ios: false,
      android: false
    },
    status: 'draft'
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleEditClick = (id: number) => {
    const app = applications.find(app => app.id === id);
    if (app) {
      setCurrentApplication(app);
      setFormData({
        title: app.title,
        category: app.category,
        platforms: {
          web: app.platforms.includes('web'),
          ios: app.platforms.includes('ios'),
          android: app.platforms.includes('android')
        },
        status: app.status
      });
      setIsDialogOpen(true);
    }
  };

  const handleDeleteClick = (id: number) => {
    const app = applications.find(app => app.id === id);
    if (app) {
      setCurrentApplication(app);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleAddNew = () => {
    setCurrentApplication(null);
    setFormData({
      title: '',
      category: 'web',
      platforms: {
        web: false,
        ios: false,
        android: false
      },
      status: 'draft'
    });
    setIsDialogOpen(true);
  };

  const handleSaveApplication = () => {
    // Get selected platforms
    const selectedPlatforms = Object.entries(formData.platforms)
      .filter(([_, isSelected]) => isSelected)
      .map(([platform]) => platform);
    
    if (!formData.title) {
      toast({
        title: "Validation Error",
        description: "Title is required",
        variant: "destructive"
      });
      return;
    }

    if (selectedPlatforms.length === 0) {
      toast({
        title: "Validation Error",
        description: "At least one platform must be selected",
        variant: "destructive"
      });
      return;
    }

    const currentDate = new Date().toISOString().slice(0, 10);

    if (currentApplication) {
      // Update existing application
      const updatedApps = applications.map(app => 
        app.id === currentApplication.id 
          ? {
              ...app,
              title: formData.title,
              category: formData.category,
              platforms: selectedPlatforms,
              status: formData.status,
              lastUpdated: currentDate
            }
          : app
      );
      setApplications(updatedApps);
      toast({
        title: "Application Updated",
        description: `${formData.title} has been updated successfully`
      });
    } else {
      // Add new application
      const newApp: Application = {
        id: Math.max(0, ...applications.map(a => a.id)) + 1,
        title: formData.title,
        category: formData.category,
        platforms: selectedPlatforms,
        status: formData.status,
        lastUpdated: currentDate
      };
      setApplications([...applications, newApp]);
      toast({
        title: "Application Added",
        description: `${formData.title} has been added successfully`
      });
    }
    setIsDialogOpen(false);
  };

  const handleDeleteApplication = () => {
    if (currentApplication) {
      setApplications(applications.filter(app => app.id !== currentApplication.id));
      toast({
        title: "Application Deleted",
        description: `${currentApplication.title} has been deleted`
      });
      setIsDeleteDialogOpen(false);
    }
  };

  const filteredApplications = applications.filter(app => 
    app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout title="Applications">
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search applications..."
            className="pl-10 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Application
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Platforms</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {app.category === 'web' ? 'Web App' : 'Mobile App'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {app.platforms.map((platform, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={app.status === 'published' ? 'default' : 'outline'}
                      className={app.status === 'draft' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80 dark:bg-yellow-900/30 dark:text-yellow-300' : ''}
                    >
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(app.lastUpdated)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditClick(app.id)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(app.id)}>
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

      {/* Application Edit/Add Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{currentApplication ? 'Edit Application' : 'Add New Application'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="Enter application title" 
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={formData.category}
                onValueChange={value => setFormData({...formData, category: value})}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web">Web App</SelectItem>
                  <SelectItem value="mobile">Mobile App</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label>Platforms</Label>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="platform-web" 
                    checked={formData.platforms.web}
                    onCheckedChange={checked => 
                      setFormData({
                        ...formData, 
                        platforms: {...formData.platforms, web: checked as boolean}
                      })
                    }
                  />
                  <label htmlFor="platform-web">Web</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="platform-ios" 
                    checked={formData.platforms.ios}
                    onCheckedChange={checked => 
                      setFormData({
                        ...formData, 
                        platforms: {...formData.platforms, ios: checked as boolean}
                      })
                    }
                  />
                  <label htmlFor="platform-ios">iOS</label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="platform-android" 
                    checked={formData.platforms.android}
                    onCheckedChange={checked => 
                      setFormData({
                        ...formData, 
                        platforms: {...formData.platforms, android: checked as boolean}
                      })
                    }
                  />
                  <label htmlFor="platform-android">Android</label>
                </div>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status}
                onValueChange={value => setFormData({...formData, status: value})}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveApplication}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete "{currentApplication?.title}"? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteApplication}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminApplications;
