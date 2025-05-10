
import React, { createContext, useContext, useState } from 'react';

// Define types for profile data
export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  location: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-100
  category?: string;
}

export interface ProfileData {
  // Bilingual fields
  nameAr?: string;
  nameEn?: string;
  titleAr?: string;
  titleEn?: string;
  bioAr?: string;
  bioEn?: string;
  addressAr?: string;
  addressEn?: string;
  logo?: string;
  // Old fields for backward compatibility
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  avatar: string;
  coverImage: string;
  socialLinks: SocialLink[];
  education: Education[];
  workExperience: WorkExperience[];
  skills: Skill[];
  // CV related fields
  cvFile?: string;
  cvUrl?: string;
  cvLastUpdated?: string;
}

// Default profile data
const defaultProfile: ProfileData = {
  nameAr: "أحمد جمال",
  nameEn: "Ahmed Jamal",
  titleAr: "أخصائي رقمي",
  titleEn: "Digital Specialist",
  bioAr: "خبير في وسائل التواصل، التصميم، الفيديو، البرمجة، تطوير المواقع والتطبيقات، التدريب والاستشارات.",
  bioEn: "Professional with expertise in social media, graphic design, video editing, programming, web/app development, training and consulting.",
  addressAr: "الرياض، السعودية",
  addressEn: "Riyadh, Saudi Arabia",
  logo: "",
  name: "Ahmed Jamal",
  title: "Digital Specialist",
  bio: "Professional with expertise in social media, graphic design, video editing, programming, web/app development, training and consulting.",
  email: "contact@ahmedjamal.com",
  phone: "+966 50 000 0000",
  address: "Riyadh, Saudi Arabia",
  website: "https://ahmedjamal.com",
  avatar: "/assets/profile-placeholder.jpg",
  coverImage: "/assets/cover-placeholder.jpg",
  socialLinks: [],
  education: [
    {
      id: "1",
      institution: "جامعة طلال أبو غزالة",
      degree: "ماجستير التسويق الإلكتروني",
      field: "التسويق الإلكتروني",
      startDate: "2024",
      endDate: "Present",
      description: ""
    }
  ],
  workExperience: [],
  skills: []
};

interface ProfileContextType {
  profileData: ProfileData;
  updatePersonalInfo: (data: Partial<ProfileData>) => void;
  addSocialLink: (link: SocialLink) => void;
  updateSocialLink: (index: number, link: SocialLink) => void;
  removeSocialLink: (index: number) => void;
  addEducation: (edu: Education) => void;
  updateEducation: (id: string, edu: Education) => void;
  removeEducation: (id: string) => void;
  addWorkExperience: (work: WorkExperience) => void;
  updateWorkExperience: (id: string, work: WorkExperience) => void;
  removeWorkExperience: (id: string) => void;
  addSkill: (skill: Skill) => void;
  updateSkill: (id: string, skill: Skill) => void;
  removeSkill: (id: string) => void;
  updateAvatar: (url: string) => void;
  updateCoverImage: (url: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profileData, setProfileData] = useState<ProfileData>(defaultProfile);

  const updatePersonalInfo = (data: Partial<ProfileData>) => {
    setProfileData(prev => {
      const updated = { ...prev, ...data };
      console.log('updatePersonalInfo - new profileData:', updated);
      return updated;
    });
  };

  const addSocialLink = (link: SocialLink) => {
    setProfileData(prev => ({
      ...prev,
      socialLinks: [...prev.socialLinks, link]
    }));
  };

  const updateSocialLink = (index: number, link: SocialLink) => {
    const newLinks = [...profileData.socialLinks];
    newLinks[index] = link;
    setProfileData(prev => ({
      ...prev,
      socialLinks: newLinks
    }));
  };

  const removeSocialLink = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index)
    }));
  };

  const addEducation = (edu: Education) => {
    const newEdu = { ...edu };
    if (!newEdu.id) {
      newEdu.id = Date.now().toString();
    }
    setProfileData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const updateEducation = (id: string, edu: Education) => {
    setProfileData(prev => ({
      ...prev,
      education: prev.education.map(item => item.id === id ? edu : item)
    }));
  };

  const removeEducation = (id: string) => {
    setProfileData(prev => ({
      ...prev,
      education: prev.education.filter(item => item.id !== id)
    }));
  };

  const addWorkExperience = (work: WorkExperience) => {
    const newWork = { ...work };
    if (!newWork.id) {
      newWork.id = Date.now().toString();
    }
    setProfileData(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, newWork]
    }));
  };

  const updateWorkExperience = (id: string, work: WorkExperience) => {
    setProfileData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map(item => item.id === id ? work : item)
    }));
  };

  const removeWorkExperience = (id: string) => {
    setProfileData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter(item => item.id !== id)
    }));
  };

  const addSkill = (skill: Skill) => {
    const newSkill = { ...skill };
    if (!newSkill.id) {
      newSkill.id = Date.now().toString();
    }
    setProfileData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const updateSkill = (id: string, skill: Skill) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.map(item => item.id === id ? skill : item)
    }));
  };

  const removeSkill = (id: string) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(item => item.id !== id)
    }));
  };

  const updateAvatar = (url: string) => {
    setProfileData(prev => ({
      ...prev,
      avatar: url
    }));
  };

  const updateCoverImage = (url: string) => {
    setProfileData(prev => ({
      ...prev,
      coverImage: url
    }));
  };

  const value = {
    profileData,
    updatePersonalInfo,
    addSocialLink,
    updateSocialLink,
    removeSocialLink,
    addEducation,
    updateEducation,
    removeEducation,
    addWorkExperience,
    updateWorkExperience,
    removeWorkExperience,
    addSkill,
    updateSkill,
    removeSkill,
    updateAvatar,
    updateCoverImage
  };

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
