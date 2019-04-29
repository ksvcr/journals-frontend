import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';

import Select from '~/components/Select/Select';
import Calendar from '~/components/Calendar/Calendar';

import './date-filter.scss';

class DateFilter extends Component {
  state = {
    startDate: null,
    endDate: null
  };

  handleFieldChange = (event) => {
    const { value:field } = event.target;
    const { onChange } = this.props;
    onChange(field, this.getFormattedDate(field));
  };

  handleChange = (type, date) => {
    const { field, onChange } = this.props;

    this.setState({
      [type]: date
    }, () => {
      onChange(field, this.getFormattedDate(field));
    });
  };

  getFormattedDate(field) {
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
    const { t } = this.props;
    return [
      {
        title: t('date_of_creation'),
        value: 'date_create'
      },
      {
        title: t('departure_date'),
        value: 'date_send_to_review'
      },
      {
        title: t('last_change'),
        value: 'last_change'
      }
    ];
  }

  render() {
    const { t, field } = this.props;
    return (
      <div className="date-filter">
        <form className="form">
          <div className="form__field form__field_small">
            <Select value={ field } options={ this.filterOptions }
                    onChange={ this.handleFieldChange } className="select_small" />
          </div>
          <div className="form__field form__field_small">
            <label htmlFor="date-start" className="form__label form__label_small">{ t('set_period') }</label>
            <div className="form__row form__row_small">
              <div className="form__col form__col_small">
                <Calendar id="date-start"
                          className="text-field_calendar text-field_small"
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

DateFilter = withNamespaces()(DateFilter);

export default DateFilter;
