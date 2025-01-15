import React, { createContext, useContext, useState } from 'react';
import { Vehicle } from '../../types/vehicle';
// import { useAuth } from './AuthContext';
// import { useNavigate } from 'react-router-dom';

interface CartItem {
    vehicle: Vehicle;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (vehicle: Vehicle) => void;
    removeFromCart: (vehicleId: string) => void;
    updateQuantity: (vehicleId: string, newQuantity: number) => void;
    getTotalPrice: () => number;
    getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    // const { isAuthenticated } = useAuth();
    // const navigate = useNavigate();

    const addToCart = (vehicle: Vehicle) => {

        // if (!isAuthenticated) {
        //     navigate('/login');
        // }

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
        return cart.reduce((total, item) => total + (item.vehicle.price * item.quantity), 0);
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