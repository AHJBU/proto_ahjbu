
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, Plus, Search, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

// Mock press data
const pressItems = [
  {
    id: 1,
    title: 'Interview on the Future of Digital Design',
    outlet: 'Modern Tech Magazine',
    type: 'Interview',
    date: '2023-06-10',
    link: 'https://example.com/interview',
    hasMedia: true
  },
  {
    id: 2,
    title: 'Presentation at Tech Conference',
    outlet: 'Global Tech Conference',
    type: 'Video',
    date: '2023-05-15',
    link: 'https://example.com/presentation',
    hasMedia: true
  },
  {
    id: 3,
    title: 'Article on User Experience',
    outlet: 'UX Blog',
    type: 'Article',
    date: '2023-04-22',
    link: 'https://example.com/article',
    hasMedia: false
  },
  {
    id: 4,
    title: 'Podcast on Tech Entrepreneurship',
    outlet: 'Tech Founders Podcast',
    type: 'Podcast',
    date: '2023-03-18',
    link: 'https://example.com/podcast',
    hasMedia: true
  },
  {
    id: 5,
    title: 'Opinion Piece on AI Ethics',
    outlet: 'Tech Ethics Journal',
    type: 'Article',
    date: '2023-02-05',
    link: 'https://example.com/ai-ethics',
    hasMedia: false
  }
];

const AdminPress: React.FC = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleEdit = (id: number) => {
    toast({
      title: "Edit Press Item",
      description: `Editing press item with ID: ${id}`,
    });
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Delete Press Item",
      description: `Deleting press item with ID: ${id}`,
      variant: "destructive",
    });
  };

  const handleOpenLink = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const countByType = (type: string) => {
    return pressItems.filter(item => item.type === type).length;
  };

  return (
    <AdminLayout title="Press & Media">
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search press items..."
            className="pl-10 w-full"
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Press Item
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Coverage</p>
                <p className="text-3xl font-bold">{pressItems.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Articles</p>
                <p className="text-3xl font-bold">{countByType('Article')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Interviews</p>
                <p className="text-3xl font-bold">{countByType('Interview')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Media Resources</p>
                <p className="text-3xl font-bold">{pressItems.filter(item => item.hasMedia).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Press & Media</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Outlet</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Media</TableHead>
                <TableHead>Link</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pressItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{item.outlet}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {item.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(item.date)}</TableCell>
                  <TableCell>
                    <Badge variant={item.hasMedia ? 'default' : 'outline'}>
                      {item.hasMedia ? 'Yes' : 'No'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center" 
                      onClick={() => handleOpenLink(item.link)}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Open
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
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

export default AdminPress;
