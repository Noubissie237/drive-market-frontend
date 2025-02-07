import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactPage = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // La logique arrive
    };

    const contactInfo = [
        {
            icon: <Phone className="w-8 h-8 text-emerald-600" />,
            title: "Téléphone",
            details: "+237 690 232 120"
        },
        {
            icon: <Mail className="w-8 h-8 text-emerald-600" />,
            title: "Email",
            details: "contact@drivemarket.com"
        },
        {
            icon: <MapPin className="w-8 h-8 text-emerald-600" />,
            title: "Adresse",
            details: "Obili, Yaoundé-Cameroun"
        }
    ];

    return (
        <div className="min-h-screen bg-white">

            {/* Contact Form Section */}
            <motion.div 
                className="py-24"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeInUp}
            >
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Contact Info Cards */}
                        <div className="space-y-6">
                            <h2 className="text-4xl font-light mb-8">Nos Coordonnées</h2>
                            {contactInfo.map((info, index) => (
                                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                                    <CardContent className="p-6 flex items-start space-x-4">
                                        {info.icon}
                                        <div>
                                            <h3 className="text-xl font-medium mb-2">{info.title}</h3>
                                            <p className="text-gray-600">{info.details}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Contact Form */}
                        <div>
                            <h2 className="text-4xl font-light mb-8">Envoyez-nous un Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Nom</label>
                                        <Input required placeholder="Votre nom" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Email</label>
                                        <Input required type="email" placeholder="votre@email.com" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Sujet</label>
                                    <Input required placeholder="Sujet de votre message" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Message</label>
                                    <Textarea required rows={6} placeholder="Votre message" />
                                </div>
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white group"
                                >
                                    Envoyer
                                    <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ContactPage;