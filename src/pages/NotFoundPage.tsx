import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">
        Désolé, la page que vous recherchez n'existe pas.
      </p>
      <Button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 mx-auto"
      >
        <Home className="h-5 w-5" />
        Retour à l'accueil
      </Button>
    </div>
  );
};

export default NotFoundPage;