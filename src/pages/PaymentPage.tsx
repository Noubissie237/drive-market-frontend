import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import {
  CreditCard, Lock, Check, ChevronRight, PlayIcon, 
  AppleIcon, ShieldCheck, Clock, ArrowLeft, Building,
  MapPin, Ban
} from 'lucide-react';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [wantCredit, setWantCredit] = useState(false);

  const orderSummary = {
    subtotal: 53990,
    tax: 1620,
    shipping: 0,
    total: 55610,
    monthlyPayment: 799 // Pour 72 mois à 4.9% APR
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <button className="flex items-center text-sm text-gray-600 hover:text-black transition-colors mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au panier
          </button>
          <h1 className="text-3xl font-light">Finaliser la commande</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Section principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* Adresse de livraison */}
            <Card className="overflow-hidden bg-white/90 backdrop-blur-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-light mb-6">Adresse de livraison</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-2">
                      Prénom
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:ring-opacity-20 focus:outline-none text-sm"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-2">
                      Nom
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:ring-opacity-20 focus:outline-none text-sm"
                      placeholder="Doe"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium mb-2">
                      Adresse
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:ring-opacity-20 focus:outline-none text-sm"
                      placeholder="123 rue de la Paix"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-2">
                      Ville
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:ring-opacity-20 focus:outline-none text-sm"
                      placeholder="Paris"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-2">
                      Code postal
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:ring-opacity-20 focus:outline-none text-sm"
                      placeholder="75000"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium mb-2">
                      Pays
                    </label>
                    <select
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:ring-opacity-20 focus:outline-none text-sm"
                    >
                      <option value="FR">France</option>
                      <option value="BE">Belgique</option>
                      <option value="CH">Suisse</option>
                      <option value="LU">Luxembourg</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Option de financement */}
            <Card className="overflow-hidden bg-white/90 backdrop-blur-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-light mb-6">Mode de financement</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer hover:border-gray-300"
                       onClick={() => setWantCredit(false)}>
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Paiement comptant</p>
                        <p className="text-sm text-gray-600">Payez la totalité maintenant</p>
                      </div>
                    </div>
                    <div className={`h-4 w-4 rounded-full border-2 ${!wantCredit ? 'bg-black border-black' : 'border-gray-300'}`} />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer hover:border-gray-300"
                       onClick={() => setWantCredit(true)}>
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Financement</p>
                        <p className="text-sm text-gray-600">À partir de {orderSummary.monthlyPayment}€/mois sur 72 mois</p>
                      </div>
                    </div>
                    <div className={`h-4 w-4 rounded-full border-2 ${wantCredit ? 'bg-black border-black' : 'border-gray-300'}`} />
                  </div>

                  {wantCredit && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-xl space-y-4">
                      <h3 className="font-medium">Simulation de crédit</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium mb-2">
                            Durée du crédit
                          </label>
                          <select className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:ring-opacity-20 focus:outline-none text-sm">
                            <option value="48">48 mois</option>
                            <option value="60">60 mois</option>
                            <option value="72">72 mois</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-2">
                            Apport initial
                          </label>
                          <input
                            type="text"
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:ring-opacity-20 focus:outline-none text-sm"
                            placeholder="10000€"
                          />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        * Taux d'intérêt à partir de 4.9% APR selon profil
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Méthodes de paiement */}
            <Card className="overflow-hidden bg-white/90 backdrop-blur-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-light mb-6">Méthode de paiement</h2>
                
                <div className="space-y-4">
                  {/* Options de paiement */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {[
                      { id: 'card', label: 'Carte bancaire', icon: CreditCard },
                      { id: 'paypal', label: 'PayPal', icon: PlayIcon },
                      { id: 'apple', label: 'Apple Pay', icon: AppleIcon }
                    ].map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        onClick={() => setPaymentMethod(id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-3
                          ${paymentMethod === id 
                            ? 'border-black bg-black text-white shadow-lg' 
                            : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                          }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="text-sm font-medium">{label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Formulaire carte bancaire */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-6 animate-fadeIn">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-medium mb-2">
                            Numéro de carte
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              className="w-full p-3 border border-gray-200 rounded-lg pr-12 focus:ring-2 focus:ring-black focus:ring-opacity-20 focus:outline-none text-sm"
                              placeholder="1234 5678 9012 3456"
                            />
                            <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium mb-2">
                              Date d'expiration
                            </label>
                            <input
                              type="text"
                              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:ring-opacity-20 focus:outline-none text-sm"
                              placeholder="MM/AA"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium mb-2">
                              CVV
                            </label>
                            <input
                              type="text"
                              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:ring-opacity-20 focus:outline-none text-sm"
                              placeholder="123"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium mb-2">
                            Nom sur la carte
                          </label>
                          <input
                            type="text"
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:ring-opacity-20 focus:outline-none text-sm"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Section sécurité */}
            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
              <Lock className="h-5 w-5 text-gray-400" />
              <p className="text-sm text-gray-600">
                Paiement sécurisé avec cryptage SSL 256-bits
              </p>
            </div>
          </div>

          {/* Résumé de la commande */}
          <div className="lg:col-span-1">
            <Card className="bg-white/90 backdrop-blur-lg sticky top-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-light mb-6">Résumé de la commande</h2>

                <div className="space-y-4 mb-6">
                  {/* Produit */}
                  <div className="flex gap-4 pb-4 border-b border-gray-100">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                      <img 
                        src="https://b1672279.smushcdn.com/1672279/wp-content/uploads/2019/05/location-citadine-type-renault-clio-v-2-13.png?lossy=2&strip=1&webp=1" 
                        alt="Vehicle" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Tesla Model 3</h3>
                      <p className="text-xs text-gray-600 mt-1">Performance • 2023</p>
                    </div>
                  </div>

                  {/* Détails prix */}
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sous-total</span>
                      <span>{orderSummary.subtotal.toLocaleString()}€</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">TVA</span>
                      <span>{orderSummary.tax.toLocaleString()}€</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Livraison</span>
                      <span className="text-green-600">Gratuite</span>
                    </div>
                  </div>

{/* Total */}
<div className="flex justify-between pt-4 border-t border-gray-100">
                    <span className="font-medium">Total</span>
                    {wantCredit ? (
                      <div className="text-right">
                        <div className="text-lg font-medium">{orderSummary.monthlyPayment}€/mois</div>
                        <div className="text-xs text-gray-600">sur 72 mois • 4.9% APR</div>
                      </div>
                    ) : (
                      <span className="text-lg font-medium">
                        {orderSummary.total.toLocaleString()}€
                      </span>
                    )}
                  </div>
                </div>

                {/* Bouton paiement */}
                <Button 
                  className="w-full bg-black hover:bg-gray-800 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                  onClick={() => setIsProcessing(true)}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="h-4 w-4 animate-spin" />
                      <span>Traitement en cours...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Lock className="h-4 w-4" />
                      <span>
                        {wantCredit ? "Démarrer la demande de crédit" : "Payer maintenant"}
                      </span>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>

                {/* Garanties */}
                <div className="mt-6 space-y-3">
                  {[
                    { icon: ShieldCheck, text: "Paiement 100% sécurisé" },
                    { icon: Clock, text: "Annulation gratuite sous 24h" },
                    { icon: Building, text: "Concessionnaire agréé" }
                  ].map(({ icon: Icon, text }, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                      <Icon className="h-4 w-4" />
                      {text}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;