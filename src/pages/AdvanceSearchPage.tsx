import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../components/ui/card';
import { GET_VEHICLES } from '../api/vehicleApi';
import {
  Car,
  Bike,
  Filter,
  Zap,
  Fuel,
  Check,
  RefreshCw,
  ChevronDown,
  Search,
} from 'lucide-react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import VehicleCard from '../components/VehicleCard';

const AdvancedSearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState<string>('recent');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number[]>([0, 100000000]);
  const [visibleVehicles, setVisibleVehicles] = useState<number>(3);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const { loading, error, data } = useQuery(GET_VEHICLES);

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

  // Fonction pour gérer la sélection/désélection des options
  const handleOptionChange = (optionId: string) => {
    setSelectedOptions((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId) // Décocher l'option
        : [...prev, optionId] // Cocher l'option
    );
  };

  // Fonction pour analyser la recherche textuelle
  const parseSearchText = (text: string) => {
    const lowerText = text.toLowerCase();

    if (lowerText.includes(' ou ')) {
      return { operator: 'ou', terms: lowerText.split(' ou ') };
    } else if (lowerText.includes(' et ')) {
      return { operator: 'et', terms: lowerText.split(' et ') };
    } else {
      return { operator: 'none', terms: [lowerText] };
    }
  };

  // Fonction pour vérifier si un véhicule correspond aux termes de recherche
  const matchesSearchText = (vehicle: any, terms: string[], operator: string) => {
    const searchFields = [
      vehicle.name.toLowerCase(),
      vehicle.specifications.toLowerCase(),
      vehicle.price.toString(),
      ...vehicle.options.map((option: any) => option.name.toLowerCase()),
    ];

    if (operator === 'ou') {
      return terms.some((term) =>
        searchFields.some((field) => field.includes(term))
      );
    } else if (operator === 'et') {
      return terms.every((term) =>
        searchFields.some((field) => field.includes(term))
      );
    } else {
      return searchFields.some((field) => field.includes(terms[0]));
    }
  };

  // Filtrer les véhicules en fonction du type, de la plage de prix, des options sélectionnées et de la recherche textuelle
  const filteredVehicles = data.vehicles.filter((vehicle: any) => {
    const matchesType =
      selectedType === 'all' ||
      (selectedType === 'electric' && vehicle.propulsion === 'ELECTRIC') ||
      (selectedType === 'gasoline' && vehicle.propulsion === 'ESSENCE') ||
      (selectedType === 'motorcycle' && vehicle.type === 'SCOOTER');

    const matchesPrice =
      vehicle.price >= priceRange[0] && vehicle.price <= priceRange[1];

    const matchesOptions =
      selectedOptions.length === 0 ||
      selectedOptions.every((optionId) =>
        vehicle.options.some((option: any) => option.id === optionId)
      );

    const { operator, terms } = parseSearchText(searchText);
    const matchesSearch = matchesSearchText(vehicle, terms, operator);

    return matchesType && matchesPrice && matchesOptions && matchesSearch;
  });

  // Fonction pour afficher plus de véhicules
  const handleShowMore = () => {
    setVisibleVehicles((prev) => prev + 4);
  };


  const sortedAndFilteredVehicles = filteredVehicles.sort((a: any, b: any) => {
    if (sortOrder === 'price-asc') {
      return a.price - b.price; // Tri par prix croissant
    } else if (sortOrder === 'price-desc') {
      return b.price - a.price; // Tri par prix décroissant
    } else {
      return 0; // Aucun tri (ordre d'origine)
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* En-tête avec effet 3D */}
        <div className="text-center mb-16 transform hover:scale-105 transition-all duration-500">
          <div className="relative">
            <h1 className="text-5xl font-extralight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              RECHERCHE PERSONNALISÉE
            </h1>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 opacity-0 hover:opacity-10 transition-opacity duration-300 rounded-xl transform -skew-y-3"></div>
          </div>
          <p className="text-gray-600 text-base">Trouvez le véhicule qui correspond exactement à vos besoins</p>
        </div>

        {/* Sélection du type de véhicule avec effet 3D */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { id: 'all', label: 'Tous les véhicules', icon: Car },
            { id: 'electric', label: 'Véhicules électriques', icon: Zap },
            { id: 'gasoline', label: 'Véhicules essence', icon: Fuel },
            { id: 'motorcycle', label: 'Deux roues', icon: Bike }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSelectedType(id)}
              className={`group p-6 rounded-xl transition-all duration-500 flex flex-col items-center gap-4
                transform hover:-translate-y-2 hover:shadow-2xl
                ${selectedType === id
                  ? 'bg-gradient-to-br from-black to-gray-800 text-white shadow-xl scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
            >
              <div className="relative">
                <Icon className="h-8 w-8 transform group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-full blur-xl"></div>
              </div>
              <span className="text-xs font-medium tracking-wide">{label}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Filtres avec design moderne */}
          <Card className="lg:col-span-1 backdrop-blur-lg bg-white/90 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <CardContent className="p-8">
              <h2 className="text-xl font-light mb-8 flex items-center gap-3">
                <Filter className="h-5 w-5" />
                Filtres
              </h2>

              <div className="space-y-10">
                {/* Année avec style moderne */}
                <div>
                  <label className="block text-xs font-medium mb-4 text-gray-700">
                    Recherche logique (mots clés / (et, ou) / description / prix)
                  </label>
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Recherche avancée..."
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Prix avec design amélioré */}
                <div>
                  <label className="block text-xs font-medium mb-4 text-gray-700">
                    Prix ({priceRange[0].toLocaleString('fr-FR')} XAF - {priceRange[1].toLocaleString('fr-FR')} XAF)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100000000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black hover:accent-gray-700 transition-all"
                  />
                </div>

                {/* Options avec animations */}
                <div className="space-y-4">
                  <label className="block text-xs font-medium text-gray-700">Options</label>
                  {Array.from(new Set(data.vehicles.flatMap((vehicle: any) => vehicle.options)))
                    .slice(0, 15)
                    .map((option: any) => (
                      <label key={option.id} className="flex items-center gap-3 text-xs cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedOptions.includes(option.id)}
                          onChange={() => handleOptionChange(option.id)}
                          className="rounded border-gray-300 text-black focus:ring-black transition-shadow"
                        />
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          {option.name}
                        </span>
                      </label>
                    ))}
                </div>

                {/* Boutons d'action modernisés */}
                <div className="space-y-4 pt-6">
                  <Button className="w-full bg-black hover:bg-gray-800 transition-colors duration-300 py-5 rounded-xl shadow-lg hover:shadow-xl text-sm">
                    <Check className="h-4 w-4 mr-2" />
                    Appliquer les filtres
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full py-5 rounded-xl hover:bg-gray-50 transition-colors duration-300 text-sm"
                    onClick={() => {
                      setSelectedOptions([]);
                      setSelectedType('all');
                      setPriceRange([0, 100000000]);
                      setSearchText('');
                    }}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Réinitialiser
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Résultats avec effets 3D */}
          <div className="lg:col-span-2 space-y-8">
            {/* En-tête des résultats */}
            <div className="bg-white/80 backdrop-blur-lg p-5 rounded-xl shadow-lg flex justify-between items-center">
              <p className="text-gray-600 text-sm font-medium">
                {filteredVehicles.length} véhicules trouvés
              </p>
              <div className="relative group">
                <select
                  className="w-[200px] p-2.5 border border-gray-200 rounded-lg appearance-none bg-white pr-8 hover:border-gray-400 transition-all focus:ring-2 focus:ring-black focus:ring-opacity-20 focus:outline-none text-sm"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option disabled value="recent">Tri par ordre</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
            </div>

            {/* Liste des véhicules avec effets 3D */}
            {sortedAndFilteredVehicles.slice(0, visibleVehicles).map((vehicle: any) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onConsult={() => navigate(`/vehicule/${vehicle.id}`)}
              />
            ))}

            {/* Bouton "Voir plus" */}
            {filteredVehicles.length > visibleVehicles && (
              <div className="flex justify-center mt-8">
                <Button
                  onClick={handleShowMore}
                  className="bg-black hover:bg-gray-800 transition-colors duration-300 py-3 px-6 rounded-xl shadow-lg hover:shadow-xl text-sm"
                >
                  Voir plus
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearchPage;