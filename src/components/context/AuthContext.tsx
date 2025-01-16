import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Vérifie si un token est présent dans localStorage au chargement
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('token', token); // Stocke le token dans localStorage
    setIsAuthenticated(true); // Met à jour l'état d'authentification
  };

  const logout = () => {
    localStorage.removeItem('token'); // Supprime le token
    setIsAuthenticated(false); // Met à jour l'état d'authentification
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
    // Le token JWT est composé de trois parties séparées par des points : header.payload.signature
    const base64Url = token.split('.')[1]; // On récupère la partie payload
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // On remplace les caractères spécifiques à base64Url
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