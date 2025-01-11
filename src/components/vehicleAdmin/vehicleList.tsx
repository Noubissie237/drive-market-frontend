import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_VEHICLES, REMOVE_VEHICLE } from '../../api/vehicleApi';
import { Vehicle } from '../../types/vehicle';
import { 
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Alert,
  AlertDescription 
} from '../ui';
import { PencilIcon, TrashIcon, PlusIcon } from 'lucide-react';

export const VehicleList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_VEHICLES);
  const [removeVehicle] = useMutation(REMOVE_VEHICLE, {
    refetchQueries: [{ query: GET_VEHICLES }]
  });

  if (loading) return <div className="p-4">Chargement...</div>;
  if (error) return (
    <Alert variant="destructive">
      <AlertDescription>
        Erreur lors du chargement des véhicules: {error.message}
      </AlertDescription>
    </Alert>
  );

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      try {
        await removeVehicle({ variables: { id } });
      } catch (err) {
        console.error('Erreur lors de la suppression:', err);
      }
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestion des Véhicules</h1>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Ajouter un véhicule
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Marque</TableCell>
            <TableCell>Modèle</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Prix</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.vehicles.map((vehicle: Vehicle) => (
            <TableRow key={vehicle.id}>
              <TableCell>{vehicle.brand}</TableCell>
              <TableCell>{vehicle.model}</TableCell>
              <TableCell>{vehicle.engineType}</TableCell>
              <TableCell>{vehicle.price.toLocaleString('fr-FR')} €</TableCell>
              <TableCell>
                {vehicle.availability.inStock ? 'En stock' : 'Sur commande'}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDelete(vehicle.id)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};