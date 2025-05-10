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
import { Plus, Trash2, Save, Edit, Calendar, AtSign, MapPin, Phone } from 'lucide-react';
import EnhancedFileUpload from '@/components/admin/EnhancedFileUpload';

const AdminPersonalProfile: React.FC = () => {
  const {
    profileData,
    updatePersonalInfo,
    updateAvatar,
    updateCoverImage,
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
    removeSocialLink
  } = useProfile();

  // Personal Info State (bilingual)
  const [personalInfo, setPersonalInfo] = useState({
    nameAr: profileData.nameAr || '',
    nameEn: profileData.nameEn || '',
    titleAr: profileData.titleAr || '',
    titleEn: profileData.titleEn || '',
    bioAr: profileData.bioAr || '',
    bioEn: profileData.bioEn || '',
    email: profileData.email || '',
    phone: profileData.phone || '',
    addressAr: profileData.addressAr || '',
    addressEn: profileData.addressEn || '',
    website: profileData.website || '',
    avatar: profileData.avatar || '',
    logo: profileData.logo || ''
  });

  // Education State
  const [educationForm, setEducationForm] = useState({
    id: Date.now().toString(),
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  // Experience State
  const [experienceForm, setExperienceForm] = useState({
    id: Date.now().toString(),
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
    location: ''
  });

  // Skill State
  const [skillForm, setSkillForm] = useState<Skill>({
    id: Date.now().toString(),
    name: '',
    level: 50
    // category is optional
  });

  // Social Link State
  const [socialLinkForm, setSocialLinkForm] = useState<SocialLink>({
    platform: '',
    url: ''
    // icon is optional
  });

  useEffect(() => {
    setPersonalInfo({
      nameAr: profileData.nameAr || '',
      nameEn: profileData.nameEn || '',
      titleAr: profileData.titleAr || '',
      titleEn: profileData.titleEn || '',
      bioAr: profileData.bioAr || '',
      bioEn: profileData.bioEn || '',
      email: profileData.email || '',
      phone: profileData.phone || '',
      addressAr: profileData.addressAr || '',
      addressEn: profileData.addressEn || '',
      website: profileData.website || '',
      avatar: profileData.avatar || '',
      logo: profileData.logo || ''
    });
  }, [profileData]);

  // Handlers for Education
  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEducationForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddEducation = () => {
    if (!educationForm.institution || !educationForm.degree) {
      toast({ title: "Missing information", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    addEducation(educationForm);
    setEducationForm({ id: Date.now().toString(), institution: '', degree: '', field: '', startDate: '', endDate: '', description: '' });
    toast({ title: "Education Added", description: "Education record has been added successfully" });
  };

  const handleEditEducation = (item: Education) => {
    setEducationForm(item);
  };

  const handleUpdateEducation = () => {
    if (!educationForm.id || !educationForm.institution || !educationForm.degree) {
      toast({ title: "Missing information", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    updateEducation(educationForm.id, educationForm);
    setEducationForm({ id: Date.now().toString(), institution: '', degree: '', field: '', startDate: '', endDate: '', description: '' });
    toast({ title: "Education Updated", description: "Education record has been updated successfully" });
  };

  // Handlers for Experience
  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setExperienceForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddExperience = () => {
    if (!experienceForm.company || !experienceForm.position) {
      toast({ title: "Missing information", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    addWorkExperience(experienceForm);
    setExperienceForm({ id: Date.now().toString(), company: '', position: '', startDate: '', endDate: '', description: '', location: '' });
    toast({ title: "Experience Added", description: "Work experience has been added successfully" });
  };

  const handleEditExperience = (item: WorkExperience) => {
    setExperienceForm(item);
  };

  const handleUpdateExperience = () => {
    if (!experienceForm.id || !experienceForm.company || !experienceForm.position) {
      toast({ title: "Missing information", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    updateWorkExperience(experienceForm.id, experienceForm);
    setExperienceForm({ id: Date.now().toString(), company: '', position: '', startDate: '', endDate: '', description: '', location: '' });
    toast({ title: "Experience Updated", description: "Work experience has been updated successfully" });
  };

  // Handlers for Skills
  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSkillForm(prev => ({ ...prev, [name]: name === 'level' ? Number(value) : value }));
  };

  const handleAddSkill = () => {
    if (!skillForm.name) {
      toast({ title: "Missing information", description: "Please provide a skill name", variant: "destructive" });
      return;
    }
    addSkill(skillForm);
    setSkillForm({ id: Date.now().toString(), name: '', level: 50, category: '' });
    toast({ title: "Skill Added", description: "Skill has been added successfully" });
  };

  const handleEditSkill = (item: Skill) => {
    setSkillForm({
      id: item.id,
      name: item.name,
      level: item.level,
      ...(item.category ? { category: item.category } : {})
    });
  };

  const handleUpdateSkill = () => {
    if (!skillForm.id || !skillForm.name) {
      toast({ title: "Missing information", description: "Please provide a skill name", variant: "destructive" });
      return;
    }
    updateSkill(skillForm.id, skillForm);
    setSkillForm({ id: Date.now().toString(), name: '', level: 50, category: '' });
    toast({ title: "Skill Updated", description: "Skill has been updated successfully" });
  };

  // Handlers for Social Links
  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSocialLinkForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSocialLink = () => {
    if (!socialLinkForm.platform || !socialLinkForm.url) {
      toast({ title: "Missing information", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    addSocialLink(socialLinkForm);
    setSocialLinkForm({ platform: '', url: '', icon: '' });
    toast({ title: "Social Link Added", description: "Social link has been added successfully" });
  };

  const handleEditSocialLink = (item: SocialLink) => {
    setSocialLinkForm({
      platform: item.platform,
      url: item.url,
      ...(item.icon ? { icon: item.icon } : {})
    });
  };

  // No handleUpdateSocialLink since original AdminProfile doesn't have it
  // (Fixed misplaced object literal here)


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updatePersonalInfo(personalInfo);
  };

  const handleAvatarUpload = (url: string) => {
    updateAvatar(url);
    setPersonalInfo(prev => ({ ...prev, avatar: url }));
  };

  const handleLogoUpload = (url: string) => {
    updatePersonalInfo({ logo: url });
    setPersonalInfo(prev => ({ ...prev, logo: url }));
  };

  return (
    <AdminLayout title="Personal Profile">
      <div className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle>Personal Profile</CardTitle>
            <CardDescription>Manage your personal profile information in both Arabic and English.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="personal-info" className="w-full">
  <TabsList className="mb-4">
    <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
    <TabsTrigger value="education">Education</TabsTrigger>
    <TabsTrigger value="experience">Work Experience</TabsTrigger>
    <TabsTrigger value="skills">Skills</TabsTrigger>
    <TabsTrigger value="social-links">Social Links</TabsTrigger>
  </TabsList>

  {/* Personal Info Tab */}
  <TabsContent value="personal-info" className="space-y-6">
    <div className="space-y-4">
      <Label htmlFor="nameAr">الاسم (عربي)</Label>
      <Input id="nameAr" name="nameAr" value={personalInfo.nameAr} onChange={handleChange} />
      <Label htmlFor="nameEn">Name (English)</Label>
      <Input id="nameEn" name="nameEn" value={personalInfo.nameEn} onChange={handleChange} />
      <Label htmlFor="titleAr">المسمى الوظيفي (عربي)</Label>
      <Input id="titleAr" name="titleAr" value={personalInfo.titleAr} onChange={handleChange} />
      <Label htmlFor="titleEn">Job Title (English)</Label>
      <Input id="titleEn" name="titleEn" value={personalInfo.titleEn} onChange={handleChange} />
      <Label htmlFor="bioAr">نبذة (عربي)</Label>
      <Textarea id="bioAr" name="bioAr" value={personalInfo.bioAr} onChange={handleChange} />
      <Label htmlFor="bioEn">Bio (English)</Label>
      <Textarea id="bioEn" name="bioEn" value={personalInfo.bioEn} onChange={handleChange} />
      <Label htmlFor="addressAr">العنوان (عربي)</Label>
      <Input id="addressAr" name="addressAr" value={personalInfo.addressAr} onChange={handleChange} />
      <Label htmlFor="addressEn">Address (English)</Label>
      <Input id="addressEn" name="addressEn" value={personalInfo.addressEn} onChange={handleChange} />
      <Label htmlFor="email">Email Address</Label>
      <Input id="email" name="email" type="email" value={personalInfo.email} onChange={handleChange} />
      <Label htmlFor="phone">Phone Number</Label>
      <Input id="phone" name="phone" value={personalInfo.phone} onChange={handleChange} />
      <Label htmlFor="website">Website</Label>
      <Input id="website" name="website" type="url" value={personalInfo.website} onChange={handleChange} />
      <div className="mt-6">
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Personal Information
        </Button>
      </div>
    </div>
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
          {profileData.education && profileData.education.length > 0 ? (
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
              {educationForm.id && profileData.education && profileData.education.some(e => e.id === educationForm.id) ? "Update Education" : "Add New Education"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="institution">Institution</Label>
                <Input id="institution" name="institution" value={educationForm.institution} onChange={handleEducationChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="degree">Degree</Label>
                <Input id="degree" name="degree" value={educationForm.degree} onChange={handleEducationChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="field">Field of Study</Label>
                <Input id="field" name="field" value={educationForm.field} onChange={handleEducationChange} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" name="startDate" value={educationForm.startDate} onChange={handleEducationChange} placeholder="YYYY-MM" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" name="endDate" value={educationForm.endDate} onChange={handleEducationChange} placeholder="YYYY-MM or Present" />
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea id="description" name="description" value={educationForm.description} onChange={handleEducationChange} rows={3} />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              {educationForm.id && profileData.education && profileData.education.some(e => e.id === educationForm.id) ? (
                <>
                  <Button onClick={handleUpdateEducation}><Save className="mr-2 h-4 w-4" />Update Education</Button>
                  <Button variant="outline" onClick={() => setEducationForm({ id: Date.now().toString(), institution: '', degree: '', field: '', startDate: '', endDate: '', description: '' })}>Cancel</Button>
                </>
              ) : (
                <Button onClick={handleAddEducation}><Plus className="mr-2 h-4 w-4" />Add Education</Button>
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
          {profileData.workExperience && profileData.workExperience.length > 0 ? (
            <div className="space-y-4">
              {profileData.workExperience.map((item) => (
                <div key={item.id} className="border rounded-md p-4 flex flex-col md:flex-row justify-between">
                  <div>
                    <div className="font-medium">{item.position}</div>
                    <div>{item.company}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-4">
                      <span className="flex items-center"><Calendar className="mr-1 h-4 w-4" />{item.startDate} - {item.endDate}</span>
                      <span className="flex items-center"><MapPin className="mr-1 h-4 w-4" />{item.location}</span>
                    </div>
                    {item.description && (
                      <div className="mt-2 text-sm">{item.description}</div>
                    )}
                  </div>
                  <div className="flex mt-2 md:mt-0">
                    <Button variant="ghost" size="icon" onClick={() => handleEditExperience(item)}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => removeWorkExperience(item.id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">No work experience added yet.</div>
          )}
          <div className="border-t pt-4 mt-4">
            <h3 className="font-medium mb-4">{experienceForm.id && profileData.workExperience && profileData.workExperience.some(e => e.id === experienceForm.id) ? "Update Experience" : "Add New Experience"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input id="position" name="position" value={experienceForm.position} onChange={handleExperienceChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" name="company" value={experienceForm.company} onChange={handleExperienceChange} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" name="startDate" value={experienceForm.startDate} onChange={handleExperienceChange} placeholder="YYYY-MM" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" name="endDate" value={experienceForm.endDate} onChange={handleExperienceChange} placeholder="YYYY-MM or Present" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" value={experienceForm.location} onChange={handleExperienceChange} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea id="description" name="description" value={experienceForm.description} onChange={handleExperienceChange} rows={3} />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              {experienceForm.id && profileData.workExperience && profileData.workExperience.some(e => e.id === experienceForm.id) ? (
                <>
                  <Button onClick={handleUpdateExperience}><Save className="mr-2 h-4 w-4" />Update Experience</Button>
                  <Button variant="outline" onClick={() => setExperienceForm({ id: Date.now().toString(), company: '', position: '', startDate: '', endDate: '', description: '', location: '' })}>Cancel</Button>
                </>
              ) : (
                <Button onClick={handleAddExperience}><Plus className="mr-2 h-4 w-4" />Add Experience</Button>
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
          {profileData.skills && profileData.skills.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profileData.skills.map((item) => (
                <div key={item.id} className="border rounded-md p-4 flex justify-between">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="mt-1 h-2 w-40 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${item.level}%` }}></div>
                    </div>
                    {item.category && (
                      <div className="text-xs mt-1 text-muted-foreground">Category: {item.category}</div>
                    )}
                  </div>
                  <div className="flex">
                    <Button variant="ghost" size="icon" onClick={() => handleEditSkill(item)}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => removeSkill(item.id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">No skills added yet.</div>
          )}
          <div className="border-t pt-4 mt-4">
            <h3 className="font-medium mb-4">{skillForm.id && profileData.skills && profileData.skills.some(e => e.id === skillForm.id) ? "Update Skill" : "Add New Skill"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Skill Name</Label>
                <Input id="name" name="name" value={skillForm.name} onChange={handleSkillChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Level (0-100)</Label>
                <Input id="level" name="level" type="number" min={0} max={100} value={skillForm.level} onChange={handleSkillChange} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="category">Category (Optional)</Label>
                <Input id="category" name="category" value={skillForm.category} onChange={handleSkillChange} />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              {skillForm.id && profileData.skills && profileData.skills.some(e => e.id === skillForm.id) ? (
                <>
                  <Button onClick={handleUpdateSkill}><Save className="mr-2 h-4 w-4" />Update Skill</Button>
                  <Button variant="outline" onClick={() => setSkillForm({ id: Date.now().toString(), name: '', level: 50, category: '' })}>Cancel</Button>
                </>
              ) : (
                <Button onClick={handleAddSkill}><Plus className="mr-2 h-4 w-4" />Add Skill</Button>
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
          {profileData.socialLinks && profileData.socialLinks.length > 0 ? (
            <div className="space-y-2">
              {profileData.socialLinks.map((link, index) => (
                <div key={index} className="flex items-center justify-between border p-3 rounded-md">
                  <div>
                    <div className="font-medium capitalize">{link.platform}</div>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary truncate max-w-sm block">{link.url}</a>
                  </div>
                  <div className="flex">
                    <Button variant="ghost" size="icon" onClick={() => handleEditSocialLink(link)}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => removeSocialLink(index)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">No social links added yet.</div>
          )}
          <div className="border-t pt-4 mt-4">
            <h3 className="font-medium mb-4">Add Social Link</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                <Input id="platform" name="platform" value={socialLinkForm.platform} onChange={handleSocialLinkChange} placeholder="e.g., LinkedIn, Twitter, Instagram" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">Profile URL</Label>
                <Input id="url" name="url" type="url" value={socialLinkForm.url} onChange={handleSocialLinkChange} placeholder="https://..." />
              </div>
            </div>
            <div className="mt-4">
              <Button onClick={handleAddSocialLink}><Plus className="mr-2 h-4 w-4" />Add Social Link</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </TabsContent>

</Tabs>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="space-y-4">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" value={personalInfo.email} onChange={handleChange} />
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" value={personalInfo.phone} onChange={handleChange} />
                <Label htmlFor="website">Website</Label>
                <Input id="website" name="website" value={personalInfo.website} onChange={handleChange} />
              </div>
              <div className="space-y-4">
                <Label>Profile Picture</Label>
                <EnhancedFileUpload
                  endpoint="profile/avatar"
                  category="avatar"
                  initialPreview={personalInfo.avatar}
                  onSuccess={(url) => handleAvatarUpload(url)}
                  label="Upload Profile Picture"
                />
                <Label>Logo</Label>
                <EnhancedFileUpload
                  endpoint="profile/logo"
                  category="logo"
                  initialPreview={personalInfo.logo}
                  onSuccess={(url) => handleLogoUpload(url)}
                  label="Upload Logo"
                />
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminPersonalProfile;
