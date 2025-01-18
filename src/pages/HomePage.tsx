import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ChevronDown, Star, Shield, Clock, MapPin, Phone, Mail } from 'lucide-react';
import AnimatedNumber from '../components/widgets/AnimateNumber';

const HomePage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const slides = [
    {
      image: '/img/vehicle1.jpg',
      title: "L'Innovation à l'État Pur",
      description: "Découvrez notre gamme de SUV électriques, alliant technologie de pointe et design avant-gardiste",
      position: "left"
    },
    {
      image: '/img/vehicle2.jpg',
      title: "Le Luxe Accessible",
      description: "Une sélection premium de véhicules pour répondre à toutes vos exigences",
      position: "left"
    },
    {
      image: '/img/vehicle3.png',
      title: "L'Excellence Automobile",
      description: "Vivez une expérience de conduite unique avec nos modèles d'exception",
      position: "center"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const categories = [
    {
      name: 'Véhicules Électriques',
      image: '/img/v-electric.webp',
      link: '/catalogue/vehicules-electriques',
    },
    {
      name: 'Véhicules Essence',
      image: '/img/v-essence.webp',
      link: '/catalogue/vehicules-essence',
    },
    {
      name: 'Scooters',
      image: '/img/scooter.webp',
      link: '/catalogue/scooters',
    },
  ];

  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#faq') {
      const faqSection = document.getElementById('faq');
      if (faqSection) {
        faqSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    if (location.hash === '#contact') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    if (location.hash === '#service') {
      const serviceSection = document.getElementById('service');
      if (serviceSection) {
        serviceSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    if (location.hash === '#promotion') {
      const promotionSection = document.getElementById('promotion');
      if (promotionSection) {
        promotionSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      {/* Hero Section avec Carrousel */}
      <div className="relative h-screen overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ${currentImageIndex === index ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30">
              <div
                className="absolute inset-0 bg-cover bg-center mix-blend-overlay transition-transform duration-[2000ms]"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
            </div>

            <div className={`absolute inset-0 flex flex-col justify-center ${slide.position === 'center' ? 'items-center px-4' : 'items-start px-12 md:px-24'
              }`}>
              <div className={`text-white max-w-xl transition-all duration-1000 ${currentImageIndex === index
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-10'
                }`}>
                <h2 className="text-5xl md:text-6xl font-light mb-6">
                  {slide.title}
                </h2>
                <p className="text-xl md:text-2xl font-light mb-8">
                  {slide.description}
                </p>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/catalogue')}
                  className="bg-transparent border-white text-white hover:bg-white hover:text-black transition-all duration-300"
                >
                  Découvrir
                </Button>
              </div>
            </div>
          </div>
        ))}

        <div className={`absolute top-8 left-1/2 transform -translate-x-1/2 text-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          <h1 className="text-4xl font-light text-center">
            DriveMarket
          </h1>
        </div>

        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${currentImageIndex === index ? 'w-8 bg-white' : 'w-2 bg-white/50'
                }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-white" />
        </div>
      </div>

      {/* Categories Section - */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-light text-center mb-16">
            NOS CATÉGORIES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div key={category.name} className="group relative h-96 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url('${category.image}')` }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-700" />
                <div className="relative h-full flex flex-col items-center justify-center text-white">
                  <h3 className="text-2xl font-light mb-4">{category.name}</h3>
                  <Button
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white hover:text-black transition-all duration-300"
                    onClick={() => navigate(category.link)}
                  >
                    Explorer
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Section - Code existant conservé */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light mb-8">
              L'EXCELLENCE AU SERVICE DE VOTRE MOBILITÉ
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              Depuis plus de 20 ans, DriveMarket sélectionne pour vous les meilleurs véhicules,
              alliant performance, confort et innovation. Notre expertise vous garantit
              une expérience d'achat unique et personnalisée.
            </p>
            <Button
              size="lg"
              onClick={() => navigate('#contact')}
              className="bg-black text-white hover:bg-gray-800 transition-colors duration-300"
            >
              Prendre Rendez-vous
            </Button>
          </div>
        </div>
      </div>

      {/* Section Services Premium */}
      <div className="py-20 bg-white" id='service'>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-light text-center mb-16">
            NOS SERVICES PREMIUM
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Star,
                title: "Garantie Premium",
                description: "Une garantie exclusive jusqu'à 24 mois sur tous nos véhicules premium"
              },
              {
                icon: Shield,
                title: "Service Conciergerie",
                description: "Un accompagnement personnalisé pour l'entretien et la maintenance de votre véhicule"
              },
              {
                icon: Clock,
                title: "Essai Prolongé",
                description: "Testez votre futur véhicule pendant 48h dans vos conditions réelles d'utilisation"
              }
            ].map((service, index) => (
              <div key={index} className="text-center group bg-gray-50 p-8 rounded-lg hover:shadow-xl transition-shadow duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-black text-white rounded-full transform group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-medium mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section FAQ */}
      <div className="py-20 bg-gray-900 text-white" id='faq'>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-light text-center mb-16">
            QUESTIONS FRÉQUENTES
          </h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {[
              {
                question: "Quels sont les modes de paiement acceptés ?",
                answer: "Nous acceptons les cartes de crédit, les virements bancaires et les paiements en ligne sécurisés."
              },
              {
                question: "Offrez-vous des garanties sur vos véhicules ?",
                answer: "Oui, tous nos véhicules bénéficient d'une garantie de 12 à 24 mois selon le modèle."
              },
              {
                question: "Puis-je essayer un véhicule avant d'acheter ?",
                answer: "Absolument, nous proposons des essais prolongés de 48h pour vous permettre de prendre une décision éclairée."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white/10 p-6 rounded-lg">
                <h3 className="font-medium mb-2">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section Chiffres */}
      <div className="py-20 bg-white text-dark">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-light text-center mb-16">
            DRIVEMARKET EN CHIFFRES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: "1000+", label: "Clients Satisfaits" },
              { value: "20", label: "Ans D'expérience" },
              { value: "95", label: "Taux de Recommandation" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <h3 className="text-5xl font-bold mb-4">
                  <AnimatedNumber value={stat.value} duration={1000} />
                  {stat.value.includes('%') && '%'}
                  {stat.value.includes('+') && '+'}
                </h3>
                <p className="text-gray-600 text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section Promotions */}
      <div className="py-20 bg-gray-900 text-white" id='promotion'>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-light text-center mb-16">
            PROMOTIONS EXCEPTIONNELLES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: '/img/vehicle1.jpg',
                title: "SUV Électrique à -20%",
                description: "Profitez d'une réduction exceptionnelle sur notre modèle phare.",
                link: '/promotions/suv-electrique',
                discount: "-20%",
              },
              {
                image: '/img/vehicle2.jpg',
                title: "Essence : Offre Financière",
                description: "Crédit avantageux pour l'achat de véhicules essence.",
                link: '/promotions/offre-essence',
                discount: "-15%",
              },
              {
                image: '/img/vehicle3.png',
                title: "Scooters à Prix Cassés",
                description: "Économisez jusqu'à 30% sur notre gamme de scooters.",
                link: '/promotions/scooters',
                discount: "-30%",
              }
            ].map((promo, index) => (
              <div key={index} className="bg-white/10 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
                {/* Badge de promotion */}
                {promo.discount && (
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium z-10">
                    {promo.discount}
                  </div>
                )}
                <img src={promo.image} alt={promo.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-medium mb-2">{promo.title}</h3>
                  <p className="text-gray-300 mb-4">{promo.description}</p>
                  <Button
                    variant="outline"
                    onClick={() => navigate(promo.link)}
                    className="bg-transparent border-white text-white hover:bg-white hover:text-black transition-all duration-300"
                  >
                    Découvrir l'offre
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section Contact et Localisation */}
      <div className="py-20 bg-white" id='contact'>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-light mb-8">
                NOUS CONTACTER
              </h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <MapPin className="h-6 w-6 text-gray-600" />
                  <p className="text-gray-600">Obili, Yaoundé - Cameroun</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="h-6 w-6 text-gray-600" />
                  <p className="text-gray-600">+237 690 232 120</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-gray-600" />
                  <p className="text-gray-600">contact@DriveMarket.fr</p>
                </div>
              </div>
              <div className="mt-8">
                <Button
                  size="lg"
                  onClick={() => navigate('/#contact')}
                  className="bg-black text-white hover:bg-gray-800 transition-colors duration-300"
                >
                  Nous Contacter
                </Button>
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-light mb-8">
                HORAIRES D'OUVERTURE
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Lundi - Vendredi</span>
                  <span className="text-gray-600">9h00 - 19h00</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium">Samedi</span>
                  <span className="text-gray-600">10h00 - 18h00</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Dimanche</span>
                  <span className="text-gray-600">Fermé</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;