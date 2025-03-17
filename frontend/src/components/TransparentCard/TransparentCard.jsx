import React from "react";
import "./TransparentCard.css"; // Link to the CSS file for styles

const TransparentCard = () => {
  return (
    <div className="transparent-card">
      <div className="one">
        <div className="text-container">
          <p className="p1">Upgrade</p>
          <p className="p2">your <span className="highlight">TECH</span></p>
          <p className="p3">Elevate Your</p>
          <p className="p4"> EXPERIENCE</p>
        </div>


        <img src='/111.jpg' alt="Card Image" className="card-image" />

      </div>
      <div className="two">
        <img src='/all.jpg' alt="Card Image" className="card-image2" />
        <div className="card-content">
          <p className="card-description">EXPLORE THE FUTURE</p>
        </div>
      </div>
    </div>
  );
};

export default TransparentCard;
