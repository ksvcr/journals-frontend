import React, {Component} from 'react';
import PropTypes from 'prop-types';


class FieldAddButton extends Component {
  handleAdd = () => {
    const { field, onAdd } = this.props;
    onAdd(field);
  };

  render() {
    const { children } = this.props;
    return (
      <button type="button" className="field-add-button" onClick={ this.handleAdd }>
        { children }
      </button>
    );
  }
}

FieldAddButton.propTypes = {
  field: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onAdd: PropTypes.func.isRequired
};

export default FieldAddButton;
