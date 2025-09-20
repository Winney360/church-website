# Overview

This is a church website application built with a MERN stack architecture (React frontend with Node.js/Express backend) and PostgreSQL database via Neon. The application serves Grace Community Church and provides features for event management, sermon archives, community groups, and user role-based access control. The system supports three user roles: general members, event coordinators, and administrators, each with different permissions and capabilities.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript support, though the project specifically requires JS/JSX implementation
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design system
- **Color Scheme**: Purple and blue theme with dark mode support
- **Routing**: Wouter for client-side navigation
- **State Management**: TanStack React Query for server state management
- **UI Components**: Comprehensive shadcn/ui component library including forms, dialogs, tables, and navigation elements
- **Responsive Design**: Mobile-first approach with responsive breakpoints

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Authentication**: Passport.js with local strategy for username/password authentication
- **Session Management**: Express sessions with PostgreSQL session store
- **Password Security**: Crypto module with scrypt for password hashing
- **API Design**: RESTful API structure with `/api` prefix
- **Role-based Access Control**: Middleware functions for authentication and authorization (requireAuth, requireRole)
- **Error Handling**: Centralized error handling middleware

## Database Design
- **Database**: PostgreSQL via Neon serverless
- **ORM**: Drizzle ORM with TypeScript schema definitions
- **Schema Structure**:
  - Users table with role-based permissions (admin, coordinator, member)
  - Events table with approval workflow
  - Sermons table with media URL support
  - Community groups for organizing church activities
- **Data Validation**: Drizzle-zod integration for schema validation
- **Migrations**: Drizzle Kit for database schema management

## Authentication & Authorization
- **Registration Options**: Email or mobile number registration
- **Verification**: Email/SMS verification system (implementation pending)
- **Role Assignment**: Admin-controlled user role assignment after registration
- **Session Security**: HTTP-only cookies with secure settings for production
- **Access Control**: Three-tier permission system (member, coordinator, admin)

## Content Management
- **Event Management**: Create, edit, and manage church events with category filtering
- **Sermon Archives**: Audio/video sermon library with metadata
- **Community Groups**: Static information for Sunday school, youth fellowship, women's fellowship, and men's fellowship
- **Photo/Video Galleries**: Media showcase for church activities
- **Search Functionality**: Content and event search capabilities

## Development Environment
- **Build Tool**: Vite for fast development and optimized production builds
- **Development Server**: Hot module replacement with error overlay
- **Code Quality**: TypeScript configuration with strict mode
- **Styling**: PostCSS with Tailwind CSS processing
- **Asset Management**: Static asset serving and path resolution

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Drizzle ORM**: Type-safe database queries and schema management
- **connect-pg-simple**: PostgreSQL session store for Express sessions

## UI/UX Libraries
- **Radix UI**: Accessible component primitives for complex UI components
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Type-safe CSS class management
- **Date-fns**: Date manipulation and formatting utilities

## Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type checking and enhanced developer experience
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing and optimization

## Authentication & Security
- **Passport.js**: Authentication middleware with strategy support
- **Express Session**: Session management with secure cookie handling
- **Crypto**: Node.js cryptographic functionality for password hashing

## Form & Data Management
- **React Hook Form**: Form state management and validation
- **Hookform Resolvers**: Validation schema integration
- **TanStack React Query**: Server state synchronization and caching
- **Zod**: Schema validation and type inference

## Media & File Handling
- **Embla Carousel**: Touch-friendly carousel component
- **React Day Picker**: Calendar and date selection components

Note: The project configuration indicates preparation for both JavaScript and TypeScript implementations, with current setup favoring TypeScript but requirements specifying JS/JSX usage.