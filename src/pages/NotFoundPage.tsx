import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Home, Search, ChevronLeft, Car } from 'lucide-react';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center p-4 overflow-hidden">
      <div className="max-w-3xl w-full relative">
        {/* Voiture qui traverse l'écran */}
        <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 animate-[carDrive_15s_linear_infinite]">
          <Car
            size={60}
            className="text-blue-600 "
          />
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center relative overflow-hidden
                      animate-[fadeIn_0.5s_ease-out]">
          {/* Nuages animés en arrière-plan */}
          <div className="absolute top-10 left-10 w-20 h-8 bg-slate-100 rounded-full 
                         animate-[cloudFloat_6s_ease-in-out_infinite]" />
          <div className="absolute top-20 right-10 w-16 h-6 bg-slate-100 rounded-full 
                         animate-[cloudFloat_8s_ease-in-out_infinite]" />

          {/* Route avec lignes */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-slate-800">
            <div className="h-2 bg-yellow-400 absolute top-1/2 left-0 right-0 transform -translate-y-1/2 
                          opacity-50 [background-size:20px_100%]
                          [background-image:linear-gradient(to_right,transparent_50%,white_50%)]
                          animate-[roadMove_1s_linear_infinite]" />
          </div>

          <div className="relative animate-[slideUp_0.5s_ease-out]">
            <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600 mb-6 
                         animate-[titlePulse_3s_ease-in-out_infinite] hover:scale-105 transition-transform">
              404
            </h1>

            <div className="space-y-6 mb-12">
              <h2 className="text-2xl font-bold text-slate-800 opacity-0 animate-[fadeIn_0.5s_ease-out_0.3s_forwards]">
                Oups ! Cette route ne mène nulle part
              </h2>

              <p className="text-slate-600 max-w-lg mx-auto opacity-0 animate-[fadeIn_0.5s_ease-out_0.6s_forwards]">
                Comme un GPS qui vous emmène dans une impasse, cette page n'existe pas.
                Mais ne vous inquiétez pas, nous avons d'autres véhicules à vous faire découvrir !
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 opacity-0 animate-[fadeIn_0.5s_ease-out_0.9s_forwards]">
                <Button
                  onClick={() => navigate('/')}
                  className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 
                           text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 
                           transition-all duration-200 font-medium flex items-center justify-center gap-2 px-6 py-3
                           animate-[buttonBounce_2s_ease-in-out_infinite]"
                >
                  <Home className="h-5 w-5" />
                  Retour à l'accueil
                </Button>

                <Button
                  onClick={() => navigate('/catalogue')}
                  className="bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950
                           text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 
                           transition-all duration-200 flex items-center justify-center gap-2 px-6 py-3"
                >
                  <Search className="h-5 w-5" />
                  Rechercher un véhicule
                </Button>

                <Button 
                  onClick={() => navigate(-1)}
                  variant="outline"
                  className="border-2 hover:bg-slate-50 transform hover:-translate-y-0.5 
                           transition-all duration-200 flex items-center justify-center gap-2 px-6 py-3"
                >
                  <ChevronLeft className="h-5 w-5" />
                  Page précédente
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Effet d'ombre portée */}
        <div className="h-4 w-full bg-gradient-to-b from-slate-200/50 to-transparent rounded-full blur-xl mt-8" />
      </div>
    </div>
  );
};

export default NotFoundPage;