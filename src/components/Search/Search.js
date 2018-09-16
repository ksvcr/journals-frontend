import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Icon from '~/components/Icon/Icon';
import Radio from '~/components/Radio/Radio';

import './search.scss';
import './assets/search.svg';

class Search extends Component {
  state = {
    param: 'all'
  };

  handleParamsChange = (event) => {
    const { value } = event.target;
    const { onChange } = this.props;

    this.setState({
      param: value
    });

    if (this.search) {
      onChange({
        search: this.search,
        param: value
      });
    }
  };

  handleSearchChange = (event) => {
    const { param } = this.state;
    const { onChange } = this.props;
    const { value } = event.target;
    this.search = value;

    onChange({
      search: value,
      param
    });
  };
  
  get params() {
    const { params } = this.props;
    return params ? [{ value: 'all', title: 'Искать везде' }, ...params ] : [];
  }

  renderParams = () => {
    const { param } = this.state;
    return this.params.map(item => (
      <Radio name="search-filter" key={ item.value } checked={ param === item.value }
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
