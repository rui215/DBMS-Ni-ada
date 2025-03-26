import React from "react";
import "./DaliHome.css";

const DaliHome = () => {
  return (
    <div className="dali-container">
      <img src="your-logo.png" alt="DALI Everyday Grocery Logo" className="dali-logo" />

      <p className="dali-description">
        At <strong>DALI Everyday Grocery</strong>, we make everyday shopping easy, affordable, and
        convenient for every Filipino family. Get high-quality food and non-food essentials at the lowest
        possible prices—helping you stretch your budget while maintaining the best for your home. Start shopping
        today and enjoy great savings. Because at DALI, we don’t just sell groceries—we help you live better every day!
      </p>

      <h2 className="dali-cta">Shop Smart, Save More with DALI Everyday Grocery</h2>

      <a href="/inventory" className="dali-button">🛒 Shop now and save big!</a>
    </div>
  );
};

export default DaliHome;

.dali-container {
  text-align: center;
  background-color: pink;
  padding: 50px;
  min-height: 100vh;
}

.dali-logo {
  width: 200px;
  margin-bottom: 20px;
}

.dali-description {
  font-size: 18px;
  color: #333;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.5;
}

.dali-cta {
  margin-top: 30px;
  font-size: 22px;
  color: #d81b60;
  font-weight: bold;
}

.dali-button {
  display: inline-block;
  background-color: #ff4081;
  color: white;
  font-size: 18px;
  padding: 12px 24px;
  margin-top: 20px;
  text-decoration: none;
  border-radius: 8px;
  transition: background 0.3s;
}

.dali-button:hover {
  background-color: #e91e63;
    }
