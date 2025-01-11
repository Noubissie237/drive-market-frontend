import React, { useState } from 'react';

import { Vehicle } from '../../types/vehicle';
import { Button } from '../../components/ui/button';
import { PlusIcon, ArrowLeftIcon } from 'lucide-react';
import { VehicleForm } from '../../components/vehicleAdmin/vehicleForm';
import { VehicleList } from '../../components/vehicleAdmin/vehicleList';

export const VehiclesAdminPage: React.FC = () => {
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

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
        <VehicleForm
          initialData={editingVehicle || undefined}
          onSubmit={async (data) => {
            // Implémentez la logique de soumission
            console.log(data);
          }}
        />
      </div>
    );
  }

  return <VehicleList  />;
};

export default VehiclesAdminPage;