import { useState } from "react";
import { FaUserEdit, FaSave, FaTrash, FaTimes } from "react-icons/fa";

const UserProfile = () => {
  const [user, setUser] = useState({
    nom: "Noubissie kamga ",
    prenom: "Wilfried",
    email: "nkw@gmail.com",
    address: "Obili , derriere l'eglise ",
    password: "12345mot-de-passe", 
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // État pour la modale de suppression

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSave = () => {
    console.log("Informations mises à jour :", user);
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    console.log("Compte supprimé");
    setIsDeleteModalOpen(false); // Fermer la modale après suppression
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true); // Ouvrir la modale de confirmation
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false); // Fermer la modale
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-2xl rounded-xl mt-10 transform transition-all duration-300 hover:scale-105">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600 flex items-center justify-center">
        <FaUserEdit className="mr-2" /> Mon Compte
      </h1>

      {isEditing ? (
        // Mode édition
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prénom :</label>
            <input
              type="text"
              name="nom"
              value={user.nom}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom :</label>
            <input
              type="text"
              name="prenom"
              value={user.prenom}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email :</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Adresse :</label>
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe :</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
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
        // Mode affichage
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">
              <strong className="text-indigo-600">Prénom :</strong> {user.nom}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">
              <strong className="text-indigo-600">Nom :</strong> {user.prenom}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">
              <strong className="text-indigo-600">Email :</strong> {user.email}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">
              <strong className="text-indigo-600">Adresse :</strong> {user.address}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">
              <strong className="text-indigo-600">Mot de passe :</strong> {user.password}
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
              onClick={openDeleteModal}
              className="flex items-center px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            >
              <FaTrash className="mr-2" /> Supprimer mon compte
            </button>
          </div>
        </div>
      )}

      {/* Modale de confirmation de suppression */}
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
                onClick={closeDeleteModal}
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