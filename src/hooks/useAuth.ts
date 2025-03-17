import { useSession, signIn, signOut } from 'next-auth/react';
import { useState, useCallback } from 'react';
import { auth } from '@/lib/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut as firebaseSignOut } from 'firebase/auth';

export function useAuth() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signInWithGitHub = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await signIn('github');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in with GitHub');
    } finally {
      setLoading(false);
    }
  }, []);

  const signInWithGoogle = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  }, []);

  const signOutUser = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await Promise.all([
        signOut(),
        firebaseSignOut(auth),
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign out');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user: session?.user,
    status,
    loading,
    error,
    signInWithGitHub,
    signInWithGoogle,
    signOut: signOutUser,
  };
} 