
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import { Plus, PenLine, Trash2, Eye, Calendar, ArrowUp, ArrowDown } from 'lucide-react';

// Mock portfolio data
const mockProjects = [
  {
    id: 1,
    title: 'E-commerce Website',
    category: 'Web Development',
    client: 'Retail Company Ltd.',
    date: '2025-03-15',
    featured: true,
    status: 'completed',
    image: '/assets/portfolio1.jpg'
  },
  {
    id: 2,
    title: 'Mobile Banking App',
    category: 'App Development',
    client: 'Finance Bank',
    date: '2025-02-10',
    featured: true,
    status: 'completed',
    image: '/assets/portfolio2.jpg'
  },
  {
    id: 3,
    title: 'Corporate Identity Design',
    category: 'Design',
    client: 'Tech Startup Inc.',
    date: '2025-01-05',
    featured: false,
    status: 'completed',
    image: '/assets/portfolio3.jpg'
  },
  {
    id: 4,
    title: 'Social Media Campaign',
    category: 'Digital Marketing',
    client: 'Fashion Brand',
    date: '2024-12-20',
    featured: false,
    status: 'ongoing',
    image: '/assets/portfolio4.jpg'
  },
];

interface ProjectFormData {
  title: string;
  category: string;
  client: string;
  date: string;
  status: 'completed' | 'ongoing';
  featured: boolean;
}

const AdminPortfolio: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState(mockProjects);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<typeof mockProjects[0] | null>(null);
  const { toast } = useToast();
  
  const form = useForm<ProjectFormData>({
    defaultValues: {
      title: '',
      category: '',
      client: '',
      date: new Date().toISOString().split('T')[0],
      status: 'ongoing',
      featured: false
    }
  });
  
  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.client.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddNew = () => {
    form.reset({
      title: '',
      category: '',
      client: '',
      date: new Date().toISOString().split('T')[0],
      status: 'ongoing',
      featured: false
    });
    setEditingProject(null);
    setDialogOpen(true);
  };
  
  const handleEdit = (project: typeof mockProjects[0]) => {
    form.reset({
      title: project.title,
      category: project.category,
      client: project.client,
      date: project.date,
      status: project.status as 'completed' | 'ongoing',
      featured: project.featured
    });
    setEditingProject(project);
    setDialogOpen(true);
  };
  
  const handleDelete = (id: number) => {
    setProjects(projects.filter(project => project.id !== id));
    toast({
      title: "Project Deleted",
      description: "The project has been deleted successfully."
    });
  };
  
  const onSubmit = (data: ProjectFormData) => {
    if (editingProject) {
      // Update existing project
      setProjects(projects.map(project => 
        project.id === editingProject.id 
          ? { ...project, ...data }
          : project
      ));
      toast({
        title: "Project Updated",
        description: "The project has been updated successfully."
      });
    } else {
      // Add new project
      const newProject = {
        ...data,
        id: Math.max(...projects.map(p => p.id), 0) + 1,
        image: '/assets/portfolio-placeholder.jpg'
      };
      setProjects([...projects, newProject]);
      toast({
        title: "Project Added",
        description: "The new project has been added successfully."
      });
    }
    
    setDialogOpen(false);
  };
  
  const handleMoveCategory = (index: number, direction: 'up' | 'down') => {
    // Implementation for category reordering would go here
    toast({
      title: "Category Moved",
      description: `Category moved ${direction}.`
    });
  };
  
  return (
    <AdminLayout title="Portfolio Management">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="w-full md:w-auto">
          <Input 
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-[300px]"
          />
        </div>
        
        <Button onClick={handleAddNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Project
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Projects</CardTitle>
          <CardDescription>
            Manage your portfolio projects and case studies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      {project.image && (
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-10 h-10 object-cover rounded mr-3"
                        />
                      )}
                      {project.title}
                    </div>
                  </TableCell>
                  <TableCell>{project.category}</TableCell>
                  <TableCell>{project.client}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      {new Date(project.date).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {project.featured ? (
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
                        Featured
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground">
                        Regular
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleEdit(project)}
                    >
                      <PenLine className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDelete(project.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>
              Manage your portfolio project categories
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 border rounded-md">
              <span>Web Development</span>
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleMoveCategory(0, 'up')}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleMoveCategory(0, 'down')}
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <PenLine className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 border rounded-md">
              <span>App Development</span>
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleMoveCategory(1, 'up')}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleMoveCategory(1, 'down')}
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <PenLine className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 border rounded-md">
              <span>Design</span>
              <div className="flex gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleMoveCategory(2, 'up')}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleMoveCategory(2, 'down')}
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <PenLine className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>
              Configure portfolio display settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-md">
                <span>Show project count</span>
                <Button variant="outline" size="sm">Enable</Button>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-md">
                <span>Show project dates</span>
                <Button variant="outline" size="sm">Disable</Button>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-md">
                <span>Show featured projects first</span>
                <Button variant="outline" size="sm">Enable</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Project Form Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingProject ? 'Edit Project' : 'Add New Project'}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter project title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., Web Development" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="client"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Client name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Completion Date</FormLabel>
                      <FormControl>
                        <Input 
                          type="date"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <select
                          className="w-full px-3 py-2 border rounded-md"
                          {...field}
                        >
                          <option value="ongoing">Ongoing</option>
                          <option value="completed">Completed</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Featured Project (display on homepage)
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingProject ? 'Update Project' : 'Add Project'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminPortfolio;
