import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Icon from '~/components/Icon/Icon';
import Radio from '~/components/Radio/Radio';

import './search.scss';
import './assets/search.svg';

class Search extends Component {
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
      onChange({
        search: this.query,
        target: value
      });
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
      <div className="search">
         <div className="search__params">
           { this.renderParams() }
         </div>
        <div className="search__field">
          <input type="text" placeholder="Поиск" className="search__input" onChange={ this.handleSearchChange }/>
          <button type="button" className="search__button">
            <Icon className="search__icon" name="search" />
            Поиск
          </button>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  params: PropTypes.array,
  onChange: PropTypes.func
};

export default Search;
