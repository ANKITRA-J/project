import { useState, useCallback, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { SwiftyDB, Project, saveProject, updateProject, deleteProject, getUserProjects } from '@/lib/db';

export function useProjects(userId: string | null) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [db] = useState(() => new SwiftyDB());

  const fetchProjects = useCallback(async () => {
    if (!userId) {
      setProjects([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Fetch from IndexedDB first
      const localProjects = await getUserProjects(db, userId);
      setProjects(localProjects);

      // Then fetch from Firestore and sync
      const projectsRef = collection(db, 'projects');
      const q = query(
        projectsRef,
        where('userId', '==', userId),
        orderBy('lastModified', 'desc')
      );
      const snapshot = await getDocs(q);
      const firestoreProjects = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        lastModified: doc.data().lastModified.toDate(),
      })) as Project[];

      // Update IndexedDB with Firestore data
      for (const project of firestoreProjects) {
        await updateProject(db, project);
      }

      setProjects(firestoreProjects);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  }, [userId, db]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const createProject = useCallback(async (project: Omit<Project, 'id' | 'userId'>) => {
    if (!userId) throw new Error('User not authenticated');

    try {
      // Save to Firestore first
      const projectsRef = collection(db, 'projects');
      const docRef = await addDoc(projectsRef, {
        ...project,
        userId,
        lastModified: new Date(),
      });

      // Then save to IndexedDB
      await saveProject(db, {
        ...project,
        userId,
        id: docRef.id,
      });

      await fetchProjects();
      return docRef.id;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project');
      throw err;
    }
  }, [userId, db, fetchProjects]);

  const updateProjectData = useCallback(async (project: Project) => {
    if (!userId) throw new Error('User not authenticated');

    try {
      // Update Firestore first
      const projectRef = doc(db, 'projects', project.id!);
      await updateDoc(projectRef, {
        ...project,
        lastModified: new Date(),
      });

      // Then update IndexedDB
      await updateProject(db, project);

      await fetchProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update project');
      throw err;
    }
  }, [userId, db, fetchProjects]);

  const removeProject = useCallback(async (projectId: string) => {
    if (!userId) throw new Error('User not authenticated');

    try {
      // Delete from Firestore first
      const projectRef = doc(db, 'projects', projectId);
      await deleteDoc(projectRef);

      // Then delete from IndexedDB
      await deleteProject(db, projectId);

      await fetchProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete project');
      throw err;
    }
  }, [userId, db, fetchProjects]);

  return {
    projects,
    loading,
    error,
    createProject,
    updateProject: updateProjectData,
    deleteProject: removeProject,
    refreshProjects: fetchProjects,
  };
} 