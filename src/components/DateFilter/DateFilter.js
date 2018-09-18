import React, {Component} from 'react';

import './date-filter.scss';
import Select from '~/components/Select/Select';

class DateFilter extends Component {
  get filterOptions() {
    return [{
      title: 'Дата создания',
      value: 'date_public'
    },
    {
      title: 'Дата отправки',
      value: 'date_sent'
    },
    {
      title: 'Последнее изменение',
      value: 'last_change'
    }];
  }

  render() {
    return (
      <div className="date-filter">
        <Select options={ this.filterOptions } onChange={ this.handleChange } className="select_small" />
      </div>
    );
  }
}

export default DateFilter;
