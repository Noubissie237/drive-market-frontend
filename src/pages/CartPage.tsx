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
import { useCart } from '../components/context/CartContext';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart(); // Utilise useCart

  // Fonction pour mettre à jour la quantité d'un article
  const handleUpdateQuantity = (vehicleId: string, delta: number) => {
    const currentQuantity = cart.find(item => item.vehicle.id === vehicleId)?.quantity || 1;
    const newQuantity = Math.max(1, currentQuantity + delta);
    updateQuantity(vehicleId, newQuantity);
  };

  // Fonction pour obtenir la quantité d'un article
  const getQuantity = (vehicleId: string) => {
    return cart.find(item => item.vehicle.id === vehicleId)?.quantity || 1;
  };

  // Calcul du sous-total
  const subtotal = getTotalPrice();

  // Livraison gratuite
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-light text-center mb-12">VOTRE PANIER</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Liste des articles */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map(item => (
              <Card key={item.vehicle.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Image du produit */}
                    <div className="relative w-full md:w-48 h-48 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={item.vehicle.images[0].url}
                        alt={item.vehicle.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Détails du produit */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-medium">{item.vehicle.name}</h3>
                          {/* Afficher les options sélectionnées */}
                          {item.vehicle.selectedOptions && item.vehicle.selectedOptions.length > 0 && (
                            <div className="mt-2">
                              <p className="text-sm text-gray-600">Options :</p>
                              <ul className="list-disc list-inside">
                                {item.vehicle.selectedOptions.map((option) => (
                                  <li key={option.id} className="text-sm text-gray-600">
                                    {option.name} (+{option.price.toLocaleString('fr-FR')} XAF)
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                        <button
                          className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                          aria-label="Supprimer"
                          onClick={() => removeFromCart(item.vehicle.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="mt-6 flex justify-between items-end">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleUpdateQuantity(item.vehicle.id, -1)}
                            className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="text-lg font-medium min-w-[2ch] text-center">
                            {getQuantity(item.vehicle.id)}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item.vehicle.id, 1)}
                            className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-xl font-medium">
                          {(item.vehicle.price * getQuantity(item.vehicle.id)).toLocaleString('fr-FR')} XAF
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