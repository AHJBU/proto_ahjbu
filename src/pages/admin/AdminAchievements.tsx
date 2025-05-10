
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, Plus, Search, Image, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Achievement {
  id: number;
  title: string;
  category: string;
  date: string;
  location: string;
  description?: string;
  featured: boolean;
  imagesCount: number;
}

// Mock achievements data
const initialAchievements: Achievement[] = [
  {
    id: 1,
    title: 'Best Designer of the Year Award',
    category: 'Award',
    date: '2023-06-15',
    location: 'Dubai, UAE',
    description: 'Received the Best Designer of the Year Award at the Annual Design Summit for outstanding contributions to the field of digital design.',
    featured: true,
    imagesCount: 5
  },
  {
    id: 2,
    title: 'Advanced Web Development Certification',
    category: 'Certification',
    date: '2022-11-30',
    location: 'Online',
    featured: false,
    imagesCount: 2
  },
  {
    id: 3,
    title: 'Best App Award for "Smart Assistant"',
    category: 'Award',
    date: '2021-09-22',
    location: 'San Francisco, USA',
    featured: true,
    imagesCount: 3
  },
  {
    id: 4,
    title: 'Keynote Speaker at Web Tech Conference',
    category: 'Recognition',
    date: '2023-03-15',
    location: 'London, UK',
    featured: false,
    imagesCount: 4
  },
  {
    id: 5,
    title: 'Digital Transformation Project Success',
    category: 'Success Story',
    date: '2022-07-10',
    location: 'Riyadh, KSA',
    featured: true,
    imagesCount: 6
  }
];

const AdminAchievements: React.FC = () => {
  const { toast } = useToast();
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    date: '',
    location: '',
    description: '',
    featured: false
  });
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleEdit = (id: number) => {
    const achievement = achievements.find(item => item.id === id);
    if (achievement) {
      setCurrentAchievement(achievement);
      setFormData({
        title: achievement.title,
        category: achievement.category,
        date: achievement.date,
        location: achievement.location,
        description: achievement.description || '',
        featured: achievement.featured
      });
      setIsDialogOpen(true);
    }
  };

  const handleDelete = (id: number) => {
    const achievement = achievements.find(item => item.id === id);
    if (achievement) {
      setCurrentAchievement(achievement);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleManageImages = (id: number) => {
    const achievement = achievements.find(item => item.id === id);
    if (achievement) {
      setCurrentAchievement(achievement);
      setIsImageDialogOpen(true);
    }
  };

  const handleAddNew = () => {
    setCurrentAchievement(null);
    setFormData({
      title: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      location: '',
      description: '',
      featured: false
    });
    setIsDialogOpen(true);
  };

  const handleSaveAchievement = () => {
    if (!formData.title || !formData.category || !formData.date || !formData.location) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    if (currentAchievement) {
      // Update existing achievement
      const updatedAchievements = achievements.map(item => 
        item.id === currentAchievement.id 
          ? {
              ...item,
              title: formData.title,
              category: formData.category,
              date: formData.date,
              location: formData.location,
              description: formData.description,
              featured: formData.featured
            }
          : item
      );
      setAchievements(updatedAchievements);
      toast({
        title: "Achievement Updated",
        description: `${formData.title} has been updated successfully`
      });
    } else {
      // Add new achievement
      const newAchievement: Achievement = {
        id: Math.max(0, ...achievements.map(a => a.id)) + 1,
        title: formData.title,
        category: formData.category,
        date: formData.date,
        location: formData.location,
        description: formData.description,
        featured: formData.featured,
        imagesCount: 0
      };
      setAchievements([...achievements, newAchievement]);
      toast({
        title: "Achievement Added",
        description: `${formData.title} has been added successfully`
      });
    }
    setIsDialogOpen(false);
  };

  const handleDeleteAchievement = () => {
    if (currentAchievement) {
      setAchievements(achievements.filter(item => item.id !== currentAchievement.id));
      toast({
        title: "Achievement Deleted",
        description: `${currentAchievement.title} has been deleted`
      });
      setIsDeleteDialogOpen(false);
    }
  };

  const handleUploadImage = () => {
    if (!currentAchievement) return;
    
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        const updatedAchievements = achievements.map(item => 
          item.id === currentAchievement.id 
            ? { ...item, imagesCount: item.imagesCount + files.length }
            : item
        );
        setAchievements(updatedAchievements);
        
        toast({
          title: "Images Uploaded",
          description: `${files.length} images have been uploaded`
        });
      }
    };
    
    input.click();
  };

  const filteredAchievements = achievements.filter(achievement => 
    achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    achievement.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    achievement.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalImages = achievements.reduce((sum, achievement) => sum + achievement.imagesCount, 0);
  const featuredItems = achievements.filter(achievement => achievement.featured).length;

  return (
    <AdminLayout title="Achievements & Success Stories">
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search achievements..."
            className="pl-10 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Achievement
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Achievements</p>
                <p className="text-3xl font-bold">{achievements.length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Featured Items</p>
                <p className="text-3xl font-bold">{featuredItems}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Images</p>
                <p className="text-3xl font-bold">{totalImages}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Image className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Achievements & Success Stories</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Images</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAchievements.map((achievement) => (
                <TableRow key={achievement.id}>
                  <TableCell className="font-medium">{achievement.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {achievement.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(achievement.date)}</TableCell>
                  <TableCell>{achievement.location}</TableCell>
                  <TableCell>
                    <Badge variant={achievement.featured ? 'default' : 'outline'}>
                      {achievement.featured ? 'Featured' : 'Regular'}
                    </Badge>
                  </TableCell>
                  <TableCell>{achievement.imagesCount}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleManageImages(achievement.id)}>
                        <Image className="h-4 w-4" />
                        <span className="sr-only">Images</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(achievement.id)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(achievement.id)}>
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

      {/* Achievement Edit/Add Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{currentAchievement ? 'Edit Achievement' : 'Add New Achievement'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title*</Label>
              <Input 
                id="title" 
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="Enter achievement title" 
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="category">Category*</Label>
              <Input 
                id="category" 
                value={formData.category} 
                onChange={e => setFormData({...formData, category: e.target.value})}
                placeholder="Award, Certification, Recognition, etc." 
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="date">Date*</Label>
              <Input 
                id="date" 
                type="date" 
                value={formData.date} 
                onChange={e => setFormData({...formData, date: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="location">Location*</Label>
              <Input 
                id="location" 
                value={formData.location} 
                onChange={e => setFormData({...formData, location: e.target.value})}
                placeholder="City, Country or Online" 
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Enter a description" 
                rows={3}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="featured">Featured Achievement</Label>
              <Switch 
                id="featured" 
                checked={formData.featured}
                onCheckedChange={checked => setFormData({...formData, featured: checked})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveAchievement}>Save</Button>
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
            Are you sure you want to delete "{currentAchievement?.title}"? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteAchievement}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Management Dialog */}
      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Manage Images: {currentAchievement?.title}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-muted-foreground">
                Total Images: {currentAchievement?.imagesCount || 0}
              </p>
              <Button onClick={handleUploadImage}>
                <Plus className="mr-2 h-4 w-4" />
                Upload Images
              </Button>
            </div>
            
            <ScrollArea className="h-72 border rounded-md p-4">
              {currentAchievement && currentAchievement.imagesCount > 0 ? (
                <div className="grid grid-cols-3 gap-3">
                  {Array.from({ length: currentAchievement.imagesCount }).map((_, index) => (
                    <div key={index} className="relative aspect-square bg-muted rounded-md flex items-center justify-center">
                      <Image className="h-8 w-8 text-muted-foreground" />
                      <Button 
                        size="icon" 
                        variant="destructive" 
                        className="h-6 w-6 absolute top-1 right-1 opacity-80 hover:opacity-100"
                        onClick={() => {
                          if (currentAchievement) {
                            const updatedAchievements = achievements.map(item => 
                              item.id === currentAchievement.id 
                                ? { ...item, imagesCount: Math.max(0, item.imagesCount - 1) }
                                : item
                            );
                            setAchievements(updatedAchievements);
                            
                            toast({
                              title: "Image Deleted",
                              description: "The image has been removed"
                            });
                          }
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Image className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No images uploaded yet</p>
                  <Button variant="outline" className="mt-4" onClick={handleUploadImage}>
                    Upload Your First Image
                  </Button>
                </div>
              )}
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminAchievements;
