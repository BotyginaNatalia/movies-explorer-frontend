import React from "react";

function NavTab() {
  return (
    <section className="navTab">
      <div className="navTab__box">
        <a href="#aboutProject" className="navTab__link">
          О проекте
        </a>
        <a href="#techs" className="navTab__link">
          Технологии
        </a>
        <a href="#aboutMe" className="navTab__link">
          Студент
        </a>
      </div>
    </section>
  );
}

export default NavTab;
