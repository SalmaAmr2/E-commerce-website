import { Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./Components/NavBar";
import HomePage from "./Pages/Home";
import Products from "./Pages/Products";
import Cart from "./Pages/Cart";
import ProductDetails from "./Pages/ProductDetails";
import { useState, useEffect } from "react";
import Checkout from "./Pages/Checkout";
import './App.css'; 
function App() {
  const clearCart = () => setCartItems([]);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("myCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("myCart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(item => item.id === product.id);

      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter(item => item.id !== id));
  };

  return (
    <>
      <NavBar
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
      />

      <Routes>
        <Route
          path="/"
          element={<HomePage addToCart={addToCart} cartItems={cartItems} />}
        />

        <Route
          path="/home"
          element={<HomePage addToCart={addToCart} cartItems={cartItems} />}
        />

        <Route
          path="/products"
          element={<Products addToCart={addToCart} cartItems={cartItems} />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails addToCart={addToCart} cartItems={cartItems} />}
        />

        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              addToCart={addToCart}
              decreaseQuantity={decreaseQuantity}
              removeFromCart={removeFromCart}
            />
          }
        />


        <Route path="*" element={<Navigate to="/" />} />

        <Route
          path="/checkout"
          element={<Checkout cartItems={cartItems} clearCart={clearCart} />}
        />
      </Routes>
    </>
  );
}

export default App;