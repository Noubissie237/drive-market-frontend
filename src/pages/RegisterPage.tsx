import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Car, Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'inscription ici
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
          <h2 className="text-3xl font-semibold text-gray-900">Créer un compte</h2>
          <p className="mt-2 text-gray-600">
            Rejoignez-nous et accédez à toutes nos fonctionnalités
          </p>
        </div>

        {/* Formulaire d'inscription */}
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nom */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Nom
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md 
                           shadow-sm focus:ring-black focus:border-black sm:text-sm"
                  required
                />
              </div>
            </div>

            {/* Prénom */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Prénom
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md 
                           shadow-sm focus:ring-black focus:border-black sm:text-sm"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Adresse email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md 
                           shadow-sm focus:ring-black focus:border-black sm:text-sm"
                  placeholder="vous@exemple.fr"
                  required
                />
              </div>
            </div>

            {/* Téléphone */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Téléphone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md 
                           shadow-sm focus:ring-black focus:border-black sm:text-sm"
                  placeholder="+33 6 XX XX XX XX"
                  required
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md 
                           shadow-sm focus:ring-black focus:border-black sm:text-sm"
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

            {/* Confirmer mot de passe */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md 
                           shadow-sm focus:ring-black focus:border-black sm:text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Bouton d'inscription */}
            <Button 
              type="submit" 
              className="w-full bg-black hover:bg-gray-800"
            >
              S'inscrire
            </Button>

            {/* Lien de connexion */}
            <div className="text-center text-sm">
              <span className="text-gray-600">Déjà inscrit ?</span>
              {' '}
              <Link 
                to="/login" 
                className="font-medium text-black hover:underline"
              >
                Se connecter
              </Link>
            </div>
          </form>
        </Card>

        {/* Séparateur */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gradient-to-br from-gray-50 to-gray-100 text-gray-500">
              Ou inscrivez-vous avec
            </span>
          </div>
        </div>

        {/* Boutons d'inscription sociale */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 
                     shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white 
                     hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            <img
              className="h-5 w-5 mr-2"
              src="/api/placeholder/20/20"
              alt="Google"
            />
            Google
          </button>
          <button
            type="button"
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 
                     shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white 
                     hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            <img
              className="h-5 w-5 mr-2"
              src="/api/placeholder/20/20"
              alt="Facebook"
            />
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;