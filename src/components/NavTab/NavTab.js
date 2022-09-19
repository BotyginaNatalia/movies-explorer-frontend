import React from "react";

function NavTab() {
  return (
    <section className="navTab">
      <nav className="navTab__box">
        <a href="#aboutProject" className="navTab__link">
          О проекте
        </a>
        <a href="#techs" className="navTab__link">
          Технологии
        </a>
        <a href="#aboutMe" className="navTab__link">
          Студент
        </a>
      </nav>
    </section>
  );
}

export default NavTab;
