export interface Project {
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  image: string;
  html_url?: string;
  liveUrl?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Experience {
  role: string;
  context: string;
  period?: string;
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
  children?: NavLink[];
}

export interface Hackathon {
  name: string;
  achievement: string;
}

export interface Publication {
  title: string;
  venue: string;
  year: string;
  date?: string;
  url: string;
}