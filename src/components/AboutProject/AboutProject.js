import React from "react";

function AboutProject() {
  return (
    <section className="aboutProject" id="aboutProject">
      <h2 className="aboutProject__title">О проекте</h2>
      <div className="aboutProject__box">
        <h3 className="aboutProject__boxtitle">
          Дипломный проект включал 5 этапов
        </h3>
        <p className="aboutProject__boxtext">
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.
        </p>
      </div>
      <div className="aboutProject__box">
        <h3 className="aboutProject__boxtitle">
          На выполнение диплома ушло 5 недель
        </h3>
        <p className="aboutProject__boxtext">
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
          соблюдать, чтобы успешно защититься.
        </p>
      </div>
      <div className="aboutProject__timeline">
        <div className="aboutProject__timeline_backend">
          <h3 className="aboutProject__timeline_backend-title">1 неделя</h3>
          <p className="aboutProject__timeline_text">Back-end</p>
        </div>
        <div className="aboutProject__timeline_frontend">
          <h3 className="aboutProject__timeline_frontend-title">4 недели</h3>
          <p className="aboutProject__timeline_text">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
