import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Collapse extends Component {
  state = {
    expanded: {}
  };

  handleExpand = (event) => {
    const { index } = event.currentTarget.dataset;
    this.setState((state) => {
      const expanded = {
        ...state.expanded,
        [index]: !state.expanded[index]
      };
      return { expanded };
    });
  };

  renderItems = () => {
    const { items } = this.props;
    const { expanded } = this.state;
    return items.map((item, index) => {
      const isActive = expanded[index];
      const isLast = index === items.length - 1;
      return (
        <div key={ index } className="collapse__item">
          <div className="collapse__title" data-index={ index } onClick={ this.handleExpand }>
            { item.title({ isActive, isLast }) }
          </div>

          { isActive &&
            <div className="collapse__box">
              { item.box }
            </div>
          }
        </div>
      );
    });
  };

  render() {
    return (
      <div className="collapse">
        { this.renderItems() }
      </div>
    );
  }
}

Collapse.propTypes = {
  items: PropTypes.array
};

export default Collapse;
