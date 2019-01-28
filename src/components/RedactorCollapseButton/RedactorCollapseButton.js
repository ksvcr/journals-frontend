import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './redactor-collapse-button.scss';

class RedactorCollapseButton extends Component {
  render() {
    const { children, isOpen, onClick } = this.props;
    const buttonClasses = classNames('redactor-collapse-button',
      { 'redactor-collapse-button_active' : isOpen });
    return (
      <button type="button" className={ buttonClasses } onClick={ onClick }>
        { children }
      </button>
    );
  }
}

RedactorCollapseButton.propTypes = {
  isOpen: PropTypes.bool
};

export default RedactorCollapseButton;
