# AI Development Rules for Pixel Realms

This document outlines the rules and conventions for AI-driven development of this application. Following these guidelines ensures consistency, maintainability, and adherence to the project's architectural and aesthetic vision.

## Tech Stack Overview

The application is built with a modern, type-safe, and component-based stack:

- **Framework**: React (v18) with Vite for a fast development experience.
- **Language**: TypeScript for type safety and improved developer experience.
- **Styling**: Tailwind CSS for a utility-first styling approach. The theme is a custom pixel-art design system defined in `src/index.css`.
- **UI Components**: A combination of custom `Pixel` components (`PixelButton`, `PixelCard`) and shadcn/ui for more complex UI elements.
- **Routing**: React Router (`react-router-dom`) for all client-side navigation.
- **Backend & Authentication**: Supabase for database, authentication, and other backend services.
- **Data Fetching**: TanStack Query (`@tanstack/react-query`) for managing server state, caching, and data synchronization.
- **Forms**: React Hook Form (`react-hook-form`) paired with Zod for robust and type-safe form validation.
- **Icons**: Lucide React (`lucide-react`) for a consistent and lightweight icon set.

## Library Usage and Coding Conventions

### 1. Component Strategy

- **Prioritize Custom `Pixel` Components**: For core UI elements like buttons, cards, and inputs, **always** use the custom components found in `src/components/` (e.g., `PixelButton`, `PixelCard`, `PixelInput`). This is crucial for maintaining the app's unique pixel-art aesthetic.
- **Use shadcn/ui for Complex UI**: For more complex components that don't have a `Pixel` equivalent (e.g., `Dialog`, `Select`, `Tabs`, `Accordion`), use the pre-built shadcn/ui components from `src/components/ui/`.
- **No New UI Libraries**: Do not introduce other UI component libraries like Material-UI, Ant Design, or Bootstrap.

### 2. Styling

- **Tailwind CSS Exclusively**: All styling must be done with Tailwind CSS utility classes.
- **Use the `cn` Utility**: When conditionally applying classes, use the `cn` function from `src/lib/utils.ts`.
- **Avoid Custom CSS**: Do not write new CSS files. Global styles and CSS variables for the theme are defined in `src/index.css` and should only be modified there.

### 3. State Management

- **Server State**: Use TanStack Query for all asynchronous operations related to Supabase (fetching, creating, updating, deleting data).
- **Local State**: Use React's built-in hooks (`useState`, `useEffect`, `useContext`) for component-level and simple shared state.
- **No Global State Libraries**: Do not add global state managers like Redux or Zustand unless the application's complexity absolutely requires it.

### 4. Forms

- **React Hook Form + Zod**: All forms must be built using `react-hook-form`. All form validation must be handled by creating a `zod` schema.

### 5. Routing

- **Centralized Routes**: All application routes must be defined in `src/App.tsx` using `react-router-dom`.
- **Pages**: Create new pages as components within the `src/pages/` directory.

### 6. Backend and Authentication

- **Supabase Client**: All communication with the backend must use the pre-configured Supabase client from `src/integrations/supabase/client.ts`.
- **Authentication**: Use the `useAuth` hook (`src/hooks/useAuth.tsx`) for all authentication-related logic and accessing user information.

### 7. Icons and Notifications

- **Icons**: Only use icons from the `lucide-react` library.
- **Toasts**: Use the `toast` function from the `useToast` hook (`src/hooks/use-toast.ts`) for user feedback and notifications.