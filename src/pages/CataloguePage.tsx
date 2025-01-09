import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Search, SlidersHorizontal, Car, Bike } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Vehicle, GET_VEHICLES, GET_VEHICLES_BY_ENGINE_TYPE } from '../types/vehicle';
import LoadingSpinner from '../components/ui/loading-spinner';

const CatalogPage = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState<string | null>(null);
    const [showFilters, setShowFilters] = useState(false);

    // Requête GraphQL pour récupérer les véhicules
    const { loading, error, data } = useQuery(GET_VEHICLES);

    const filters = [
        { id: 'all', label: 'Tous', engineType: null },
        { id: 'electric-car', label: 'Voitures Électriques', engineType: 'ELECTRIC' },
        { id: 'gas-car', label: 'Voitures Essence', engineType: 'GASOLINE' }
    ];

    // Filtrer les véhicules en fonction de la recherche
    const filteredVehicles = data?.vehicles.filter((vehicle: Vehicle) => {
        const searchLower = searchQuery.toLowerCase();
        return (
            vehicle.brand.toLowerCase().includes(searchLower) ||
            vehicle.model.toLowerCase().includes(searchLower)
        );
    }) ?? [];

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingSpinner
                    variant="secondary"
                    size="lg"
                    animation="grow"
                    showLabel
                    label="Chargement des données..."
                    className="my-4"
                />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
                    {/* Icône d'erreur (optionnel) */}
                    <div className="mx-auto h-12 w-12 flex items-center justify-center bg-red-100 rounded-full mb-4">
                        <svg
                            className="h-6 w-6 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>

                    {/* Titre du message d'erreur */}
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Oups ! Une erreur est survenue
                    </h2>

                    {/* Description de l'erreur */}
                    <p className="text-gray-600 mb-6">
                        Nous n'avons pas pu charger les véhicules. Veuillez réessayer plus tard ou contacter le support.
                    </p>

                    {/* Bouton pour réessayer (optionnel) */}
                    <button
                        onClick={() => window.location.reload()} // Recharge la page
                        className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

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
                {filteredVehicles.map((vehicle: Vehicle) => (
                    <div key={vehicle.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                        {/* Image */}
                        <div className="relative h-48 bg-gray-200">
                            <img
                                src="https://img.20mn.fr/cyv-XZRqSp6BHl4NCe1vgik/1444x920_byd-seal-46-000-en-europe-28-000-en-chine"
                                alt={vehicle.brand}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 right-4">
                                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                                    {vehicle.engineType}
                                </span>
                            </div>
                        </div>

                        {/* Contenu */}
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">{vehicle.brand} {vehicle.model}</h3>
                            <p className="text-gray-600 mb-4">Année : {vehicle.year}</p>

                            {/* Caractéristiques */}
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center text-sm text-gray-600">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                    Couleur : {vehicle.color}
                                </div>
                            </div>

                            {/* Prix et actions */}
                            <div className="flex items-center justify-between mt-4">
                                <span className="text-2xl font-bold">{vehicle.price.toLocaleString()}€</span>
                                <Button
                                    onClick={() => navigate(`/vehicule/${vehicle.id}`)}
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