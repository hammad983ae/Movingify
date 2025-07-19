# Local Services Mobile Application

## Overview

This is a full-stack mobile-first web application for local service bookings, built with React, Express.js, and designed for mobile devices. The application provides services like moving, disposal, transport, and cleaning with a multi-step booking flow and internationalization support.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with separate client and server directories, shared schema definitions, and a mobile-first responsive design approach.

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter (lightweight router)
- **State Management**: TanStack Query for server state, React Context for local state
- **UI Components**: Radix UI with shadcn/ui component library
- **Styling**: Tailwind CSS with custom design tokens
- **Internationalization**: Custom translation system supporting English, German, and French
- **Mobile-First Design**: Responsive design optimized for mobile devices with bottom navigation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Neon serverless
- **ORM**: Drizzle ORM for type-safe database operations
- **API**: RESTful API structure with proper error handling
- **Development**: Vite integration for hot module replacement

## Key Components

### Database Schema
- **Users**: Authentication and user management
- **Bookings**: Central booking entity with service-specific JSON data
- **Moving Rooms**: Specific to moving services with floor and room type information
- **Disposal Items**: Items for disposal services with categories and quantities

### Service Flows
1. **Moving Service**: Options → Rooms → Locations → Contact → Success
2. **Disposal Service**: Items → Schedule → Success  
3. **Transport Service**: Locations → Contact → Success
4. **Cleaning Service**: Planned feature

### UI/UX Features
- Bottom navigation for main app sections (Home, Bookings, Profile, Support)
- Language toggle supporting EN/DE/FR
- Service cards with hover animations
- Mobile-optimized forms and interactions
- Toast notifications and loading states

### Storage Implementation
- **Development**: In-memory storage for rapid prototyping
- **Production**: PostgreSQL with Drizzle ORM migrations
- Abstract storage interface for easy switching between implementations

## Data Flow

1. **Client Requests**: React components make API calls through TanStack Query
2. **API Layer**: Express routes handle business logic and validation
3. **Database Layer**: Drizzle ORM manages database operations with type safety
4. **Response Handling**: Structured JSON responses with proper error handling
5. **State Management**: Client-side caching and synchronization via TanStack Query

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe ORM with PostgreSQL dialect
- **@radix-ui/***: Accessible UI primitives
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight routing
- **tailwindcss**: Utility-first CSS framework
- **zod**: Schema validation
- **framer-motion**: Animation library

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type checking and development experience
- **ESBuild**: Production bundling
- **tsx**: TypeScript execution for development

## Deployment Strategy

### Development Environment
- **Server**: tsx with hot reloading
- **Client**: Vite dev server with HMR
- **Database**: Drizzle push for schema changes

### Production Build
- **Client**: Vite build to static assets in `dist/public`
- **Server**: ESBuild bundle to `dist/index.js`
- **Database**: Migration-based schema management
- **Environment**: NODE_ENV-based configuration

### Configuration Management
- Environment variables for database connections
- Separate development and production configurations
- Path aliases for clean imports (@/, @shared/, @assets/)

The application is designed to be easily deployable to platforms like Replit with minimal configuration while maintaining production-ready architecture patterns.