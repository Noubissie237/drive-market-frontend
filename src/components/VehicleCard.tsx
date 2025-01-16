import React from 'react';
import { Card, CardContent, Button } from './ui';
import { Vehicle, } from '../types/vehicle';

interface VehicleCardProps {
    vehicle: Vehicle;
    onConsult: () => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onConsult }) => {
    return (
        <Card
            key={vehicle.id}
            className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 bg-white/90 backdrop-blur-lg rounded-xl"
        >
            <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-100 h-56 overflow-hidden">
                        <img
                            src={vehicle.images[0]?.url || ""}
                            alt={vehicle.name}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-6 flex-grow">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-light mb-2 group-hover:text-black transition-colors">
                                    {vehicle.name}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {vehicle.specifications}
                                </p>
                            </div>
                            <p className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                                {vehicle.price.toLocaleString('fr-FR')} XAF
                            </p>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {vehicle.options.map((option: any) => (
                                <span
                                    key={option.id}
                                    className="px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors duration-300"
                                >
                                    {option.name}
                                </span>
                            ))}
                        </div>
                        {/* Bouton "Consulter" */}
                        <div className="mt-6">
                            <Button
                                className="w-full bg-black hover:bg-gray-800 transition-colors duration-300 py-3 rounded-xl shadow-lg hover:shadow-xl text-sm"
                                onClick={() => {
                                    onConsult
                                }}
                            >
                                Consulter
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default VehicleCard;