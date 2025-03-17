'use client';

import { Button } from '@/components/ui/button';
import { File, Folder, Plus } from 'lucide-react';

export function FileExplorer() {
  return (
    <div className="w-64 border-r bg-muted/50">
      <div className="flex h-10 items-center border-b px-4">
        <h2 className="text-sm font-semibold">Explorer</h2>
        <Button variant="ghost" size="icon" className="ml-auto h-8 w-8">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-2">
        <div className="flex items-center gap-1 rounded-sm px-2 py-1 text-sm hover:bg-accent">
          <Folder className="h-4 w-4" />
          <span>src</span>
        </div>
        <div className="flex items-center gap-1 rounded-sm px-2 py-1 text-sm hover:bg-accent">
          <File className="h-4 w-4" />
          <span>index.ts</span>
        </div>
      </div>
    </div>
  );
} 