# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build production application  
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks
- `npm test` - No test framework configured yet (displays error message)

## Architecture Overview

This is a Next.js 14 frontend application for the Fulldata microservices platform, implementing a search system for people, companies, vehicles, phones, and banks.

### Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS with custom color scheme (primary: #eb1034, secondary: #192440)
- **State Management**: Redux Toolkit
- **Authentication**: Mock authentication with cookie-based tokens
- **Icons**: Heroicons and Lucide React

### Key Directories Structure

- `app/` - Next.js App Router pages and layouts
  - `dashboard/` - Main dashboard after login
  - `search/` - Search functionality for different entities (people, company, vehicle, phone, bank)
  - `history/` - Search history
  - `reports/` - Individual report views  
  - `credits/` - Credit management
  - `login/` - Authentication page
- `components/` - Reusable UI components
  - `layout/` - Header and Sidebar components
- `store/` - Redux store configuration
  - `slices/` - Redux slices for auth, search, and reports
- `services/` - API service layers
- `styles/` - Global CSS styles
- `temp_assets/` - Development assets (favicon, logos)

### State Management

Redux store configured with three main slices:

- `auth` - Authentication state
- `search` - Search functionality state  
- `report` - Report data state

### Routing & Authentication

- Protected routes via `middleware.ts`
- Cookie-based authentication (`authToken`)
- Redirects unauthenticated users to `/login`
- Redirects authenticated users from `/login` to `/dashboard`

### Styling System

- Custom Tailwind configuration with Fulldata brand colors
- Inter font family for typography
- Responsive design patterns
- Primary color: #eb1034, Secondary color: #192440

## Development Notes

- Uses TypeScript with path aliases (`@/*` maps to root)
- ESLint configured with Next.js core web vitals
- React Strict Mode enabled
- No test framework currently configured
- Development focuses on UI/UX design before implementing advanced functionality
- Spanish language interface ("es" locale)
