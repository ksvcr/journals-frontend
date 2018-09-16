import React, {Component} from 'react';
import Icon from '~/components/Icon/Icon';

import './search-field.scss';
import './assets/search.svg';

class SearchField extends Component {
  render() {
    return (
      <div className="search-field">
        <input type="text" placeholder="Поиск" className="search-field__input"/>
        <button type="button" className="search-field__button">
          <Icon className="search-field__icon" name="search" />
          Поиск
        </button>
      </div>
    );
  }
}

export default SearchField;
