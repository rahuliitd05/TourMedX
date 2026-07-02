/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    () => localStorage.getItem('tourmedx_admin_token') || ''
  );

  const value = useMemo(() => {
    function login(nextToken) {
      localStorage.setItem('tourmedx_admin_token', nextToken);
      setToken(nextToken);
    }

    function logout() {
      localStorage.removeItem('tourmedx_admin_token');
      setToken('');
    }

    return {
      token,
      isAuthenticated: Boolean(token),
      login,
      logout
    };
  }, [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
