'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export function Terminal() {
  const [commands, setCommands] = useState<string[]>([
    'Welcome to Swift IDE Terminal',
    'Type your commands below'
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentInput.trim()) {
      executeCommand(currentInput);
      setCurrentInput('');
    }
  };

  const executeCommand = (command: string) => {
    const response = `$ ${command}`;
    
    // Simulate command execution
    if (command.startsWith('echo ')) {
      const output = command.substring(5);
      setCommands(prev => [...prev, response, output]);
    } else if (command === 'clear') {
      clearTerminal();
    } else if (command === 'help') {
      setCommands(prev => [...prev, response, 
        'Available commands:',
        '  echo <text> - Display text',
        '  clear - Clear the terminal',
        '  help - Show this help message'
      ]);
    } else if (command === 'date') {
      setCommands(prev => [...prev, response, new Date().toString()]);
    } else {
      setCommands(prev => [...prev, response, `Command not found: ${command}`]);
    }
  };

  const clearTerminal = () => {
    setCommands([]);
  };

  // Auto-scroll to bottom when new commands are added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  // Focus the input when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="h-full flex flex-col bg-black text-green-500 font-mono text-sm">
      <div className="flex items-center justify-between border-b border-gray-800 p-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Terminal</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearTerminal}
          className="h-8 w-8 p-0 text-gray-400 hover:text-white"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Clear terminal</span>
        </Button>
      </div>
      <div 
        ref={terminalRef}
        className="flex-1 overflow-auto p-2 space-y-1"
      >
        {commands.map((cmd, index) => (
          <div key={index} className="whitespace-pre-wrap">{cmd}</div>
        ))}
      </div>
      <div className="flex items-center border-t border-gray-800 p-2">
        <span className="mr-2">$</span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className="flex-1 bg-transparent outline-none"
          placeholder="Type a command..."
        />
      </div>
    </div>
  );
} 