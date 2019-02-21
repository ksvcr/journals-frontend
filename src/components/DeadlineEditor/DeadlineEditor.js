import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as formatDate from '~/services/formatDate';
import Icon from '~/components/Icon/Icon';

import './deadline-editor.scss';
import ToolTip from '~/components/ToolTip/ToolTip';

class DeadlineEditor extends Component {
  render() {
    const { date } = this.props;
    return (
      <div className="deadline-editor">
        <div className="deadline-editor__holder">
          <div className="deadline-editor__value">
            { `До ${formatDate.toString(date)}` }
          </div>
          <ToolTip
            className="tooltip"
            position="bottom-start"
            html={ <div>Поле с датой</div> }
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

export default DeadlineEditor;
