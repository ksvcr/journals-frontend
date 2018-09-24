import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Select from '~/components/Select/Select';
import Calendar from '~/components/Calendar/Calendar';

import './date-filter.scss';
import moment from 'moment';

class DateFilter extends Component {
  state = {
    startDate: null,
    endDate: null
  };

  handleFieldChange = (event) => {
    const { value } = event.target;
    const { onChange } = this.props;
    onChange(value, this.formatedDate);
  };

  handleChange = (type, date) => {
    const { field, onChange } = this.props;

    this.setState({
      [type]: date
    }, () => {
      onChange(field, this.formatedDate);
    });
  };

  get formatedDate() {
    const { field } = this.props;
    const { startDate, endDate } = this.state;
    const data = {};
    if (startDate) {
      data[`${field}_after`] = startDate.format('DD.MM.YYYY');
    }
    if (endDate) {
      data[`${field}_before`] = endDate.format('DD.MM.YYYY');
    }
    return data;
  }

  get filterOptions() {
    return [
      {
        title: 'Дата создания',
        value: 'date_create'
      },
      {
        title: 'Дата публикации',
        value: 'date_public'
      },
      {
        title: 'Последнее изменение',
        value: 'last_change'
      }
    ];
  }

  render() {
    const { field } = this.props;
    return (
      <div className="date-filter">
        <form className="form">
          <div className="form__field">
            <Select type={ field } options={ this.filterOptions } onChange={ this.handleFieldChange } className="select_small" />
          </div>
          <div className="form__field">
            <label className="form__label form__label_small">Задать период</label>
            <div className="form__row form__row_small">
              <div className="form__col form__col_small">
                <Calendar className="text-field_calendar text-field_small"
                          selected={ this.state.startDate }
                          selectsStart
                          startDate={ this.state.startDate }
                          endDate={ this.state.endDate }
                          onChange={ this.handleChange.bind(null, 'startDate') }/>
              </div>
              <div className="form__col form__col_small">
                <Calendar className="text-field_calendar text-field_small"
                          selected={ this.state.endDate }
                          selectsEnd
                          startDate={ this.state.startDate }
                          endDate={ this.state.endDate }
                          onChange={ this.handleChange.bind(null, 'endDate') } />
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

DateFilter.propTypes = {
  field: PropTypes.string.isRequired,
  onChange: PropTypes.func
};

export default DateFilter;
