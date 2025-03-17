'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Square } from 'lucide-react';

interface ExecutionPanelProps {
  output: string;
  error: string | null;
  isRunning: boolean;
  onRun: () => void;
  onStop: () => void;
  onReset: () => void;
}

export function ExecutionPanel({
  output,
  error,
  isRunning,
  onRun,
  onStop,
  onReset,
}: ExecutionPanelProps) {
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between border-b p-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Output</span>
        </div>
        <div className="flex items-center gap-2">
          {isRunning ? (
            <Button
              variant="destructive"
              size="sm"
              onClick={onStop}
              className="flex items-center gap-2"
            >
              <Square className="h-4 w-4" />
              Stop
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={onRun}
              className="flex items-center gap-2"
            >
              <Play className="h-4 w-4" />
              Run
            </Button>
          )}
        </div>
      </div>
      <div
        ref={outputRef}
        className="flex-1 overflow-auto p-4 font-mono text-sm whitespace-pre-wrap"
      >
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="text-foreground">{output || 'No output yet'}</div>
        )}
      </div>
    </div>
  );
} 