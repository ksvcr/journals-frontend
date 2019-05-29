import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';

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
    const name = values ? `${data.id}-${values.id}` : data.id;

    return (
      <div className="review-estimate__radio">
        <Radio disabled={ disabled } name={ name } checked={ checked }
               value={ value } onChange={ this.handleRadioCheck } />
      </div>
    );
  };

  get estimateFields() {
    const { t } = this.props;
    return [
      {
        id: 'estimate_actual_problem',
        title: t('estimate_actual_problem')
      },
      {
        id: 'estimate_sci_style',
        title: t('estimate_sci_style')
      },
      {
        id: 'estimate_methods_conformity',
        title: t('estimate_methods_conformity')
      },
      {
        id: 'estimate_sci_novelty',
        title: t('estimate_sci_novelty')
      },
      {
        id: 'estimate_citation_actuality',
        title: t('estimate_citation_actuality')
      }
    ];
  }

  get estimateProps() {
    const { t } = this.props;

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
          head: () => t('your_opinion'),
          render: (data) => <p className="review-estimate__title">{ data.title }</p>
        },
        {
          style: {
            width: '13%',
            ...radioCellStyle
          },
          head: () => t('disagree'),
          render: this.renderEstimateRadio(1)
        },
        {
          style: {
            width: '20%',
            ...radioCellStyle
          },
          head: () => t('rather_disagree'),
          render: this.renderEstimateRadio(2)
        },
        {
          style: {
            width: '12%',
            ...radioCellStyle
          },
          head: () => t('neutral'),
          render: this.renderEstimateRadio(3)
        },
        {
          style: {
            width: '20%',
            ...radioCellStyle
          },
          head: () => t('rather_agree'),
          render: this.renderEstimateRadio(4)
        },
        {
          style: {
            width: '10%',
            ...radioCellStyle
          },
          head: () => t('agree'),
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

ReviewEstimate = withNamespaces()(ReviewEstimate);

export default ReviewEstimate;
