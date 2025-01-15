import { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Info, ShoppingCart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../components/ui/card';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_VEHICLE } from '../api/vehicleApi';
import { useCart } from '../components/context/CartContext';
import { Vehicle, VehicleImage, VehicleOption } from '../types/vehicle';
import Swal from 'sweetalert2'; // Pour les notifications

const VehicleDetailPage = () => {
  const { addToCart } = useCart();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const { loading, error, data } = useQuery(GET_VEHICLE, { variables: { id: id } });

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

  const vehicleDetails = {
    id: data.vehicle.id,
    name: data.vehicle.name,
    type: data.vehicle.type,
    category: data.vehicle.propulsion,
    price: data.vehicle.price,
    specifications: data.vehicle.specifications,
    specs: {
      performance: [
        ...(data.vehicle.batteryCapacity && data.vehicle.chargingTime && data.vehicle.batteryRange
          ? [
            { label: "Capacité de la batterie", value: `${data.vehicle.batteryCapacity} kWh` },
            { label: "Temps de charge", value: `${data.vehicle.chargingTime} h` },
            { label: "Autonomie", value: `${data.vehicle.batteryRange} km` },
          ]
          : [
            { label: "Capacité du réservoir", value: `${data.vehicle.fuelCapacity} L` },
            { label: "Consommation", value: `${data.vehicle.consumption} L/100 km` },
            { label: "Norme d'émission", value: data.vehicle.emissionClass },
          ])
      ],
      features: [
        ...(data.vehicle.batteryCapacity && data.vehicle.chargingTime && data.vehicle.batteryRange
          ? [
            `Charge rapide (${data.vehicle.chargingTime} h)`,
            `Autonomie de ${data.vehicle.batteryRange} km`,
            `Capacité de la batterie ${data.vehicle.batteryCapacity} KWh`,
          ]
          : []),
        ...(data.vehicle.fuelCapacity && data.vehicle.consumption && data.vehicle.emissionClass
          ? [
            `Réservoir de ${data.vehicle.fuelCapacity} L`,
            `Consommation de ${data.vehicle.consumption} L/100 km`,
            `Norme d'émission ${data.vehicle.emissionClass}`,
          ]
          : []),
      ],
    },
    images: data.vehicle.images.map((image: VehicleImage) => image.url),
    options: data.vehicle.options.map((option: VehicleOption) => ({
      id: option.id,
      name: option.name,
      price: option.price,
      specifications: option.description,
      incompatibleWith: option.incompatibleOptions.map((incompatible: { id: string; name: string }) => incompatible.id),
    })),
  };

  const handleOptionSelect = (optionId: number) => {
    setSelectedOptions(prev => {
      if (prev.includes(optionId)) {
        return prev.filter(id => id !== optionId);
      } else {
        const option = vehicleDetails.options.find((opt: VehicleOption) => opt.id === optionId.toString());
        const newSelection = [...prev, optionId].filter(id =>
          !option?.incompatibleWith?.includes(id)
        );
        return newSelection;
      }
    });
  };

  const calculateTotalPrice = () => {
    const optionsPrice = selectedOptions.reduce((sum, optionId) => {
      const option = vehicleDetails.options.find((opt: VehicleOption) => opt.id === optionId.toString());
      return sum + (option?.price || 0);
    }, 0);
    return vehicleDetails.price + optionsPrice;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation */}
      <Button variant="ghost" className="mb-6" onClick={() => navigate('/catalogue')}>
        <ChevronLeft className="mr-2 h-4 w-4" />
        Retour au catalogue
      </Button>

      {/* Galerie d'images et détails */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Galerie d'images */}
        <div className="space-y-4">
          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={vehicleDetails.images[currentImageIndex]}
              alt={vehicleDetails.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <Button
                variant="secondary"
                size="icon"
                onClick={() => setCurrentImageIndex(prev =>
                  prev > 0 ? prev - 1 : vehicleDetails.images.length - 1
                )}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={() => setCurrentImageIndex(prev =>
                  prev < vehicleDetails.images.length - 1 ? prev + 1 : 0
                )}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Miniatures */}
          <div className="flex gap-2">
            {vehicleDetails.images.map((img: string, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-20 h-20 rounded-lg overflow-hidden ${currentImageIndex === index ? 'ring-2 ring-blue-500' : ''}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Informations du véhicule */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{vehicleDetails.name}</h1>
          <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm mb-4">
            {vehicleDetails.category}
          </span>
          <p className="text-gray-600 mb-6">{vehicleDetails.specifications}</p>

          {/* Spécifications */}
          <div className="grid grid-cols-1 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Performance</h3>
                <div className="space-y-2">
                  {vehicleDetails.specs.performance.map((spec, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-600">{spec.label}</span>
                      <span className="font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Options */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Options disponibles</h3>
            <div className="space-y-4">
              {vehicleDetails.options.map((option: VehicleOption) => {
                const isSelected = selectedOptions.includes(Number(option.id)); // Convertir option.id en number
                const isDisabled = option.incompatibleOptions?.some((incompatible) =>
                  selectedOptions.includes(Number(incompatible.id)) // Convertir incompatible.id en number
                );

                return (
                  <div
                    key={option.id}
                    className={`p-4 rounded-lg border ${isSelected ? 'border-blue-500 bg-blue-50' :
                      isDisabled ? 'border-gray-200 bg-gray-50 opacity-50' :
                        'border-gray-200 hover:border-blue-200'
                      }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{option.name}</h4>
                          {option.incompatibleOptions && (
                            <Info className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {option.description} {/* Utilise description au lieu de specifications */}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-medium">
                          {option.price.toLocaleString()} XAF
                        </span>
                        <Button
                          variant={isSelected ? "default" : "outline"}
                          disabled={isDisabled && !isSelected}
                          onClick={() => handleOptionSelect(Number(option.id))} // Convertir option.id en number
                        >
                          {isSelected && <Check className="h-4 w-4 mr-2" />}
                          {isSelected ? 'Sélectionné' : 'Ajouter'}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Prix total et action */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">Prix de base</span>
              <span className="font-medium">
                {vehicleDetails.price.toLocaleString()} XAF
              </span>
            </div>
            {selectedOptions.map((optionId: number) => {
              const option = vehicleDetails.options.find((opt: VehicleOption) => Number(opt.id) === optionId); // Convertir opt.id en number
              return option ? (
                <div key={option.id} className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">{option.name}</span>
                  <span className="font-medium">
                    {option.price.toLocaleString()} XAF
                  </span>
                </div>
              ) : null;
            })}
            <div className="flex items-center justify-between mb-6 text-lg font-bold">
              <span>Prix total</span>
              <span>{calculateTotalPrice().toLocaleString()} XAF</span>
            </div>
            <Button
              className="w-full"
              size="lg"
              onClick={() => {
                const vehicleWithOptions: Vehicle & { selectedOptions?: Array<{ id: string; name: string; price: number }> } = {
                  id: vehicleDetails.id,
                  name: vehicleDetails.name,
                  price: vehicleDetails.price,
                  stock: 1, // Valeur par défaut
                  status: 'AVAILABLE', // Valeur par défaut
                  specifications: vehicleDetails.specifications,
                  type: vehicleDetails.type,
                  propulsion: vehicleDetails.category,
                  images: vehicleDetails.images.map((img: string) => ({ id: img, url: img, caption: '', order: 0 })),
                  options: vehicleDetails.options,
                  selectedOptions: selectedOptions.map((optionId: number) => {
                    const option = vehicleDetails.options.find((opt: VehicleOption) => Number(opt.id) === optionId); // Convertir opt.id en number
                    return option ? { id: option.id.toString(), name: option.name, price: option.price } : null;
                  }).filter(Boolean) as Array<{ id: string; name: string; price: number }>,
                };

                addToCart(vehicleWithOptions);
                Swal.fire({
                  title: 'Ajouté au panier !',
                  text: 'Le véhicule a été ajouté à votre panier.',
                  icon: 'success',
                  confirmButtonText: 'OK',
                });
              }}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Ajouter au panier
            </Button>
          </div>
        </div>
      </div>

      {/* Caractéristiques */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-6">Caractéristiques</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vehicleDetails.specs.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailPage;