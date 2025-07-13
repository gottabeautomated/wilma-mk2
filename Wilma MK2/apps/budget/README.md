# Wilma Budget Calculator

AI-powered wedding budget calculator that provides personalized budget recommendations based on guest count, location, style preferences, and regional pricing data.

## Features

- **AI-Powered Calculations**: Smart budget allocation using machine learning
- **Regional Pricing**: Real-time market data for accurate location-based pricing
- **Interactive Charts**: Beautiful visualizations using Recharts
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Export Options**: PDF generation and email capture
- **Analytics Tracking**: Google Analytics 4 integration
- **Accessibility**: WCAG 2.1 AA compliant

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **Forms**: React Hook Form, Zod validation
- **Charts**: Recharts
- **State Management**: React Query, Local Storage
- **Build Tool**: Vite with optimized bundles

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Navigate to budget app directory
cd apps/budget

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
npm run dev          # Start development server on port 3001
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## Project Structure

```
src/
├── components/          # React components
│   ├── BudgetForm.tsx
│   ├── BudgetResults.tsx
│   ├── BudgetChart.tsx
│   ├── Header.tsx
│   └── Footer.tsx
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

## Environment Variables

Create a `.env.local` file:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GA_MEASUREMENT_ID=your_ga_measurement_id
```

## Features Overview

### Budget Calculation
- Guest count-based calculations
- Location-specific pricing
- Style preference adjustments
- Real-time market data integration

### User Experience
- Beautiful wedding-themed design
- Smooth animations with Framer Motion
- Mobile-responsive interface
- Accessibility features

### Data Export
- PDF generation with jsPDF
- Email capture for follow-up
- Shareable results

### Analytics
- Google Analytics 4 integration
- Event tracking for user interactions
- Conversion funnel analysis

## Deployment

The application is configured for deployment on Vercel, Netlify, or any static hosting service.

```bash
# Build for production
npm run build

# The dist/ folder contains the built application
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details. 