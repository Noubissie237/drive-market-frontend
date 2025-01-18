import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Car, Eye, EyeOff, Mail, Lock, User, Phone, Building2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useMutation } from '@apollo/client';
import { CREATE_INDIVIDUAL_CUSTOMER, CREATE_CORPORATE_CUSTOMER } from '../api/customerApi';

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
  fleetSize?: number;
  subsidiaries?: Array<{ name: string }>;
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
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // Utilisation des mutations
  const [createIndividualCustomer, { loading: individualLoading }] = useMutation(CREATE_INDIVIDUAL_CUSTOMER);
  const [createCorporateCustomer, { loading: corporateLoading }] = useMutation(CREATE_CORPORATE_CUSTOMER);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation des mots de passe
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Les mots de passe ne correspondent pas.',
      });
      return;
    }

    // Préparation des données en fonction du type de client
    if (customerType === 'INDIVIDUAL') {
      const individualData = {
        name: `${formData.firstName} ${formData.lastName}`,
        password: formData.password,
        address: {
          street: formData.address,
          city: 'Yaoundé',
          state: '',
          country: '',
          postalCode: '23700',
        },
        contactInfo: {
          email: formData.email,
          phone: formData.phone,
        },
      };

      try {
        const { data } = await createIndividualCustomer({
          variables: { input: individualData },
          context: { service: 'customer' }
        });

        if (data.createIndividualCustomer) {
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Inscription réussie !',
          }).then(() => {
            navigate('/login');
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue lors de l\'inscription.',
        });
        console.error(error);
      }
    } else if (customerType === 'CORPORATION') {
      const corporateData = {
        name: formData.name,
        password: formData.password,
        address: {
          street: formData.address,
          city: 'Yaoundé',
          state: '',
          country: '',
          postalCode: '23700',
        },
        contactInfo: {          
          email: formData.email,
          phone: formData.phone,
        },
        fleetSize: 0,
      };

      try {
        const { data } = await createCorporateCustomer({
          variables: { input: corporateData },
          context: { service: 'customer' }
        });

        if (data.createCorporateCustomer) {
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Inscription réussie !',
          }).then(() => {
            navigate('/login');
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue lors de l\'inscription.',
        });
        console.error(error);
      }
    }
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
                  className={`p-4 border rounded-lg text-center ${customerType === 'INDIVIDUAL'
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
                  className={`p-4 border rounded-lg text-center ${customerType === 'CORPORATION'
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
              <>
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
              </>
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
                  minLength={4}
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
              disabled={individualLoading || corporateLoading}
            >
              {individualLoading || corporateLoading ? 'Inscription en cours...' : 'S\'inscrire'}
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