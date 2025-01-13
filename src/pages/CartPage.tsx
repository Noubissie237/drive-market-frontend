import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { 
  Card,
  CardContent,
} from '../components/ui/card';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShieldCheck,
  Truck,
  Clock,
  CreditCard
} from 'lucide-react';

// Définition des interfaces
interface CartItem {
  id: number;
  name: string;
  color: string;
  price: number;
  image: string;
}

interface Quantities {
  [key: number]: number;
}

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState<Quantities>({});
  
  // Exemple de données de panier
  const cartItems: CartItem[] = [
    {
      id: 1,
      name: "Tesla Model 3 Performance",
      color: "Blanc Nacré",
      price: 53990,
      image: "https://s3-eu-west-1.amazonaws.com/staticeu.izmocars.com/toolkit/commonassets/2024/24nissan/24nissanxtrailhevtekna4wdsu4bfr/24nissanxtrailhevtekna4wdsu4bfr_animations/colorpix/fr/640x480/nissan_24xtrailhevtekna4wdsu4bfr_noirintense_angular-front.webp",
    },
    {
      id: 2,
      name: "Pack Protection Premium",
      color: "Pour Tesla Model 3",
      price: 1290,
      image: "https://images.ad.fr/biblio_centrale/image/site/voiture.PNG",
    }
  ];

  const updateQuantity = (id: number, delta: number): void => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  const getQuantity = (id: number): number => quantities[id] || 1;

  const subtotal = cartItems.reduce((sum, item) => 
    sum + item.price * getQuantity(item.id), 0
  );

  const shipping = 0; // Livraison gratuite
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-light text-center mb-12">VOTRE PANIER</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Liste des articles */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map(item => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Image du produit */}
                    <div className="relative w-full md:w-48 h-48 bg-gray-100 rounded-lg overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Détails du produit */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-medium">{item.name}</h3>
                          <p className="text-gray-600 mt-1">{item.color}</p>
                        </div>
                        <button 
                          className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                          aria-label="Supprimer"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <div className="mt-6 flex justify-between items-end">
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="text-lg font-medium min-w-[2ch] text-center">
                            {getQuantity(item.id)}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-xl font-medium">
                          {(item.price * getQuantity(item.id)).toLocaleString('fr-FR')} XAF
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Garanties et services */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {[
                { icon: ShieldCheck, title: "Garantie Premium", text: "Protection complète incluse" },
                { icon: Truck, title: "Livraison Offerte", text: "Partout en France" },
                { icon: Clock, title: "Service 24/7", text: "Assistance personnalisée" },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-4">
                  <Icon className="h-8 w-8 text-gray-600" />
                  <div>
                    <h3 className="font-medium">{title}</h3>
                    <p className="text-sm text-gray-600">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Résumé de la commande */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-medium mb-6">Résumé de la commande</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sous-total</span>
                    <span className="font-medium">{subtotal.toLocaleString('fr-FR')} XAF</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Livraison</span>
                    <span className="text-green-600">Gratuite</span>
                  </div>
                  <div className="h-px bg-gray-200 my-4" />
                  <div className="flex justify-between text-lg font-medium">
                    <span>Total</span>
                    <span>{total.toLocaleString('fr-FR')} XAF</span>
                  </div>

                  <Button 
                    size="lg"
                    className="w-full mt-6 bg-black text-white hover:bg-gray-800 transition-colors duration-300"
                    onClick={() => navigate('/checkout')}
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    Procéder au paiement
                  </Button>
                </div>

                {/* Moyens de paiement acceptés */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-4">Nous acceptons :</p>
                  <div className="flex gap-2">
                    {['Visa', 'Mastercard', 'Apple Pay'].map(payment => (
                      <div key={payment} className="px-3 py-1 bg-gray-100 rounded text-sm">
                        {payment}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;