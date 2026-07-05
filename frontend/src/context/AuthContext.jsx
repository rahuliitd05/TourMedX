/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem('tourmedx_admin_token');
    return storedToken && storedToken !== 'undefined' && storedToken !== 'null'
      ? storedToken
      : '';
  });
  const [loading, setLoading] = useState(true);

  const value = useMemo(() => {
    function login(nextToken) {
      localStorage.setItem('tourmedx_admin_token', nextToken || '');
      setToken(nextToken || '');
    }

    function logout() {
      localStorage.removeItem('tourmedx_admin_token');
      setToken('');
    }

    return {
      token,
      isAuthenticated: Boolean(token),
      loading,
      login,
      logout
    };
  }, [token, loading]);

  useEffect(() => {
    async function verifyToken() {
      const storedToken = localStorage.getItem('tourmedx_admin_token');
      if (storedToken && storedToken !== 'undefined' && storedToken !== 'null') {
        try {
          await api.get('/auth/me');
        } catch (_error) {
          localStorage.removeItem('tourmedx_admin_token');
          setToken('');
        }
      }
      setLoading(false);
    }

    verifyToken();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
