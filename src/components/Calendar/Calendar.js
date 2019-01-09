import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'moment/locale/ru';

import 'react-datepicker/dist/react-datepicker.css';
import './calendar.scss';

import TextField from '~/components/TextField/TextField'

class Calendar extends Component {
  handleChange = (date) => {
    const { datepicker } = this.refs;
    const { input={}, endDate } = this.props;

    let onChange = input.onChange ? input.onChange : this.props.onChange;
    onChange(date);

    if (endDate !== undefined) {
      setTimeout(() => {
        datepicker.setOpen(false);
      }, 0);
    }
  };

  render() {
    const { onChange, meta={}, ...restProps } = this.props;
    return (
      <div className="calendar">
        <DatePicker
          ref="datepicker"
          dropdownMode="scroll"
          locale="ru"
          shouldCloseOnSelect={ false }
          onChange={ this.handleChange }
          customInput={ <TextField icon="calendar" meta={ meta } /> }
          calendarClassName="calendar__box"
          { ...restProps }
        />
      </div>

    );
  }
}

export default Calendar;
