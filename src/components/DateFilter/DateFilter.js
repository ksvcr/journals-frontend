import React, {Component} from 'react';

import Select from '~/components/Select/Select';
import Calendar from '~/components/Calendar/Calendar';

import './date-filter.scss';
import moment from 'moment';


class DateFilter extends Component {
  state = {
    startDate: moment(),
    endDate: moment()
  };

  handleChangeStart = (date) => {
    this.setState({
      startDate: date
    });
  };

  handleChangeEnd = (date) => {
    this.setState({
      endDate: date
    });
  };

  get filterOptions() {
    return [{
      title: 'Дата создания',
      value: 'date_public'
    },
    {
      title: 'Последнее изменение',
      value: 'last_change'
    }];
  }

  render() {
    return (
      <div className="date-filter">
        <form className="form">
          <div className="form__field">
            <Select options={ this.filterOptions } onChange={ this.handleChange } className="select_small" />
          </div>
          <div className="form__field">
            <label className="form__label form__label_small">Задать период</label>
            <Calendar className="text-field_small"
                      selected={this.state.startDate}
                      selectsStart
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                      onChange={this.handleChangeStart}/>
            <Calendar className="text-field_small"
                      selected={this.state.endDate}
                      selectsEnd
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                      onChange={this.handleChangeEnd}/>
          </div>
        </form>
      </div>
    );
  }
}

export default DateFilter;
