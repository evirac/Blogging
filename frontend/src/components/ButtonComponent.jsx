import React from "react";
import "../sass/ButtonComponent.scss";

const ButtonComponent = ({ children, inverted = false, onClick }) => {
  return (
    <button
      className={`custom-button ${inverted ? "inverted" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
