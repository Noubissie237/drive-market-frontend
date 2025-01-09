import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Car, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';


const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de connexion ici
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto space-y-8">
        {/* Logo et En-tête */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-black text-white p-3 rounded-2xl">
              <Car className="h-8 w-8" />
            </div>
          </div>
          <h2 className="text-3xl font-semibold text-gray-900">Connexion</h2>
          <p className="mt-2 text-gray-600">
            Accédez à votre espace personnel
          </p>
        </div>

        {/* Formulaire de connexion */}
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700"
              >
                Adresse email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md 
                           shadow-sm focus:ring-black focus:border-black sm:text-sm
                           placeholder:text-gray-400"
                  placeholder="vous@exemple.fr"
                  required
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div className="space-y-2">
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700"
              >
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md 
                           shadow-sm focus:ring-black focus:border-black sm:text-sm"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Options supplémentaires */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded cursor-pointer"
                />
                <label 
                  htmlFor="remember-me" 
                  className="ml-2 block text-sm text-gray-700 cursor-pointer"
                >
                  Se souvenir de moi
                </label>
              </div>
              <a 
                href="#" 
                className="text-sm font-medium text-black hover:underline"
              >
                Mot de passe oublié ?
              </a>
            </div>

            {/* Bouton de connexion */}
            <Button 
              type="submit" 
              className="w-full bg-black hover:bg-gray-800"
            >
              Se connecter
            </Button>

            {/* Lien d'inscription */}
            <div className="text-center text-sm">
              <span className="text-gray-600">Vous n'avez pas de compte ?</span>
              {' '}
              <Link 
                to="/register" 
                className="font-medium text-black hover:underline"
              >
                Créer un compte
              </Link>
            </div>
          </form>
        </Card>

      </div>
    </div>
  );
};

export default LoginPage;