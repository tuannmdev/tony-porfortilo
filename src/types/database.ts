// Database types based on Supabase schema

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profile: {
        Row: Profile;
        Insert: Omit<Profile, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Profile, "id" | "created_at">>;
      };
      skills: {
        Row: Skill;
        Insert: Omit<Skill, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Skill, "id" | "created_at" | "updated_at">>;
      };
      experience: {
        Row: Experience;
        Insert: Omit<Experience, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Experience, "id" | "created_at">>;
      };
      projects: {
        Row: Project;
        Insert: Omit<Project, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Project, "id" | "created_at">>;
      };
      social_links: {
        Row: SocialLink;
        Insert: Omit<SocialLink, "id" | "created_at">;
        Update: Partial<Omit<SocialLink, "id" | "created_at">>;
      };
      contact_messages: {
        Row: ContactMessage;
        Insert: Omit<ContactMessage, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<ContactMessage, "id" | "created_at">>;
      };
    };
  };
}

// Table types
export interface Profile {
  id: string;
  name: string;
  title: string;
  bio: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  avatar_url: string | null;
  resume_url: string | null;
  availability_status: "available" | "busy" | "unavailable";
  years_experience: number | null;
  github_username: string | null;
  linkedin_username: string | null;
  website_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: "primary" | "secondary" | "tools" | "soft-skills" | "languages";
  proficiency: 1 | 2 | 3 | 4 | 5;
  icon_url: string | null;
  color: string | null;
  order_index: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  start_date: string;
  end_date: string | null;
  description: string | null;
  achievements: string[];
  technologies: string[];
  location: string | null;
  company_logo_url: string | null;
  company_website: string | null;
  employment_type: "full-time" | "part-time" | "contract" | "internship";
  order_index: number;
  created_at: string;
  updated_at: string;
}

// Helper type for computed fields
export interface ExperienceWithComputed extends Experience {
  is_current: boolean;
  duration_months: number;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  full_description: string | null;
  cover_image_url: string | null;
  images: string[];
  technologies: string[];
  github_url: string | null;
  live_demo_url: string | null;
  category: "web" | "mobile" | "api" | "desktop" | "ai-ml" | "other";
  project_type: "personal" | "work" | "freelance" | "open-source";
  status: "planning" | "in-progress" | "completed" | "archived";
  featured: boolean;
  start_date: string | null;
  end_date: string | null;
  order_index: number;
  view_count: number;
  likes_count: number;
  created_at: string;
  updated_at: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  username: string | null;
  icon_name: string;
  color: string | null;
  order_index: number;
  is_active: boolean;
  is_primary: boolean;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  phone: string | null;
  company: string | null;
  is_read: boolean;
  is_replied: boolean;
  priority: "low" | "normal" | "high" | "urgent";
  source: "website" | "email" | "linkedin" | "other";
  ip_address: string | null;
  user_agent: string | null;
  replied_at: string | null;
  created_at: string;
  updated_at: string;
}
