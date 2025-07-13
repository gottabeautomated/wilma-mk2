# Wilma Landing Page

This is the main landing page for the Wilma Wedding Planning ecosystem. It showcases all the available tools and services that Wilma offers to help couples plan their perfect wedding.

## Features

- Responsive, modern design
- Showcase of all Wilma wedding planning tools
- Integration with the shared component library
- SEO optimized

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Access to the Wilma monorepo

### Installation

The landing page is part of the Wilma monorepo. To set it up:

```bash
# From the root of the monorepo
pnpm install
```

### Development

To start the development server:

```bash
# From the root of the monorepo
pnpm dev --filter @wilma/landing
```

Or navigate to the landing app directory and run:

```bash
cd apps/landing
pnpm dev
```

### Building

To build the application:

```bash
# From the root of the monorepo
pnpm build --filter @wilma/landing
```

## Architecture

The landing page is built with:

- Next.js 13+ (App Router)
- Tailwind CSS for styling
- Framer Motion for animations
- Shared UI components from `@wilma/shared-ui`
- Shared utilities from `@wilma/shared-utils`

## Deployment

The landing page is automatically deployed to Vercel through GitHub integration. Any push to the main branch will trigger a deployment.

## Related Apps

The landing page links to various micro-apps in the Wilma ecosystem:

- Budget Calculator (`@wilma/budget`)
- Timeline Generator (`@wilma/timeline`)
- Guest Manager (`@wilma/guests`)
- Venue Analyzer (`@wilma/venue`)
- Wellness Planner (`@wilma/wellness`)

## Contributing

When adding new features to the landing page, make sure to:

1. Use shared components from the UI library where possible
2. Follow the established design system and color palette
3. Ensure responsive design for all screen sizes
4. Update the tool information in shared utils if adding new tools
