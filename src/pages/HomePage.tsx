import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ChevronDown } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const slides = [
    {
      image: 'https://www.masculin.com/wp-content/uploads/sites/2/2021/08/wey-v71-1.jpg',
      title: "L'Innovation à l'État Pur",
      description: "Découvrez notre gamme de SUV électriques, alliant technologie de pointe et design avant-gardiste",
      position: "left"
    },
    {
      image: 'https://cdn-s-www.republicain-lorrain.fr/images/C882FF7E-69EC-4A70-BB8B-80BEA8F12BCA/MF_contenu/pourquoi-les-voitures-chinoises-vont-etre-de-plus-en-plus-nombreuses-sur-les-routes-1661182426.jpg',
      title: "Le Luxe Accessible",
      description: "Une sélection premium de véhicules pour répondre à toutes vos exigences",
      position: "left"
    },
    {
      image: 'https://sf1.lesderapages.com/wp-content/uploads/sites/14/2016/12/la-bentley-continental-gt-speed-740x410.png',
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

  return (
    <div className="min-h-screen">
      {/* Hero Section avec Carrousel */}
      <div className="relative h-screen overflow-hidden">
        {/* Images de fond avec transitions */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ${
              currentImageIndex === index ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30">
              <div 
                className="absolute inset-0 bg-cover bg-center mix-blend-overlay transition-transform duration-[2000ms]"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
            </div>
            
            {/* Texte spécifique à chaque slide */}
            <div className={`absolute inset-0 flex flex-col justify-center ${
              slide.position === 'center' ? 'items-center px-4' : 'items-start px-12 md:px-24'
            }`}>
              <div className={`text-white max-w-xl transition-all duration-1000 ${
                currentImageIndex === index 
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

        {/* Logo et titre principal */}
        <div className={`absolute top-8 left-1/2 transform -translate-x-1/2 text-white transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h1 className="text-4xl font-light text-center">
            AUTOVENTE
          </h1>
        </div>

        {/* Indicateurs du carrousel */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentImageIndex === index ? 'w-8 bg-white' : 'w-2 bg-white/50'
              }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-white" />
        </div>
      </div>

      {/* Rest of the component remains the same */}
      {/* Categories Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-light text-center mb-16">
            NOS CATÉGORIES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Véhicules Électriques', 'Véhicules Essence', 'Scooters'].map((category) => (
              <div key={category} className="group relative h-96 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.masculin.com/wp-content/uploads/sites/2/2021/08/wey-v71-1.jpg')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-700" />
                <div className="relative h-full flex flex-col items-center justify-center text-white">
                  <h3 className="text-2xl font-light mb-4">{category}</h3>
                  <Button 
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white hover:text-black transition-all duration-300"
                    onClick={() => navigate(`/catalogue/${category.toLowerCase()}`)}
                  >
                    Explorer
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light mb-8">
              L'EXCELLENCE AU SERVICE DE VOTRE MOBILITÉ
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              Depuis plus de 20 ans, AutoVente sélectionne pour vous les meilleurs véhicules, 
              alliant performance, confort et innovation. Notre expertise vous garantit 
              une expérience d'achat unique et personnalisée.
            </p>
            <Button 
              size="lg"
              onClick={() => navigate('/contact')}
              className="bg-black text-white hover:bg-gray-800 transition-colors duration-300"
            >
              Prendre Rendez-vous
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;