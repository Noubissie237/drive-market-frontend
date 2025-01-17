import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  Search, 
  Download,
  Clock,
  Truck,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  LucideIcon
} from 'lucide-react';
import { GET_ORDERS_BY_CUSTOMER } from '../api/order';
import { useAuth } from '../components/context/AuthContext';

type OrderStatus = 'PENDING' | 'DELIVERED' | 'SHIPPING' | 'CANCELLED';

interface Address {
  street: string;
  city: string;
}

interface CustomerInfo {
  address: Address;
}

interface OrderItem {
  quantity: number;
  vehicleId: string;
  vehicleName: string;
  subtotal: number;
}

interface Order {
  orderId: string;
  customerInfo: CustomerInfo;
  items: OrderItem[];
  status: OrderStatus;
  deliveryCountry: string;
  createdAt: string;
  orderType: 'CASH' | 'CREDIT';
}

interface StatusConfig {
  icon: LucideIcon;
  text: string;
  class: string;
}

const OrderHistory = () => {
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { userId } = useAuth();

  const { data, loading, error } = useQuery(GET_ORDERS_BY_CUSTOMER, {
    variables: { customerId: userId },
    context: { service: 'order' }
  });

  const statusConfigs: Record<OrderStatus, StatusConfig> = {
    PENDING: {
      icon: Clock,
      text: 'En cours',
      class: 'bg-blue-100 text-blue-600'
    },
    DELIVERED: {
      icon: CheckCircle,
      text: 'Livré',
      class: 'bg-green-100 text-green-600'
    },
    SHIPPING: {
      icon: Truck,
      text: 'En livraison',
      class: 'bg-orange-100 text-orange-600'
    },
    CANCELLED: {
      icon: AlertCircle,
      text: 'Annulé',
      class: 'bg-red-100 text-red-600'
    }
  };

  const getStatusBadge = (status: OrderStatus) => {
    const config = statusConfigs[status];
    const Icon = config.icon;

    return (
      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.class}`}>
        <Icon className="w-3.5 h-3.5" />
        {config.text}
      </div>
    );
  };

  const filteredOrders = data?.ordersByCustomer.filter((order: Order) => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch = order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.vehicleName.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  }) || [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Une erreur est survenue: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-light">Historique des commandes</h1>
          <p className="text-gray-600 mt-2">Consultez et gérez vos commandes de véhicules</p>
        </div>

        {/* Filtres et recherche */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Rechercher une commande..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:ring-opacity-20 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <select
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:ring-opacity-20 focus:outline-none"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'all')}
                >
                  <option value="all">Tous les statuts</option>
                  <option value="PENDING">En cours</option>
                  <option value="SHIPPING">En livraison</option>
                  <option value="DELIVERED">Livré</option>
                  <option value="CANCELLED">Annulé</option>
                </select>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Exporter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liste des commandes */}
        <div className="space-y-4">
          {filteredOrders.map((order: Order) => (
            <Card key={order.orderId} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Image du véhicule */}
                  <div className="w-full md:w-48 h-32 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={`/api/placeholder/200/150`}
                      alt={order.items[0].vehicleName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Détails de la commande */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="font-medium">{order.items[0].vehicleName}</h2>
                        <p className="text-sm text-gray-600 mt-1">Commande {order.orderId}</p>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Date de commande</p>
                        <p className="font-medium mt-1">
                          {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Méthode de paiement</p>
                        <p className="font-medium mt-1">
                          {order.orderType === 'CASH' ? 'Carte bancaire' : 'Crédit'}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Adresse de livraison</p>
                        <p className="font-medium mt-1">
                          {`${order.customerInfo.address.street}, ${order.customerInfo.address.city}`}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-gray-600 text-sm">Total</p>
                        <p className="text-lg font-medium">
                          {order.items[0].subtotal.toLocaleString()} XAF
                        </p>
                      </div>
                      <Button variant="outline" className="text-sm">
                        Voir les détails
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <Card className="text-center p-8">
            <CardContent>
              <p className="text-gray-600">Aucune commande ne correspond à vos critères de recherche</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;