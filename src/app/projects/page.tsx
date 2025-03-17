'use client';

import { useAuth } from '@/hooks/useAuth';
import { useProjects } from '@/hooks/useProjects';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Clock } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

export default function Projects() {
  const { user } = useAuth();
  const { projects, loading, error, deleteProject } = useProjects(user?.id ?? null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading projects...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Projects</h1>
        <Link href="/editor/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects yet. Create your first project!</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-4 bg-card rounded-lg border border-border hover:border-primary transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <Link href={`/editor/${project.id}`}>
                  <h2 className="text-lg font-semibold hover:text-primary">
                    {project.name}
                  </h2>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteProject(project.id!)}
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-4 w-4" />
                <span>
                  Last modified: {format(project.lastModified, 'MMM d, yyyy')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 