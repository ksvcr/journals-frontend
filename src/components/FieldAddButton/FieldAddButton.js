import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './field-add-button.scss';

class FieldAddButton extends Component {
  render() {
    const { children, onAdd } = this.props;
    return (
      <button type="button" className="field-add-button" onClick={ onAdd }>
        <span className="field-add-button__circle" />
        { children }
      </button>
    );
  }
}

FieldAddButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onAdd: PropTypes.func.isRequired
};

export default FieldAddButton;
