import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withNamespaces } from 'react-i18next';

import * as formatDate from '~/services/formatDate';
import Icon from '~/components/Icon/Icon';

import './deadline-editor.scss';
import ToolTip from '~/components/ToolTip/ToolTip';
import Calendar from '~/components/Calendar/Calendar';

class DeadlineEditor extends Component {
  state = {
    date: null
  };

  constructor(props) {
    super(props);
    const { date } = this.props;
    this.state = {
      date: moment(date)
    };
  }


  handleChange = (date) => {
    const { id, onChange } = this.props;
    this.setState({
      date
    }, () => {
      onChange(id, date.format());
    });
  };

  render() {
    const { date } = this.state;
    const { t } = this.props;
    return (
      <div className="deadline-editor">
        <div className="deadline-editor__holder">
          <div className="deadline-editor__value">
            { `До ${formatDate.toString(date)}` }
          </div>
          <ToolTip
            className="tooltip"
            position="bottom-end"
            html={
              <div className="deadline-editor__field">
                <div className="form__field form__field_small">
                  <label htmlFor="deadline" className="form__label form__label_small">
                    { t('other_date') }
                  </label>
                  <Calendar className="text-field_calendar text-field_small"
                            id="deadline"
                            selected={ date }
                            onChange={ this.handleChange } />
                </div>
              </div>
            }
          >
            <button className="deadline-editor__edit-button" type="button">
              <Icon name="edit" className="deadline-editor__edit-icon" />
            </button>
          </ToolTip>
        </div>
      </div>
    );
  }
}

DeadlineEditor.propTypes = {
  date: PropTypes.string,
  onChange: PropTypes.func
};

DeadlineEditor = withNamespaces()(DeadlineEditor);


export default DeadlineEditor;
