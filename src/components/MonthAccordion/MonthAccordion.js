import React, { PureComponent } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import * as formatDate from '~/services/formatDate';
import List from '~/components/List/List';
import './month-accordion.scss';

const fakeArticlesArray = [
  {
    id: 17,
    title: 'Проблемы восприятия молодежью сакральных и уникальных природных мест Якутии',
    date_create: '2018-10-31T20:12:22.056000+05:00',
    site: 1,
  }
];

const propTypes = {
  date: PropTypes.shape({
    isCurrent: PropTypes.bool,
    year: PropTypes.string,
    month: PropTypes.string,
    monthIndex: PropTypes.number,
  }).isRequired,
  handleToggle: PropTypes.func,
};

const defaultProps = {
  handleToggle: () => {}
};

class MonthAccordion extends PureComponent {
  state = {
    isOpen: false,
  };

  get listProps() {
    return {
      data: fakeArticlesArray,
      head: true,
      cells: [
        {
          style: {
            width: '60%'
          },
          isMain: true,
          head: () => 'Название',
          render: data => (
            <div>
              <div>{data.title || 'Название статьи не указано'}</div>
              <div>{data.site}</div>
            </div>
          )
        },
        {
          style: {
            width: '20%'
          },
          head: () => 'Выполнена',
          render: data => formatDate.toString(data['date_create'])
        },
        {
          style: {
            width: '20%'
          },
          head: () => 'Знаков',
          render: data => '12 456'
        },
      ],
    }
  }

  handleToggleClick = (e) => {
    e.preventDefault();
    this.setState({ isOpen: !this.state.isOpen });
    this.props.handleToggle();
  };

  render() {
    const { date } = this.props;
    const { isOpen } = this.state;
    const accClass = 'month-accordion';
    const accHeadClasses = cx({
      [`${accClass}__head`]: true,
      [`${accClass}__head_is-open`]: isOpen,
    });

    return (
      <div className={ accClass }>
        <button className={ accHeadClasses } type="button" onClick={ this.handleToggleClick }>
          <div className={ `${accClass}__label` }>
            { date.isCurrent && <small className={ `${accClass}__label-current` }>Текущий месяц: </small> }
            <span className={ `${accClass}__label-date` }>{ date.month } { date.year }</span>
          </div>
        </button>

        { isOpen && (
          <section className={ `${accClass}__body` }>
            <List { ...this.listProps } />
          </section>
        )}
      </div>
    );
  }
}

MonthAccordion.propTypes = propTypes;
MonthAccordion.defaultProps = defaultProps;

export default MonthAccordion;
