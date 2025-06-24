# Wilma Ecosystem Deployment Guide

This document outlines the steps to deploy the Wilma Ecosystem applications to production environments.

## Domain Structure

The Wilma Ecosystem uses the following domain structure:

- **Main Site**: wilma-wedding.com
- **Budget Calculator**: budget.wilma-wedding.com
- **Timeline Generator** (future): timeline.wilma-wedding.com
- **Guest Manager** (future): guests.wilma-wedding.com
- **Venue Analyzer** (future): venue.wilma-wedding.com
- **Wellness Planner** (future): wellness.wilma-wedding.com

## Prerequisites

Before deploying, ensure you have:

1. A Vercel account with access to the Wilma project
2. Ownership or access to the wilma-wedding.com domain
3. Proper DNS configuration for all subdomains
4. Supabase project setup and credentials
5. Google Analytics or similar setup (optional)

## Deployment Steps

### 1. Setting Up Domains in Vercel

1. Log in to your Vercel dashboard
2. Navigate to the "Domains" section
3. Add the primary domain: `wilma-wedding.com`
4. Add subdomains:
   - `budget.wilma-wedding.com`
   - (Future: Add other tool subdomains as needed)

### 2. Configuring DNS

Configure your DNS settings with your domain provider:

```
# A Records
wilma-wedding.com         -> Vercel IP
budget.wilma-wedding.com  -> Vercel IP

# CNAME Records (Alternative)
budget                    -> cname.vercel-dns.com
```

### 3. Landing Page Deployment

1. Push your code to the connected GitHub repository
2. Create a new project in Vercel:
   - Connect to the GitHub repository
   - Set the root directory to `wilma-ecosystem`
   - Set the framework preset to "Next.js"
   - Set the build command to: `cd ../.. && pnpm build --filter @wilma/landing`
   - Set the output directory to `.next`

3. Configure environment variables:
   - Go to "Settings" > "Environment Variables"
   - Add the following variables:
     ```
     NEXT_PUBLIC_ANALYTICS_ID=G-XXXXXXXXXX
     NEXT_PUBLIC_APP_ENV=production
     NEXT_PUBLIC_BUDGET_APP_URL=https://budget.wilma-wedding.com
     ```

4. Link the domain:
   - Go to "Domains"
   - Add and verify the domain: `wilma-wedding.com`

### 4. Budget Calculator Deployment

1. Push your code to the connected GitHub repository
2. Create a new project in Vercel:
   - Connect to the GitHub repository
   - Set the root directory to `wilma-budget-calculator`
   - Set the framework preset to "Vite"
   - No need to modify build settings as they're in the vercel.json file

3. Configure environment variables in Vercel:
   - Go to "Settings" > "Environment Variables"
   - Add the following variables:
     ```
     VITE_SUPABASE_URL=https://your-supabase-project-url.supabase.co
     VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
     VITE_ANALYTICS_ID=G-XXXXXXXXXX
     VITE_APP_ENV=production
     VITE_MAIN_SITE_URL=https://wilma-wedding.com
     ```

4. Link the domain:
   - Go to "Domains"
   - Add and verify the domain: `budget.wilma-wedding.com`

### 5. Vercel Project Settings

For each project, configure the following settings:

1. **Production Branch**: Set to `main` or your production branch
2. **Build Cache**: Enable to improve build times
3. **Automatic Deployments**: Enable for automatic deployment on push
4. **Preview Deployments**: Configure for PR previews
5. **Performance Monitoring**: Enable if desired

## Environment Variables

### Using Vercel Environment Secrets

For sensitive information like API keys, use Vercel Secrets:

```bash
# From your local machine with Vercel CLI installed
vercel secrets add wilma_supabase_url "https://your-supabase-project-url.supabase.co"
vercel secrets add wilma_supabase_anon_key "your-supabase-anon-key"
vercel secrets add wilma_analytics_id "G-XXXXXXXXXX"
```

Then reference these in your vercel.json file or project settings:

```json
"env": {
  "VITE_SUPABASE_URL": "@wilma_supabase_url",
  "VITE_SUPABASE_ANON_KEY": "@wilma_supabase_anon_key",
  "VITE_ANALYTICS_ID": "@wilma_analytics_id"
}
```

## Custom Domains and HTTPS

Vercel automatically configures HTTPS for all domains. Ensure that:

1. DNS records are properly configured
2. Domain verification is completed
3. SSL certificates are issued and renewed automatically

## Monitoring and Logs

After deployment:

1. Monitor the deployment status in the Vercel dashboard
2. Check deployment logs for any errors
3. Set up Vercel Analytics to monitor performance
4. Configure notifications for deployment failures

## Rollback Procedure

If issues occur with a deployment:

1. Go to the "Deployments" section in the Vercel dashboard
2. Find the last working deployment
3. Click the three dots (⋮) and select "Promote to Production"

## Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check build logs for specific errors
   - Ensure all dependencies are correctly installed
   - Verify that environment variables are correctly set

2. **Domain Configuration Issues**:
   - Verify DNS records are correct
   - Check domain verification status
   - Allow up to 48 hours for DNS propagation

3. **Monorepo Build Problems**:
   - Verify the root directory setting
   - Check if build commands correctly reference the package
   - Ensure dependencies between packages are correctly resolved
