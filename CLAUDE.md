# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands
- `npm run dev`: Start development server with turbopack
- `npm run build`: Build production-ready app
- `npm run start`: Run production build
- `npm run lint`: Run ESLint for code linting

## Code Style Guidelines
- **TypeScript**: Use strict typing with proper interfaces/types
- **Imports**: Use absolute imports with path aliases `@/*` for src directory
- **Component Structure**: Follow Next.js App Router conventions
- **Naming**: Use PascalCase for components, camelCase for functions/variables
- **Error Handling**: Use try/catch for async operations
- **Styling**: Use Tailwind CSS for styling components
- **React**: Use React 19 features including hooks and functional components
- **ESLint**: Follow Next.js core-web-vitals and TypeScript rules
- **File Organization**: Keep related files in appropriate directories under src/