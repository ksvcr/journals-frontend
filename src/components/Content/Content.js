import React, { Component } from 'react';
import Renderer from '~/components/Renderer/Renderer';

import './content.scss';

class Content extends Component {
  renderBlocks = (blocks) => {
    return blocks.map((item, index) => (
      <div className="content__block" key={ index }>
        <h2 className="content__title">
          { `${index+1}. ${item.title}` }
        </h2>
        <Renderer raw={ item.content }/>
      </div>
    ));
  };

  renderFinancingSources = (sources) => {
    return sources.map((item, index) => (
      <li key={ index }>
        <p>{ item.organization + ', ' + item.grant_name + ', ' + item.grant_number }</p>
      </li>
    ));
  };

  render() {
    const { data } = this.props;
    const { content_blocks=[], financing_sources=[] } = data;
    return (
      <div className="content">
        { data.text_to_description &&
          <React.Fragment>
            <h2 className="content__title">
              Аннотация
            </h2>
            <p>
              { data.text_to_description }
            </p>
            { data.text_to_keywords &&
              <div className="content__keywords">
                <div className="content__keywords-title">Ключевые слова:</div>
                <div className="content__keywords-text">
                  { data.text_to_keywords }
                </div>
              </div>
            }
          </React.Fragment>
        }
        <div className="content__main">
          { this.renderBlocks(content_blocks) }
        </div>
        <div className="content__footer">
          <div className="content__additional">
            <h3>Дополнительные материалы</h3>
            <p>Не указаны</p>
          </div>
          <div className="content__financing">
            <h3>Финансирование</h3>
            { financing_sources
              ? <ul> { this.renderFinancingSources(financing_sources) } </ul>
              : <p> Авторы не получали финансовой поддержки для проведения
                исследования, написания и публикации статьи</p>
            }
          </div>
          <div className="content__thanks">
            <h3>Благодарности</h3>
            { data.thanks_text
              ? <p>{ data.thanks_text }</p>
              : <p>Не указаны</p>
            }
          </div>
          <div className="content__conflict">
            <h3>Конфликт интересов</h3>
            { data.conflict_interest
              ? <p>{ data.conflict_interest }</p>
              : <p>Не указан</p>
            }
          </div>
          <div className="content__literature">
            <h3>Список литературы</h3>
            <ul className="content__list">
              <li><p>Журавлев В.А. Влияние фосфонатов на образование кристаллических
                и аморфных фаз карбоната кальция в водных растворах / Журавлев В.А.,
                Чаусов Ф.Ф., Савинский С.С. // Журнал «С.O.K.». – 2006. – № 7. – С. 28-31</p></li>
              <li><p>Пат. 2358036 Российская Федерация, МПК C 23 F 11/00, C 09 D 5/08.
                Способ защиты от коррозии металлических поверхностей ингибированными
                полимерными композициями и микрокапсулы с ингибитором коррозии / Головин В. А.,
                Ильин А. Б., Кузнец В. Т. и др., заявитель и патентообладатель Общество
                с ограниченной ответственностью “Научно-производственное объединение РОКОР”
                – № 2007148024/02; заявл. 25.12.2007; опубл. 10.06.2009, Бюл. № 16.</p></li>
              <li><p>{ 'Головин В.А. EIS исследование ингибированных полимерных ' +
              'Zn-наполненных грунтовок в модели морской воды / Головин В.А., Добриян С.А. ' +
              '// Коррозия: материалы, защита, – 2016. – № 6. – C. 42-47'}</p></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Content;
