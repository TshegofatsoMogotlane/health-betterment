import React from 'react';
import "./Card.css";

const Card = ({ src, title, description, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <img src={src} alt='' />
      <div className="card_info">
        <h2>{title}</h2>
        <h4>{description}</h4>
      </div>
    </div>
  );
};

export default Card;
