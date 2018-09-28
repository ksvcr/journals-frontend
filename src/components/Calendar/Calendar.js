import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'moment/locale/ru';

import 'react-datepicker/dist/react-datepicker.css';
import './calendar.scss';

import TextField from '~/components/TextField/TextField'

class Calendar extends Component {
  handleChange = (date) => {
    const { datepicker } = this.refs;
    const { onChange } = this.props;
    onChange(date);
    setTimeout(() => {
      datepicker.setOpen(false);
    }, 0)
  };

  render() {
    const { onChange, ...restProps } = this.props;
    return (
      <div className="calendar">
        <DatePicker
          ref="datepicker"
          dropdownMode="scroll"
          locale="ru"
          shouldCloseOnSelect={ false }
          onChange={ this.handleChange }
          customInput={ <TextField icon="calendar" /> }
          calendarClassName="calendar__box"
          { ...restProps }
        />
      </div>

    );
  }
}

export default Calendar;
