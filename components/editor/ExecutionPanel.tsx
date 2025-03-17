'use client';

import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

export function ExecutionPanel() {
  return (
    <div className="h-48 border-t bg-muted/50">
      <div className="flex h-10 items-center border-b px-4">
        <Button variant="ghost" size="sm" className="gap-2">
          <Play className="h-4 w-4" />
          Run
        </Button>
      </div>
      <div className="h-[calc(100%-2.5rem)] overflow-auto p-4 font-mono text-sm">
        <div className="text-muted-foreground">{/* Output will appear here */}</div>
      </div>
    </div>
  );
} 