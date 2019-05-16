import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './interest-list.scss';

class InterestList extends Component {
  renderItems = () => {
    const { data } = this.props;
    return data.map((item, index) => <li className="interest-list__item" key={ index }>{ item }</li>)
  };

  render() {
    return (
      <ul className="interest-list">
        { this.renderItems() }
      </ul>
    );
  }
}

InterestList.propTypes = {
  data: PropTypes.array.isRequired
};

export default InterestList;
