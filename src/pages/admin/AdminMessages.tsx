
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Search, Mail, MailOpen, Archive, Trash2, Star, StarOff, Send, RefreshCw } from 'lucide-react';

// Mock messages data
const mockMessages = [
  {
    id: 1,
    sender: 'John Smith',
    email: 'john.smith@example.com',
    subject: 'Web Development Project Inquiry',
    message: 'Hello, I am interested in discussing a potential web development project for my company. Could we schedule a call to discuss the details?',
    date: '2025-05-07T14:30:00',
    read: true,
    starred: true,
    archived: false,
    avatar: null
  },
  {
    id: 2,
    sender: 'Lisa Johnson',
    email: 'lisa.johnson@example.com',
    subject: 'Collaboration Opportunity',
    message: 'Hi there, I came across your portfolio and I believe we could collaborate on an upcoming project. Would you be interested in discussing this further?',
    date: '2025-05-06T10:15:00',
    read: false,
    starred: false,
    archived: false,
    avatar: null
  },
  {
    id: 3,
    sender: 'Michael Brown',
    email: 'michael.brown@example.com',
    subject: 'Speaking Engagement Request',
    message: 'We would like to invite you to speak at our upcoming tech conference in September. Please let me know if you would be interested and available.',
    date: '2025-05-05T16:45:00',
    read: true,
    starred: false,
    archived: false,
    avatar: '/assets/avatar1.jpg'
  },
  {
    id: 4,
    sender: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    subject: 'Feedback on Your Latest Article',
    message: 'I just read your article on modern web development practices and wanted to share some thoughts and feedback. Your insights were very valuable!',
    date: '2025-05-04T09:20:00',
    read: true,
    starred: true,
    archived: true,
    avatar: '/assets/avatar2.jpg'
  },
  {
    id: 5,
    sender: 'David Lee',
    email: 'david.lee@example.com',
    subject: 'Job Opportunity',
    message: 'Our company is looking for a skilled developer with your expertise. Would you be open to discussing a potential role with us?',
    date: '2025-05-03T13:10:00',
    read: false,
    starred: false,
    archived: false,
    avatar: null
  }
];

const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState(mockMessages);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<typeof mockMessages[0] | null>(null);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const { toast } = useToast();
  
  // Filter messages based on search term and filter
  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch && !message.archived;
    if (filter === 'unread') return matchesSearch && !message.read && !message.archived;
    if (filter === 'starred') return matchesSearch && message.starred && !message.archived;
    if (filter === 'archived') return matchesSearch && message.archived;
    
    return matchesSearch;
  });
  
  // Handle marking message as read
  const handleMarkAsRead = (id: number) => {
    setMessages(messages.map(message => 
      message.id === id ? { ...message, read: true } : message
    ));
  };
  
  // Handle toggling star status
  const handleToggleStar = (id: number) => {
    setMessages(messages.map(message => 
      message.id === id ? { ...message, starred: !message.starred } : message
    ));
    
    const message = messages.find(m => m.id === id);
    toast({
      title: message?.starred ? "Message Unstarred" : "Message Starred",
      description: "Message status has been updated.",
    });
  };
  
  // Handle archiving a message
  const handleArchive = (id: number) => {
    setMessages(messages.map(message => 
      message.id === id ? { ...message, archived: true } : message
    ));
    
    toast({
      title: "Message Archived",
      description: "The message has been moved to the archive.",
    });
  };
  
  // Handle deleting a message
  const handleDelete = (id: number) => {
    setMessages(messages.filter(message => message.id !== id));
    
    toast({
      title: "Message Deleted",
      description: "The message has been permanently deleted.",
    });
  };
  
  // Handle opening a message
  const handleOpenMessage = (message: typeof mockMessages[0]) => {
    setSelectedMessage(message);
    handleMarkAsRead(message.id);
  };
  
  // Handle sending a reply
  const handleSendReply = () => {
    if (!replyText.trim()) {
      toast({
        title: "Error",
        description: "Please enter a reply message.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would send the reply via API
    toast({
      title: "Reply Sent",
      description: `Your reply to ${selectedMessage?.sender} has been sent.`,
    });
    
    setReplyText('');
    setIsReplyOpen(false);
  };
  
  // Get counts for the filters
  const unreadCount = messages.filter(m => !m.read && !m.archived).length;
  const starredCount = messages.filter(m => m.starred && !m.archived).length;
  const archivedCount = messages.filter(m => m.archived).length;
  
  return (
    <AdminLayout title="Messages">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              className="pl-8 w-full md:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center w-full md:w-auto">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter messages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Messages</SelectItem>
                <SelectItem value="unread">Unread ({unreadCount})</SelectItem>
                <SelectItem value="starred">Starred ({starredCount})</SelectItem>
                <SelectItem value="archived">Archived ({archivedCount})</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="ghost" className="ml-2" onClick={() => setSearchTerm('')}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
            <CardDescription>
              Manage inquiries and messages from your contact form
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Sender</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMessages.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8">
                      <p className="text-muted-foreground">No messages found</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMessages.map((message) => (
                    <TableRow 
                      key={message.id} 
                      className={!message.read ? "font-medium bg-muted/30" : ""}
                      onClick={() => handleOpenMessage(message)}
                      style={{ cursor: 'pointer' }}
                    >
                      <TableCell>
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={message.avatar || undefined} />
                            <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p>{message.sender}</p>
                            <p className="text-xs text-muted-foreground">{message.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {message.starred && (
                            <Star className="h-4 w-4 text-yellow-500 mr-2" />
                          )}
                          {!message.read ? (
                            <Mail className="h-4 w-4 mr-2" />
                          ) : (
                            <MailOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                          )}
                          <span>{message.subject}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="text-muted-foreground">
                          {new Date(message.date).toLocaleDateString()}
                        </span>
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleStar(message.id);
                          }}
                        >
                          {message.starred ? (
                            <StarOff className="h-4 w-4" />
                          ) : (
                            <Star className="h-4 w-4" />
                          )}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleArchive(message.id);
                          }}
                        >
                          <Archive className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(message.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      {/* Message Detail Dialog */}
      {selectedMessage && (
        <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedMessage.subject}</DialogTitle>
              <DialogDescription className="flex justify-between">
                <span>From: {selectedMessage.sender} ({selectedMessage.email})</span>
                <span>{new Date(selectedMessage.date).toLocaleString()}</span>
              </DialogDescription>
            </DialogHeader>
            
            <div className="border-t border-b py-4 my-4">
              <p className="whitespace-pre-line">{selectedMessage.message}</p>
            </div>
            
            {isReplyOpen ? (
              <div className="space-y-4">
                <Textarea 
                  placeholder="Type your reply here..." 
                  className="min-h-[150px]"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsReplyOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSendReply}>
                    <Send className="mr-2 h-4 w-4" />
                    Send Reply
                  </Button>
                </div>
              </div>
            ) : (
              <DialogFooter className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      handleArchive(selectedMessage.id);
                      setSelectedMessage(null);
                    }}
                  >
                    <Archive className="mr-2 h-4 w-4" />
                    Archive
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      handleDelete(selectedMessage.id);
                      setSelectedMessage(null);
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
                
                <Button onClick={() => setIsReplyOpen(true)}>
                  <Mail className="mr-2 h-4 w-4" />
                  Reply
                </Button>
              </DialogFooter>
            )}
          </DialogContent>
        </Dialog>
      )}
    </AdminLayout>
  );
};

export default AdminMessages;
