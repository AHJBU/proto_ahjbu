
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Edit, Trash2, Plus, Search, Eye, Calendar, Clock, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

// Mock training data
const initialTrainings = [
  {
    id: 1,
    title: 'Modern Web Development with React',
    category: 'webDev',
    level: 'intermediate',
    duration: '24 hours',
    registrations: 45,
    status: 'active',
    lastUpdated: '2025-04-15',
    description: 'Learn modern web development using React, hooks, context API, and more.',
    price: 499,
    location: 'Online',
    startDate: '2025-05-15',
    maxRegistrations: 50
  },
  {
    id: 2,
    title: 'UX/UI Design Fundamentals',
    category: 'design',
    level: 'beginner',
    duration: '16 hours',
    registrations: 32,
    status: 'active',
    lastUpdated: '2025-04-10',
    description: 'Master the basics of UX/UI design with practical exercises and real-world projects.',
    price: 399,
    location: 'Riyadh, Saudi Arabia',
    startDate: '2025-05-20',
    maxRegistrations: 40
  },
  {
    id: 3,
    title: 'Mobile App Development with Flutter',
    category: 'mobileDev',
    level: 'intermediate',
    duration: '30 hours',
    registrations: 28,
    status: 'active',
    lastUpdated: '2025-04-05',
    description: 'Build cross-platform mobile apps using Flutter and Dart programming language.',
    price: 599,
    location: 'Online',
    startDate: '2025-06-01',
    maxRegistrations: 35
  },
  {
    id: 4,
    title: 'Social Media Marketing Strategies',
    category: 'social',
    level: 'beginner',
    duration: '12 hours',
    registrations: 50,
    status: 'draft',
    lastUpdated: '2025-04-02',
    description: 'Develop effective social media marketing strategies for businesses.',
    price: 299,
    location: 'Jeddah, Saudi Arabia',
    startDate: '2025-06-10',
    maxRegistrations: 60
  },
  {
    id: 5,
    title: 'Advanced Backend Development with Node.js',
    category: 'webDev',
    level: 'advanced',
    duration: '20 hours',
    registrations: 18,
    status: 'completed',
    lastUpdated: '2025-03-28',
    description: 'Master advanced backend development concepts using Node.js, Express, and MongoDB.',
    price: 549,
    location: 'Online',
    startDate: '2025-04-01',
    maxRegistrations: 30
  }
];

const categoriesMap: Record<string, string> = {
  'webDev': 'Web Development',
  'mobileDev': 'Mobile Development',
  'design': 'Design',
  'social': 'Social Media',
  'other': 'Other'
};

const levelsMap: Record<string, string> = {
  'beginner': 'Beginner',
  'intermediate': 'Intermediate',
  'advanced': 'Advanced'
};

interface TrainingFormData {
  id?: number;
  title: string;
  category: string;
  level: string;
  duration: string;
  registrations: number;
  status: string;
  description: string;
  price: number;
  location: string;
  startDate: string;
  maxRegistrations: number;
}

const AdminTraining: React.FC = () => {
  const [trainings, setTrainings] = useState(initialTrainings);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentTraining, setCurrentTraining] = useState<TrainingFormData | null>(null);
  const [trainingToDelete, setTrainingToDelete] = useState<number | null>(null);
  
  // Initial form state
  const emptyFormData: TrainingFormData = {
    title: '',
    category: 'webDev',
    level: 'intermediate',
    duration: '',
    registrations: 0,
    status: 'draft',
    description: '',
    price: 0,
    location: '',
    startDate: '',
    maxRegistrations: 30
  };
  
  // Filter trainings based on search term
  const filteredTrainings = trainings.filter(training => {
    return (
      training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      categoriesMap[training.category].toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'completed':
        return 'bg-green-100 text-green-800 hover:bg-green-100/80 dark:bg-green-900/30 dark:text-green-300';
      default:
        return 'outline';
    }
  };

  // Handle opening the dialog for new training
  const handleAddTraining = () => {
    setCurrentTraining({ ...emptyFormData });
    setIsDialogOpen(true);
  };
  
  // Handle editing a training
  const handleEdit = (id: number) => {
    const training = trainings.find(t => t.id === id);
    if (training) {
      setCurrentTraining({
        id: training.id,
        title: training.title,
        category: training.category,
        level: training.level,
        duration: training.duration,
        registrations: training.registrations,
        status: training.status,
        description: training.description,
        price: training.price,
        location: training.location,
        startDate: training.startDate,
        maxRegistrations: training.maxRegistrations
      });
      setIsDialogOpen(true);
    }
  };
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (!currentTraining) return;
    
    // Handle numeric inputs
    if (type === 'number') {
      setCurrentTraining({
        ...currentTraining,
        [name]: parseFloat(value)
      });
    } else {
      setCurrentTraining({
        ...currentTraining,
        [name]: value
      });
    }
  };
  
  // Handle form submission
  const handleSubmit = () => {
    if (!currentTraining) return;
    
    // Validate form
    if (!currentTraining.title) {
      toast({
        title: "Validation Error",
        description: "Training title is required",
        variant: "destructive"
      });
      return;
    }
    
    if (currentTraining.id) {
      // Update existing training
      setTrainings(trainings.map(training => 
        training.id === currentTraining.id ? {
          ...training,
          ...currentTraining,
          lastUpdated: new Date().toISOString().split('T')[0]
        } : training
      ));
      
      toast({
        title: "Training Updated",
        description: `"${currentTraining.title}" has been updated.`
      });
    } else {
      // Add new training
      const newTraining = {
        ...currentTraining,
        id: Math.max(...trainings.map(t => t.id)) + 1,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      
      setTrainings([newTraining, ...trainings]);
      
      toast({
        title: "Training Added",
        description: `"${currentTraining.title}" has been added.`
      });
    }
    
    setIsDialogOpen(false);
  };
  
  // Handle initiating delete
  const handleDeletePrompt = (id: number) => {
    setTrainingToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  
  // Handle confirming delete
  const handleDelete = () => {
    if (trainingToDelete) {
      setTrainings(trainings.filter(training => training.id !== trainingToDelete));
      
      toast({
        title: "Training Deleted",
        description: "The training has been deleted successfully."
      });
      
      setIsDeleteDialogOpen(false);
      setTrainingToDelete(null);
    }
  };
  
  // Handle viewing registrations
  const handleViewRegistrations = (id: number) => {
    const training = trainings.find(t => t.id === id);
    
    toast({
      title: "View Registrations",
      description: `Viewing ${training?.registrations} registrations for "${training?.title}"`
    });
  };

  return (
    <AdminLayout title="Training & Workshops">
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search trainings..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={handleAddTraining}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Training
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Active Trainings</p>
                <p className="text-3xl font-bold">
                  {trainings.filter(t => t.status === 'active').length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Total Registrations</p>
                <p className="text-3xl font-bold">
                  {trainings.reduce((sum, t) => sum + t.registrations, 0)}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Training Hours</p>
                <p className="text-3xl font-bold">
                  {trainings.reduce((sum, t) => sum + parseInt(t.duration.split(' ')[0]), 0)}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Training Courses & Workshops</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Registrations</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTrainings.length > 0 ? (
                filteredTrainings.map((training) => (
                  <TableRow key={training.id}>
                    <TableCell className="font-medium">{training.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {categoriesMap[training.category] || training.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {levelsMap[training.level] || training.level}
                      </Badge>
                    </TableCell>
                    <TableCell>{training.duration}</TableCell>
                    <TableCell>{training.registrations}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={training.status === 'active' ? 'default' : 'outline'}
                        className={getStatusColor(training.status)}
                      >
                        {training.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleViewRegistrations(training.id)}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View Registrations</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(training.id)}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeletePrompt(training.id)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center p-4">
                    No trainings found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Add/Edit Training Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentTraining?.id ? 'Edit Training' : 'Add New Training'}</DialogTitle>
          </DialogHeader>
          
          {currentTraining && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={currentTraining.title}
                    onChange={handleInputChange}
                    placeholder="Training title"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={currentTraining.category}
                    onValueChange={(value) => setCurrentTraining({ ...currentTraining, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(categoriesMap).map(([key, value]) => (
                        <SelectItem key={key} value={key}>{value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="level">Level</Label>
                  <Select
                    value={currentTraining.level}
                    onValueChange={(value) => setCurrentTraining({ ...currentTraining, level: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(levelsMap).map(([key, value]) => (
                        <SelectItem key={key} value={key}>{value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    name="duration"
                    value={currentTraining.duration}
                    onChange={handleInputChange}
                    placeholder="e.g. 24 hours"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={currentTraining.price}
                    onChange={handleInputChange}
                    placeholder="Price in SAR"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={currentTraining.location}
                    onChange={handleInputChange}
                    placeholder="e.g. Online or City, Country"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={currentTraining.startDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={currentTraining.status}
                    onValueChange={(value) => setCurrentTraining({ ...currentTraining, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maxRegistrations">Maximum Registrations</Label>
                  <Input
                    id="maxRegistrations"
                    name="maxRegistrations"
                    type="number"
                    value={currentTraining.maxRegistrations}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={currentTraining.description}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Describe the training content, objectives, and target audience"
                />
              </div>
              
              {currentTraining.id && (
                <div className="flex items-center space-x-2">
                  <Label htmlFor="registrations" className="flex-grow">Current Registrations</Label>
                  <Input
                    id="registrations"
                    name="registrations"
                    type="number"
                    value={currentTraining.registrations}
                    onChange={handleInputChange}
                    className="w-24"
                  />
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {currentTraining?.id ? 'Save Changes' : 'Add Training'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          
          <p>Are you sure you want to delete this training? This action cannot be undone.</p>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminTraining;
