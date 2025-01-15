import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleFAQClick = () => {
    navigate('/#faq');
  };

  const handleContactClick = () => {
    navigate('/#contact');
  };

  const handleServiceClick = () => {
    navigate('/#service');
  };

  const handlePromotionClick = () => {
    navigate('/#promotion');
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">DriveMarket</h3>
            <p className="text-gray-400">
              Votre partenaire de confiance pour l'achat de véhicules neufs et d'occasion.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li><a href="/catalogue" className="text-gray-400 hover:text-white">Catalogue</a></li>
              <li><a href="/promotions" className="text-gray-400 hover:text-white">Promotions</a></li>
              <li><a href="/financing" className="text-gray-400 hover:text-white">Financement</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-white">Services</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={handleContactClick} className="text-gray-400 hover:text-white">
                  Contact
                </button>
              </li>
              <li>
                <button onClick={handleFAQClick} className="text-gray-400 hover:text-white">
                  FAQ
                </button>
              </li>
              <li>
                <button onClick={handleServiceClick} className="text-gray-400 hover:text-white">
                  Service
                </button>
              </li>
              <li>
                <button onClick={handlePromotionClick} className="text-gray-400 hover:text-white">
                  Promotion
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: contact@DriveMarket.com</li>
              <li>Tél: +237 690 232 120</li>
              <li>Adresse: Obili, Yaoundé - Cameroun</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} DriveMarket. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;