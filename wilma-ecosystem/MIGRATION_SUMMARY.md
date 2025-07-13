# Wilma Ecosystem Migration Summary

## Overview
This document outlines the migration of the Wilma Wedding Planning tools from a monolithic application into a microservices architecture, with shared packages for reusable components, types, and utilities.

## Migration Strategy

1. **Extract Core Features into Micro-Applications**
   - Budget Calculator (completed)
   - Guest Manager (planned)
   - Timeline Generator (planned)
   - Venue Analyzer (planned)
   - Stress Planner (planned)

2. **Create Shared Packages**
   - `@wilma/shared-types`: Common TypeScript types used across applications
   - `@wilma/shared-utils`: Utility functions and calculators
   - `@wilma/shared-ui`: UI components and design system
   - `@wilma/shared-auth`: Authentication and user management

3. **Set Up Monorepo Structure**
   - Used pnpm workspaces for package management
   - Implemented Turborepo for build orchestration
   - Created consistent tooling across applications

## Authentication & Data Persistence

### Supabase Integration

Implemented Supabase for authentication and database storage:

```sql
-- Weddings table
CREATE TABLE weddings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  wedding_date DATE,
  guest_count INTEGER,
  budget DECIMAL(12,2),
  location TEXT,
  style TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Budget calculations
CREATE TABLE budget_calculations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  session_id TEXT, -- For anonymous users
  wedding_id UUID REFERENCES weddings(id),
  input_data JSONB NOT NULL,
  results JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Email captures (for anonymous users)
CREATE TABLE email_captures (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  source TEXT NOT NULL,
  capture_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Authentication Features

The `@wilma/shared-auth` package provides:

- User sign-up and login
- Session management
- Protected routes
- User profile management
- Password reset functionality

### Data Persistence Strategy

Each micro-application implements:

1. **Anonymous Usage**: Users can use tools without an account, with results stored temporarily
2. **Email Capture**: Anonymous users can save results by providing an email
3. **User Accounts**: Full functionality with persistent storage across applications
4. **Cross-Application Data Sharing**: Data from one tool available to other tools

## Deployment Architecture

- Each micro-application is deployed as a standalone Vite application
- Shared packages are published to a private registry
- Vercel is used for hosting and preview environments
- Environment variables control feature flags and API endpoints

## Next Steps

1. Complete the extraction of remaining tools
2. Implement cross-application navigation
3. Develop a central dashboard for users with accounts
4. Create a landing page linking to all tools

## Technical Considerations

- Type safety is maintained across package boundaries
- Environment variables are standardized across applications
- Authentication state is shared between applications
- Design system ensures consistent UI/UX across all tools
