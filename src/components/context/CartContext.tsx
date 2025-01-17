import React, { createContext, useContext, useEffect, useState } from 'react';
import { useMutation, useQuery, useApolloClient } from '@apollo/client';
// import { Vehicle } from '../../types/vehicle';
import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, CLEAR_CART, GET_CART_ITEMS, UPDATE_QUANTITY } from '../../api/cartApi';
import { decodeToken } from './AuthContext';
import { Vehicle } from '../../types/vehicle';

// interface Vehicle {
//     id: string;
//     productName: string;
//     price: number;
//     stock: number;
//     // status: VehicleStatus;
//     specifications: string;
//     // type: VehiculeType;
//     // propulsion: PropulsionTyp;
//     images: VehicleImage[];
//     // options: VehicleOption[];
//     // selectedOptions?: Array<{ id: string; name: string; price: number }>;
// }

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
    useEffect(() => {
        if (userId) {
            const fetchCartItems = async () => {
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

            fetchCartItems();
        }
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
            const { data } = await addItemToCartMutation({
                variables: { customerId: userId, itemInput: itemInput },
                context: { service: 'cart' },
            });

            if (data.addItemToCart) {
                // Recharger les données du panier depuis le serveur
                const { data: cartData } = await client.query({
                    query: GET_CART_ITEMS,
                    variables: { customerId: userId },
                    context: { service: 'cart' },
                });

                if (cartData && cartData.getCartItems) {
                    const cartItems = cartData.getCartItems.map((item: any) => ({
                        vehicle: {
                            id: vehicle.id,
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
            }
        } catch (err) {
            console.error('Erreur lors de l\'ajout au panier :', err);
        }
    };

    const removeFromCart = async (vehicleId: string) => {
        if (!userId) return;

        const { data } = await removeItemFromCartMutation({
            variables: { customerId: userId, itemId: vehicleId },
            context: { service: 'cart' },
        });

        if (data.removeItemFromCart) {
            setCart(prevCart => prevCart.filter(item => item.vehicle.id !== vehicleId));
        }
    };

    const updateQuantity = async (vehicleId: string, newQuantity: number) => {
        if (newQuantity < 1 || !userId) return;

        const { data } = await updateQuantityItemFromCartMutation({
            variables: { customerId: userId, itemId: vehicleId, newQuantity: newQuantity },
            context: { service: 'cart' },
        });

        if (data.updateQuantity) {
            setCart(prevCart =>
                prevCart.map(item =>
                    item.vehicle.id === vehicleId
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );
        }


        // if (newQuantity < 1 || !userId) return;

        // setCart(prevCart =>
        //     prevCart.map(item =>
        //         item.vehicle.id === vehicleId
        //             ? { ...item, quantity: newQuantity }
        //             : item
        //     )
        // );
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