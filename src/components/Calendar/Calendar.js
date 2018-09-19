import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'moment/locale/ru';

import 'react-datepicker/dist/react-datepicker.css';
import './calendar.scss';

import TextField from '~/components/TextField/TextField'

class Calendar extends Component {
  state = {
    startDate: moment()
  };

  handleChange = (date) => {
    this.setState({
      startDate: date
    });
  };

  render() {
    return (
      <div className="calendar">
        <DatePicker
          dropdownMode="scroll"
          locale="ru"
          // shouldCloseOnSelect={ false }
          selected={this.state.startDate}
          onChange={ this.handleChange }
          customInput={ <TextField /> }
          calendarClassName="calendar__box"
          { ...this.props }
        />
      </div>

    );
  }
}

export default Calendar;
