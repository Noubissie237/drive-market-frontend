import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { FaUserEdit, FaSave, FaTrash, FaTimes } from "react-icons/fa";
import { GET_CUSTOMER_BY_EMAIL, UPDATE_CUSTOMER, DELETE_CUSTOMER } from "../graphql/queries";
import type { Address, ContactInfo } from "../types";
import { useAuth } from "../components/context/AuthContext";

interface UserState {
  id?: string;
  name?: string;
  password?: string;
  address?: Address;
  contactInfo?: ContactInfo;
}

const UserProfile = () => {
  const { userEmail } = useAuth(); // Récupération de l'e-mail de l'utilisateur
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const { loading, error, data } = useQuery(GET_CUSTOMER_BY_EMAIL, {
    variables: { email: userEmail },
    skip: !userEmail, // Ne pas exécuter si l'e-mail n'est pas disponible
  });

  const [updateCustomer] = useMutation(UPDATE_CUSTOMER);
  const [deleteCustomer] = useMutation(DELETE_CUSTOMER);

  const [user, setUser] = useState<UserState>({});

  useEffect(() => {
    if (data?.customerByEmail) {
      setUser(data.customerByEmail);
    }
  }, [data]);

  if (loading) return <div className="text-center p-8">Chargement...</div>;
  if (error) return <div className="text-center p-8 text-red-600">Erreur: {error.message}</div>;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setUser(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof UserState],
          [field]: value
        }
      }));
    } else {
      setUser(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = async () => {
    try {
      const input = {
        name: user.name,
        password: user.password,
        address: user.address,
        contactInfo: user.contactInfo,
      };

      await updateCustomer({
        variables: {
          id: user.id,
          input,
        },
      });

      setIsEditing(false);
    } catch (err) {
      console.error("Erreur lors de la mise à jour:", err);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteCustomer({
        variables: { id: user.id },
      });
      window.location.href = "/logout"; // Rediriger vers la page de déconnexion
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-2xl rounded-xl mt-10 transform transition-all duration-300 hover:scale-105">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600 flex items-center justify-center">
        <FaUserEdit className="mr-2" /> Mon Compte
      </h1>

      {isEditing ? (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom :</label>
            <input
              type="text"
              name="name"
              value={user.name || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail :</label>
            <input
              type="email"
              name="contactInfo.email"
              value={user.contactInfo?.email || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe :</label>
            <input
              type="password"
              name="password"
              value={user.password || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone :</label>
            <input
              type="text"
              name="contactInfo.phone"
              value={user.contactInfo?.phone || ''}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Adresse :</label>
            <input
              type="text"
              name="address.street"
              value={user.address?.street || ''}
              onChange={handleInputChange}
              placeholder="Rue"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all mb-2"
            />
           
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleSave}
              className="flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            >
              <FaSave className="mr-2" /> Enregistrer
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
            >
              <FaTimes className="mr-2" /> Annuler
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">
              <strong className="text-indigo-600">Nom :</strong> {user.name}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">
              <strong className="text-indigo-600">E-mail :</strong> {user.contactInfo?.email}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">
              <strong className="text-indigo-600">Téléphone :</strong> {user.contactInfo?.phone}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">
              <strong className="text-indigo-600">Adresse :</strong><br />
              {user.address?.street}<br />
              {user.address?.city}
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            >
              <FaUserEdit className="mr-2" /> Modifier mes informations
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="flex items-center px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            >
              <FaTrash className="mr-2" /> Supprimer mon compte
            </button>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full transform transition-all duration-300 scale-95 hover:scale-100">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Confirmer la suppression</h2>
            <p className="text-gray-700 mb-6">
              Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={handleDeleteAccount}
                className="flex items-center px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
              >
                <FaTrash className="mr-2" /> Supprimer
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex items-center px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
              >
                <FaTimes className="mr-2" /> Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;