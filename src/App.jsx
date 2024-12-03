import React, { useState } from "react";
import PieChart from "./PieChart"; // Import the PieChart component
import "./App.css";

// Sample Product Data
const products = [
  {
    id: 1,
    name: "Eco-Friendly Water Bottle",
    productLink:
      "https://www.amazon.com/eco-friendly-water-bottle/dp/B08XYZ1234",
    carbonFootprint: 0.5, // kg CO₂
    waterUsage: 0.3, // liters
    energyEfficiency: 0.1, // kWh
    recyclability: 100, // %
    ecoScore: 90, // out of 100
    suggestions: [
      "Consider using biodegradable materials for packaging.",
      "Encourage customers to recycle the product after use.",
    ],
  },
  {
    id: 2,
    name: "Sustainable Bamboo Toothbrush",
    productLink:
      "https://www.amazon.com/sustainable-bamboo-toothbrush/dp/B08XYZ5678",
    carbonFootprint: 0.2, // kg CO₂
    waterUsage: 0.1, // liters
    energyEfficiency: 0.05, // kWh
    recyclability: 80, // %
    ecoScore: 85, // out of 100
    suggestions: [
      "Encourage customers to dispose of the toothbrush responsibly.",
      "Consider offering refillable options to reduce waste.",
    ],
  },
];

function App() {
  const [productLink, setProductLink] = useState("");
  const [productData, setProductData] = useState(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackList, setFeedbackList] = useState([]); // State for feedback list

  const handleLinkChange = (e) => {
    setProductLink(e.target.value);
  };

  const handleCheckEcoScore = () => {
    const product = products.find(
      (product) => product.productLink === productLink
    );
    if (product) {
      setProductData(product);
    } else {
      alert("Product not found or invalid link.");
    }
  };

  const toggleSidePanel = () => {
    setIsSidePanelOpen(!isSidePanelOpen);
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();

    if (!feedback) {
      alert("Feedback cannot be empty.");
      return;
    }

    const feedbackData = {
      name: "Anonymous", // Replace with user name if you collect it
      feedback,
      timestamp: new Date().toLocaleString(), // Add timestamp
    };

    try {
      const response = await fetch("http://localhost:5000/submit-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });

      if (response.ok) {
        alert("Feedback submitted successfully!");
        setFeedbackList([...feedbackList, feedbackData]); // Update feedback list
        setFeedback(""); // Clear textarea
      } else {
        alert("Failed to submit feedback.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="App">
      {/* Side Panel */}
      <div className={`side-panel ${isSidePanelOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleSidePanel}>
          &times;
        </button>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li>
            <a href="https://www.amazon.com" target="_blank" rel="noopener noreferrer">
              Go to Amazon.com
            </a>
          </li>
          <li>
            <a href="https://www.amazon.in" target="_blank" rel="noopener noreferrer">
              Go to Amazon.in
            </a>
          </li>
        </ul>
      </div>

      {/* Header */}
      <div className="header">
        <button className="menu-btn" onClick={toggleSidePanel}>
          ☰
        </button>
        <div className="header-content">
          <img src="src/changed logo.png" alt="Amazon Logo" className="logo" />
          <h1>EarthMark</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container">
        <div className="input-section">
          <input
            type="text"
            placeholder="Paste product link"
            value={productLink}
            onChange={handleLinkChange}
          />
          <button onClick={handleCheckEcoScore}>Check EcoScore</button>
        </div>

        {productData && (
          <div className="score-display">
            <h2>{productData.name}</h2>
            <p>
              <strong>EcoScore: </strong>
              {productData.ecoScore}%
            </p>
            <p>
              <strong>Carbon Footprint: </strong>
              {productData.carbonFootprint} kg CO₂
            </p>
            <p>
              <strong>Water Usage: </strong>
              {productData.waterUsage} liters
            </p>
            <p>
              <strong>Energy Efficiency: </strong>
              {productData.energyEfficiency} kWh
            </p>
            <p>
              <strong>Recyclability: </strong>
              {productData.recyclability}%
            </p>

            {/* Render the Pie Chart dynamically */}
            <PieChart productData={productData} />

            {/* Suggestions below lifecycle chart */}
            <div className="insights">
              <h3>Suggestions:</h3>
              <ul>
                {productData.suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Community Feedback Section */}
        <div className="community-section">
          <h3>Community Feedback</h3>
          <textarea
            placeholder="Leave a review or suggestion"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>
          <button className="fbutton" onClick={handleSubmitFeedback}>
            Submit your feedback
          </button>

          {/* Display Feedback List */}
          {feedbackList.length > 0 && (
            <div className="feedback-list">
              <h4>Submitted Reviews:</h4>
              <div className="feedback-cards">
                {feedbackList.map((item, index) => (
                  <div className="feedback-card" key={index}>
                    <div className="feedback-header">
                      <span className="avatar">{item.name[0]}</span>
                      <strong>{item.name}</strong>
                    </div>
                    <p className="feedback-content">{item.feedback}</p>
                    <p className="feedback-timestamp">{item.timestamp}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <p>&copy; 2024 EcoScore Checker. All rights reserved.</p>
      </div>
    </div>
  );
}

export default App;
