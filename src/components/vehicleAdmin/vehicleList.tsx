import React, { useState, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_VEHICLES, DELETE_VEHICLE } from '../../api/vehicleApi';
import { Vehicle } from '../../types/vehicle';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Checkbox,
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '../ui';
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  ChevronDown,
  ChevronUp,
  CarIcon,
  SearchIcon,
  FilterIcon,
} from 'lucide-react';
import { OptionsDialog } from '../widgets/admin/OptionsDialog';
import { ImagePreviewDialog } from '../widgets/admin/ImagePreviousDialog';
import { VehicleStatusBadge } from '../widgets/admin/VehicleStatusBadge';
import CreateVehicleForm from './createVehicleForm';

type FilterState = {
  status: string[];
  minPrice: number | '';
  maxPrice: number | '';
  minStock: number | '';
  maxStock: number | '';
};

const initialFilters: FilterState = {
  status: [],
  minPrice: '',
  maxPrice: '',
  minStock: '',
  maxStock: ''
};


export const VehicleList: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { loading, error, data } = useQuery<{ vehicles: Vehicle[] }>(GET_VEHICLES);
  const [removeVehicle] = useMutation(DELETE_VEHICLE, {
    refetchQueries: [{ query: GET_VEHICLES }]
  });
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

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

  const filteredVehicles = useMemo(() => {
    if (!data?.vehicles) return [];

    return data.vehicles.filter(vehicle => {
      // Recherche textuelle
      const searchMatch = vehicle.name.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtres de statut
      const statusMatch = filters.status.length === 0 || filters.status.includes(vehicle.status);

      // Filtres de prix
      const priceMatch = (
        (filters.minPrice === '' || vehicle.price >= Number(filters.minPrice)) &&
        (filters.maxPrice === '' || vehicle.price <= Number(filters.maxPrice))
      );

      // Filtres de stock
      const stockMatch = (
        (filters.minStock === '' || vehicle.stock >= Number(filters.minStock)) &&
        (filters.maxStock === '' || vehicle.stock <= Number(filters.maxStock))
      );

      return searchMatch && statusMatch && priceMatch && stockMatch;
    });
  }, [data?.vehicles, searchTerm, filters]);

  const activeFiltersCount = Object.entries(filters).reduce((count, [value]) => {
    if (Array.isArray(value)) return count + value.length;
    return count + (value !== '' ? 1 : 0);
  }, 0);

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  );

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <Card className="max-w-md w-full">
          <CardHeader>
            <div className="mx-auto h-12 w-12 flex items-center justify-center bg-red-100 rounded-full">
              <span className="text-red-600">⚠️</span>
            </div>
            <h2 className="text-xl font-semibold text-center">Une erreur est survenue</h2>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-center">
              Impossible de charger les véhicules. Veuillez réessayer plus tard.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => window.location.reload()}
              className="w-full"
              variant="destructive"
            >
              Réessayer
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion du parc automobile</h1>
          <p className="text-gray-500 mt-1">
            {filteredVehicles.length} véhicule{filteredVehicles.length > 1 ? 's' : ''} sur {data?.vehicles.length || 0}
          </p>
        </div>
        <Button className="shrink-0"
          onClick={() => setIsFormOpen(true)}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Nouveau véhicule

        </Button>
        <CreateVehicleForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSuccess={() => {
            // Rafraîchir la liste des véhicules si nécessaire
          }}
        />
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
        <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="shrink-0 relative">
              <FilterIcon className="mr-2 h-4 w-4" />
              Filtres
              {activeFiltersCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <div className="flex justify-between items-center">
                <DialogTitle>Filtres</DialogTitle>
                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Réinitialiser
                  </Button>
                )}
              </div>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {/* Statut */}
              <div>
                <h4 className="text-sm font-medium mb-3">Statut</h4>
                <div className="space-y-2">
                  {['AVAILABLE', 'OUT_OF_STOCK', 'LOW_STOCK', 'CLEARANCE'].map((status) => (
                    <label key={status} className="flex items-center space-x-2">
                      <Checkbox
                        checked={filters.status.includes(status)}
                        onCheckedChange={(checked: any) => {
                          setFilters(prev => ({
                            ...prev,
                            status: checked
                              ? [...prev.status, status]
                              : prev.status.filter(s => s !== status)
                          }));
                        }}
                      />
                      <span className="text-sm">
                        <VehicleStatusBadge status={status as any} />
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Prix */}
              <div>
                <h4 className="text-sm font-medium mb-3">Prix (XAF)</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full p-2 border border-gray-200 rounded-lg"
                      value={filters.minPrice}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        minPrice: e.target.value ? Number(e.target.value) : ''
                      }))}
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full p-2 border border-gray-200 rounded-lg"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        maxPrice: e.target.value ? Number(e.target.value) : ''
                      }))}
                    />
                  </div>
                </div>
              </div>

              {/* Stock */}
              <div>
                <h4 className="text-sm font-medium mb-3">Stock</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full p-2 border border-gray-200 rounded-lg"
                      value={filters.minStock}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        minStock: e.target.value ? Number(e.target.value) : ''
                      }))}
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full p-2 border border-gray-200 rounded-lg"
                      value={filters.maxStock}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        maxStock: e.target.value ? Number(e.target.value) : ''
                      }))}
                    />
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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
            {filteredVehicles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-32 text-center text-gray-500">
                  Aucun véhicule ne correspond à vos critères
                </TableCell>
              </TableRow>
            ) : (
              filteredVehicles.map((vehicle) => (
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
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default VehicleList;