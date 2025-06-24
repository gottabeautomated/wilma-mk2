# Wilma Budget Calculator

A standalone micro-application from the Wilma Wedding Planning ecosystem. This application helps couples plan their wedding budget with personalized recommendations based on their location, guest count, and preferences.

## Features

- 💰 **Personalized Budget Breakdown**: Get a customized budget allocation based on your wedding details
- 📊 **Visual Budget Chart**: See a clear visualization of how your budget is distributed
- 📋 **Category Breakdown**: Detailed allocation with percentages for each wedding category
- 💡 **Smart Recommendations**: AI-powered suggestions to optimize your spending
- 📱 **Responsive Design**: Works beautifully on all devices
- 🔄 **Shareable Results**: Download, email, or share your budget plan

## Technology Stack

- **Frontend**: React with TypeScript
- **Styling**: TailwindCSS with wedding-themed design system
- **Charts**: Recharts for data visualization
- **Animation**: Framer Motion for smooth transitions
- **Forms**: React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies using pnpm
pnpm install

# Start the development server
pnpm dev
```

The app will be available at http://localhost:5173

## Project Structure

```
wilma-budget-calculator/
├── public/                # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── BudgetCalculator.tsx    # Main calculator component
│   │   ├── BudgetForm.tsx          # Input form
│   │   ├── BudgetResults.tsx       # Results display
│   │   ├── BudgetChart.tsx         # Pie chart visualization
│   │   ├── CategoryBreakdown.tsx   # Detailed breakdown
│   │   └── LoadingAnimation.tsx    # Loading state
│   ├── App.tsx           # Main App component
│   └── main.tsx          # Application entry point
└── package.json          # Dependencies and scripts
```

## Integration with Wilma Ecosystem

This application is part of the Wilma Wedding Planning ecosystem, a suite of tools to help couples plan their perfect wedding. It shares common types, UI components, and utilities with other Wilma applications through the shared packages.

## Shared Dependencies

- **@wilma/shared-ui**: Common UI components with wedding theme
- **@wilma/shared-types**: TypeScript interfaces and types
- **@wilma/shared-utils**: Utility functions and helpers

## Deployment

The application is configured for deployment on Vercel. Each Wilma tool is deployed as a separate application with its own subdomain, maintaining a cohesive experience through shared design elements and navigation.

## License

This project is private and proprietary to Wilma Wedding Planning.
