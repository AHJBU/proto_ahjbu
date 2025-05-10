
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Upload, RefreshCw, FileDown, FilePlus, Loader2, CheckCircle2, File } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { Progress } from '@/components/ui/progress';

// Mock backup history
const backupHistory = [
  { id: '1', date: '2025-05-06T15:32:24', size: '24.5 MB', type: 'Full', status: 'Completed' },
  { id: '2', date: '2025-05-01T10:15:42', size: '23.8 MB', type: 'Full', status: 'Completed' },
  { id: '3', date: '2025-04-24T08:45:11', size: '22.9 MB', type: 'Full', status: 'Completed' },
  { id: '4', date: '2025-04-17T14:22:35', size: '22.1 MB', type: 'Full', status: 'Completed' },
  { id: '5', date: '2025-04-10T09:05:18', size: '21.6 MB', type: 'Full', status: 'Completed' },
];

const AdminBackup: React.FC = () => {
  const { toast } = useToast();
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState<string | null>(null);
  const [backupProgress, setBackupProgress] = useState(0);
  const [restoreProgress, setRestoreProgress] = useState(0);
  const [backups, setBackups] = useState(backupHistory);
  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupFrequency: 7,
    includeMedia: true,
    includeConfigs: true,
    includeStatistics: true,
  });

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(date);
  };

  const simulateProgress = (
    setProgress: React.Dispatch<React.SetStateAction<number>>, 
    onComplete: () => void,
    duration: number = 2500
  ) => {
    setProgress(0);
    const interval = 30; // Update every 30ms
    const steps = duration / interval;
    const increment = 100 / steps;
    let currentProgress = 0;
    
    const timer = setInterval(() => {
      currentProgress += increment;
      // Add some randomness to make it feel more real
      const displayProgress = Math.min(currentProgress + (Math.random() * 2 - 1), 99.5);
      setProgress(displayProgress);
      
      if (currentProgress >= 100) {
        clearInterval(timer);
        setProgress(100);
        setTimeout(() => {
          onComplete();
        }, 200);
      }
    }, interval);
  };

  const handleCreateBackup = async () => {
    if (isBackingUp) return;
    
    setIsBackingUp(true);
    
    try {
      simulateProgress(setBackupProgress, () => {
        const newBackupId = (parseInt(backups[0].id) + 1).toString();
        const newBackup = { 
          id: newBackupId, 
          date: new Date().toISOString(), 
          size: `${(Math.random() * 5 + 24).toFixed(1)} MB`, 
          type: 'Full', 
          status: 'Completed' 
        };
        
        setBackups([newBackup, ...backups]);
        
        toast({
          title: "Backup Created",
          description: "Your backup has been successfully created",
        });
        
        setIsBackingUp(false);
        setBackupProgress(0);
      }, 2500);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Backup Failed",
        description: "There was an error creating your backup",
      });
      setIsBackingUp(false);
      setBackupProgress(0);
    }
  };

  const handleRestore = async (backupId: string) => {
    if (isRestoring) return;
    
    setIsRestoring(true);
    setSelectedBackup(backupId);
    
    try {
      simulateProgress(setRestoreProgress, () => {
        toast({
          title: "Restore Completed",
          description: "Your data has been successfully restored",
        });
        setIsRestoring(false);
        setSelectedBackup(null);
        setRestoreProgress(0);
      }, 3000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Restore Failed",
        description: "There was an error restoring your data",
      });
      setIsRestoring(false);
      setSelectedBackup(null);
      setRestoreProgress(0);
    }
  };

  const handleDownloadBackup = (backupId: string) => {
    const backup = backups.find(b => b.id === backupId);
    if (!backup) return;
    
    // Create a mock file for download
    const content = JSON.stringify({
      backup_id: backupId,
      date: backup.date,
      type: backup.type,
      data: "This is a simulated backup file content",
    });
    
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `backup_${backupId}_${new Date(backup.date).toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download Started",
      description: `Backup ${backupId} download initiated`,
    });
  };

  const handleUploadBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Simulate file processing
      setIsRestoring(true);
      
      simulateProgress(setRestoreProgress, () => {
        const newBackupId = (parseInt(backups[0].id) + 1).toString();
        const newBackup = { 
          id: newBackupId, 
          date: new Date().toISOString(), 
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`, 
          type: 'Imported', 
          status: 'Completed' 
        };
        
        setBackups([newBackup, ...backups]);
        
        toast({
          title: "Backup Uploaded",
          description: `${file.name} has been uploaded and processed`,
        });
        
        setIsRestoring(false);
        setRestoreProgress(0);
      }, 2000);
    }
  };

  const handleSettingChange = (key: string, value: any) => {
    setBackupSettings(prev => ({
      ...prev,
      [key]: value
    }));
    
    toast({
      title: "Settings Updated",
      description: `Backup setting "${key}" has been updated`,
    });
  };

  return (
    <ProtectedRoute>
      <AdminLayout title="Backup & Restore">
        <Tabs defaultValue="backup">
          <TabsList className="grid grid-cols-3 mb-6 w-full sm:w-auto">
            <TabsTrigger value="backup">Backup</TabsTrigger>
            <TabsTrigger value="restore">Restore</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="backup">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Create Backup</CardTitle>
                  <CardDescription>Create a new backup of your website data</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    This will create a complete backup of all your website data, including content,
                    settings, and media files.
                  </p>
                  
                  {isBackingUp && (
                    <div className="mb-4 space-y-2">
                      <Progress value={backupProgress} />
                      <p className="text-sm text-muted-foreground text-right">
                        {Math.round(backupProgress)}%
                      </p>
                    </div>
                  )}
                  
                  <Button 
                    onClick={handleCreateBackup} 
                    disabled={isBackingUp}
                  >
                    {isBackingUp ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Backup...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Create Backup
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Backup History</CardTitle>
                  <CardDescription>List of previous backups</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-80">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Size</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {backups.map((backup) => (
                          <TableRow key={backup.id}>
                            <TableCell>{formatDate(backup.date)}</TableCell>
                            <TableCell>{backup.size}</TableCell>
                            <TableCell>{backup.type}</TableCell>
                            <TableCell className="flex items-center gap-1">
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                              {backup.status}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleRestore(backup.id)}
                                  disabled={isRestoring}
                                >
                                  {isRestoring && selectedBackup === backup.id ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <RefreshCw className="h-4 w-4" />
                                  )}
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleDownloadBackup(backup.id)}
                                >
                                  <FileDown className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="restore">
            <Card>
              <CardHeader>
                <CardTitle>Restore from Backup</CardTitle>
                <CardDescription>Restore your website from a backup file</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Upload Backup File</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload a backup file to restore your website data.
                  </p>
                  
                  {isRestoring && (
                    <div className="mb-4 space-y-2">
                      <Progress value={restoreProgress} />
                      <p className="text-sm text-muted-foreground text-right">
                        {Math.round(restoreProgress)}%
                      </p>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4">
                    <Input
                      id="backup-file"
                      type="file"
                      accept=".json,.zip"
                      onChange={handleUploadBackup}
                      className="max-w-md"
                      disabled={isRestoring}
                    />
                    <Button disabled={isRestoring}>
                      {isRestoring ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Upload className="mr-2 h-4 w-4" />
                      )}
                      Upload
                    </Button>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium mb-2">Choose from Existing Backups</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Select a previous backup to restore.
                  </p>
                  <ScrollArea className="h-64">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Size</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {backups.map((backup) => (
                          <TableRow key={backup.id}>
                            <TableCell>{formatDate(backup.date)}</TableCell>
                            <TableCell>{backup.size}</TableCell>
                            <TableCell>{backup.type}</TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="default" 
                                size="sm"
                                onClick={() => handleRestore(backup.id)}
                                disabled={isRestoring}
                              >
                                {isRestoring && selectedBackup === backup.id ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Restoring...
                                  </>
                                ) : (
                                  <>
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Restore
                                  </>
                                )}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 border-t">
                <p className="text-sm text-muted-foreground">
                  <strong>Warning:</strong> Restoring from a backup will overwrite your current website data.
                  This action cannot be undone.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Backup Settings</CardTitle>
                <CardDescription>Configure your backup preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-medium">Automatic Backups</h3>
                    <p className="text-sm text-muted-foreground">Enable regularly scheduled backups</p>
                  </div>
                  <Switch 
                    checked={backupSettings.autoBackup}
                    onCheckedChange={(checked) => handleSettingChange('autoBackup', checked)}
                  />
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="text-base font-medium mb-2">Backup Frequency</h3>
                  <p className="text-sm text-muted-foreground mb-4">How often automatic backups should run</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 3, 7].map((days) => (
                      <Button
                        key={days}
                        variant={backupSettings.backupFrequency === days ? "default" : "outline"}
                        onClick={() => handleSettingChange('backupFrequency', days)}
                      >
                        {days === 1 ? 'Daily' : `Every ${days} days`}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-4 space-y-4">
                  <h3 className="text-base font-medium">Include in Backups</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Media Files</p>
                      <p className="text-sm text-muted-foreground">Images, videos, and documents</p>
                    </div>
                    <Switch 
                      checked={backupSettings.includeMedia}
                      onCheckedChange={(checked) => handleSettingChange('includeMedia', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Configuration Files</p>
                      <p className="text-sm text-muted-foreground">Settings, preferences, and integrations</p>
                    </div>
                    <Switch 
                      checked={backupSettings.includeConfigs}
                      onCheckedChange={(checked) => handleSettingChange('includeConfigs', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Analytics Data</p>
                      <p className="text-sm text-muted-foreground">Statistics and visitor data</p>
                    </div>
                    <Switch 
                      checked={backupSettings.includeStatistics}
                      onCheckedChange={(checked) => handleSettingChange('includeStatistics', checked)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t flex justify-between">
                <Button variant="outline" onClick={() => {
                  setBackupSettings({
                    autoBackup: true,
                    backupFrequency: 7,
                    includeMedia: true,
                    includeConfigs: true,
                    includeStatistics: true,
                  });
                  toast({
                    title: "Settings Reset",
                    description: "Backup settings have been reset to defaults"
                  });
                }}>Reset to Defaults</Button>
                <Button onClick={() => {
                  toast({
                    title: "Settings Saved",
                    description: "Your backup settings have been saved"
                  });
                }}>Save Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminBackup;
