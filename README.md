# 💰 Modern Expense Tracker

> A sleek, modern expense tracking application built with cutting-edge web technologies. Track your spending, analyze spending patterns, and gain valuable insights into your financial habits.

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-6.30-CA4245?logo=reactrouter&logoColor=white)

---

## 🎯 Overview

Modern Expense Tracker is a full-featured expense management application designed to help users understand and control their spending. With an intuitive interface and powerful analytics, you can effortlessly track expenses, visualize spending trends, and make informed financial decisions.

### What Problem Does It Solve?

- **Financial Awareness**: Understand exactly where your money goes with detailed expense breakdowns
- **Spending Patterns**: Identify trends and optimize your spending habits over time
- **Quick Management**: Add, edit, and categorize expenses with an intuitive, fast interface
- **Visual Insights**: Beautiful charts and summaries to understand your financial health at a glance

---

## ✨ Key Features

- 📊 **Interactive Charts & Analytics**
  - Monthly expense trends with line charts
  - Category-wise spending distribution
  - Real-time expense summaries

- 💾 **Expense Management**
  - Create, read, update, and delete expenses
  - Organize by categories and dates
  - Search and filter capabilities

- 🎨 **Modern UI/UX**
  - Clean, responsive design with Tailwind CSS
  - Accessible components from Shadcn/UI
  - Smooth animations and transitions
  - Works seamlessly on desktop and mobile

- 🔍 **Data Visualization**
  - Recharts integration for professional-grade charts
  - Monthly spending trends
  - Category breakdown analysis
  - Real-time updates

- 🔐 **Form Validation**
  - Type-safe form handling with React Hook Form
  - Schema validation using Zod
  - Real-time error feedback

- ⚡ **Performance Optimized**
  - Vite for lightning-fast development
  - React Query for efficient data management
  - SWC for fast compilation

---

## 🛠️ Tech Stack

### Frontend Framework
- **React 18.3** - UI library with Hooks and functional components
- **TypeScript 5.8** - Type-safe JavaScript for better developer experience

### Build Tools & Bundler
- **Vite 7.3** - Next-generation frontend build tool with HMR
- **SWC** - Ultra-fast JavaScript compiler for Vite

### Styling & UI
- **Tailwind CSS 3.4** - Utility-first CSS framework for rapid UI development
- **Shadcn/UI** - High-quality, accessible React components built on Radix UI
- **Radix UI** - Unstyled, accessible components for building design systems

### Form Management
- **React Hook Form 7.61** - Performant, flexible form validation library
- **@hookform/resolvers 3.10** - Resolvers for popular validation libraries
- **Zod 3.25** - TypeScript-first schema validation

### Routing & Navigation
- **React Router DOM 6.30** - Client-side routing for SPAs

### Data Visualization
- **Recharts 2.15** - Composable charting library built on React components
- **Date-fns 3.6** - Modern date utility library

### State Management & Data Fetching
- **React Query 5.83** - Powerful data synchronization and caching
- **Next Themes 0.3** - Dark mode management

### Additional Libraries
- **Lucide React** - Beautiful, consistent icon library
- **Sonner 1.7** - Toast notifications
- **Tailwind Merge 2.6** - Merge Tailwind CSS classes intelligently
- **Tailwind Animate 1.0** - Animation utilities for Tailwind

### Developer Tools
- **ESLint 9.32** - Code quality and style enforcement
- **Vitest 3.2** - Unit testing framework
- **Testing Library** - React component testing utilities

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/modern-expenseTracker.git
   cd modern-expenseTracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

### Available Scripts

```bash
# Development server with HMR
npm run dev

# Build for production
npm run build

# Build in development mode (for debugging)
npm run build:dev

# Preview production build
npm preview

# Run linter
npm run lint

# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

---

## 📁 Project Structure

```
modern-expenseTracker/
├── src/
│   ├── components/           # Reusable React components
│   │   ├── dashboard/        # Dashboard-specific components
│   │   │   ├── ExpenseChart.tsx
│   │   │   ├── MonthlyChart.tsx
│   │   │   └── SummaryCard.tsx
│   │   ├── expenses/         # Expense management components
│   │   │   ├── ExpenseForm.tsx
│   │   │   └── ExpenseList.tsx
│   │   ├── layout/           # Layout components
│   │   ├── ui/               # Shadcn/UI components
│   │   └── NavLink.tsx
│   ├── hooks/                # Custom React hooks
│   │   ├── useExpenses.ts    # Expense management hook
│   │   └── use-mobile.tsx    # Mobile detection hook
│   ├── pages/                # Page components
│   │   ├── Index.tsx         # Home/dashboard page
│   │   └── NotFound.tsx      # 404 page
│   ├── types/                # TypeScript type definitions
│   │   └── expense.ts        # Expense type definitions
│   ├── lib/                  # Utility functions
│   │   └── utils.ts          # Helper utilities
│   ├── test/                 # Test files
│   ├── App.tsx               # Main App component
│   ├── main.tsx              # Application entry point
│   ├── app.css               # Global styles
│   └── index.css             # Base styles
├── public/                   # Static assets
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── postcss.config.js         # PostCSS configuration
├── components.json           # Shadcn/UI configuration
└── package.json              # Project dependencies
```

---

## 💡 Architecture Highlights

### Component Design
- **Modular Architecture**: Components organized by feature (dashboard, expenses, layout)
- **Separation of Concerns**: UI components separate from business logic
- **Reusable Components**: Shadcn/UI provides accessible, composable components

### State Management
- **React Query**: Efficient data fetching and caching
- **Custom Hooks**: Encapsulated business logic in `useExpenses` hook
- **React Hook Form**: Form state management with validation

### Type Safety
- **Full TypeScript**: Complete type coverage for better IDE support and fewer runtime errors
- **Zod Validation**: Runtime schema validation ensuring data integrity
- **Type-defined Models**: Clear expense type definitions in `types/expense.ts`

### Performance Optimizations
- **Vite**: Extremely fast build and HMR
- **React Query**: Automatic request deduplication and caching
- **Code Splitting**: Automatic via Vite and React Router
- **Lazy Loading**: Components loaded on demand

---

## 🎓 What Makes This Project Special

### For Recruiters
This project demonstrates:
- ✅ **Modern React Patterns**: Hooks, functional components, custom hooks
- ✅ **TypeScript Expertise**: Strict type checking across the entire application
- ✅ **Component Architecture**: Well-organized, scalable component structure
- ✅ **Form Handling**: Professional validation patterns with React Hook Form + Zod
- ✅ **Data Visualization**: Integration of Recharts for complex UI requirements
- ✅ **Styling**: Advanced Tailwind CSS with responsive design
- ✅ **Build Tooling**: Modern tooling knowledge (Vite, SWC)
- ✅ **Testing**: Unit test setup with Vitest and Testing Library
- ✅ **Code Quality**: ESLint configuration for maintaining standards
- ✅ **UX/UI Focus**: Attention to user experience with accessible components

---

## 📊 Features Demo

### Dashboard View
- Real-time expense summary cards
- Monthly spending trend chart
- Category-wise expense breakdown

### Expense Management
- Quick add form for new expenses
- List view with edit/delete capabilities
- Filter and search functionality

### Analytics
- Monthly comparison charts
- Spending pattern analysis
- Category insights

---

## 🔒 Code Quality

- **ESLint**: Enforces consistent code style
- **TypeScript**: Strict type checking
- **Vitest**: Unit testing framework for reliable code
- **Pre-commit Hooks**: (Ready to add Husky for automated quality checks)

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the project and submit pull requests.

---

## 📞 Contact & Support

For questions or feedback, please reach out or open an issue in the repository.

---

**Built with ❤️ using modern web technologies**
```
