import { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Info, ShoppingCart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../components/ui/card';
import { useNavigate, useParams } from 'react-router-dom';
// import { Vehicle, PropulsionType } from '../types/vehicle';
import { useQuery } from '@apollo/client';
import { GET_VEHICLE } from '../api/vehicleApi';
import { useCart } from '../components/context/CartContext';
import { VehicleImage, VehicleOption } from '../types/vehicle';

interface Option {
  id: number;
  name: string;
  price: number;
  specifications: string;
  incompatibleWith?: number[];
}

interface VehicleDetails {
  id: number;
  name: string;
  type: string;
  category: string;
  price: number;
  specifications: string;
  specs: {
    performance: { label: string; value: string }[];
    features: string[];
  };
  images: string[];
  options: Option[];
}

const VehicleDetailPage = () => {
  const { addToCart } = useCart();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const { loading, error, data } = useQuery(GET_VEHICLE, {variables: {id: id}});

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

  const vehicleDetails: VehicleDetails = {
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
      
        // Features spécifiques aux véhicules électriques
        ...(data.vehicle.batteryCapacity && data.vehicle.chargingTime && data.vehicle.batteryRange
          ? [
              `Charge rapide (${data.vehicle.chargingTime} h)`,
              `Autonomie de ${data.vehicle.batteryRange} km`,
              `Capacité de la batterie ${data.vehicle.batteryCapacity} KWh`,
            ]
          : []),
      
        // Features spécifiques aux véhicules essence
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
      <Button variant="ghost" className="mb-6"
      onClick={()=> navigate('/catalogue')}
      >
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
                          {option.specifications}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-medium">
                          {option.price.toLocaleString()} XAF
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
                {vehicleDetails.price.toLocaleString()} XAF
              </span>
            </div>
            {selectedOptions.map(optionId => {
              const option = vehicleDetails.options.find(opt => opt.id === optionId);
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
            <Button className="w-full" size="lg"
              onClick={() => addToCart}
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







// import { useState } from 'react';
// import { ChevronLeft, ChevronRight, Check, Info, ShoppingCart } from 'lucide-react';
// import { Button } from '../components/ui/button';
// import { Card, CardContent } from '../components/ui/card';

// interface Option {
//   id: number;
//   name: string;
//   price: number;
//   specifications: string;
//   incompatibleWith?: number[];
// }

// interface VehicleDetails {
//   id: number;
//   name: string;
//   type: string;
//   category: string;
//   price: number;
//   specifications: string;
//   specs: {
//     performance: { label: string; value: string }[];
//     dimensions: { label: string; value: string }[];
//     features: string[];
//   };
//   images: string[];
//   options: Option[];
// }

// const VehicleDetailPage = () => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

//   const vehicleDetails: VehicleDetails = {
//     id: 1,
//     name: "Peugeot 508 GT",
//     type: "automobile",
//     category: "essence",
//     price: 45990,
//     specifications: "La Peugeot 508 GT allie performance et élégance. Son moteur essence PureTech offre une conduite dynamique et réactive, tandis que son design sophistiqué attire tous les regards.",
//     specs: {
//       performance: [
//         { label: "Moteur", value: "1.6L PureTech" },
//         { label: "Puissance", value: "225 ch" },
//         { label: "0-100 km/h", value: "7.3s" },
//         { label: "Consommation", value: "6.8L/100km" }
//       ],
//       dimensions: [
//         { label: "Longueur", value: "4750 mm" },
//         { label: "Largeur", value: "1859 mm" },
//         { label: "Hauteur", value: "1403 mm" },
//         { label: "Coffre", value: "487 L" }
//       ],
//       features: [
//         "Boîte automatique 8 rapports",
//         "i-Cockpit® avec écran tactile 10\"",
//         "Sièges AGR certifiés",
//         "Système audio FOCAL®",
//         "Régulateur de vitesse adaptatif",
//         "Aide au stationnement 360°"
//       ]
//     },
//     images: [
//       "https://b1672279.smushcdn.com/1672279/wp-content/uploads/2019/05/location-citadine-type-renault-clio-v-2-13.png?lossy=2&strip=1&webp=1",
//       "https://images.ad.fr/biblio_centrale/image/site/voiture.PNG",
//       "https://s3-eu-west-1.amazonaws.com/staticeu.izmocars.com/toolkit/commonassets/2024/24nissan/24nissanxtrailhevtekna4wdsu4bfr/24nissanxtrailhevtekna4wdsu4bfr_animations/colorpix/fr/640x480/nissan_24xtrailhevtekna4wdsu4bfr_noirintense_angular-front.webp"
//     ],
//     options: [
//       {
//         id: 1,
//         name: "Pack Sport",
//         price: 3500,
//         specifications: "Suspension sport, jantes 19\", étriers de frein rouges",
//         incompatibleWith: [2]
//       },
//       {
//         id: 2,
//         name: "Pack Confort",
//         price: 2800,
//         specifications: "Sièges chauffants massants, suspension confort, vitres surteintées",
//         incompatibleWith: [1]
//       },
//       {
//         id: 3,
//         name: "Pack Night Vision",
//         price: 1800,
//         specifications: "Vision nocturne infrarouge avec détection de piétons"
//       }
//     ]
//   };

//   const handleOptionSelect = (optionId: number) => {
//     setSelectedOptions(prev => {
//       if (prev.includes(optionId)) {
//         return prev.filter(id => id !== optionId);
//       } else {
//         const option = vehicleDetails.options.find(opt => opt.id === optionId);
//         const newSelection = [...prev, optionId].filter(id => 
//           !option?.incompatibleWith?.includes(id)
//         );
//         return newSelection;
//       }
//     });
//   };

//   const calculateTotalPrice = () => {
//     const optionsPrice = selectedOptions.reduce((sum, optionId) => {
//       const option = vehicleDetails.options.find(opt => opt.id === optionId);
//       return sum + (option?.price || 0);
//     }, 0);
//     return vehicleDetails.price + optionsPrice;
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Navigation */}
//       <Button variant="ghost" className="mb-6">
//         <ChevronLeft className="mr-2 h-4 w-4" />
//         Retour au catalogue
//       </Button>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Galerie d'images */}
//         <div className="space-y-4">
//           <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
//             <img
//               src={vehicleDetails.images[currentImageIndex]}
//               alt={vehicleDetails.name}
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 flex items-center justify-between p-4">
//               <Button
//                 variant="secondary"
//                 size="icon"
//                 onClick={() => setCurrentImageIndex(prev => 
//                   prev > 0 ? prev - 1 : vehicleDetails.images.length - 1
//                 )}
//               >
//                 <ChevronLeft className="h-4 w-4" />
//               </Button>
//               <Button
//                 variant="secondary"
//                 size="icon"
//                 onClick={() => setCurrentImageIndex(prev => 
//                   prev < vehicleDetails.images.length - 1 ? prev + 1 : 0
//                 )}
//               >
//                 <ChevronRight className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
          
//           {/* Miniatures */}
//           <div className="flex gap-2">
//             {vehicleDetails.images.map((img, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentImageIndex(index)}
//                 className={`w-20 h-20 rounded-lg overflow-hidden ${
//                   currentImageIndex === index ? 'ring-2 ring-blue-500' : ''
//                 }`}
//               >
//                 <img src={img} alt="" className="w-full h-full object-cover" />
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Informations du véhicule */}
//         <div>
//           <h1 className="text-3xl font-bold mb-2">{vehicleDetails.name}</h1>
//           <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm mb-4">
//             {vehicleDetails.category}
//           </span>
//           <p className="text-gray-600 mb-6">{vehicleDetails.specifications}</p>

//           {/* Spécifications */}
//           <div className="grid grid-cols-2 gap-6 mb-8">
//             <Card>
//               <CardContent className="pt-6">
//                 <h3 className="text-lg font-semibold mb-4">Performance</h3>
//                 <div className="space-y-2">
//                   {vehicleDetails.specs.performance.map((spec, index) => (
//                     <div key={index} className="flex justify-between">
//                       <span className="text-gray-600">{spec.label}</span>
//                       <span className="font-medium">{spec.value}</span>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardContent className="pt-6">
//                 <h3 className="text-lg font-semibold mb-4">Dimensions</h3>
//                 <div className="space-y-2">
//                   {vehicleDetails.specs.dimensions.map((spec, index) => (
//                     <div key={index} className="flex justify-between">
//                       <span className="text-gray-600">{spec.label}</span>
//                       <span className="font-medium">{spec.value}</span>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Options */}
//           <div className="mb-8">
//             <h3 className="text-xl font-semibold mb-4">Options disponibles</h3>
//             <div className="space-y-4">
//               {vehicleDetails.options.map((option) => {
//                 const isSelected = selectedOptions.includes(option.id);
//                 const isDisabled = option.incompatibleWith?.some(id => 
//                   selectedOptions.includes(id)
//                 );

//                 return (
//                   <div
//                     key={option.id}
//                     className={`p-4 rounded-lg border ${
//                       isSelected ? 'border-blue-500 bg-blue-50' : 
//                       isDisabled ? 'border-gray-200 bg-gray-50 opacity-50' : 
//                       'border-gray-200 hover:border-blue-200'
//                     }`}
//                   >
//                     <div className="flex items-start justify-between">
//                       <div>
//                         <div className="flex items-center gap-2">
//                           <h4 className="font-medium">{option.name}</h4>
//                           {option.incompatibleWith && (
//                             <Info className="h-4 w-4 text-gray-400" />
//                           )}
//                         </div>
//                         <p className="text-sm text-gray-600 mt-1">
//                           {option.specifications}
//                         </p>
//                       </div>
//                       <div className="flex items-center gap-4">
//                         <span className="font-medium">
//                           {option.price.toLocaleString()}XAF
//                         </span>
//                         <Button
//                           variant={isSelected ? "default" : "outline"}
//                           disabled={isDisabled && !isSelected}
//                           onClick={() => handleOptionSelect(option.id)}
//                         >
//                           {isSelected && <Check className="h-4 w-4 mr-2" />}
//                           {isSelected ? 'Sélectionné' : 'Ajouter'}
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Prix total et action */}
//           <div className="border-t pt-6">
//             <div className="flex items-center justify-between mb-4">
//               <span className="text-gray-600">Prix de base</span>
//               <span className="font-medium">
//                 {vehicleDetails.price.toLocaleString()}XAF
//               </span>
//             </div>
//             {selectedOptions.map(optionId => {
//               const option = vehicleDetails.options.find(opt => opt.id === optionId);
//               return option ? (
//                 <div key={option.id} className="flex items-center justify-between mb-4">
//                   <span className="text-gray-600">{option.name}</span>
//                   <span className="font-medium">
//                     {option.price.toLocaleString()}XAF
//                   </span>
//                 </div>
//               ) : null;
//             })}
//             <div className="flex items-center justify-between mb-6 text-lg font-bold">
//               <span>Prix total</span>
//               <span>{calculateTotalPrice().toLocaleString()}XAF</span>
//             </div>
//             <Button className="w-full" size="lg">
//               <ShoppingCart className="mr-2 h-5 w-5" />
//               Ajouter au panier
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Caractéristiques */}
//       <div className="mt-12">
//         <h3 className="text-xl font-semibold mb-6">Caractéristiques</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {vehicleDetails.specs.features.map((feature, index) => (
//             <div key={index} className="flex items-center gap-2">
//               <Check className="h-5 w-5 text-green-500" />
//               <span>{feature}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VehicleDetailPage;