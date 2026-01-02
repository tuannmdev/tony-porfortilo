-- =====================================================
-- TONY'S PORTFOLIO - SUPABASE DATABASE SCHEMA
-- =====================================================
-- This SQL script creates the complete database schema
-- for the portfolio website based on DATABASE_SCHEMA.md
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- =====================================================
-- TABLE: profile
-- =====================================================

CREATE TABLE IF NOT EXISTS profile (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  title VARCHAR(200) NOT NULL,
  bio TEXT,
  email VARCHAR(255),
  phone VARCHAR(20),
  location VARCHAR(100),
  avatar_url VARCHAR(500),
  resume_url VARCHAR(500),
  availability_status VARCHAR(20) DEFAULT 'available'
    CHECK (availability_status IN ('available', 'busy', 'unavailable')),
  years_experience INTEGER CHECK (years_experience >= 0),
  github_username VARCHAR(50),
  linkedin_username VARCHAR(50),
  website_url VARCHAR(300),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER update_profile_updated_at BEFORE UPDATE
    ON profile FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default profile
INSERT INTO profile (name, title, bio, email, availability_status, years_experience)
VALUES (
  'Tony Porfortilo',
  'Senior Software Engineer',
  'Passionate full-stack developer with expertise in modern web technologies. Specialized in building scalable applications with React, Next.js, and Node.js.',
  'tony@example.com',
  'available',
  5
) ON CONFLICT DO NOTHING;

-- =====================================================
-- TABLE: skills
-- =====================================================

CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL,
  category VARCHAR(30) NOT NULL
    CHECK (category IN ('primary', 'secondary', 'tools', 'soft-skills', 'languages')),
  proficiency INTEGER NOT NULL
    CHECK (proficiency >= 1 AND proficiency <= 5),
  icon_url VARCHAR(500),
  color VARCHAR(7),
  order_index INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(name, category)
);

CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_skills_order ON skills(order_index);

-- Sample skills data
INSERT INTO skills (name, category, proficiency, order_index, is_featured) VALUES
('React', 'primary', 5, 1, true),
('TypeScript', 'primary', 5, 2, true),
('Next.js', 'primary', 4, 3, true),
('Node.js', 'primary', 4, 4, true),
('Python', 'primary', 4, 5, true),
('PostgreSQL', 'secondary', 4, 6, false),
('MongoDB', 'secondary', 3, 7, false),
('Docker', 'tools', 4, 8, false),
('Git', 'tools', 5, 9, false),
('AWS', 'tools', 3, 10, false),
('Leadership', 'soft-skills', 4, 11, false),
('English', 'languages', 5, 12, false)
ON CONFLICT DO NOTHING;

-- =====================================================
-- TABLE: experience
-- =====================================================

CREATE TABLE IF NOT EXISTS experience (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company VARCHAR(100) NOT NULL,
  position VARCHAR(100) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  description TEXT,
  achievements TEXT[],
  technologies TEXT[] NOT NULL,
  location VARCHAR(100),
  company_logo_url VARCHAR(500),
  company_website VARCHAR(300),
  employment_type VARCHAR(20) DEFAULT 'full-time'
    CHECK (employment_type IN ('full-time', 'part-time', 'contract', 'internship')),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER update_experience_updated_at BEFORE UPDATE
    ON experience FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_experience_dates ON experience(start_date DESC, end_date DESC);
CREATE INDEX idx_experience_current ON experience(end_date) WHERE end_date IS NULL;

-- Sample experience data
INSERT INTO experience (company, position, start_date, end_date, description, achievements, technologies, location, employment_type, order_index) VALUES
(
  'TechCorp',
  'Senior Software Engineer',
  '2022-01-01',
  NULL,
  'Leading the frontend development team. Building scalable React applications and mentoring junior developers.',
  ARRAY['Improved application performance by 40%', 'Led team of 4 developers', 'Implemented CI/CD pipeline', 'Migrated legacy codebase to Next.js 14'],
  ARRAY['React', 'TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'Docker'],
  'San Francisco, CA',
  'full-time',
  1
),
(
  'StartupInc',
  'Full-stack Developer',
  '2019-06-01',
  '2021-12-31',
  'Developed MVP for fintech startup. Built both frontend and backend systems from scratch.',
  ARRAY['Built complete application in 6 months', 'Integrated payment systems with Stripe', 'Achieved 99.9% uptime', 'Optimized database queries for 50% faster load times'],
  ARRAY['Vue.js', 'Python', 'Django', 'PostgreSQL', 'AWS', 'Redis'],
  'Remote',
  'full-time',
  2
)
ON CONFLICT DO NOTHING;

-- =====================================================
-- TABLE: projects
-- =====================================================

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT,
  cover_image_url VARCHAR(500),
  images TEXT[],
  technologies TEXT[] NOT NULL,
  github_url VARCHAR(300),
  live_demo_url VARCHAR(300),
  category VARCHAR(30) NOT NULL
    CHECK (category IN ('web', 'mobile', 'api', 'desktop', 'ai-ml', 'other')),
  project_type VARCHAR(20) DEFAULT 'personal'
    CHECK (project_type IN ('personal', 'work', 'freelance', 'open-source')),
  status VARCHAR(20) DEFAULT 'completed'
    CHECK (status IN ('planning', 'in-progress', 'completed', 'archived')),
  featured BOOLEAN DEFAULT false,
  start_date DATE,
  end_date DATE,
  order_index INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE
    ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_projects_featured ON projects(featured) WHERE featured = true;
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_order ON projects(order_index);

-- Sample projects data
INSERT INTO projects (title, slug, short_description, full_description, technologies, category, github_url, live_demo_url, featured, order_index, status) VALUES
(
  'E-Commerce Platform',
  'ecommerce-platform',
  'Full-stack e-commerce solution with admin panel and payment integration',
  'A comprehensive e-commerce platform built with Next.js and Supabase. Features include product management, shopping cart, payment processing with Stripe, order tracking, and a powerful admin dashboard for managing inventory and orders.',
  ARRAY['Next.js', 'TypeScript', 'Supabase', 'Stripe', 'Tailwind CSS'],
  'web',
  'https://github.com/tony/ecommerce-platform',
  'https://ecommerce-demo.vercel.app',
  true,
  1,
  'completed'
),
(
  'AI Chat Bot',
  'ai-chat-bot',
  'Real-time AI chatbot with natural language processing',
  'An intelligent chatbot application powered by OpenAI GPT-4. Features include real-time conversations, context awareness, multi-language support, and integration with various messaging platforms.',
  ARRAY['Python', 'OpenAI', 'WebSocket', 'FastAPI', 'React'],
  'ai-ml',
  'https://github.com/tony/ai-chatbot',
  'https://chatbot-demo.herokuapp.com',
  true,
  2,
  'completed'
),
(
  'Task Tracker',
  'task-tracker',
  'Productivity tool for engineering teams with automated sprint reports',
  'A Trello-inspired task management application with real-time collaboration, drag-and-drop functionality, team management, automated sprint reports, and file attachments.',
  ARRAY['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express'],
  'web',
  'https://github.com/tony/task-tracker',
  NULL,
  false,
  3,
  'in-progress'
)
ON CONFLICT DO NOTHING;

-- =====================================================
-- TABLE: social_links
-- =====================================================

CREATE TABLE IF NOT EXISTS social_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform VARCHAR(30) NOT NULL,
  url VARCHAR(300) NOT NULL,
  username VARCHAR(50),
  icon_name VARCHAR(30) NOT NULL,
  color VARCHAR(7),
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(platform)
);

CREATE INDEX idx_social_links_active ON social_links(is_active) WHERE is_active = true;
CREATE INDEX idx_social_links_order ON social_links(order_index);

-- Sample social links
INSERT INTO social_links (platform, url, username, icon_name, color, order_index, is_active, is_primary) VALUES
('GitHub', 'https://github.com/tony', 'tony', 'code', '#333333', 1, true, true),
('LinkedIn', 'https://linkedin.com/in/tony', 'tony', 'work', '#0077B5', 2, true, true),
('Email', 'mailto:tony@example.com', 'tony@example.com', 'alternate_email', '#EA4335', 3, true, true),
('Twitter', 'https://twitter.com/tony', '@tony', 'chat', '#1DA1F2', 4, true, false),
('Portfolio', 'https://tony.dev', 'tony.dev', 'public', '#FF6B6B', 5, true, false)
ON CONFLICT DO NOTHING;

-- =====================================================
-- TABLE: contact_messages
-- =====================================================

CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(200),
  message TEXT NOT NULL,
  phone VARCHAR(20),
  company VARCHAR(100),
  is_read BOOLEAN DEFAULT false,
  is_replied BOOLEAN DEFAULT false,
  priority VARCHAR(10) DEFAULT 'normal'
    CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  source VARCHAR(20) DEFAULT 'website'
    CHECK (source IN ('website', 'email', 'linkedin', 'other')),
  ip_address INET,
  user_agent TEXT,
  replied_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE
    ON contact_messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_contact_messages_read ON contact_messages(is_read);
CREATE INDEX idx_contact_messages_created ON contact_messages(created_at DESC);
CREATE INDEX idx_contact_messages_priority ON contact_messages(priority);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Public read access to portfolio data
CREATE POLICY "Public can read profile" ON profile FOR SELECT USING (true);
CREATE POLICY "Public can read skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Public can read experience" ON experience FOR SELECT USING (true);
CREATE POLICY "Public can read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public can read active social links" ON social_links
  FOR SELECT USING (is_active = true);

-- Allow anyone to insert contact messages
CREATE POLICY "Anyone can insert contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- Admin policies (based on auth.email())
-- Note: You need to set up Supabase Auth and replace 'admin@yourportfolio.com' with your actual admin email

CREATE POLICY "Admin can do everything on profile" ON profile
  FOR ALL USING (auth.email() = 'admin@yourportfolio.com');

CREATE POLICY "Admin can do everything on skills" ON skills
  FOR ALL USING (auth.email() = 'admin@yourportfolio.com');

CREATE POLICY "Admin can do everything on experience" ON experience
  FOR ALL USING (auth.email() = 'admin@yourportfolio.com');

CREATE POLICY "Admin can do everything on projects" ON projects
  FOR ALL USING (auth.email() = 'admin@yourportfolio.com');

CREATE POLICY "Admin can do everything on social_links" ON social_links
  FOR ALL USING (auth.email() = 'admin@yourportfolio.com');

CREATE POLICY "Admin can do everything on contact_messages" ON contact_messages
  FOR ALL USING (auth.email() = 'admin@yourportfolio.com');

-- =====================================================
-- DATABASE VIEWS
-- =====================================================

CREATE OR REPLACE VIEW portfolio_overview AS
SELECT
  p.name,
  p.title,
  p.years_experience,
  (SELECT COUNT(*) FROM projects WHERE status = 'completed') as completed_projects,
  (SELECT COUNT(*) FROM projects WHERE featured = true) as featured_projects,
  (SELECT COUNT(*) FROM skills WHERE category = 'primary') as primary_skills,
  (SELECT COUNT(*) FROM experience) as work_experiences,
  (SELECT COUNT(*) FROM contact_messages WHERE is_read = false) as unread_messages
FROM profile p;

CREATE OR REPLACE VIEW project_stats AS
SELECT
  category,
  COUNT(*) as total_projects,
  SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
  SUM(CASE WHEN featured = true THEN 1 ELSE 0 END) as featured,
  SUM(view_count) as total_views
FROM projects
GROUP BY category;

-- =====================================================
-- DATABASE FUNCTIONS
-- =====================================================

-- Helper function to calculate duration in months for experience
CREATE OR REPLACE FUNCTION calculate_experience_duration(start_date DATE, end_date DATE)
RETURNS INTEGER AS $$
BEGIN
  IF end_date IS NULL THEN
    RETURN EXTRACT(YEAR FROM AGE(CURRENT_DATE, start_date)) * 12 +
           EXTRACT(MONTH FROM AGE(CURRENT_DATE, start_date));
  ELSE
    RETURN EXTRACT(YEAR FROM AGE(end_date, start_date)) * 12 +
           EXTRACT(MONTH FROM AGE(end_date, start_date));
  END IF;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Helper function to check if experience is current
CREATE OR REPLACE FUNCTION is_current_experience(end_date DATE)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN end_date IS NULL;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

CREATE OR REPLACE FUNCTION increment_project_views(project_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE projects
  SET view_count = view_count + 1
  WHERE id = project_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_featured_content()
RETURNS TABLE(
  featured_projects jsonb,
  primary_skills jsonb,
  latest_experience jsonb
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    (SELECT jsonb_agg(to_jsonb(p)) FROM (
      SELECT * FROM projects WHERE featured = true ORDER BY order_index LIMIT 3
    ) p) as featured_projects,

    (SELECT jsonb_agg(to_jsonb(s)) FROM (
      SELECT * FROM skills WHERE category = 'primary' ORDER BY order_index LIMIT 6
    ) s) as primary_skills,

    (SELECT to_jsonb(e) FROM (
      SELECT * FROM experience WHERE end_date IS NULL ORDER BY start_date DESC LIMIT 1
    ) e) as latest_experience;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- STORAGE BUCKETS (Run in Supabase Dashboard)
-- =====================================================

-- Create storage buckets for images
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES
--   ('avatars', 'avatars', true),
--   ('project-images', 'project-images', true),
--   ('company-logos', 'company-logos', true),
--   ('documents', 'documents', true);

-- Storage policies
-- CREATE POLICY "Public can view avatars" ON storage.objects
--   FOR SELECT USING (bucket_id = 'avatars');

-- CREATE POLICY "Public can view project images" ON storage.objects
--   FOR SELECT USING (bucket_id = 'project-images');

-- CREATE POLICY "Admin can upload avatars" ON storage.objects
--   FOR INSERT WITH CHECK (
--     bucket_id = 'avatars' AND
--     auth.email() = 'admin@yourportfolio.com'
--   );

-- CREATE POLICY "Admin can manage project images" ON storage.objects
--   FOR ALL USING (
--     bucket_id = 'project-images' AND
--     auth.email() = 'admin@yourportfolio.com'
--   );

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================

DO $$
BEGIN
  RAISE NOTICE '============================================';
  RAISE NOTICE 'Portfolio Database Schema Created Successfully!';
  RAISE NOTICE '============================================';
  RAISE NOTICE '';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '1. Set up Supabase Auth admin user';
  RAISE NOTICE '2. Create storage buckets (see comments above)';
  RAISE NOTICE '3. Update admin email in RLS policies';
  RAISE NOTICE '4. Configure environment variables in Next.js';
  RAISE NOTICE '';
  RAISE NOTICE '============================================';
END $$;
