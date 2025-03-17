import { Editor } from '@/components/editor/Editor';
import { ExecutionPanel } from '@/components/editor/ExecutionPanel';
import { FileExplorer } from '@/components/editor/FileExplorer';
import { Header } from '@/components/layout/Header';

export default function Home() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <FileExplorer />
        <div className="flex flex-1 flex-col">
          <Editor />
          <ExecutionPanel />
        </div>
      </div>
    </div>
  );
} 