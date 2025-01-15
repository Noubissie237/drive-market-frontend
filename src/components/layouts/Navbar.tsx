import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Plus, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const cartRef = useRef<HTMLDivElement>(null);
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const { isAuthenticated, logout } = useAuth(); // Récupère l'état d'authentification et la méthode logout

  const isActive = (path: string) => location.pathname === path;

  // Gestionnaire de clic en dehors du panier
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setShowCart(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigation = [
    { name: 'Accueil', path: '/' },
    { name: 'Catalogue', path: '/catalogue' },
    { name: 'À propos', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    logout(); // Déconnecte l'utilisateur
    navigate('/'); // Redirige vers la page d'accueil
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-xl font-bold">DriveMarket</h1>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${isActive(item.path)
                  ? 'text-blue-600 font-medium'
                  : 'text-gray-700 hover:text-gray-900'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowCart(!showCart)}
                className="relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Button>

              {/* Dropdown du panier */}
              {showCart && (
                <div
                  ref={cartRef}
                  className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-xl border p-4 z-50"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg">Votre Panier</h3>
                    <button
                      onClick={() => setShowCart(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {cart.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Votre panier est vide</p>
                  ) : (
                    <>
                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {cart.map((item) => (
                          <div key={item.vehicle.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <h4 className="font-medium">{item.vehicle.name}</h4>
                              <p className="text-sm text-gray-500">{item.vehicle.price.toLocaleString()} XAF</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                className="px-2 py-1 rounded border hover:bg-gray-100"
                                onClick={() => updateQuantity(item.vehicle.id, item.quantity - 1)}
                              >
                                -
                              </button>
                              <span>{item.quantity}</span>
                              <button
                                className="px-2 py-1 rounded border hover:bg-gray-100"
                                onClick={() => updateQuantity(item.vehicle.id, item.quantity + 1)}
                              >
                                +
                              </button>
                              <button
                                className="text-red-500 hover:text-red-700 ml-2"
                                onClick={() => removeFromCart(item.vehicle.id)}
                              >
                                <X size={20} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="pt-4 mt-4 border-t">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-medium">Total</span>
                          <span className="font-bold">{getTotalPrice().toLocaleString()} XAF</span>
                        </div>
                        <Button
                          className="w-full"
                          onClick={() => {
                            setShowCart(false);
                            navigate('/checkout');
                          }}
                        >
                          Procéder au paiement
                        </Button>
                        <Button
                          onClick={() => {
                            setShowCart(false);
                            navigate('/panier');
                          }}
                          className="block w-full bg-white text-center mt-4 text-blue-600 hover:text-white border border-blue-600 hover:bg-blue-600 rounded-lg py-2 px-4 transition-all duration-200 font-medium"
                        >
                          Voir plus
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Affiche LogOut si l'utilisateur est connecté, sinon affiche User */}
            {isAuthenticated ? (
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5 text" />
              </Button>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${isActive(item.path)
                    ? 'text-blue-600 font-medium'
                    : 'text-gray-700 hover:text-gray-900'
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setShowCart(true);
                  }}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </Button>
                {/* Affiche LogOut si l'utilisateur est connecté, sinon affiche User */}
                {isAuthenticated ? (
                  <Button variant="ghost" size="icon" onClick={handleLogout}>
                    <LogOut className="h-5 w-5" />
                  </Button>
                ) : (
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;