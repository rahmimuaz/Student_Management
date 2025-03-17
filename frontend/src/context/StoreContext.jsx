import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    // Load cart from localStorage when initializing state
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cartItems");
        return savedCart ? JSON.parse(savedCart) : {};
    });

    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [userId, setUserId] = useState("");

    const url = "http://localhost:5001"; // Replace with your actual backend URL

    // Save cart data to localStorage whenever cartItems change
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    // Add item to cart
    const addToCart = async (itemId, size, productName) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            const itemKey = `${itemId}-${size}`;

            if (!updatedCart[itemKey]) {
                updatedCart[itemKey] = { name: productName, size, quantity: 1 };
            } else {
                updatedCart[itemKey].quantity += 1;
            }

            return updatedCart;
        });

        if (token) {
            try {
                await axios.post(
                    `${url}/api/cart/add`,
                    { itemId, size, name: productName },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } catch (error) {
                console.error("Error adding item to cart:", error);
            }
        }
    };

    // Remove item from cart
    const removeFromCart = async (itemId, size) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            const itemKey = `${itemId}-${size}`;

            if (updatedCart[itemKey]) {
                if (updatedCart[itemKey].quantity > 1) {
                    updatedCart[itemKey].quantity -= 1;
                } else {
                    delete updatedCart[itemKey];
                }
            }
            return updatedCart;
        });

        if (token) {
            try {
                await axios.post(
                    `${url}/api/cart/remove`,
                    { itemId, size },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } catch (error) {
                console.error("Error removing item from cart:", error);
            }
        }
    };

    // Clear the cart (both in state and localStorage)
    const clearCart = () => {
        setCartItems({});
        localStorage.removeItem("cartItems");
    };

    // Fetch the product list from the API
    const fetchProductList = async () => {
        try {
            const response = await axios.get(`${url}/api/product/list`);
            setFeaturedProducts(response.data.data);
        } catch (error) {
            console.error("Error fetching product list:", error);
        }
    };

    // Load cart data from API and extract user ID
    const loadCartData = async (token) => {
        try {
            const response = await axios.post(
                `${url}/api/cart/get`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setCartItems(response.data.cartData);
            localStorage.setItem("cartItems", JSON.stringify(response.data.cartData));

            const userIdFromResponse = response.data.userId;
            setUserId(userIdFromResponse);
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    // Get total cart amount
    const getTotalCartAmount = () => {
        return Object.keys(cartItems).reduce((total, itemKey) => {
            const { quantity } = cartItems[itemKey];
            const product = featuredProducts.find((product) => product._id === itemKey.split("-")[0]);

            if (product) {
                return total + product.retailPrice * quantity;
            }
            return total;
        }, 0);
    };

    // Fetch orders placed by the logged-in user
    const fetchUserOrders = async () => {
        if (!token) return [];

        try {
            console.log("Fetching user orders...");
            const response = await axios.get(`${url}/api/orders`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("Orders fetched:", response.data.orders);
            return response.data.orders;
        } catch (error) {
            console.error("Error fetching user orders:", error.response ? error.response.data : error.message);
            return [];
        }
    };

    // Load token, userId, and cart data when the component mounts
    useEffect(() => {
        async function loadData() {
            if (token) {
                await loadCartData(token);
            }
            await fetchProductList();
        }
        loadData();
    }, [token]);

    const contextValue = {
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        fetchUserOrders,
        url,
        token,
        setToken,
        userId,
        featuredProducts,
        clearCart,
        getTotalCartAmount,
    };

    return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

export default StoreContextProvider;
