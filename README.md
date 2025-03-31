# Organization Portal

A horizontal portal intranet built with Next.js 14 and Radix UI.

## Features

- Modern UI with responsive design for all devices
- Component-based architecture for easy maintenance and scalability
- TypeScript for type safety and improved developer experience
- Accessible components powered by Radix UI
- CSS Modules for component-specific styling

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **UI Components**: Radix UI
- **Styling**: CSS Modules & custom styling
- **Language**: TypeScript
- **Linting & Formatting**: ESLint, Prettier

## Project Structure

```
├── app/             # Next.js App Router pages and layouts
├── components/      # React components
│   ├── layout/      # Layout components (Header, Footer, Navigation)
│   ├── ui/          # Reusable UI components
│   └── pages/       # Page-specific components
├── data/            # Mock data in JSON format
├── lib/             # Utility functions and helpers
├── public/          # Static files
├── styles/          # Global styles and CSS modules
└── types/           # TypeScript interface definitions
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Run the development server
- `npm run build` - Build the production application
- `npm start` - Start the production server
- `npm run lint` - Run ESLint for code quality
- `npm run format` - Format code with Prettier

## Color Scheme

- Primary Blue: `#003087`
- Secondary Green: `#92c83e`
- Light Gray: `#f5f5f5`
- White: `#ffffff`

## Responsive Breakpoints

- Mobile: Up to 480px
- Tablet: 481px to 768px
- Desktop: 769px and above
