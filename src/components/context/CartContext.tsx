import React, { createContext, useContext, useState } from 'react';
import { Vehicle } from '../../types/vehicle';

interface CartItem {
    vehicle: Vehicle & { selectedOptions?: Array<{ id: string; name: string; price: number }> };
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (vehicle: Vehicle & { selectedOptions?: Array<{ id: string; name: string; price: number }> }) => void;
    removeFromCart: (vehicleId: string) => void;
    updateQuantity: (vehicleId: string, newQuantity: number) => void;
    getTotalPrice: () => number;
    getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (vehicle: Vehicle & { selectedOptions?: Array<{ id: string; name: string; price: number }> }) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.vehicle.id === vehicle.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.vehicle.id === vehicle.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevCart, { vehicle, quantity: 1 }];
        });
    };

    const removeFromCart = (vehicleId: string) => {
        setCart(prevCart => prevCart.filter(item => item.vehicle.id !== vehicleId));
    };

    const updateQuantity = (vehicleId: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        setCart(prevCart =>
            prevCart.map(item =>
                item.vehicle.id === vehicleId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => {
            // Prix de base du véhicule multiplié par la quantité
            const vehiclePrice = item.vehicle.price * item.quantity;

            // Prix des options sélectionnées (non multiplié par la quantité)
            const optionsPrice = item.vehicle.selectedOptions?.reduce((sum, option) => sum + option.price, 0) || 0;

            // Total pour ce véhicule : (prix de base * quantité) + prix des options
            return total + vehiclePrice + optionsPrice;
        }, 0);
    };

    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            getTotalPrice,
            getTotalItems
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};