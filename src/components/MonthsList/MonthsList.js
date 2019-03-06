import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import MonthAccordion from '~/components/MonthAccordion/MonthAccordion';
import './months-list.scss';

const propTypes = {
  period: PropTypes.number.isRequired,
  onUpdateRequest: PropTypes.func,
};

const defaultProps = {
  onUpdateRequest: () => {},
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
    const { onUpdateRequest } = this.props;

    return (
      <div className="months-list">
        {
          this.monthsFromPeriod.map((date, i) => (
            <MonthAccordion
              key={ i }
              date={ date }
              onUpdateRequest={ onUpdateRequest(date.monthIndex, date.year) }
            />
          ))
        }
      </div>
    );
  }
}

MonthsList.propTypes = propTypes;
MonthsList.defaultProps = defaultProps;

export default MonthsList;

