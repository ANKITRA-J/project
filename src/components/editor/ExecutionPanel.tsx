'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Square } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ExecutionPanelProps {
  code: string;
}

export function ExecutionPanel({ code }: ExecutionPanelProps) {
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const { toast } = useToast();

  const handleRun = async () => {
    setIsRunning(true);
    setOutput([]);

    try {
      // Simulate code execution
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add some mock output based on the code
      if (code.includes('print(')) {
        const printMatches = code.match(/print\(["'](.+?)["']\)/g);
        if (printMatches) {
          setOutput([
            'Running Swift code...',
            ...printMatches.map(match => {
              const content = match.match(/print\(["'](.+?)["']\)/);
              return content ? content[1] : '';
            }),
            'Program exited with code 0'
          ]);
        } else {
          setOutput([
            'Running Swift code...',
            'Hello, World!',
            'Program exited with code 0'
          ]);
        }
      } else {
        setOutput([
          'Running Swift code...',
          'Program executed with no output',
          'Program exited with code 0'
        ]);
      }

      toast({
        title: 'Success',
        description: 'Code executed successfully!',
      });
    } catch (error) {
      setOutput(['Error: Failed to execute code']);
      toast({
        title: 'Error',
        description: 'Failed to execute code',
        variant: 'destructive',
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    setOutput(prev => [...prev, 'Execution stopped']);
    toast({
      title: 'Stopped',
      description: 'Code execution stopped',
    });
  };

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
              onClick={handleStop}
              className="flex items-center gap-2"
            >
              <Square className="h-4 w-4" />
              Stop
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={handleRun}
              className="flex items-center gap-2"
            >
              <Play className="h-4 w-4" />
              Run
            </Button>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4 font-mono text-sm">
        {output.length === 0 ? (
          <div className="text-muted-foreground text-center">
            No output yet. Click Run to execute the code.
          </div>
        ) : (
          <div className="space-y-2">
            {output.map((line, index) => (
              <div key={index} className="whitespace-pre-wrap">
                {line}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 