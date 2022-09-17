import React from "react";

function Techs() {
  return (
    <section className="techs" id="techs">
      <h2 className="techs__title">Технологии</h2>
      <div className="techs__box">
        <h3 className="techs__boxtitle">7 технологий</h3>
        <p className="techs__boxtext">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <div className="techs__cards">
          <div className="techs__cards_card">
            <p className="techs__cards_text">HTML</p>
          </div>
          <div className="techs__cards_card">
            <p className="techs__cards_text">CSS</p>
          </div>
          <div className="techs__cards_card">
            <p className="techs__cards_text">JS</p>
          </div>
          <div className="techs__cards_card">
            <p className="techs__cards_text">React</p>
          </div>
          <div className="techs__cards_card">
            <p className="techs__cards_text">Git</p>
          </div>
          <div className="techs__cards_card">
            <p className="techs__cards_text">Express.js</p>
          </div>
          <div className="techs__cards_card">
            <p className="techs__cards_text">mongoDB</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Techs;
