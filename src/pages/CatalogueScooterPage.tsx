import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Search, Plus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { GET_VEHICLES } from '../api/vehicleApi';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '../components/ui/card';
import { useCart } from '../components/context/CartContext';
import { Vehicle } from '../types/vehicle';
import { useAuth } from '../components/context/AuthContext';
import Swal from 'sweetalert2';

const CatalogeScooterPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();

  const handleAddToCart = (vehicle: Vehicle) => {
    if (!isAuthenticated) {
      Swal.fire({
        title: 'Connexion requise',
        text: 'Vous devez vous connecter pour ajouter un véhicule au panier.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Se connecter',
        cancelButtonText: 'Annuler',
        confirmButtonColor: '#0F172A',
        cancelButtonColor: '#d33',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
      return;
    }
    addToCart(vehicle);
  };

  const { loading, error, data } = useQuery(GET_VEHICLES);

  const filteredVehicles = data?.vehicles.filter((vehicle: Vehicle) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = vehicle.name.toLowerCase().includes(searchLower);
    const isElectric = vehicle.type.toString() === "SCOOTER";

    return matchesSearch && isElectric;
  }) ?? [];

  const getStockStatus = (stock: number) => {
    if (stock > 5) return { label: 'En stock', className: 'bg-green-500' };
    if (stock > 0) return { label: 'Stock limité', className: 'bg-yellow-500' };
    return { label: 'Rupture de stock', className: 'bg-red-500' };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        {/* Titre */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">Nos Scooters</h1>
        </div>

        {/* Barre de recherche */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un véhicule..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle: Vehicle) => {
          const stockStatus = getStockStatus(vehicle.stock);

          return (
            <Card key={vehicle.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gray-200">
                <img
                  src={vehicle.images[0].url}
                  alt={vehicle.name}
                  className="w-full h-full object-cover"
                />
                <Badge
                  variant={stockStatus.label === 'En stock' ? 'default' :
                    stockStatus.label === 'Stock limité' ? 'secondary' : 'destructive'}
                  className="absolute top-4 right-4"
                >
                  {stockStatus.label}
                </Badge>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{vehicle.name}</h3>
                <p className="text-gray-600 mb-4">
                  {vehicle.specifications.length > 150
                    ? `${vehicle.specifications.substring(0, 150)} ...`
                    : vehicle.specifications}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-xl font-bold">
                    {vehicle.price.toLocaleString()} XAF
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleAddToCart(vehicle)}
                      disabled={vehicle.stock === 0}
                      className="flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Ajouter
                    </Button>
                    <Button onClick={() => navigate(`/vehicule/${vehicle.id}`)}>
                      Voir détails
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CatalogeScooterPage;