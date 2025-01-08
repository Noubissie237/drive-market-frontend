import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import {
  Car,
  Bike,
  Filter,
  Zap,
  Fuel,
  Check,
  RefreshCw,
  ChevronDown
} from 'lucide-react';

const AdvancedSearchPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number[]>([0, 100000]);
  const [yearRange, setYearRange] = useState<number[]>([2018, 2024]);
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light mb-4">RECHERCHE PERSONNALISÉE</h1>
          <p className="text-gray-600">Trouvez le véhicule qui correspond exactement à vos besoins</p>
        </div>

        {/* Sélection du type de véhicule */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { id: 'all', label: 'Tous les véhicules', icon: Car },
            { id: 'electric', label: 'Véhicules électriques', icon: Zap },
            { id: 'gasoline', label: 'Véhicules essence', icon: Fuel },
            { id: 'motorcycle', label: 'Deux roues', icon: Bike }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSelectedType(id)}
              className={`p-6 rounded-lg transition-all duration-300 flex flex-col items-center gap-3
                ${selectedType === id 
                  ? 'bg-black text-white shadow-lg scale-[1.02]' 
                  : 'bg-white text-gray-700 hover:shadow-md hover:scale-[1.01]'
                }`}
            >
              <Icon className="h-8 w-8" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Filtres */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtres
              </h2>
              
              <div className="space-y-8">
                {/* Prix */}
                <div>
                  <label className="block text-sm font-medium mb-4">
                    Prix ({priceRange[0].toLocaleString('fr-FR')} € - {priceRange[1].toLocaleString('fr-FR')} €)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Année */}
                <div>
                  <label className="block text-sm font-medium mb-4">
                    Année ({yearRange[0]} - {yearRange[1]})
                  </label>
                  <input
                    type="range"
                    min="2018"
                    max="2024"
                    value={yearRange[1]}
                    onChange={(e) => setYearRange([yearRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Marque */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium mb-2">Marque</label>
                  <div className="relative">
                    <select className="w-full p-2 border rounded-md appearance-none bg-white pr-8">
                      <option value="">Toutes les marques</option>
                      <option value="tesla">Tesla</option>
                      <option value="bmw">BMW</option>
                      <option value="audi">Audi</option>
                      <option value="mercedes">Mercedes</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  </div>
                </div>

                {/* Kilométrage */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium mb-2">Kilométrage max</label>
                  <div className="relative">
                    <select className="w-full p-2 border rounded-md appearance-none bg-white pr-8">
                      <option value="">Sélectionner</option>
                      <option value="10000">{'< 10 000 km'}</option>
                      <option value="50000">{'< 50 000 km'}</option>
                      <option value="100000">{'< 100 000 km'}</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium mb-2">Options</label>
                  {[
                    'Climatisation',
                    'GPS',
                    'Caméra de recul',
                    'Toit ouvrant',
                    'Sièges chauffants'
                  ].map(option => (
                    <label key={option} className="flex items-center gap-2 text-sm cursor-pointer hover:text-black transition-colors">
                      <input type="checkbox" className="rounded border-gray-300 text-black focus:ring-black" />
                      {option}
                    </label>
                  ))}
                </div>

                {/* Boutons d'action */}
                <div className="space-y-3 pt-4">
                  <Button className="w-full bg-black hover:bg-gray-800">
                    <Check className="h-4 w-4 mr-2" />
                    Appliquer les filtres
                  </Button>
                  <Button variant="outline" className="w-full">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Réinitialiser
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Résultats */}
          <div className="lg:col-span-2 space-y-6">
            {/* En-tête des résultats */}
            <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">128 véhicules trouvés</p>
              <div className="relative">
                <select 
                  className="w-[180px] p-2 border rounded-md appearance-none bg-white pr-8"
                  defaultValue="recent"
                >
                  <option value="recent">Plus récents</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                  <option value="mileage">Kilométrage</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
            </div>

            {/* Liste des véhicules */}
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-72 h-48">
                      <img 
                        src="/api/placeholder/400/300"
                        alt="Vehicle"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-medium mb-2">Tesla Model 3 Performance</h3>
                          <p className="text-gray-600">2023 • 15 000 km • Automatique • Électrique</p>
                        </div>
                        <p className="text-xl font-medium">53 990 €</p>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {['GPS', 'Caméra 360°', 'Autopilot'].map(tag => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearchPage;