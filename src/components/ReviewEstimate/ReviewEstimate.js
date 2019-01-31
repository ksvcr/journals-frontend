import React, { Component } from 'react';
import PropTypes from 'prop-types';

import List from '~/components/List/List';
import Radio from '~/components/Radio/Radio';

import './review-estimate.scss';

class ReviewEstimate extends Component {
  handleRadioCheck = (event) => {
    const { onChange } = this.props;
    let { name, value } = event.target;
    value = parseInt(value, 10);
    onChange && onChange(name, value);
  };

  renderEstimateRadio = (value) => (data) => {
    const { disabled, values } = this.props;
    const checked = values && values[data.id] === value;
    return (
      <div className="review-estimate__radio">
        <Radio disabled={ disabled } name={ data.id } checked={ checked }
               value={ value } onChange={ this.handleRadioCheck } />
      </div>
    );
  };

  get estimateFields() {
    return [
      {
        id: 'estimate_actual_problem',
        title: 'Рассматриваемая в статье научная проблема является актуальной'
      },
      {
        id: 'estimate_sci_style',
        title: 'Статья профессионально и грамотно написана, изложение соответствует научному стилю'
      },
      {
        id: 'estimate_methods_conformity',
        title: 'Используемые методы и подходы соответствуют целям и задачам исследования'
      },
      {
        id: 'estimate_sci_novelty',
        title: 'Статья имеет научную новизну, а результаты значимы'
      },
      {
        id: 'estimate_citation_actuality',
        title: 'Цитируемая в статье литература актуальна и в достаточной степени отражает современное состояние рассматриваемой в работе проблемы'
      }
    ];
  }

  get estimateProps() {
    const radioCellStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    };

    return {
      data: this.estimateFields,
      head: true,
      cells: [
        {
          style: {
            width: '25%'
          },
          head: () => 'Ваше мнение о статье',
          render: (data) => <p className="review-estimate__title">{ data.title }</p>
        },
        {
          style: {
            width: '13%',
            ...radioCellStyle
          },
          head: () => 'Не согласен',
          render: this.renderEstimateRadio(1)
        },
        {
          style: {
            width: '20%',
            ...radioCellStyle
          },
          head: () => 'Скорее не согласен',
          render: this.renderEstimateRadio(2)
        },
        {
          style: {
            width: '12%',
            ...radioCellStyle
          },
          head: () => 'Нейтрален',
          render: this.renderEstimateRadio(3)
        },
        {
          style: {
            width: '20%',
            ...radioCellStyle
          },
          head: () => 'Скорее согласен',
          render: this.renderEstimateRadio(4)
        },
        {
          style: {
            width: '10%',
            ...radioCellStyle
          },
          head: () => 'Согласен',
          render: this.renderEstimateRadio(5)
        }
      ]
    };
  }

  render() {
    return (
      <div className="review-estimate">
        <List { ...this.estimateProps } />
      </div>
    );
  }
}

ReviewEstimate.propTypes = {
  values: PropTypes.shape({
    estimate_actual_problem: PropTypes.number,
    estimate_sci_style: PropTypes.number,
    estimate_methods_conformity: PropTypes.number,
    estimate_sci_novelty: PropTypes.number,
  }),
  disabled: PropTypes.bool,
  onChange: PropTypes.func
};

export default ReviewEstimate;
