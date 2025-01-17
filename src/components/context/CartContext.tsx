import React, { createContext, useContext, useEffect, useState } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, CLEAR_CART, GET_CART_ITEMS, UPDATE_QUANTITY } from '../../api/cartApi';
import { decodeToken } from './AuthContext';
import { Vehicle } from '../../types/vehicle';

interface CartItem {
    vehicle: Vehicle & { selectedOptions?: Array<{ id: string; name: string; price: number }> };
    quantity: number;
    image: string;
}

interface CartContextType {
    cart: CartItem[];
    setCart: (cart: CartItem[]) => void;
    addToCart: (vehicle: Vehicle & { selectedOptions?: Array<{ id: string; name: string; price: number }> }) => void;
    removeFromCart: (vehicleId: string) => void;
    updateQuantity: (vehicleId: string, newQuantity: number) => void;
    getTotalPrice: () => number;
    getTotalItems: () => number;
    handleClearCart: () => void;
    loading: boolean;
    error: any;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const client = useApolloClient();

    // Charger le panier depuis le localStorage au démarrage
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Sauvegarder le panier dans le localStorage à chaque mise à jour
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Récupérer l'ID de l'utilisateur depuis le token
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = decodeToken(token);
            if (decodedToken && decodedToken.id) {
                setUserId(decodedToken.id);
            }
        }
    }, []);

    // Charger les articles du panier depuis le backend
    const fetchCartItems = async () => {
        if (!userId) return;

        setLoading(true);
        try {
            const { data } = await client.query({
                query: GET_CART_ITEMS,
                variables: { customerId: userId },
                context: { service: 'cart' },
            });

            if (data && data.getCartItems) {
                const cartItems = data.getCartItems.map((item: any) => ({
                    vehicle: {
                        id: item.id,
                        productName: item.productName,
                        price: item.price,
                        image: item.image,
                        selectedOptions: item.options.map((opt: any) => ({
                            id: opt.id,
                            name: opt.name,
                            price: parseFloat(opt.value),
                        })),
                    },
                    quantity: item.quantity,
                }));
                setCart(cartItems);
            }
        } catch (err) {
            setError(err);
            console.error('Erreur lors du chargement du panier :', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, [userId, client]);

    const [addItemToCartMutation] = useMutation(ADD_ITEM_TO_CART);
    const [removeItemFromCartMutation] = useMutation(REMOVE_ITEM_FROM_CART);
    const [updateQuantityItemFromCartMutation] = useMutation(UPDATE_QUANTITY);
    const [clearCartMutation] = useMutation(CLEAR_CART);

    const addToCart = async (vehicle: Vehicle & { selectedOptions?: Array<{ id: string; name: string; price: number }> }) => {
        if (!userId) return;

        const itemInput = {
            productName: vehicle.name,
            price: vehicle.price,
            quantity: 1,
            image: vehicle.images[0].url,
            options: vehicle.selectedOptions?.map(opt => opt.name) || [],
        };

        try {
            await addItemToCartMutation({
                variables: { customerId: userId, itemInput: itemInput },
                context: { service: 'cart' },
            });
            await fetchCartItems(); // Recharger le panier après l'ajout
        } catch (err) {
            console.error('Erreur lors de l\'ajout au panier :', err);
        }
    };

    const handleClearCart = async () => {
        if (!userId) return;

        try {
            await clearCartMutation({
                variables: { customerId: userId },
                context: { service: 'cart' },
            });
            setCart([]); // Vider le panier local
        } catch (err) {
            console.error('Erreur lors de la suppression du panier :', err);
        }
    };

    const removeFromCart = async (vehicleId: string) => {
        if (!userId) return;

        try {
            await removeItemFromCartMutation({
                variables: { customerId: userId, itemId: vehicleId },
                context: { service: 'cart' },
            });
            await fetchCartItems(); // Recharger le panier après la suppression
        } catch (err) {
            console.error('Erreur lors de la suppression du panier :', err);
        }
    };

    const updateQuantity = async (vehicleId: string, newQuantity: number) => {
        if (newQuantity < 1 || !userId) return;

        try {
            await updateQuantityItemFromCartMutation({
                variables: { customerId: userId, itemId: vehicleId, newQuantity: newQuantity },
                context: { service: 'cart' },
            });
            await fetchCartItems(); // Recharger le panier après la mise à jour
        } catch (err) {
            console.error('Erreur lors de la mise à jour de la quantité :', err);
        }
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => {
            const vehiclePrice = item.vehicle.price * item.quantity;
            const optionsPrice = item.vehicle.selectedOptions?.reduce((sum, option) => sum + option.price, 0) || 0;
            return total + vehiclePrice + optionsPrice;
        }, 0);
    };

    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{
            cart,
            setCart,
            addToCart,
            removeFromCart,
            updateQuantity,
            getTotalPrice,
            getTotalItems,
            handleClearCart,
            loading,
            error,
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