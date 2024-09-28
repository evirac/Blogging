import React from "react";
import { Calendar } from "lucide-react";
import "../sass/CardComponent.scss";

const CardComponent = ({ image, title, description, date }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
      <div className="card-date">
        <Calendar size={16} />
        <span>{date}</span>
      </div>
    </div>
  );
};

export default CardComponent;
