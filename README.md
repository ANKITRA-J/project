# Swift IDE

A modern web-based IDE for Swift development with SwiftUI preview support.

## Features

- Monaco Editor with Swift syntax highlighting
- SwiftUI Preview with live updates
- Integrated Terminal for Swift package management
- Dark/Light theme support
- File explorer
- Code execution with output panel
- Modern UI with tabs and panels

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development

The project is built with:
- Next.js 14
- TypeScript
- Tailwind CSS
- Monaco Editor
- Radix UI

## Project Structure

```
src/
  ├── components/
  │   ├── editor/         # Code editor components
  │   ├── file-explorer/  # File tree components
  │   ├── preview/        # SwiftUI preview components
  │   ├── terminal/       # Terminal components
  │   └── ui/            # Reusable UI components
  ├── lib/               # Utility functions and services
  └── app/              # Next.js app router pages
```

## License

MIT 