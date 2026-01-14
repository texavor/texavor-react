# Project Context: EasyWrite (Rebranded to Texavor)

## 1. Project Overview

**Texavor** (formerly EasyWrite) is an AI-powered content strategy and writing platform for developers. It helps generate high-impact, E-E-A-T optimized technical articles.

### Repositories / Workspaces

- **`easywrite`**: The Rails Backend API. Handles core logic, authentication, database, and background jobs.
- **`easywrite-app`**: The Main Web Application (Dashboard). Where users manage articles, schedules, and settings.
- **`easywrite-react`**: The Marketing/Landing Page & Blog. **This is the current focus.**

## 2. Brand Identity ("Texavor")

The project has recently undergone a rebrand to a "Premium" aesthetic.

- **Name**: Texavor
- **Logo**: `texavor.png` (Simple, clean typography)
- **Primary Color**: `#104127` (Deep Forest Green)
- **Background Color**: `#f9f4f0` (Soft Cream/Beige) - Used for page backgrounds.
- **Accent Color**: `#25A66A` (Bright Green) - Used for success states, gradients, and highlights.
- **Typography**:
  - **Headings**: `Poppins` (Bold, Modern)
  - **Body**: `Inter` (Clean, Readable)
- **Design Style**: Glassmorphism (`backdrop-blur`), Rounded Pill shapes, Floating cards, Subtle gradients, Soft shadows. **No borders** (`border-none`) preference for cards.

## 3. Technology Stack (Frontend)

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Vanilla CSS (`globals.css`)
- **UI Libraries**: Shadcn/UI (Radix Primitives), Lucide React (Icons)
- **State Management**: Zustand (AppStore)
- **Data Fetching**: TanStack Query (React Query) + Axios
- **Animations**: Framer Motion

## 4. Coding Conventions & Rules

1.  **UI Components**: ALWAYS use Shadcn UI components.
2.  **JS Safety**: ALWAYS use `?.` (optional chaining).
3.  **API Handling**:
    - Use `axiosInstance` for all calls.
    - **NO TOASTS on Error** inside components (Global error handling is implemented in the axios instance).
4.  **Styling**:
    - Prefer `shadow-none` and `border-none` for a cleaner look.
    - Use `bg-primary/5` for subtle tints instead of generic grays where appropriate.
5.  **Environment**: Rails runs in WSL. Commands must be executed ideally via `wsl <command>`.

## 5. Recent Major Updates (Completed)

### Landing Page (`easywrite-react`)

- **Navigation**: "Floating Pill" style, Liquid/Glass scroll effect (`bg-white/70`).
- **Hero**: Centered, high-end typography, "Floating Dashboard" screenshot.
- **Footer**: Redesigned with big "Texavor" watermark, X logo (Twitter replacement).
- **Legal Pages**: Added `Terms`, `Privacy`, `Cookies` with `hello@texavor.com` contact.

### Blog Section (`app/blog`)

- **Architecture**: Server Component (`page.tsx`) + Client Wrapper (`BlogClientWrapper.tsx`).
- **Features**:
  - **Hero**: "Texavor Insights" branding.
  - **Search**: Client-side filtering by Title and Tag (Pills).
  - **Card**: Refactored `ArticleCard` (Poppins/Inter, no colored hover bg).
  - **Sidebar**: Custom "Get Started" Promo styling (`bg-primary/5`).

### Docs Section (`app/docs`)

- **Theme**: Switched from Dark Green to **Light/Cream** to match the brand.
- **Sidebar**: Light theme, active links use `bg-primary/5`.
- **Support**: Updated contact to `hello@texavor.com`.

## 6. Integrations (Context for Backend/Dashboard)

Supported platforms for publishing:

- Dev.to
- Medium
- Hashnode
- WordPress
- Shopify
- Webflow

## 7. Contact Information

- **Support Email**: `hello@texavor.com` (Replaced `support@easywrite.dev`)

## 8. Development Notes

- **Local Time Source**: Always trust the system provided time.
- **Images**: Use `public/screenshots` for product visuals.
- **Task Tracking**: Refer to `task.md` for the single source of truth on task status.
