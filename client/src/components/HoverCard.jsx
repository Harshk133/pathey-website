import React from "react";
import "../HoverCard.css";

const HoverCard = ({ imageUrl, title, description, linkUrl }) => {
  return (
    <div className="hover-card">
      {/* Image */}
      <img src={imageUrl} alt={title} width={50} height={50} />

      {/* Hover Content */}
      <div className="hover-content">
        <h3 className="hover-card-title">{title}</h3>
        <p className="hover-card-description">{description}</p>
        <a href={linkUrl} target="_blank" className="hover-card-link">
          Register Here
        </a>
      </div>
    </div>
  );
};

export default HoverCard;



