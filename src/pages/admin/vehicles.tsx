import React, { useState } from 'react';
import { Vehicle } from '../../types/vehicle';
import { Button } from '../../components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import { VehicleList } from '../../components/vehicleAdmin/vehicleList';

const ADMIN_PASSWORD = "admin123"; // ⚠️ À ne pas utiliser en prod ! Préfère une authentification backend.

export const VehiclesAdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setErrorMessage(""); // Efface l'erreur en cas de succès
    } else {
      setErrorMessage("Mot de passe incorrect. Veuillez réessayer !");
      setTimeout(() => setErrorMessage(""), 3000); // Efface après 3s
    }
  };
  const handleAddVehicle = () => {
    setIsAddingVehicle(true);
    setEditingVehicle(null);
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setIsAddingVehicle(false);
  };

  const handleBack = () => {
    setIsAddingVehicle(false);
    setEditingVehicle(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold mb-4">Accès administrateur</h2>
        <input
          type="password"
          placeholder="Entrer le mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded mb-4"
        />
        <Button onClick={handleLogin}>Se connecter</Button>
         
        {errorMessage && (
          <div className="text-red-500 mt-2 transition-opacity duration-500">
            {errorMessage}
          </div>
        )}
      </div>

    );
  }

  if (isAddingVehicle || editingVehicle) {
    return (
      <div className="container mx-auto p-4">
        <div className="mb-6">
          <Button variant="ghost" onClick={handleBack}>
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Retour à la liste
          </Button>
        </div>
        <h1 className="text-2xl font-bold mb-6">
          {editingVehicle ? 'Modifier un véhicule' : 'Ajouter un véhicule'}
        </h1>
      </div>
    );
  }

  return <VehicleList />;
};

export default VehiclesAdminPage;
