// components/RequireAuth.js

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from './api/AuthContext';

export default function RequireAuth(Component) {
  return function AuthenticatedComponent({ ...props }) {
    const router = useRouter();
    const { connected, loading } = useAuth();

    useEffect(() => {
      if (!loading && !connected) {
        router.push('/login');
      }
    }, [loading, connected, router]);

    if (loading || !connected) {
      return null;
    }

    return <Component {...props} />;
  };
}
