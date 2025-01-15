import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/card';
import { ChevronRight, Leaf, Timer, Shield, Users } from 'lucide-react';

const AboutPage = () => {
    const navigate = useNavigate();

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const values = [
        {
            icon: <Shield className="w-12 h-12 mb-4 text-emerald-600" />,
            title: "Transparence",
            description: "Communication claire et honnête avec nos clients"
        },
        {
            icon: <Timer className="w-12 h-12 mb-4 text-emerald-600" />,
            title: "Qualité",
            description: "Véhicules sélectionnés de la plus haute qualité"
        },
        {
            icon: <Users className="w-12 h-12 mb-4 text-emerald-600" />,
            title: "Engagement client",
            description: "Votre satisfaction est notre priorité absolue"
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section améliorée */}
            <div className="relative h-[600px] flex items-center justify-center bg-cover bg-fixed bg-center" 
                 style={{ backgroundImage: "url('/img/drive-market.png')" }}>
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40" />
                <motion.div 
                    className="relative text-center text-white px-4"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-6xl md:text-7xl font-light mb-6 tracking-tight">À Propos de DriveMarket</h1>
                    <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed">
                        Découvrez l'histoire, les valeurs et l'équipe derrière DriveMarket, 
                        votre partenaire de confiance pour l'achat de véhicules.
                    </p>
                </motion.div>
            </div>

            {/* Section Histoire avec design moderne */}
            <motion.div 
                className="py-24 bg-gray-50"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeInUp}
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-light mb-12 text-center">Notre Histoire</h2>
                        <div className="grid md:grid-cols-2 gap-12">
                            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                                <CardContent className="space-y-4">
                                    <h3 className="text-2xl font-medium mb-4">Nos Débuts</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Fondé en 2005, DriveMarket est né de la passion pour l'automobile 
                                        et de la volonté de révolutionner l'expérience d'achat de véhicules.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                                <CardContent className="space-y-4">
                                    <h3 className="text-2xl font-medium mb-4">Aujourd'hui</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        DriveMarket est devenu l'un des leaders du marché, avec des milliers 
                                        de clients satisfaits et une gamme complète de véhicules.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Section Valeurs avec cartes interactives */}
            <motion.div 
                className="py-24 bg-white"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeInUp}
            >
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl md:text-5xl font-light mb-16 text-center">Nos Valeurs</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                className="text-center p-8 rounded-xl hover:bg-gray-50 transition-colors duration-300"
                                whileHover={{ y: -5 }}
                            >
                                {value.icon}
                                <h3 className="text-xl font-medium mb-3">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Section Engagement Écologique avec design moderne */}
            <motion.div 
                className="py-24 bg-emerald-50"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeInUp}
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <Leaf className="w-16 h-16 mx-auto mb-8 text-emerald-600" />
                        <h2 className="text-4xl md:text-5xl font-light mb-8">Notre Engagement Écologique</h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Nous nous engageons à promouvoir des solutions de mobilité durables 
                            en proposant une large gamme de véhicules électriques et hybrides.
                        </p>
                        <div className="grid md:grid-cols-2 gap-8 mt-12">
                            <Card className="p-6 text-left">
                                <CardContent>
                                    <h3 className="text-xl font-medium mb-4">Réduction CO2</h3>
                                    <p className="text-gray-600">
                                        Nous travaillons activement à réduire notre empreinte carbone 
                                        et celle de nos clients.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="p-6 text-left">
                                <CardContent>
                                    <h3 className="text-xl font-medium mb-4">Technologies Propres</h3>
                                    <p className="text-gray-600">
                                        Nous encourageons l'adoption de technologies respectueuses 
                                        de l'environnement.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Section Partenaires améliorée */}
            <div className="py-24 bg-gray-900 text-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl md:text-5xl font-light text-center mb-16">
                        Nos Partenaires
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center max-w-4xl mx-auto">
                        {[
                            '/img/part-jetour.png',
                            '/img/part-kia.png',
                            '/img/part-mercedes.webp',
                            '/img/part-toyota.png',
                        ].map((logo, index) => (
                            <motion.div
                                key={index}
                                className="flex items-center justify-center"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <img 
                                    src={logo} 
                                    alt={`Partner ${index + 1}`} 
                                    className="h-20 grayscale hover:grayscale-0 transition-all duration-300" 
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Call-to-Action amélioré */}
            <motion.div 
                className="py-24 bg-gradient-to-r from-gray-900 to-gray-800 text-white"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeInUp}
            >
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-light mb-8">
                        Prêt à Trouver Votre Véhicule Idéal ?
                    </h2>
                    <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                        Que vous cherchiez une voiture électrique, un scooter ou un véhicule essence, 
                        notre équipe est là pour vous guider à chaque étape.
                    </p>
                    <motion.div whileHover={{ scale: 1.05 }}>
                        <Button
                            size="lg"
                            onClick={() => navigate('/contact')}
                            className="bg-white text-gray-900 hover:bg-gray-100 transition-colors duration-300 px-8 py-6 text-lg group"
                        >
                            Nous Contacter
                            <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default AboutPage;