import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userId: string | null; // Ajout de userId
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null); // Ajout de userId

  // Vérifie si un token est présent dans localStorage au chargement
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken && decodedToken.id) {
        setIsAuthenticated(true);
        setUserId(decodedToken.id); // Ajout de userId
      }
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token); // Stocke le token dans localStorage
    const decodedToken = decodeToken(token);
    if (decodedToken && decodedToken.id) {
      setIsAuthenticated(true);
      setUserId(decodedToken.id); // Ajout de userId
    }
  };

  const logout = () => {
    localStorage.removeItem('token'); // Supprime le token
    setIsAuthenticated(false);
    setUserId(null); // Réinitialisation de userId
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const decodeToken = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to decode token', error);
    return null;
  }
};