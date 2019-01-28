import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './redactor-collapse-button.scss';

class RedactorCollapseButton extends Component {
  render() {
    const { isActive, isLast, children } = this.props;
    const buttonClasses = classNames('redactor-collapse-button',
      { 'redactor-collapse-button_active' : isActive,
        'redactor-collapse-button_last' : isLast
      });
    return (
      <button type="button" className={ buttonClasses }>
        { children }
      </button>
    );
  }
}

RedactorCollapseButton.propTypes = {
  isActive: PropTypes.bool,
  isLast: PropTypes.bool
};

export default RedactorCollapseButton;
