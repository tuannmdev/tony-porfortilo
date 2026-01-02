# Tony Nguyễn - Senior Software Engineer Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=flat-square&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

> A modern, fully dynamic portfolio website with retro gaming aesthetics, featuring a complete admin panel for content management.

## 🎯 About Me

Hi! I'm **Tony Nguyễn**, a Senior Software Engineer with expertise in full-stack development, specializing in modern web technologies. This portfolio showcases my work, skills, and professional journey in the software engineering world.

**What I Do:**
- ⚡ Build scalable web applications with React, Next.js, and TypeScript
- 🔧 Design robust backend systems with Node.js and PostgreSQL
- 🎨 Create intuitive user interfaces with modern design principles
- 📊 Optimize performance and enhance user experience
- 🚀 Lead development teams and mentor junior engineers

## ✨ Portfolio Features

### 🎮 Retro Gaming Design
- Unique pixel art aesthetic with VT323 monospace font
- CRT scanlines effect and retro shadows
- Responsive gaming-inspired UI components
- Smooth animations and transitions

### 📱 Dynamic Content Management
- **Fully database-driven** - All content stored in Supabase
- **Real-time updates** - Changes reflect instantly
- **Admin panel** - Complete CRUD operations without touching code
- **Image uploads** - Supabase Storage integration

### 🔐 Secure Admin Panel
- Protected routes with Supabase Auth
- Row Level Security (RLS) policies
- Dashboard with portfolio statistics
- Manage projects, skills, experience, and messages

### 🎨 Key Sections
- **Home** - Hero section with quick stats and featured content
- **About** - Professional bio, skills matrix, and experience timeline
- **Projects** - Filterable portfolio showcase with detailed project pages
- **Contact** - Contact form with message management

## 🛠 Tech Stack

**Frontend:**
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Material Symbols Outlined
- **State Management:** React Query (TanStack Query)

**Backend:**
- **Database:** PostgreSQL (Supabase)
- **Authentication:** Supabase Auth
- **Storage:** Supabase Storage
- **Real-time:** Supabase Realtime

**Development:**
- **Validation:** Zod + React Hook Form
- **Code Quality:** ESLint + TypeScript strict mode
- **Deployment:** Vercel

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account ([Sign up free](https://supabase.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/tony-portfolio.git
   cd tony-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Supabase**
   - Create a new Supabase project
   - Run the database schema:
     ```bash
     # Copy contents of supabase-schema.sql to Supabase SQL Editor and run
     ```
   - Setup storage buckets:
     ```bash
     # Copy contents of supabase-storage-setup.sql to Supabase SQL Editor and run
     ```

4. **Configure environment variables**
   ```bash
   cp .env.local.example .env.local
   ```

   Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ADMIN_EMAIL=your_admin_email@example.com
   ```

5. **Create admin user in Supabase**
   - Go to Supabase Dashboard → Authentication → Users
   - Click "Add user" → "Create new user"
   - Enter your email and password
   - Enable "Auto Confirm User"

6. **Run development server**
   ```bash
   npm run dev
   ```

7. **Open in browser**
   - Portfolio: [http://localhost:3000](http://localhost:3000)
   - Admin Panel: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## 🎨 Admin Panel

The admin panel provides a complete content management system:

### Features
- 📊 **Dashboard** - Portfolio statistics and recent activity
- 👤 **Profile Management** - Edit personal information and bio
- 🎯 **Skills Management** - Add/edit/reorder technical skills
- 💼 **Experience Management** - Manage work history and achievements
- 🎨 **Projects Management** - CRUD operations with image uploads
- 💬 **Messages** - View and manage contact form submissions

### Admin Routes
- `/admin` - Dashboard
- `/admin/profile` - Profile editing
- `/admin/skills` - Skills management
- `/admin/experience` - Experience management
- `/admin/projects` - Projects management
- `/admin/messages` - Contact messages

## 🔒 Security

- **Authentication:** Supabase Auth with email/password
- **Authorization:** Row Level Security (RLS) policies
- **Protected Routes:** Admin-only access with session validation
- **Environment Variables:** Sensitive data stored securely
- **CORS:** Configured for production domains

## 🚢 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy!

3. **Update Supabase RLS policies**
   ```sql
   -- Update admin email in RLS policies to match your ADMIN_EMAIL
   ```

### Environment Variables (Production)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `ADMIN_EMAIL`

## 📁 Project Structure

```
tony-portfolio/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── (main)/            # Public pages
│   │   ├── admin/             # Admin panel
│   │   └── api/               # API routes
│   ├── components/            # React components
│   │   ├── admin/             # Admin panel components
│   │   ├── home/              # Home page sections
│   │   ├── projects/          # Project showcase
│   │   ├── contact/           # Contact form
│   │   └── layout/            # Header, footer
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utilities and configs
│   │   ├── supabase/          # Supabase client setup
│   │   └── seo.ts             # SEO utilities
│   └── types/                 # TypeScript types
├── design/                    # HTML design mockups
├── documents/                 # Project documentation
├── public/                    # Static assets
└── supabase-*.sql            # Database schemas
```

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Contact

**Tony Nguyễn**
- Portfolio: [...]
- LinkedIn: [...]
- GitHub: [@tuannmdev](https://github.com/tuannmdev)
- Email: tuan.manhnguyen89@gmail.com

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ by Tony Nguyễn**

*Showcasing modern web development with a retro twist* 🎮
