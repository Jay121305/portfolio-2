export interface Project {
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  image: string;
  html_url?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Experience {
  role: string;
  context: string;
  description: string;
}

export interface EducationItem {
  year: string;
  institution: string;
  degree: string;
  focus: string;
  skills?: string[];
}

export interface NavLink {
  name: string;
  href: string;
}