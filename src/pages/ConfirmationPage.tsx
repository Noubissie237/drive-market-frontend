import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui';
import { CheckCircle, Truck, Calendar, Phone, Mail, ArrowRight, Download } from 'lucide-react';

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Vous pouvez passer les détails de la commande via location state
  // const orderDetails = location.state?.orderDetails;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* En-tête avec confirmation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-light mb-2">Commande confirmée</h1>
          <p className="text-gray-600">
            Merci pour votre commande. Votre numéro de commande est{' '}
            <span className="font-medium">CMD-2024-0123</span>
          </p>
        </div>

        {/* Cartes d'information */}
        <div className="space-y-6">
          {/* Statut de la commande */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-light mb-4">Prochaines étapes</h2>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email de confirmation</h3>
                    <p className="text-sm text-gray-600">
                      Un email détaillé vous sera envoyé dans les prochaines minutes
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Contact du concessionnaire</h3>
                    <p className="text-sm text-gray-600">
                      Un conseiller vous contactera sous 24h pour organiser la livraison
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Truck className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Préparation du véhicule</h3>
                    <p className="text-sm text-gray-600">
                      Votre véhicule est en cours de préparation pour la livraison
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Livraison estimée</h3>
                    <p className="text-sm text-gray-600">
                      Date estimée de livraison : 15-20 jours ouvrés
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Résumé de la commande */}
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-light">Résumé de la commande</h2>
                <Button variant="outline" className="text-sm" onClick={() => {}}>
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger la facture
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between pb-4 border-b border-gray-100">
                  <span className="text-gray-600">Sous-total</span>
                  <span>15.000.000 XAF</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-gray-100">
                  <span className="text-gray-600">TVA (19.25%)</span>
                  <span>2.887.500 XAF</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-gray-100">
                  <span className="text-gray-600">Livraison</span>
                  <span className="text-green-600">Gratuite</span>
                </div>
                <div className="flex justify-between text-lg font-medium">
                  <span>Total</span>
                  <span>17.887.500 XAF</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => navigate('/dashboard')}
            >
              Voir mes commandes
            </Button>
            <Button 
              className="flex-1 bg-black hover:bg-gray-800"
              onClick={() => navigate('/')}
            >
              Retour à l'accueil
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;