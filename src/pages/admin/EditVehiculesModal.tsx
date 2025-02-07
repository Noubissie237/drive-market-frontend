import React from "react";
import { Vehicle } from "../../types/vehicle";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";

interface EditVehicleModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onSave: (updatedVehicle: Vehicle) => void;
}

const EditVehicleModal: React.FC<EditVehicleModalProps> = ({ vehicle, onClose, onSave }) => {
  if (!vehicle) return null;

  const [updatedVehicle, setUpdatedVehicle] = React.useState(vehicle);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedVehicle({ ...updatedVehicle, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Modifier le véhicule</h2>
          <button onClick={onClose}>
            <XIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium">Nom</label>
          <input
            type="text"
            name="name"
            value={updatedVehicle.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />

          <label className="block text-sm font-medium mt-3">Marque</label>
          <input
            type="text"
            name="brand"
            value={updatedVehicle.brand}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />

          <label className="block text-sm font-medium mt-3">Prix</label>
          <input
            type="number"
            name="price"
            value={updatedVehicle.price}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </div>

        <div className="flex justify-end mt-4">
          <Button variant="ghost" onClick={onClose} className="mr-2">
            Annuler
          </Button>
          <Button onClick={() => onSave(updatedVehicle)}>Enregistrer</Button>
        </div>
      </div>
    </div>
  );
};

export default EditVehicleModal;
