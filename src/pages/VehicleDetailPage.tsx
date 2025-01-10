import { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Info, ShoppingCart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

interface Option {
  id: number;
  name: string;
  price: number;
  description: string;
  incompatibleWith?: number[];
}

interface VehicleDetails {
  id: number;
  name: string;
  type: string;
  category: string;
  price: number;
  description: string;
  specs: {
    performance: { label: string; value: string }[];
    dimensions: { label: string; value: string }[];
    features: string[];
  };
  images: string[];
  options: Option[];
}

const VehicleDetailPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  // Exemple de données détaillées d'un véhicule
  const vehicleDetails: VehicleDetails = {
    id: 1,
    name: "Tesla Model S",
    type: "automobile",
    category: "électrique",
    price: 89990,
    description: "La Tesla Model S redéfinit les performances d'une voiture électrique. Avec une autonomie exceptionnelle et des technologies de pointe, elle représente l'avenir de l'automobile.",
    specs: {
      performance: [
        { label: "Autonomie", value: "600 km" },
        { label: "0-100 km/h", value: "3.2s" },
        { label: "Vitesse max", value: "250 km/h" },
        { label: "Puissance", value: "670 ch" }
      ],
      dimensions: [
        { label: "Longueur", value: "4970 mm" },
        { label: "Largeur", value: "1964 mm" },
        { label: "Hauteur", value: "1445 mm" },
        { label: "Poids", value: "2069 kg" }
      ],
      features: [
        "Autopilot avancé",
        "Écran tactile 17\"",
        "Toit en verre panoramique",
        "Système audio premium 22 haut-parleurs",
        "Charge rapide",
        "Climatisation tri-zone"
      ]
    },
    images: [
      "https://b1672279.smushcdn.com/1672279/wp-content/uploads/2019/05/location-citadine-type-renault-clio-v-2-13.png?lossy=2&strip=1&webp=1",
      "https://images.ad.fr/biblio_centrale/image/site/voiture.PNG",
      "https://s3-eu-west-1.amazonaws.com/staticeu.izmocars.com/toolkit/commonassets/2024/24nissan/24nissanxtrailhevtekna4wdsu4bfr/24nissanxtrailhevtekna4wdsu4bfr_animations/colorpix/fr/640x480/nissan_24xtrailhevtekna4wdsu4bfr_noirintense_angular-front.webp"
    ],
    options: [
      {
        id: 1,
        name: "Sièges Performance",
        price: 2500,
        description: "Sièges sport en cuir ventilés avec supports latéraux renforcés",
        incompatibleWith: [2]
      },
      {
        id: 2,
        name: "Sièges Confort",
        price: 2000,
        description: "Sièges en cuir premium avec massage et ventilation",
        incompatibleWith: [1]
      },
      {
        id: 3,
        name: "Pack Conduite Autonome",
        price: 7500,
        description: "Capacités de conduite autonome avancées avec navigation automatique"
      }
    ]
  };

  const handleOptionSelect = (optionId: number) => {
    setSelectedOptions(prev => {
      if (prev.includes(optionId)) {
        return prev.filter(id => id !== optionId);
      } else {
        // Vérifier les incompatibilités
        const option = vehicleDetails.options.find(opt => opt.id === optionId);
        const newSelection = [...prev, optionId].filter(id => 
          !option?.incompatibleWith?.includes(id)
        );
        return newSelection;
      }
    });
  };

  const calculateTotalPrice = () => {
    const optionsPrice = selectedOptions.reduce((sum, optionId) => {
      const option = vehicleDetails.options.find(opt => opt.id === optionId);
      return sum + (option?.price || 0);
    }, 0);
    return vehicleDetails.price + optionsPrice;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation */}
      <Button variant="ghost" className="mb-6">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Retour au catalogue
      </Button>

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
            {vehicleDetails.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-20 h-20 rounded-lg overflow-hidden ${
                  currentImageIndex === index ? 'ring-2 ring-blue-500' : ''
                }`}
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
          <p className="text-gray-600 mb-6">{vehicleDetails.description}</p>

          {/* Spécifications */}
          <div className="grid grid-cols-2 gap-6 mb-8">
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
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Dimensions</h3>
                <div className="space-y-2">
                  {vehicleDetails.specs.dimensions.map((spec, index) => (
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
              {vehicleDetails.options.map((option) => {
                const isSelected = selectedOptions.includes(option.id);
                const isDisabled = option.incompatibleWith?.some(id => 
                  selectedOptions.includes(id)
                );

                return (
                  <div
                    key={option.id}
                    className={`p-4 rounded-lg border ${
                      isSelected ? 'border-blue-500 bg-blue-50' : 
                      isDisabled ? 'border-gray-200 bg-gray-50 opacity-50' : 
                      'border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{option.name}</h4>
                          {option.incompatibleWith && (
                            <Info className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {option.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-medium">
                          {option.price.toLocaleString()}€
                        </span>
                        <Button
                          variant={isSelected ? "default" : "outline"}
                          disabled={isDisabled && !isSelected}
                          onClick={() => handleOptionSelect(option.id)}
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
                {vehicleDetails.price.toLocaleString()}€
              </span>
            </div>
            {selectedOptions.map(optionId => {
              const option = vehicleDetails.options.find(opt => opt.id === optionId);
              return option ? (
                <div key={option.id} className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">{option.name}</span>
                  <span className="font-medium">
                    {option.price.toLocaleString()}€
                  </span>
                </div>
              ) : null;
            })}
            <div className="flex items-center justify-between mb-6 text-lg font-bold">
              <span>Prix total</span>
              <span>{calculateTotalPrice().toLocaleString()}€</span>
            </div>
            <Button className="w-full" size="lg">
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