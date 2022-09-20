import React from "react";
import photo from "../../images/photo.webp";

function AboutMe() {
  return (
    <section className="aboutMe" id="aboutMe">
      <h2 className="aboutMe__title">Студент</h2>
      <div className="aboutMe__box">
        <div className="aboutMe__text">
          <h3 className="aboutMe__boxtitle">Наталья</h3>
          <p className="aboutMe__boxtext">
            Начинающий фронтенд-разработчик, 32 года
          </p>
          <p className="aboutMe__boxtext">
            Живу в Санкт-Петербурге. С декабря 2021 года учусь в "Яндекс
            Практикуме" на курсе "Веб-разработчик".
          </p>
          <p className="aboutMe__boxtext">May the code be with you =^_^=.</p>
          <a
            href="https://github.com/BotyginaNatalia"
            className="aboutMe__boxtext_link"
          >
            Github
          </a>
        </div>
        <img src={photo} className="aboutMe__photo" alt="фото" />
      </div>
    </section>
  );
}

export default AboutMe;
