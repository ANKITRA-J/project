'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface EditorProps {
  code: string;
  onChange: (code: string) => void;
}

export function Editor({ code, onChange }: EditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const monacoRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let monaco: any;
    
    // Dynamically import Monaco Editor only on client side
    import('monaco-editor').then(module => {
      monaco = module;
      
      if (!editorRef.current) return;
      
      // Clean up previous instance if it exists
      if (monacoRef.current) {
        monacoRef.current.dispose();
      }

      // Initialize editor
      const editor = monaco.editor.create(editorRef.current, {
        value: code,
        language: 'swift',
        theme: 'vs-dark',
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true,
      });

      // Save reference
      monacoRef.current = editor;

      // Handle content changes
      editor.onDidChangeModelContent(() => {
        const value = editor.getValue();
        onChange(value);
      });
    });

    return () => {
      // Clean up
      if (monacoRef.current) {
        monacoRef.current.dispose();
      }
    };
  }, []);

  // Update editor when code prop changes
  useEffect(() => {
    if (monacoRef.current && code !== monacoRef.current.getValue()) {
      monacoRef.current.setValue(code);
    }
  }, [code]);

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'swift-code.swift';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between border-b p-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Editor</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Download
        </Button>
      </div>
      <div ref={editorRef} className="flex-1" />
    </div>
  );
} 