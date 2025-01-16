import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '../components/ui/card';
import { Button } from '../components/ui/button';
import {
  CreditCard, Lock, Check, ChevronRight, PlayIcon,
  AppleIcon, ShieldCheck, Clock, ArrowLeft, Building,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../components/context/CartContext';
import { useAuth } from '../components/context/AuthContext';
import { GET_CUSTOMER_BY_ID } from '../api/customerApi';
import { useQuery } from '@apollo/client';
// import Swal from 'sweetalert2';


function getPrenom(chaine: String) {
  const blocs = chaine.split(' ');

  const dernierBloc = blocs[blocs.length - 1];

  return dernierBloc;
}

function getNom(chaine: String) {
  const blocs = chaine.split(' ');

  if (blocs.length <= 1) {
    return "";
  }

  blocs.pop();

  const resultat = blocs.join(' ');

  return resultat;
}


const PaymentPage = () => {

  const navigate = useNavigate();
  const { userId } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [wantCredit, setWantCredit] = useState(false);
  const [creditDuration, setCreditDuration] = useState<number>(72); // Durée du crédit en mois
  const [initialDeposit, setInitialDeposit] = useState<number>(0); // Apport initial
  const [depositError, setDepositError] = useState<string | null>(null); // Message d'erreur pour l'apport initial
  // Utilise le contexte du panier
  const { cart, getTotalPrice } = useCart();

  // Calcul des totaux dynamiques
  const subtotal = getTotalPrice();
  const tax = subtotal * 0.03; // Exemple de TVA à 3%
  const shipping = 0; // Livraison gratuite
  const total = subtotal + tax + shipping;

  // Taux d'intérêt en fonction de la durée
  const interestRates: { [key: number]: number } = {
    48: 3.9, // 3.9% APR pour 48 mois
    60: 4.2, // 4.2% APR pour 60 mois
    72: 4.9, // 4.9% APR pour 72 mois
  };

  // Calcul du paiement mensuel
  const calculateMonthlyPayment = (total: number, duration: number, interestRate: number) => {
    const monthlyInterestRate = interestRate / 100 / 12;
    const numerator = monthlyInterestRate * Math.pow(1 + monthlyInterestRate, duration);
    const denominator = Math.pow(1 + monthlyInterestRate, duration) - 1;
    return ((total - initialDeposit) * (numerator / denominator)).toFixed(2);
  };

  const monthlyPayment = calculateMonthlyPayment(total, creditDuration, interestRates[creditDuration]);

  // Validation de l'apport initial
  const validateInitialDeposit = (value: number) => {
    if (value < parseFloat(monthlyPayment)) {
      setDepositError("L'apport initial ne peut pas être inférieur au montant du paiement mensuel.");
      return false;
    }
    setDepositError(null);
    return true;
  };

  const handleDepositChange = (value: string) => {
    // Convertir la valeur en nombre
    const numericValue = parseFloat(value);

    // Vérifier si la valeur est un nombre valide
    if (isNaN(numericValue)) {
      // Si la valeur n'est pas valide, définir l'apport initial à 0
      setInitialDeposit(0);
      setDepositError("Veuillez saisir un montant valide.");
    } else {
      // Si la valeur est valide, mettre à jour l'apport initial
      setInitialDeposit(numericValue);
      validateInitialDeposit(numericValue); // Valider l'apport initial
    }
  };

  const orderSummary = {
    subtotal,
    tax,
    shipping,
    total,
    monthlyPayment: parseFloat(monthlyPayment), // Convertir en nombre
    interestRate: interestRates[creditDuration], // Taux d'intérêt actuel
  };

  const { loading, error, data } = useQuery(GET_CUSTOMER_BY_ID, {
    variables: { id: userId },
    context: { service: 'customer' }
  });

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

  // console.log(data.customerById);
  const onlyName = getNom(data.customerById.name);
  const onlySubname = getPrenom(data.customerById.name);

  // if (userId == null) {
  //   Swal.fire({
  //     title: 'Connexion requise',
  //     text: 'Vous devez vous connecter pour afficher le contenu de cette page',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Se connecter',
  //     cancelButtonText: 'Annuler',
  //     confirmButtonColor: '#0F172A',
  //     cancelButtonColor: '#d33',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       navigate('/login');
  //     }
  //   });
  //   return;
  // }

  console.log(cart);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <button className="flex items-center text-sm text-gray-600 hover:text-black transition-colors mb-6"
            onClick={() => navigate('/panier')}
          >
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
                      disabled
                      type="text"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:ring-opacity-20 focus:outline-none text-sm"
                      placeholder="Wilfried"
                      value={onlySubname.toUpperCase()}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-2">
                      Nom
                    </label>
                    <input
                      disabled
                      value={onlyName.toUpperCase()}
                      type="text"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:ring-opacity-20 focus:outline-none text-sm"
                      placeholder="Noubissie kamga"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium mb-2">
                      Adresse
                    </label>
                    <input
                      disabled
                      value={data.customerById.address.street.toUpperCase()}
                      type="text"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:ring-opacity-20 focus:outline-none text-sm"
                      placeholder="Obili"

                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-2">
                      Ville
                    </label>
                    <input
                      disabled
                      value={data.customerById.address.city.toUpperCase()}
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
                      disabled
                      value={data.customerById.address.postalCode}
                      type="text"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:ring-opacity-20 focus:outline-none text-sm"
                      placeholder="23700"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium mb-2">
                      Pays
                    </label>
                    <select
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:ring-opacity-20 focus:outline-none text-sm"
                    >
                      <option value="CM">Cameroun</option>
                      <option value="NI">Nigéria</option>
                      <option value="CI">Côte d'ivoire</option>
                      <option value="SN">Sénégal</option>
                      <option value="GE">Allemagne</option>
                      <option value="FR">France</option>
                      <option value="ES">Espagne</option>
                      <option value="IT">Italie</option>
                      <option value="CA">Canada</option>
                      <option value="US">Etat Unis</option>
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
                        <p className="text-sm text-gray-600">À partir de {orderSummary.monthlyPayment} XAF/mois</p>
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
                          <select
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:ring-opacity-20 focus:outline-none text-sm"
                            value={creditDuration}
                            onChange={(e) => setCreditDuration(parseInt(e.target.value))}
                          >
                            <option value="48">48 mois</option>
                            <option value="60">60 mois</option>
                            <option value="72">72 mois</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium mb-2">
                            Apport initial (XAF)
                          </label>
                          <input
                            disabled
                            type="number"
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:ring-opacity-20 focus:outline-none text-sm"
                            placeholder="10000 XAF"
                            value={orderSummary.monthlyPayment}
                            onChange={(e) => handleDepositChange((e.target.value))}
                          />
                          {depositError && (
                            <p className="text-xs text-red-500 mt-2">{depositError}</p>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        * Taux d'intérêt à partir de {orderSummary.interestRate}% APR selon profil
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
                            placeholder="Wilfried Noubissie kamga"
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
                  {/* Liste des produits */}
                  {cart.map((item) => (
                    <div key={item.vehicle.id} className="flex gap-4 pb-4 border-b border-gray-100">
                      <div className="w-21 h-20 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={item.vehicle.image}
                          alt={item.vehicle.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">{item.vehicle.productName}</h3>
                        <p className="text-xs text-gray-600 mt-1">
                          Quantité : {item.quantity}
                        </p>
                        {item.vehicle.selectedOptions && (
                          <div className="text-xs text-gray-600">
                            Options : {item.vehicle.selectedOptions.map(option => option.name).join(', ')}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Détails prix */}
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sous-total</span>
                      <span>{orderSummary.subtotal.toLocaleString()}XAF</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">TVA</span>
                      <span>{orderSummary.tax.toLocaleString()}XAF</span>
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
                        <div className="text-lg font-medium">{orderSummary.monthlyPayment}XAF/mois</div>
                        <div className="text-xs text-gray-600">
                          sur {creditDuration} mois • {orderSummary.interestRate}% APR
                        </div>
                      </div>
                    ) : (
                      <span className="text-lg font-medium">
                        {orderSummary.total.toLocaleString()}XAF
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