import React from "react";
import logo from "../../images/landing-logo.svg";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__mainbox">
        <h2 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h2>
        <img src={logo} className="promo__logo" alt="логотип" />
      </div>
    </section>
  );
}

export default Promo;
