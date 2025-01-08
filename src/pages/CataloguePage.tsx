import { useState } from 'react';
import { Search, SlidersHorizontal, Car, Bike } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

// Types pour nos véhicules
interface Vehicle {
    id: number;
    name: string;
    type: 'automobile' | 'scooter';
    category: 'électrique' | 'essence';
    price: number;
    image: string;
    description: string;
    features: string[];
}

const CatalogPage = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const [showFilters, setShowFilters] = useState(false);

    // Exemple de données
    const vehicles: Vehicle[] = [
        {
            id: 1,
            name: "Tesla Model S",
            type: "automobile",
            category: "électrique",
            price: 89990,
            image: "https://b1672279.smushcdn.com/1672279/wp-content/uploads/2019/05/location-citadine-type-renault-clio-v-2-13.png?lossy=2&strip=1&webp=1",
            description: "Berline électrique haute performance",
            features: ["Autonomie 600km", "0-100 km/h en 3.2s", "Autopilot"]
        },
        {
            id: 2,
            name: "BMW i4",
            type: "automobile",
            category: "électrique",
            price: 59900,
            image: "https://images.ad.fr/biblio_centrale/image/site/voiture.PNG",
            description: "Berline sportive électrique",
            features: ["Autonomie 500km", "Technologie BMW iDrive", "Système audio premium"]
        },
        {
            id: 3,
            name: "Vespa Elettrica",
            type: "scooter",
            category: "électrique",
            price: 7499,
            image: "https://s3-eu-west-1.amazonaws.com/staticeu.izmocars.com/toolkit/commonassets/2024/24nissan/24nissanxtrailhevtekna4wdsu4bfr/24nissanxtrailhevtekna4wdsu4bfr_animations/colorpix/fr/640x480/nissan_24xtrailhevtekna4wdsu4bfr_noirintense_angular-front.webp",
            description: "Scooter électrique urbain",
            features: ["Autonomie urbaine", "Connectivité smartphone", "Mode Eco"]
        }
    ];

    const filters = [
        { id: 'all', label: 'Tous' },
        { id: 'electric-car', label: 'Voitures Électriques' },
        { id: 'gas-car', label: 'Voitures Essence' },
        { id: 'electric-scooter', label: 'Scooters Électriques' },
        { id: 'gas-scooter', label: 'Scooters Essence' }
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header avec recherche et filtres */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-6">Catalogue de Véhicules</h1>

                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    {/* Barre de recherche */}
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

                    {/* Bouton filtres */}
                    <Button
                        onClick={() => setShowFilters(!showFilters)}
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        <SlidersHorizontal className="h-4 w-4" />
                        Filtres
                    </Button>
                </div>

                {/* Filtres */}
                {showFilters && (
                    <div className="flex flex-wrap gap-2 mb-6">
                        {filters.map((filter) => (
                            <Button
                                key={filter.id}
                                variant={activeFilter === filter.id ? "default" : "outline"}
                                onClick={() => setActiveFilter(filter.id)}
                                className="flex items-center gap-2"
                            >
                                {filter.id.includes('car') ? <Car className="h-4 w-4" /> : <Bike className="h-4 w-4" />}
                                {filter.label}
                            </Button>
                        ))}
                    </div>
                )}
            </div>

            {/* Grille de véhicules */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map((vehicle) => (
                    <div key={vehicle.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                        {/* Image */}
                        <div className="relative h-48 bg-gray-200">
                            <img
                                src={vehicle.image}
                                alt={vehicle.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 right-4">
                                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                                    {vehicle.category}
                                </span>
                            </div>
                        </div>

                        {/* Contenu */}
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">{vehicle.name}</h3>
                            <p className="text-gray-600 mb-4">{vehicle.description}</p>

                            {/* Caractéristiques */}
                            <div className="space-y-2 mb-4">
                                {vehicle.features.map((feature, index) => (
                                    <div key={index} className="flex items-center text-sm text-gray-600">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                        {feature}
                                    </div>
                                ))}
                            </div>

                            {/* Prix et actions */}
                            <div className="flex items-center justify-between mt-4">
                                <span className="text-2xl font-bold">{vehicle.price.toLocaleString()}€</span>
                                <Button
                                    onClick={() => navigate('/vehicule/${vehicle.id}')}
                                >
                                    Voir détails
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CatalogPage;