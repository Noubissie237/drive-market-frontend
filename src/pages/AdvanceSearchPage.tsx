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
  ChevronDown,
} from 'lucide-react';

const AdvancedSearchPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number[]>([0, 100000]);
  const [yearRange, setYearRange] = useState<number[]>([2018, 2024]);
  
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
                {/* Prix avec design amélioré */}
                <div>
                  <label className="block text-xs font-medium mb-4 text-gray-700">
                    Prix ({priceRange[0].toLocaleString('fr-FR')} XAF - {priceRange[1].toLocaleString('fr-FR')} XAF)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black hover:accent-gray-700 transition-all"
                  />
                </div>

                {/* Année avec style moderne */}
                <div>
                  <label className="block text-xs font-medium mb-4 text-gray-700">
                    Année ({yearRange[0]} - {yearRange[1]})
                  </label>
                  <input
                    type="range"
                    min="2018"
                    max="2024"
                    value={yearRange[1]}
                    onChange={(e) => setYearRange([yearRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black hover:accent-gray-700 transition-all"
                  />
                </div>

                {/* Sélecteurs stylisés */}
                <div className="space-y-6">
                  {['Marque', 'Kilométrage max'].map((label) => (
                    <div key={label} className="space-y-2">
                      <label className="block text-xs font-medium text-gray-700">{label}</label>
                      <div className="relative group">
                        <select className="w-full p-2.5 border border-gray-200 rounded-lg appearance-none bg-white pr-8 hover:border-gray-400 transition-colors focus:ring-2 focus:ring-black focus:ring-opacity-20 focus:outline-none text-sm">
                          <option value="">Sélectionner</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Options avec animations */}
                <div className="space-y-4">
                  <label className="block text-xs font-medium text-gray-700">Options</label>
                  {[
                    'Climatisation',
                    'GPS',
                    'Caméra de recul',
                    'Toit ouvrant',
                    'Sièges chauffants'
                  ].map(option => (
                    <label key={option} className="flex items-center gap-3 text-xs cursor-pointer group">
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300 text-black focus:ring-black transition-shadow"
                      />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">{option}</span>
                    </label>
                  ))}
                </div>

                {/* Boutons d'action modernisés */}
                <div className="space-y-4 pt-6">
                  <Button className="w-full bg-black hover:bg-gray-800 transition-colors duration-300 py-5 rounded-xl shadow-lg hover:shadow-xl text-sm">
                    <Check className="h-4 w-4 mr-2" />
                    Appliquer les filtres
                  </Button>
                  <Button variant="outline" className="w-full py-5 rounded-xl hover:bg-gray-50 transition-colors duration-300 text-sm">
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
              <p className="text-gray-600 text-sm font-medium">128 véhicules trouvés</p>
              <div className="relative group">
                <select 
                  className="w-[200px] p-2.5 border border-gray-200 rounded-lg appearance-none bg-white pr-8 hover:border-gray-400 transition-all focus:ring-2 focus:ring-black focus:ring-opacity-20 focus:outline-none text-sm"
                  defaultValue="recent"
                >
                  <option value="recent">Plus récents</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                  <option value="mileage">Kilométrage</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
            </div>

            {/* Liste des véhicules avec effets 3D */}
            {Array.from({ length: 6 }).map((_, index) => (
              <Card 
                key={index} 
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 bg-white/90 backdrop-blur-lg rounded-xl"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-80 h-56 overflow-hidden">
                      <img 
                        src="https://images.ad.fr/biblio_centrale/image/site/voiture.PNG"
                        alt="Vehicle"
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-6 flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-light mb-2 group-hover:text-black transition-colors">Tesla Model 3 Performance</h3>
                          <p className="text-gray-600 text-sm">2023 • 15 000 km • Automatique • Électrique</p>
                        </div>
                        <p className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                          53 990 XAF
                        </p>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {['GPS', 'Caméra 360°', 'Autopilot'].map(tag => (
                          <span 
                            key={tag} 
                            className="px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors duration-300"
                          >
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