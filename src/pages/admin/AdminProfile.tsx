
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useProfile, Education, WorkExperience, Skill, SocialLink } from '@/contexts/ProfileContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { FormEvent } from 'react';
import { Plus, Trash2, Save, Edit, Calendar, AtSign, MapPin, Phone } from 'lucide-react';
import EnhancedFileUpload from '@/components/admin/EnhancedFileUpload';

// Define proper types with required fields
interface EducationFormData {
  id: string; // Not optional
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ExperienceFormData {
  id: string; // Not optional
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  location: string;
}

interface SkillFormData {
  id: string; // Not optional
  name: string;
  level: number;
  category?: string;
}

interface SocialLinkFormData {
  platform: string;
  url: string;
  icon?: string;
}

const AdminProfile: React.FC = () => {
  const { 
    profileData, 
    updatePersonalInfo, 
    addEducation,
    updateEducation,
    removeEducation,
    addWorkExperience,
    updateWorkExperience,
    removeWorkExperience,
    addSkill,
    updateSkill,
    removeSkill,
    addSocialLink,
    updateSocialLink,
    removeSocialLink,
    updateAvatar,
    updateCoverImage
  } = useProfile();
  
  // Initialize form states with required fields
  const [educationForm, setEducationForm] = useState<EducationFormData>({
    id: Date.now().toString(), // Ensure ID is always set
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    description: ''
  });
  
  const [experienceForm, setExperienceForm] = useState<ExperienceFormData>({
    id: Date.now().toString(), // Ensure ID is always set
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
    location: ''
  });
  
  const [skillForm, setSkillForm] = useState<SkillFormData>({
    id: Date.now().toString(), // Ensure ID is always set
    name: '',
    level: 50,
    category: ''
  });
  
  const [socialLinkForm, setSocialLinkForm] = useState<SocialLinkFormData>({
    platform: '',
    url: '',
    icon: ''
  });
  
  const [personalInfo, setPersonalInfo] = useState({
    name: profileData.name,
    title: profileData.title,
    bio: profileData.bio,
    email: profileData.email,
    phone: profileData.phone,
    address: profileData.address,
    website: profileData.website
  });

  // Keep personalInfo in sync with profileData from context
  useEffect(() => {
    setPersonalInfo({
      name: profileData.name,
      title: profileData.title,
      bio: profileData.bio,
      email: profileData.email,
      phone: profileData.phone,
      address: profileData.address,
      website: profileData.website
    });
  }, [profileData]);
  
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSavePersonalInfo = () => {
    updatePersonalInfo(personalInfo);
    toast({
      title: "Personal Information Updated",
      description: "Your personal information has been updated successfully.",
    });
  };
  
  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEducationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setExperienceForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSkillForm(prev => ({
      ...prev,
      [name]: name === 'level' ? Number(value) : value
    }));
  };
  
  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSocialLinkForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleAddEducation = () => {
    if (!educationForm.institution || !educationForm.degree) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // ID is already set in the form state
    addEducation(educationForm);
    
    // Reset form with a new ID
    setEducationForm({
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: ''
    });
    
    toast({
      title: "Education Added",
      description: "Education record has been added successfully"
    });
  };
  
  const handleAddExperience = () => {
    if (!experienceForm.company || !experienceForm.position) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // ID is already set in the form state
    addWorkExperience(experienceForm);
    
    // Reset form with a new ID
    setExperienceForm({
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      location: ''
    });
    
    toast({
      title: "Experience Added",
      description: "Work experience has been added successfully"
    });
  };
  
  const handleAddSkill = () => {
    if (!skillForm.name) {
      toast({
        title: "Missing information",
        description: "Please provide a skill name",
        variant: "destructive"
      });
      return;
    }
    
    // ID is already set in the form state
    addSkill(skillForm);
    
    // Reset form with a new ID
    setSkillForm({
      id: Date.now().toString(),
      name: '',
      level: 50,
      category: ''
    });
    
    toast({
      title: "Skill Added",
      description: "Skill has been added successfully"
    });
  };
  
  const handleAddSocialLink = () => {
    if (!socialLinkForm.platform || !socialLinkForm.url) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Add the social link without index property
    addSocialLink(socialLinkForm);
    
    // Reset form
    setSocialLinkForm({
      platform: '',
      url: '',
      icon: ''
    });
    
    toast({
      title: "Social Link Added",
      description: "Social link has been added successfully"
    });
  };
  
  const handleEditEducation = (item: Education) => {
    setEducationForm(item);
  };
  
  const handleUpdateEducation = () => {
    if (!educationForm.id || !educationForm.institution || !educationForm.degree) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    updateEducation(educationForm.id, educationForm);
    
    // Reset form with a new ID
    setEducationForm({
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: ''
    });
    
    toast({
      title: "Education Updated",
      description: "Education record has been updated successfully"
    });
  };
  
  const handleEditExperience = (item: WorkExperience) => {
    setExperienceForm(item);
  };
  
  const handleUpdateExperience = () => {
    if (!experienceForm.id || !experienceForm.company || !experienceForm.position) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    updateWorkExperience(experienceForm.id, experienceForm);
    
    // Reset form with a new ID
    setExperienceForm({
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      location: ''
    });
    
    toast({
      title: "Experience Updated",
      description: "Work experience has been updated successfully"
    });
  };
  
  const handleEditSkill = (item: Skill) => {
    setSkillForm(item);
  };
  
  const handleUpdateSkill = () => {
    if (!skillForm.id || !skillForm.name) {
      toast({
        title: "Missing information",
        description: "Please provide a skill name",
        variant: "destructive"
      });
      return;
    }
    
    updateSkill(skillForm.id, skillForm);
    
    // Reset form with a new ID
    setSkillForm({
      id: Date.now().toString(),
      name: '',
      level: 50,
      category: ''
    });
    
    toast({
      title: "Skill Updated",
      description: "Skill has been updated successfully"
    });
  };
  
  const handleAvatarUpload = (url: string) => {
    updateAvatar(url);
    toast({
      title: "Avatar Updated",
      description: "Your profile avatar has been updated successfully."
    });
  };
  
  const handleCoverImageUpload = (url: string) => {
    updateCoverImage(url);
    toast({
      title: "Cover Image Updated",
      description: "Your profile cover image has been updated successfully."
    });
  };
  
  return (
    <AdminLayout title="Profile Management">
      <Tabs defaultValue="personal-info" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="social-links">Social Links</TabsTrigger>
        </TabsList>
        
        {/* Personal Info Tab */}
        <TabsContent value="personal-info" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Images</CardTitle>
              <CardDescription>Update your avatar and cover image</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label>Avatar Image</Label>
                  <div className="flex items-center gap-4">
                    <img 
                      src={profileData.avatar || "/assets/profile-placeholder.jpg"} 
                      alt="Avatar" 
                      className="w-24 h-24 rounded-full object-cover border" 
                    />
                    <EnhancedFileUpload 
                      endpoint="/api/uploads/avatar" 
                      label="Upload Avatar"
                      accept="image/*"
                      maxSize={2}
                      category="avatar"
                      onSuccess={handleAvatarUpload}
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label>Cover Image</Label>
                  <div className="flex flex-col gap-3">
                    <img 
                      src={profileData.coverImage || "/assets/cover-placeholder.jpg"} 
                      alt="Cover" 
                      className="w-full h-32 object-cover rounded-md border" 
                    />
                    <EnhancedFileUpload 
                      endpoint="/api/uploads/cover" 
                      label="Upload Cover"
                      accept="image/*"
                      maxSize={5}
                      category="cover"
                      onSuccess={handleCoverImageUpload}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={personalInfo.name} 
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="title">Professional Title</Label>
                  <Input 
                    id="title" 
                    name="title" 
                    value={personalInfo.title} 
                    onChange={handlePersonalInfoChange}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    name="bio" 
                    value={personalInfo.bio} 
                    onChange={handlePersonalInfoChange}
                    rows={5}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input 
                      id="email" 
                      name="email" 
                      type="email"
                      value={personalInfo.email} 
                      onChange={handlePersonalInfoChange}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={personalInfo.phone} 
                      onChange={handlePersonalInfoChange}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Location/Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input 
                      id="address" 
                      name="address" 
                      value={personalInfo.address} 
                      onChange={handlePersonalInfoChange}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input 
                    id="website" 
                    name="website" 
                    type="url"
                    value={personalInfo.website} 
                    onChange={handlePersonalInfoChange}
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <Button onClick={handleSavePersonalInfo}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Personal Information
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Education Tab */}
        <TabsContent value="education" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
              <CardDescription>Add or update your educational background</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profileData.education.length > 0 ? (
                  <div className="space-y-4">
                    {profileData.education.map((item) => (
                      <div key={item.id} className="border rounded-md p-4 flex flex-col md:flex-row justify-between">
                        <div>
                          <div className="font-medium">{item.institution}</div>
                          <div>{item.degree} in {item.field}</div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <Calendar className="mr-1 h-4 w-4" /> 
                            {item.startDate} - {item.endDate}
                          </div>
                          {item.description && (
                            <div className="mt-2 text-sm">{item.description}</div>
                          )}
                        </div>
                        <div className="flex mt-2 md:mt-0">
                          <Button variant="ghost" size="icon" onClick={() => handleEditEducation(item)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => removeEducation(item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No education records added yet.
                  </div>
                )}
                
                <div className="border-t pt-4 mt-4">
                  <h3 className="font-medium mb-4">
                    {educationForm.id && profileData.education.some(e => e.id === educationForm.id) 
                      ? "Update Education" 
                      : "Add New Education"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="institution">Institution</Label>
                      <Input 
                        id="institution" 
                        name="institution"
                        value={educationForm.institution} 
                        onChange={handleEducationChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="degree">Degree</Label>
                      <Input 
                        id="degree" 
                        name="degree"
                        value={educationForm.degree} 
                        onChange={handleEducationChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="field">Field of Study</Label>
                      <Input 
                        id="field" 
                        name="field"
                        value={educationForm.field} 
                        onChange={handleEducationChange}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input 
                          id="startDate" 
                          name="startDate"
                          value={educationForm.startDate} 
                          onChange={handleEducationChange}
                          placeholder="YYYY-MM"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="endDate">End Date</Label>
                        <Input 
                          id="endDate" 
                          name="endDate"
                          value={educationForm.endDate} 
                          onChange={handleEducationChange}
                          placeholder="YYYY-MM or Present"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="description">Description (Optional)</Label>
                      <Textarea 
                        id="description" 
                        name="description"
                        value={educationForm.description} 
                        onChange={handleEducationChange}
                        rows={3}
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    {educationForm.id && profileData.education.some(e => e.id === educationForm.id) ? (
                      <>
                        <Button onClick={handleUpdateEducation}>
                          <Save className="mr-2 h-4 w-4" />
                          Update Education
                        </Button>
                        <Button variant="outline" onClick={() => setEducationForm({
                          id: Date.now().toString(),
                          institution: '',
                          degree: '',
                          field: '',
                          startDate: '',
                          endDate: '',
                          description: ''
                        })}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button onClick={handleAddEducation}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Education
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Experience Tab */}
        <TabsContent value="experience" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Work Experience</CardTitle>
              <CardDescription>Add or update your work experience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profileData.workExperience.length > 0 ? (
                  <div className="space-y-4">
                    {profileData.workExperience.map((item) => (
                      <div key={item.id} className="border rounded-md p-4 flex flex-col md:flex-row justify-between">
                        <div>
                          <div className="font-medium">{item.position}</div>
                          <div>{item.company}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-4">
                            <span className="flex items-center">
                              <Calendar className="mr-1 h-4 w-4" /> 
                              {item.startDate} - {item.endDate}
                            </span>
                            <span className="flex items-center">
                              <MapPin className="mr-1 h-4 w-4" />
                              {item.location}
                            </span>
                          </div>
                          {item.description && (
                            <div className="mt-2 text-sm">{item.description}</div>
                          )}
                        </div>
                        <div className="flex mt-2 md:mt-0">
                          <Button variant="ghost" size="icon" onClick={() => handleEditExperience(item)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => removeWorkExperience(item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No work experience added yet.
                  </div>
                )}
                
                <div className="border-t pt-4 mt-4">
                  <h3 className="font-medium mb-4">
                    {experienceForm.id && profileData.workExperience.some(e => e.id === experienceForm.id) 
                      ? "Update Experience" 
                      : "Add New Experience"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="position">Position</Label>
                      <Input 
                        id="position" 
                        name="position"
                        value={experienceForm.position} 
                        onChange={handleExperienceChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input 
                        id="company" 
                        name="company"
                        value={experienceForm.company} 
                        onChange={handleExperienceChange}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor="experienceStartDate">Start Date</Label>
                        <Input 
                          id="experienceStartDate" 
                          name="startDate"
                          value={experienceForm.startDate} 
                          onChange={handleExperienceChange}
                          placeholder="YYYY-MM"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="experienceEndDate">End Date</Label>
                        <Input 
                          id="experienceEndDate" 
                          name="endDate"
                          value={experienceForm.endDate} 
                          onChange={handleExperienceChange}
                          placeholder="YYYY-MM or Present"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input 
                        id="location" 
                        name="location"
                        value={experienceForm.location} 
                        onChange={handleExperienceChange}
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="experienceDescription">Description (Optional)</Label>
                      <Textarea 
                        id="experienceDescription" 
                        name="description"
                        value={experienceForm.description} 
                        onChange={handleExperienceChange}
                        rows={3}
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    {experienceForm.id && profileData.workExperience.some(e => e.id === experienceForm.id) ? (
                      <>
                        <Button onClick={handleUpdateExperience}>
                          <Save className="mr-2 h-4 w-4" />
                          Update Experience
                        </Button>
                        <Button variant="outline" onClick={() => setExperienceForm({
                          id: Date.now().toString(),
                          company: '',
                          position: '',
                          startDate: '',
                          endDate: '',
                          description: '',
                          location: ''
                        })}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button onClick={handleAddExperience}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Experience
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
              <CardDescription>Add or update your professional skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profileData.skills.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profileData.skills.map((item) => (
                      <div key={item.id} className="border rounded-md p-4 flex justify-between">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="mt-1 h-2 w-40 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary" 
                              style={{ width: `${item.level}%` }}
                            ></div>
                          </div>
                          {item.category && (
                            <div className="text-xs mt-1 text-muted-foreground">
                              Category: {item.category}
                            </div>
                          )}
                        </div>
                        <div className="flex">
                          <Button variant="ghost" size="icon" onClick={() => handleEditSkill(item)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => removeSkill(item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No skills added yet.
                  </div>
                )}
                
                <div className="border-t pt-4 mt-4">
                  <h3 className="font-medium mb-4">
                    {skillForm.id && profileData.skills.some(s => s.id === skillForm.id) 
                      ? "Update Skill" 
                      : "Add New Skill"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="skillName">Skill Name</Label>
                      <Input 
                        id="skillName" 
                        name="name"
                        value={skillForm.name} 
                        onChange={handleSkillChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Category (Optional)</Label>
                      <Input 
                        id="category" 
                        name="category"
                        value={skillForm.category || ''} 
                        onChange={handleSkillChange}
                        placeholder="e.g., Programming, Design, Marketing"
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <div className="flex justify-between">
                        <Label htmlFor="level">Proficiency Level: {skillForm.level}%</Label>
                        <span className="text-sm text-muted-foreground">
                          {skillForm.level < 30 ? 'Beginner' : 
                           skillForm.level < 60 ? 'Intermediate' : 
                           skillForm.level < 80 ? 'Advanced' : 'Expert'}
                        </span>
                      </div>
                      <Input 
                        id="level" 
                        name="level"
                        type="range"
                        min="0"
                        max="100"
                        value={skillForm.level} 
                        onChange={handleSkillChange}
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    {skillForm.id && profileData.skills.some(s => s.id === skillForm.id) ? (
                      <>
                        <Button onClick={handleUpdateSkill}>
                          <Save className="mr-2 h-4 w-4" />
                          Update Skill
                        </Button>
                        <Button variant="outline" onClick={() => setSkillForm({
                          id: Date.now().toString(),
                          name: '',
                          level: 50,
                          category: ''
                        })}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button onClick={handleAddSkill}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Skill
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Social Links Tab */}
        <TabsContent value="social-links" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
              <CardDescription>Connect your social media profiles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profileData.socialLinks.length > 0 ? (
                  <div className="space-y-2">
                    {profileData.socialLinks.map((link, index) => (
                      <div key={index} className="flex items-center justify-between border p-3 rounded-md">
                        <div>
                          <div className="font-medium capitalize">{link.platform}</div>
                          <a 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-muted-foreground hover:text-primary truncate max-w-sm block"
                          >
                            {link.url}
                          </a>
                        </div>
                        <div className="flex">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => setSocialLinkForm({
                              platform: link.platform,
                              url: link.url,
                              icon: link.icon
                            })}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => removeSocialLink(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No social links added yet.
                  </div>
                )}
                
                <div className="border-t pt-4 mt-4">
                  <h3 className="font-medium mb-4">Add Social Link</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="platform">Platform</Label>
                      <Input 
                        id="platform" 
                        name="platform"
                        value={socialLinkForm.platform} 
                        onChange={handleSocialLinkChange}
                        placeholder="e.g., LinkedIn, Twitter, Instagram"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="url">Profile URL</Label>
                      <Input 
                        id="url" 
                        name="url"
                        type="url"
                        value={socialLinkForm.url} 
                        onChange={handleSocialLinkChange}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Button onClick={handleAddSocialLink}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Social Link
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminProfile;
