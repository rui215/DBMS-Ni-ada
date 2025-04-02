import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage"; 
import ProductDali from "./components/ProductDali";
import Inventory from "./components/Inventory";

function App() {
  const [stock, setStock] = useState({
    1: 50,
    2: 50,
    3: 50,
    4: 50,
    5: 50,
    6: 50,
    7: 50,
    8: 50,
    9: 50,
  });

  const updateStock = (cart) => {
    setStock((prevStock) => {
      const newStock = { ...prevStock };
      cart.forEach((item) => {
        if (newStock[item.id] >= item.quantity) {
          newStock[item.id] -= item.quantity; 
        } else {
          console.log(`Not enough stock for item ${item.id}`);
          
        }
      });
      return newStock;
    });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} /> 
        <Route path="/shop" element={<ProductDali stock={stock} updateStock={updateStock} />} />
        <Route path="/inventory" element={<Inventory stock={stock} />} />
      </Routes>
    </Router>
  );
}

export default App;

