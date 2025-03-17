'use client';

import { Editor as MonacoEditor } from '@monaco-editor/react';
import { useTheme } from 'next-themes';

export function Editor() {
  const { theme } = useTheme();

  return (
    <div className="flex-1 overflow-hidden">
      <MonacoEditor
        height="100%"
        defaultLanguage="typescript"
        defaultValue="// Welcome to Swifty IDE!"
        theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          readOnly: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
} 