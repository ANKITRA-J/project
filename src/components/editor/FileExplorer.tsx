'use client';

import { Button } from '@/components/ui/button';
import { File, Folder, Plus } from 'lucide-react';
import { useState } from 'react';

interface FileItem {
  name: string;
  type: 'file' | 'folder';
  path: string;
}

export function FileExplorer() {
  const [files, setFiles] = useState<FileItem[]>([
    { name: 'Sources', type: 'folder', path: '/Sources' },
    { name: 'main.swift', type: 'file', path: '/Sources/main.swift' },
  ]);

  const handleAddFile = () => {
    const newFile: FileItem = {
      name: 'new.swift',
      type: 'file',
      path: '/Sources/new.swift',
    };
    setFiles([...files, newFile]);
  };

  return (
    <div className="w-64 border-r bg-muted/50">
      <div className="flex h-10 items-center border-b px-4">
        <h2 className="text-sm font-semibold">Explorer</h2>
        <Button variant="ghost" size="icon" className="ml-auto h-8 w-8" onClick={handleAddFile}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-2">
        {files.map((file) => (
          <div
            key={file.path}
            className="flex items-center gap-1 rounded-sm px-2 py-1 text-sm hover:bg-accent cursor-pointer"
          >
            {file.type === 'folder' ? (
              <Folder className="h-4 w-4" />
            ) : (
              <File className="h-4 w-4" />
            )}
            <span>{file.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 