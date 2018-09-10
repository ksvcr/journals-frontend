import React, {Component} from 'react';

import './filter-button.scss';

class FilterButton extends Component {
  render() {
    return (
      <button className="filter-button" type="button">
        { this.props.children }
      </button>
    );
  }
}

export default FilterButton;
