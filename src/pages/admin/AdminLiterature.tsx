
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, Plus, Search, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

// Mock literature data
const literatureItems = [
  {
    id: 1,
    title: 'Journey in the World of Design',
    category: 'Articles',
    date: '2023-05-10',
    status: 'published',
    wordCount: 1250,
    tags: ['design', 'creativity', 'philosophy']
  },
  {
    id: 2,
    title: 'Inspiring Quotes',
    category: 'Quotes',
    date: '2023-04-22',
    status: 'published',
    wordCount: 450,
    tags: ['inspiration', 'motivation', 'quotes']
  },
  {
    id: 3,
    title: 'The Future of Technology',
    category: 'Articles',
    date: '2023-03-15',
    status: 'published',
    wordCount: 980,
    tags: ['technology', 'future', 'trends']
  },
  {
    id: 4,
    title: 'Creative Thoughts',
    category: 'Thoughts',
    date: '2023-02-28',
    status: 'draft',
    wordCount: 720,
    tags: ['creativity', 'ideas', 'innovation']
  },
  {
    id: 5,
    title: 'Favorite Books and Their Impact',
    category: 'Articles',
    date: '2023-01-15',
    status: 'draft',
    wordCount: 0,
    tags: []
  }
];

const AdminLiterature: React.FC = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'default';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80 dark:bg-yellow-900/30 dark:text-yellow-300';
      default:
        return 'outline';
    }
  };

  const handleEdit = (id: number) => {
    toast({
      title: "Edit Literature Item",
      description: `Editing literature item with ID: ${id}`,
    });
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Delete Literature Item",
      description: `Deleting literature item with ID: ${id}`,
      variant: "destructive",
    });
  };

  const handleView = (id: number) => {
    toast({
      title: "View Literature Item",
      description: `Viewing literature item with ID: ${id}`,
    });
  };

  const countByCategory = (category: string) => {
    return literatureItems.filter(item => item.category === category).length;
  };

  return (
    <AdminLayout title="Literature & Quotes">
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search literature..."
            className="pl-10 w-full"
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Item
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Items</p>
                <p className="text-3xl font-bold">{literatureItems.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Articles</p>
                <p className="text-3xl font-bold">{countByCategory('Articles')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Quotes</p>
                <p className="text-3xl font-bold">{countByCategory('Quotes')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Thoughts</p>
                <p className="text-3xl font-bold">{countByCategory('Thoughts')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Literature & Quotes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Words</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {literatureItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {item.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(item.date)}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={item.status === 'published' ? 'default' : 'outline'}
                      className={getStatusColor(item.status)}
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.wordCount}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {item.tags.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{item.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleView(item.id)}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(item.id)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
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
    </AdminLayout>
  );
};

export default AdminLiterature;
