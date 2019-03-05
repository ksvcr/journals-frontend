import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import MonthAccordion from '~/components/MonthAccordion/MonthAccordion';
import './months-list.scss';

const propTypes = {
  period: PropTypes.number.isRequired,
  handleFetchStat: PropTypes.func,
};

const defaultProps = {
  handleFetchStat: () => {},
};

class MonthsList extends Component {
  get monthsFromPeriod () {
    const { period } = this.props;
    let dataList = [];
    let i = 0;

    do {
      let computedDate = moment().subtract(i, 'months');

      dataList = [ ...dataList, {
        isCurrent: i === 0,
        month: computedDate.format('MMMM'),
        monthIndex: computedDate.month() + 1,
        year: computedDate.year().toString(10),
      }];

      i += 1;
    } while (i < period);

    return dataList;
  }

  render() {
    const { handleFetchStat } = this.props;

    return (
      <div className="months-list">
        { this.monthsFromPeriod.map((date, i) => (
          <MonthAccordion key={ i } date={ date } handleToggle={ () => handleFetchStat(date.monthIndex) } />
        ))}
      </div>
    );
  }
}

MonthsList.propTypes = propTypes;
MonthsList.defaultProps = defaultProps;

export default MonthsList;

