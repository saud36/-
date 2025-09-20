
export interface PersonalInfo {
  name: string;
  jobTitle: string;
  email: string;
  phone: string;
  website: string;
  photo: string;
}

export interface SocialLink {
  id: string;
  network: 'LinkedIn' | 'GitHub' | 'Twitter' | 'Website';
  url: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  graduationDate: string;
  gpa?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 0-100
}

export interface Language {
    id: string;
    name: string;
    proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Fluent' | 'Native';
}

export interface Project {
  id: string;
  name: string;
  url: string;
  description: string;
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
}

export interface CVData {
  personal: PersonalInfo;
  socialLinks: SocialLink[];
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  projects: Project[];
  customSections: CustomSection[];
  sectionOrder: Array<keyof CVData['sectionTitles']>;
  sectionTitles: {
    summary: string;
    experience: string;
    education: string;
    skills: string;
    languages: string;
    projects: string;
  };
  sectionVisibility: {
    summary: boolean;
    experience: boolean;
    education: boolean;
    skills: boolean;
    languages: boolean;
    projects: boolean;
    socialLinks: boolean;
    customSections: boolean;
  };
}


export interface ColorPalette {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  headerText: string;
}

export interface ThemeSettings {
  color: ColorPalette;
  font: string;
  template: 'modern' | 'classic' | 'creative' | 'compact';
  skillDisplayStyle: 'bar' | 'dots' | 'tags';
  sectionDividerStyle: 'solid' | 'dashed' | 'none';
}
