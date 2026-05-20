// components/RequireAuth.js

import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function RequireAuth(Component) {
  return function AuthenticatedComponent({ ...props }) {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        router.push('/login');
      }
    }, []);

    return <Component {...props} />;
  };
}
