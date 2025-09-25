# Welcome to **Modern Walk**

## Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Product Catalog**: Browse men's and women's clothing collections
- **Flash Sales**: Featured top-rated products with special deals
- **Smart Navigation**: Intuitive category-based browsing
- **Product Carousel**: Interactive product showcases with navigation
- **Error Handling**: Graceful error states and loading indicators
- **Performance Optimized**: Built with Next.js 15 and React 19 for optimal performance
- **Type Safe**: Full TypeScript support for robust development

## Tech Stack

### Frontend

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **React**: Version 19.1.0 with latest features
- **TypeScript**: Full type safety and developer experience
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with modern design system
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) primitives
- **Icons**: [Lucide React](https://lucide.dev/) for consistent iconography

### State Management & Data Fetching

- **Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query/latest) v5
- **HTTP Client**: [Axios](https://axios-http.com/) with custom interceptors
- **Theme Management**: [next-themes](https://github.com/pacocoursey/next-themes)

### Development Tools

- **Linting**: [ESLint](https://eslint.org/) with Next.js configuration
- **Code Formatting**: [Prettier](https://prettier.io/)
- **Git Hooks**: [Husky](https://typicode.github.io/husky/) with lint-staged
- **Build Tool**: Turbopack for faster development builds

### Architecture

- **Component Architecture**: Atomic Design (Atoms → Molecules → Organisms → Templates)
- **Custom Hooks**: Reusable logic for text truncation and product sorting
- **API Layer**: Centralized service layer with proper error handling
- **Providers**: Context-based providers for theme, queries, and hydration

## Prerequisites

Before you begin, ensure you have the following installed

- **Node.js**: Version 18.0 or higher
- **npm**: Version 8.0 or higher (comes with Node.js)
- **Git**: For version control

## Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/nimesha-edirisinghe/modern-walk.git
   cd modern-walk
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory:

   ```bash
   NEXT_PUBLIC_API_BASE_URL=https://fakestoreapi.com
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks
- `npm run prepare` - Set up Husky git hooks

## Project Structure

```
src/
├── app/                    - Next.js App Router pages
│   ├── layout.tsx          - Root layout with providers
│   ├── page.tsx            - Home page with flash sales
│   ├── mens-clothing/      - Men's clothing category
│   └── womens-clothing/    - Women's clothing category
├── components/             - UI Components (Atomic Design)
│   ├── atoms/              - Basic building blocks
│   ├── molecules/          - Simple component combinations
│   ├── organisms/          - Complex UI sections
│   └── templates/          - Page-level templates
├── hooks/                  - Custom React hooks
├── lib/                    - Core utilities and configurations
│   ├── api/                - API layer and services
│   └── utils.ts            - Utility functions
├── providers/              - React context providers
├── types/                  - TypeScript type definitions
└── utils/                  - Helper functions
```

## Component Architecture

The project follows **Atomic Design** pattern

- **Atoms**: Basic UI elements (Button, Tooltip)
- **Molecules**: Simple combinations (ProductCard, CategoryTile, ErrorState)
- **Organisms**: Complex sections (Navbar, ProductCarousel)
- **Templates**: Page layouts (CategoryPageTemplate, HydrationSafeBody)

## API Integration

The application integrates with the [Fake Store API](https://fakestoreapi.com/) to provide

- Product listings and details
- Category-based filtering
- Top-rated product recommendations
- Real-time data with React Query caching
