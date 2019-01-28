import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Radio from '~/components/Radio/Radio';

import './search-panel.scss';
import './assets/search.svg';
import TextField from '~/components/TextField/TextField';

class SearchPanel extends Component {
  state = {
    target: 'all'
  };

  handleParamsChange = (event) => {
    const { value } = event.target;
    const { onChange } = this.props;

    this.setState({
      target: value
    });

    if (this.query) {
      const data = {
        search: this.query,
        target: value
      };

      onChange({ search: data });
    }
  };

  handleSearchChange = (event) => {
    const { target } = this.state;
    const { onChange } = this.props;
    const { value } = event.target;
    this.query = value;
    const searchData = {
      search_query: value
    };

    if (target !== 'all') {
      searchData.search_target = target;
    }

    onChange(searchData);
  };
  
  get targets() {
    const { targets } = this.props;
    return targets ? [{ value: 'all', title: 'Искать везде' }, ...targets ] : [];
  }

  renderParams = () => {
    const { target } = this.state;
    return this.targets.map(item => (
      <Radio name="search-filter" key={ item.value } checked={ target === item.value }
             value={ item.value } onChange={ this.handleParamsChange } >
        { item.title }
      </Radio>
    ));
  };

  render() {
    return (
      <div className="search-panel">
        { this.targets.length > 0 &&
          <div className="search-panel__params">
            { this.renderParams() }
          </div>
        }
        <div className="search-panel__field">
          <TextField placeholder="Поиск" className="text-field_search" icon="search"
                     onChange={ this.handleSearchChange } />
        </div>
      </div>
    );
  }
}

SearchPanel.propTypes = {
  params: PropTypes.array,
  onChange: PropTypes.func
};

export default SearchPanel;
