import React, { Component } from 'react';
import Checkbox from '~/components/Checkbox/Checkbox';

import './list-checker.scss';

class ListChecker extends Component {
  state = {
    checkedArray: []
  };

  constructor(props) {
    super(props);
    this.selectedCheckboxes = new Set();
  }

  renderItems = () => {
    const { data } = this.props;
    const { checkedArray } = this.state;
    return data.map((item) => {
      const isChecked = ~checkedArray.indexOf(item.value);
      return (
        <div className="list-checker__item" key={ item.value }>
          <Checkbox value={ item.value } checked={ isChecked }
                    onChange={ this.handleChange }>
            { item.label }
          </Checkbox>
        </div>
      )
    });
  };

  handleChange = (event) => {
    const { value } = event.target;

    const { onChange, name } = this.props;
    if (this.selectedCheckboxes.has(value)) {
      this.selectedCheckboxes.delete(value);
    } else {
      this.selectedCheckboxes.add(value);
    }

    const checkedArray = [ ...this.selectedCheckboxes ];
    this.setState({ checkedArray });

    onChange(name, checkedArray);
  };

  render() {
    return (
      <div className="list-checker">
        <div className="list-checker__list">
          { this.renderItems() }
        </div>
      </div>
    );
  }
}

export default ListChecker;
