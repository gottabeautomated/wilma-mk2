# Wilma Ecosystem Deployment Setup

This document provides step-by-step instructions for setting up the deployment environment for the Wilma Ecosystem, including the Budget Calculator micro-app and the main Landing Page.

## Prerequisites

- [Vercel Account](https://vercel.com) with access to deploy projects
- Domain ownership for `wilma-wedding.com` 
- [Vercel CLI](https://vercel.com/docs/cli) installed (optional, for automated setup)
- [Node.js](https://nodejs.org/) version 14 or higher
- [pnpm](https://pnpm.io/) package manager

## Step 1: DNS Configuration

Configure your domain registrar to point the domains to Vercel:

1. Log in to your domain registrar's control panel
2. Add the following DNS records:
   - For the root domain (`wilma-wedding.com`):
     ```
     Type: A
     Name: @
     Value: 76.76.21.21
     ```
   - For the budget subdomain:
     ```
     Type: CNAME
     Name: budget
     Value: cname.vercel-dns.com
     ```

## Step 2: Setup Vercel Projects Manually

### Budget Calculator App

1. Log in to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import the GitHub repository containing your code
4. Configure the project:
   - Framework Preset: Vite
   - Root Directory: `wilma-budget-calculator`
   - Build Command: `pnpm build`
   - Output Directory: `dist`
5. Add environment variables:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
   - `VITE_ANALYTICS_ID`: Your Google Analytics ID
   - `VITE_APP_ENV`: `production`
   - `VITE_MAIN_SITE_URL`: `https://wilma-wedding.com`
6. Deploy the project
7. Go to "Domains" and add `budget.wilma-wedding.com`

### Landing Page

1. Create a new project in Vercel
2. Import the GitHub repository
3. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: `wilma-ecosystem/apps/landing`
   - Build Command: `cd ../.. && pnpm build --filter @wilma/landing`
   - Install Command: `cd ../.. && pnpm install`
4. Add environment variables:
   - `NEXT_PUBLIC_ANALYTICS_ID`: Your Google Analytics ID
   - `NEXT_PUBLIC_APP_ENV`: `production`
   - `NEXT_PUBLIC_BUDGET_APP_URL`: `https://budget.wilma-wedding.com`
5. Deploy the project
6. Go to "Domains" and add `wilma-wedding.com`

## Step 3: Setup Vercel Projects Using Script (Alternative)

For Windows users, you can run the setup script to automate the Vercel project configuration:

1. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Log in to Vercel:
   ```
   vercel login
   ```

3. Run the setup script (Windows):
   ```
   node wilma-ecosystem/scripts/setup-vercel-projects.js
   ```

The script will:
- Create Vercel projects for each app
- Configure build settings
- Add environment variables
- Set up domains

## Step 4: Verify Deployments

1. Check the deployment status in your Vercel dashboard
2. Visit the deployed sites:
   - `https://wilma-wedding.com` (Landing Page)
   - `https://budget.wilma-wedding.com` (Budget Calculator)
3. Test the navigation between sites
4. Verify the "Back to Wilma" functionality on the Budget Calculator

## Step 5: Monitor and Maintain

1. Set up monitoring in Vercel Analytics
2. Configure deployment notifications
3. Set up automatic renewals for your domain

## Troubleshooting

- **Build Errors**: Check the build logs in Vercel for specific error messages
- **Domain Issues**: Verify DNS propagation using `dig` or `nslookup`
- **Environment Variables**: Ensure all required environment variables are set correctly
- **Cross-Origin Issues**: Check CORS configuration if micro-apps cannot communicate

For detailed deployment architecture and advanced configuration options, refer to the [DEPLOYMENT.md](./DEPLOYMENT.md) guide.
