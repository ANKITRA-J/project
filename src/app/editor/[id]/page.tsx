'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useProjects } from '@/hooks/useProjects';
import { Editor } from '@/components/Editor';
import { ExecutionPanel } from '@/components/ExecutionPanel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save, Share2, Download } from 'lucide-react';
import { useWasm } from '@/hooks/useWasm';

interface Project {
  id?: string;
  name: string;
  code: string;
  lastModified: Date;
  userId: string;
  isPublic: boolean;
}

export default function EditorPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user } = useAuth();
  const { projects, createProject, updateProject } = useProjects(user?.id ?? null);
  const { output, error, isRunning, runCode, stopExecution, resetExecution } = useWasm();
  const [project, setProject] = useState<Project>({
    name: 'Untitled Project',
    code: '',
    lastModified: new Date(),
    userId: user?.id ?? '',
    isPublic: false,
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (params.id !== 'new') {
      const existingProject = projects.find(p => p.id === params.id);
      if (existingProject) {
        setProject(existingProject);
      } else {
        router.push('/projects');
      }
    }
  }, [params.id, projects, router]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      if (project.id) {
        await updateProject(project);
      } else {
        const id = await createProject(project);
        router.push(`/editor/${id}`);
      }
    } catch (err) {
      console.error('Failed to save project:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = async () => {
    try {
      const url = `${window.location.origin}/editor/${project.id}`;
      await navigator.clipboard.writeText(url);
      // TODO: Show toast notification
    } catch (err) {
      console.error('Failed to copy share link:', err);
    }
  };

  const handleExport = () => {
    const blob = new Blob([project.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.name}.swift`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-4">
          <Input
            value={project.name}
            onChange={(e) => setProject(prev => ({ ...prev, name: e.target.value }))}
            className="w-64"
          />
          <Button
            variant="outline"
            onClick={handleSave}
            disabled={isSaving}
          >
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
          <Button
            variant="outline"
            onClick={handleShare}
            disabled={!project.id}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button
            variant="outline"
            onClick={handleExport}
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        <div className="flex flex-col">
          <Editor
            initialValue={project.code}
            onChange={(code) => setProject(prev => ({ ...prev, code }))}
            onSave={handleSave}
          />
        </div>
        <div className="flex flex-col">
          <ExecutionPanel
            output={output}
            error={error}
            isRunning={isRunning}
            onRun={() => runCode(project.code)}
            onStop={stopExecution}
            onReset={resetExecution}
          />
        </div>
      </div>
    </div>
  );
} 