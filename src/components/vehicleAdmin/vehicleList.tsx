import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_VEHICLES, DELETE_VEHICLE } from '../../api/vehicleApi';
import { Vehicle, VehicleImage, VehicleOption } from '../../types/vehicle';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Alert,
  AlertDescription,
  Card,
  CardContent,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Separator
} from '../ui';
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  ImageIcon,
  PackageIcon,
  ChevronDown,
  ChevronUp,
  CarIcon,
  SearchIcon,
  FilterIcon
} from 'lucide-react';

type VehicleStatus = 'AVAILABLE' | 'OUT_OF_STOCK' | 'LOW_STOCK' | 'CLEARANCE';

const VehicleStatusBadge: React.FC<{ status: VehicleStatus }> = ({ status }) => {
  const statusConfig: Record<VehicleStatus, { class: string, label: string }> = {
    AVAILABLE: { 
      class: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
      label: 'Disponible'
    },
    OUT_OF_STOCK: { 
      class: 'bg-rose-50 text-rose-700 ring-rose-600/20',
      label: 'Rupture de stock'
    },
    LOW_STOCK: { 
      class: 'bg-amber-50 text-amber-700 ring-amber-600/20',
      label: 'Stock faible'
    },
    CLEARANCE: { 
      class: 'bg-blue-50 text-blue-700 ring-blue-600/20',
      label: 'Liquidation'
    }
  };

  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${statusConfig[status].class}`}>
      {statusConfig[status].label}
    </span>
  );
};

const ImagePreviewDialog: React.FC<{ images: VehicleImage[] }> = ({ images }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" size="sm" className="hover:bg-gray-50">
        <ImageIcon className="h-4 w-4 mr-2 text-gray-600" />
        {images.length} photos
      </Button>
    </DialogTrigger>
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>Galerie photos</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {images.map((image) => (
          <div key={image.id} className="group relative overflow-hidden rounded-lg">
            <img
              src={image.url}
              alt={image.caption}
              className="h-48 w-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="absolute bottom-2 left-2 right-2 text-sm text-white">
                {image.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </DialogContent>
  </Dialog>
);

const OptionsDialog: React.FC<{ options: VehicleOption[] }> = ({ options }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" size="sm" className="hover:bg-gray-50">
        <PackageIcon className="h-4 w-4 mr-2 text-gray-600" />
        {options.length} options
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Options et équipements</DialogTitle>
      </DialogHeader>
      <div className="mt-4 space-y-4">
        {options.map((option) => (
          <Card key={option.id} className="overflow-hidden transition-all hover:shadow-md">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-900">{option.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  {option.price.toLocaleString('fr-FR')} XAF
                </span>
              </div>
              {option.incompatibleOptions.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-sm text-rose-600 flex items-center">
                    <span className="mr-1">⚠️</span>
                    Non compatible avec : {option.incompatibleOptions.map(o => o.name).join(', ')}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </DialogContent>
  </Dialog>
);

export const VehicleList: React.FC = () => {
  const { loading, error, data } = useQuery<{ vehicles: Vehicle[] }>(GET_VEHICLES);
  const [removeVehicle] = useMutation(DELETE_VEHICLE, {
    refetchQueries: [{ query: GET_VEHICLES }]
  });
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleRowExpand = (id: string) => {
    setExpandedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      try {
        await removeVehicle({ variables: { id } });
      } catch (err) {
        console.error('Erreur lors de la suppression:', err);
      }
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  );

  if (error) return (
    <Alert variant="destructive" className="m-4">
      <AlertDescription>
        Une erreur est survenue lors du chargement des véhicules : {error.message}
      </AlertDescription>
    </Alert>
  );

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion du parc automobile</h1>
          <p className="text-gray-500 mt-1">
            {data?.vehicles.length || 0} véhicules enregistrés
          </p>
        </div>
        <Button className="shrink-0">
          <PlusIcon className="mr-2 h-4 w-4" />
          Nouveau véhicule
        </Button>
      </div>

      {/* Search and filters bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un véhicule..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="shrink-0">
          <FilterIcon className="mr-2 h-4 w-4" />
          Filtres
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableCell className="w-8"></TableCell>
              <TableCell>Véhicule</TableCell>
              <TableCell>Prix</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Médias</TableCell>
              <TableCell>Options</TableCell>
              <TableCell className="w-24">Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.vehicles.map((vehicle) => (
              <React.Fragment key={vehicle.id}>
                <TableRow className="hover:bg-gray-50/50">
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleRowExpand(vehicle.id)}
                      className="hover:bg-gray-100"
                    >
                      {expandedRows.includes(vehicle.id) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <CarIcon className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="font-medium text-gray-900">{vehicle.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {vehicle.price.toLocaleString('fr-FR')} XAF
                  </TableCell>
                  <TableCell>{vehicle.stock}</TableCell>
                  <TableCell>
                    <VehicleStatusBadge status={vehicle.status} />
                  </TableCell>
                  <TableCell>
                    <ImagePreviewDialog images={vehicle.images} />
                  </TableCell>
                  <TableCell>
                    <OptionsDialog options={vehicle.options} />
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-gray-50"
                      >
                        <PencilIcon className="h-4 w-4 text-gray-600" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(vehicle.id)}
                        className="hover:bg-red-600"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                {expandedRows.includes(vehicle.id) && (
                  <TableRow>
                    <TableCell colSpan={8}>
                      <div className="p-6 bg-gray-50">
                        <h4 className="font-medium text-gray-900 mb-3">
                          Spécifications détaillées
                        </h4>
                        <p className="text-gray-600 whitespace-pre-wrap">
                          {vehicle.specifications}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default VehicleList;