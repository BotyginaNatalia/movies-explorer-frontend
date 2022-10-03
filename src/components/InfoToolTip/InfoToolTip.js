import React from "react";

function InfoToolTip({ name, isOpen, image, title, onClose }) {
  return (
    <div className={`popup popup_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__main">
        <button
          className={`popup__close-button popup__close-button_${name}`}
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <form className="popup__tool-container">
          <img className="popup__img-message" src={image} alt={title} />
          <h2 className="popup__text">{title}</h2>
        </form>
      </div>
    </div>
  );
}

export default InfoToolTip;
