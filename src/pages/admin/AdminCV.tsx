import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Upload, Download, Eye, Calendar } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { getCvData, updateCvData, CvData, CvSettings } from '@/services/contentService'; // Updated import

const AdminCV: React.FC = () => {
  const { toast } = useToast();
  const [cvData, setCvData] = useState<CvData | null>(null);
  const [cvSettings, setCvSettings] = useState<CvSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getCvData();
        setCvData(data?.data || { fileName: 'Your_CV.pdf', lastUpdated: new Date().toISOString(), url: '' });
        setCvSettings(data?.settings || { showDownloadButton: true, showUpdateDate: true, generateFromProfile: false });
      } catch (err) {
        setError('Failed to load CV data.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Optimistically update UI, actual save on button click
      setCvData(prev => ({
        ...(prev || { fileName: '', lastUpdated: '', url: '' }),
        fileName: file.name,
        lastUpdated: new Date().toISOString(),
        // url: URL.createObjectURL(file) // Temporary URL for preview if needed immediately
      }));
      toast({ title: "File Selected", description: `${file.name} is ready to be saved.` });
    }
  };

  const triggerFileUpload = () => {
    document.getElementById('cv-upload-input')?.click();
  };

  const handleSaveCv = async () => {
    if (!cvData) return;
    setIsLoading(true);
    setError(null);

    let fileUrl = cvData.url;
    let newFileName = cvData.fileName;
    let newLastUpdated = cvData.lastUpdated;

    if (uploadedFile) {
      // In a real app, upload the file to a server and get the URL
      // For localStorage, we might store a base64 string or just metadata
      // For this example, we'll just use the file name and simulate an update.
      // If you were to store the file itself in localStorage (not recommended for large files):
      // const reader = new FileReader();
      // reader.onload = async (e) => {
      //   fileUrl = e.target?.result as string; 
      //   // ... then save
      // };
      // reader.readAsDataURL(uploadedFile);
      
      // Simulate upload and URL generation
      fileUrl = `/uploads/cv/${uploadedFile.name}`; // Placeholder URL
      newFileName = uploadedFile.name;
      newLastUpdated = new Date().toISOString();
      toast({ title: "CV Uploaded (Simulated)", description: `File ${uploadedFile.name} would be uploaded.` });
    }

    const dataToSave: CvData = {
        ...cvData,
        fileName: newFileName,
        lastUpdated: newLastUpdated,
        url: fileUrl,
    };

    try {
      const success = await updateCvData({ data: dataToSave, settings: cvSettings || { showDownloadButton: true, showUpdateDate: true, generateFromProfile: false } });
      if (success) {
        setCvData(dataToSave);
        setUploadedFile(null); // Clear uploaded file after save
        toast({ title: "Success", description: "CV data updated successfully." });
      } else {
        setError('Failed to save CV data.');
        toast({ variant: "destructive", title: "Error", description: "Failed to save CV data." });
      }
    } catch (err) {
      setError('An error occurred while saving CV data.');
      toast({ variant: "destructive", title: "Error", description: "An error occurred while saving CV data." });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (cvData?.url) {
        // In a real app, this would point to the actual file URL
        // For simulation with localstorage, this might be tricky without actual file hosting
        if (cvData.url.startsWith('blob:') || cvData.url.startsWith('data:')) {
             const link = document.createElement('a');
             link.href = cvData.url;
             link.download = cvData.fileName;
             document.body.appendChild(link);
             link.click();
             document.body.removeChild(link);
        } else {
            toast({ title: "Download (Simulated)", description: `Would download ${cvData.fileName} from ${cvData.url}` });
        }
    } else {
      toast({ variant: "destructive", title: "No CV", description: "No CV file URL available for download." });
    }
  };

  const handlePreview = () => {
    if (cvData?.url && (cvData.url.startsWith('blob:') || cvData.url.startsWith('data:') || cvData.url.includes('.pdf'))) {
        setPreviewOpen(true);
    } else if (uploadedFile) {
        const tempUrl = URL.createObjectURL(uploadedFile);
        setCvData(prev => ({...(prev!), url: tempUrl})); // Set temporary URL for preview
        setPreviewOpen(true);
    } else {
      toast({ variant: "destructive", title: "No Preview", description: "No CV file available for preview." });
    }
  };

  const handleSettingsChange = async (key: keyof CvSettings, value: boolean) => {
    const newSettings = { ...(cvSettings || { showDownloadButton: true, showUpdateDate: true, generateFromProfile: false }), [key]: value };
    setCvSettings(newSettings);
    setIsLoading(true);
    try {
        // Save immediately when a setting changes
        const success = await updateCvData({ data: cvData!, settings: newSettings });
        if (success) {
            toast({
                title: "Settings Updated",
                description: `CV setting "${key}" has been ${value ? 'enabled' : 'disabled'}`,
            });
        } else {
            toast({ variant: "destructive", title: "Error", description: "Failed to save CV settings." });
            // Revert UI change if save failed - or handle more gracefully
            setCvSettings(cvSettings); 
        }
    } catch (err) {
        toast({ variant: "destructive", title: "Error", description: "An error occurred while saving settings." });
        setCvSettings(cvSettings); 
        console.error(err);
    } finally {
        setIsLoading(false);
    }
  };
  
  const handleGenerateCV = () => {
    toast({
      title: "Generating CV (Simulated)",
      description: "Creating CV from your profile data...",
    });
    // This would be a complex feature involving backend PDF generation
    // For now, just simulate it.
    const generatedFileName = `Generated_CV_${Date.now()}.pdf`;
    const currentDate = new Date().toISOString();
    const generatedCvData: CvData = {
        fileName: generatedFileName,
        lastUpdated: currentDate,
        url: `/generated_cvs/${generatedFileName}` // Placeholder URL
    };
    setCvData(generatedCvData);
    // Automatically save this generated CV metadata
    updateCvData({ data: generatedCvData, settings: cvSettings! });
    toast({ title: "CV Generated (Simulated)", description: "Your CV has been generated." });
  };

  if (isLoading && !cvData) return <AdminLayout title="CV Management"><p>Loading CV data...</p></AdminLayout>;
  if (error) return <AdminLayout title="CV Management"><p>Error: {error}</p></AdminLayout>;

  return (
    <AdminLayout title="CV Management">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current CV</CardTitle>
            <CardDescription>Manage and update your curriculum vitae</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-6 border-2 border-dashed rounded-md flex flex-col items-center justify-center text-center">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="font-medium">{cvData?.fileName || 'No CV uploaded'}</p>
              {cvData?.lastUpdated && (
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-4 w-4" /> Last updated: {new Date(cvData.lastUpdated).toLocaleDateString()}
                </p>
              )}
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={handleDownload} disabled={!cvData?.url || isLoading}>
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
                <Button variant="outline" size="sm" onClick={handlePreview} disabled={(!cvData?.url && !uploadedFile) || isLoading}>
                  <Eye className="mr-2 h-4 w-4" /> Preview
                </Button>
              </div>
            </div>
            <input type="file" id="cv-upload-input" accept=".pdf,.doc,.docx" onChange={handleFileUpload} className="hidden" />
            <Button className="w-full" onClick={triggerFileUpload} disabled={isLoading}>
              <Upload className="mr-2 h-4 w-4" /> Upload New CV File
            </Button>
            <Button className="w-full mt-2" onClick={handleSaveCv} disabled={isLoading || (!uploadedFile && cvData?.url === '')}>
              {isLoading ? 'Saving...' : 'Save CV Changes'}
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>CV Settings</CardTitle>
            <CardDescription>Configure how your CV is displayed on the website</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-md">
              <span>Show CV download button on public profile</span>
              <Switch 
                checked={cvSettings?.showDownloadButton || false} 
                onCheckedChange={(checked) => handleSettingsChange('showDownloadButton', checked)} 
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center justify-between p-3 border rounded-md">
              <span>Display CV last updated date</span>
              <Switch 
                checked={cvSettings?.showUpdateDate || false}
                onCheckedChange={(checked) => handleSettingsChange('showUpdateDate', checked)}
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center justify-between p-3 border rounded-md">
              <span>Generate CV from profile data (Simulated)</span>
              <Button variant="secondary" size="sm" onClick={handleGenerateCV} disabled={isLoading}>
                Generate
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>CV Preview: {cvData?.fileName}</DialogTitle>
          </DialogHeader>
          { (cvData?.url && (cvData.url.startsWith('blob:') || cvData.url.startsWith('data:') || cvData.url.endsWith('.pdf'))) ? (
            <iframe 
              src={cvData.url} 
              className="w-full h-full border rounded flex-grow"
              title="CV Preview"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center flex-grow">
              <p className="text-muted-foreground">Cannot preview this file type or no file URL. Please upload a PDF for preview.</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminCV;

