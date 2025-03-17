'use client';

import { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface EditorProps {
  code: string;
  onChange: (code: string) => void;
}

export function Editor({ code, onChange }: EditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstance = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    // Initialize Monaco Editor
    editorInstance.current = monaco.editor.create(editorRef.current, {
      value: code,
      language: 'swift',
      theme: 'vs-dark',
      minimap: { enabled: false },
      fontSize: 14,
      lineNumbers: 'on',
      scrollBeyondLastLine: false,
      automaticLayout: true,
    });

    // Handle code changes
    editorInstance.current.onDidChangeModelContent(() => {
      const value = editorInstance.current?.getValue() || '';
      onChange(value);
    });

    return () => {
      editorInstance.current?.dispose();
    };
  }, []);

  // Update editor content when code prop changes
  useEffect(() => {
    if (editorInstance.current && code !== editorInstance.current.getValue()) {
      editorInstance.current.setValue(code);
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