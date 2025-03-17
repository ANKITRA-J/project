'use client';

import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Github, Chrome } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignIn() {
  const { user, signInWithGitHub, signInWithGoogle, loading, error } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome to Swifty</h1>
          <p className="mt-2 text-muted-foreground">
            Sign in to start coding in Swift
          </p>
        </div>

        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={signInWithGitHub}
            disabled={loading}
          >
            <Github className="mr-2 h-4 w-4" />
            Continue with GitHub
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={signInWithGoogle}
            disabled={loading}
          >
            <Chrome className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
        </div>

        {error && (
          <div className="text-sm text-red-500 text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
} 