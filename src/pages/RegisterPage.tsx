import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Car, Eye, EyeOff, Mail, Lock, User, Phone, Building2, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

// Définition des interfaces
interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  address: string;
  firstName: string;
  lastName: string;
  registrationNumber: string;
}

interface CustomerData {
  name: string;
  email: string;
  phone: string;
  password: string;
  address: string;
  firstName?: string;
  lastName?: string;
  registrationNumber?: string;
}

type CustomerType = 'INDIVIDUAL' | 'CORPORATION';

const RegisterPage: React.FC = () => {
  const [customerType, setCustomerType] = useState<CustomerType>('INDIVIDUAL');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    firstName: '',
    lastName: '',
    registrationNumber: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const customerData: CustomerData = {
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      address: formData.address,
      name: ''
    };

    if (customerType === 'INDIVIDUAL') {
      customerData.name = `${formData.firstName} ${formData.lastName}`;
      customerData.firstName = formData.firstName;
      customerData.lastName = formData.lastName;
    } else {
      customerData.name = formData.name;
      customerData.registrationNumber = formData.registrationNumber;
    }

    // TODO: Envoyer les données à l'API
    console.log(customerData);
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
            {/* Sélection du type de client */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Type de compte
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setCustomerType('INDIVIDUAL')}
                  className={`p-4 border rounded-lg text-center ${
                    customerType === 'INDIVIDUAL'
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 hover:border-black'
                  }`}
                >
                  <User className="h-5 w-5 mx-auto mb-2" />
                  <span className="text-sm">Particulier</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCustomerType('CORPORATION')}
                  className={`p-4 border rounded-lg text-center ${
                    customerType === 'CORPORATION'
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 hover:border-black'
                  }`}
                >
                  <Building2 className="h-5 w-5 mx-auto mb-2" />
                  <span className="text-sm">Entreprise</span>
                </button>
              </div>
            </div>

            {customerType === 'CORPORATION' && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Nom de l'entreprise
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building2 className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md 
                             shadow-sm focus:ring-black focus:border-black sm:text-sm"
                    required
                  />
                </div>
              </div>
            )}

            {customerType === 'CORPORATION' && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Numéro d'enregistrement
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md 
                             shadow-sm focus:ring-black focus:border-black sm:text-sm"
                    required
                  />
                </div>
              </div>
            )}

            {customerType === 'INDIVIDUAL' && (
              <>
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
              </>
            )}

            {/* Champs communs */}
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
                  required
                />
              </div>
            </div>

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
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Adresse
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md 
                           shadow-sm focus:ring-black focus:border-black sm:text-sm"
                  required
                />
              </div>
            </div>

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

            <Button 
              type="submit" 
              className="w-full bg-black hover:bg-gray-800"
            >
              S'inscrire
            </Button>

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
      </div>
    </div>
  );
};

export default RegisterPage;