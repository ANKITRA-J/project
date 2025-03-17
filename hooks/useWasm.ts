import { useState, useCallback } from 'react';

interface WasmState {
  output: string;
  error: string | null;
  isRunning: boolean;
}

export function useWasm() {
  const [state, setState] = useState<WasmState>({
    output: '',
    error: null,
    isRunning: false,
  });

  const runCode = useCallback(async (code: string) => {
    setState(prev => ({ ...prev, isRunning: true, error: null }));
    
    try {
      // TODO: Implement actual SwiftWasm execution
      // This is a placeholder that simulates execution
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setState(prev => ({
        ...prev,
        output: 'Hello from Swift!\n',
        isRunning: false,
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'An error occurred',
        isRunning: false,
      }));
    }
  }, []);

  const stopExecution = useCallback(() => {
    setState(prev => ({ ...prev, isRunning: false }));
  }, []);

  const resetExecution = useCallback(() => {
    setState({
      output: '',
      error: null,
      isRunning: false,
    });
  }, []);

  return {
    ...state,
    runCode,
    stopExecution,
    resetExecution,
  };
} 