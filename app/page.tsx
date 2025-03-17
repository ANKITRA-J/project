'use client';

import dynamic from 'next/dynamic';
import { FileExplorer } from '@/components/file-explorer/FileExplorer';
import { SwiftUIPreview } from '@/components/preview/SwiftUIPreview';
import { ExecutionPanel } from '@/components/editor/ExecutionPanel';
import { Terminal } from '@/components/terminal/Terminal';
import { Toaster } from '@/components/ui/toaster';
import { useState } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Dynamically import the Editor component with SSR disabled
const Editor = dynamic(() => import('@/components/editor/Editor').then(mod => mod.Editor), {
  ssr: false,
  loading: () => <div className="h-full flex items-center justify-center">Loading editor...</div>
});

function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export default function Home() {
  const [code, setCode] = useState('// Write your Swift code here\nprint("Hello, World!")');

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <main className="flex h-screen flex-col">
        <header className="flex items-center justify-between border-b p-4">
          <h1 className="text-2xl font-bold">Swift IDE</h1>
          <ThemeToggle />
        </header>
        <div className="flex flex-1 overflow-hidden">
          {/* File Explorer - Left Sidebar */}
          <div className="w-64 border-r">
            <FileExplorer />
          </div>
          
          {/* Main Content + Preview */}
          <div className="flex flex-1 flex-col">
            {/* Editor Section */}
            <div className="flex flex-1">
              {/* Editor */}
              <div className="flex-[3] border-r">
                <Editor code={code} onChange={setCode} />
              </div>
              
              {/* Preview */}
              <div className="w-96 border-l">
                <SwiftUIPreview code={code} />
              </div>
            </div>
            
            {/* Bottom Section: Terminal and Output */}
            <div className="flex h-64 border-t">
              {/* Terminal */}
              <div className="w-1/2 border-r">
                <Terminal />
              </div>
              
              {/* Output */}
              <div className="w-1/2">
                <ExecutionPanel code={code} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Toaster />
    </ThemeProvider>
  );
}