import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./productdali.css";

const products = [
  { id: 1, name: "Gonutt", price: 15.0, image: "gonutt.jpg" },
  { id: 2, name: "Chips", price: 10.0, image: "Chips.jpg" },
  { id: 3, name: "Mi Goreng", price: 25.0, image: "Instant.jpg" },
  { id: 4, name: "Kopi Juan", price: 30.0, image: "kape.jpg" },
  { id: 5, name: "Mega Sardines", price: 20.0, image: "sardines.jpg" },
  { id: 6, name: "Toyo", price: 12.0, image: "soy.jpg" },
  { id: 7, name: "Choco Biscuit", price: 18.0, image: "Biscuit.jpg" },
  { id: 8, name: "Milk", price: 22.0, image: "milk.jpg" },
  { id: 9, name: "Mentos", price: 35.0, image: "candy.jpg" },
];

const ProductDali = ({ stock, updateStock }) => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [payment, setPayment] = useState("");
  const [change, setChange] = useState(0);
  const navigate = useNavigate();

  const addToCart = (product) => {
    if (stock[product.id] > 0) {
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === product.id);
        if (existingItem) {
          return prevCart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          return [...prevCart, { ...product, quantity: 1 }];
        }
      });
    } else {
      alert("Out of stock!");
    }
  };

  const updateCartItem = (productId, change) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(1, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0);
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    const total = parseFloat(calculateTotal());
    const paymentAmount = parseFloat(payment);

    if (paymentAmount >= total) {
      setChange(paymentAmount - total);
      updateStock(cart);
      setCart([]);
      setPayment("");
      alert("Purchase successful!");
    } else {
      setChange("Not enough!");
    }
  };

  return (
    <div>
      <header>
        <h2>Items</h2>
        <div className="header-right">
          <button className="inventory-btn" onClick={() => navigate("/inventory")}>
            Inventory
          </button>
          <div className="cart-container" onClick={() => setShowCart(!showCart)}>
            <span className="cart-icon">🛒</span>
            <span className="cart-count">{cart.length}</span>
          </div>
        </div>
      </header>

      <section className="products-section">
        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={`/images/${product.image}`} alt={product.name} />
              <p>₱{product.price.toFixed(2)}</p>
              <p>Stock: {stock[product.id]}</p>
              <button className="buy-btn" onClick={() => addToCart(product)} disabled={stock[product.id] === 0}>
                {stock[product.id] > 0 ? "Add to cart" : "Out of stock"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {showCart && (
        <div className="cart-popup show">
          <h3>Cart</h3>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="cart-items">
              {cart.map((item) => (
                <li key={item.id}>
                  {item.name} - ₱{(item.price * item.quantity).toFixed(2)}
                  <div className="cart-controls">
                    <button className="qty-btn" onClick={() => updateCartItem(item.id, 1)}>+</button>
                    <span>{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateCartItem(item.id, -1)}>-</button>
                    <button className="cancel-btn" onClick={() => removeFromCart(item.id)}>❌</button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <p><strong>Total: ₱{calculateTotal()}</strong></p>

          <label>Payment: </label>
          <input 
            type="number" 
            value={payment} 
            onChange={(e) => setPayment(e.target.value)} 
            placeholder="Enter amount"
          />

          <p>Change: ₱{change}</p>

          <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default ProductDali;