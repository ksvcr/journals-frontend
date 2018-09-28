import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Search from '~/components/Search/Search';
import SiteSelect from '~/components/SiteSelect/SiteSelect';

import './author-article-filter.scss';

class AuthorArticleFilter extends Component {
  handleSiteChange = () => {
    const { onFilterChange } = this.props;
    onFilterChange();
  };
  
  handleSearchChange = (data) => {
    const { onFilterChange } = this.props;
    onFilterChange({ search: data });
  };

  get searchTargets() {
    return [
      {
        value: 'title',
        title: 'Искать в заголовках'
      }
    ];
  }

  render() {
    return (
      <div className="author-article-filter">
        <form className="form">
          <div className="form__field">
            <label htmlFor="sites-list" className="form__label">Для журнала</label>
            <SiteSelect id="sites-list" onChange={ this.handleSiteChange } />
          </div>
          <div className="form__field">
            <label className="form__label">Поиск статьи</label>
            <Search targets={ this.searchTargets } onChange={ this.handleSearchChange } />
          </div>
        </form>
      </div>
    );
  }
}

AuthorArticleFilter.propTypes = {
  onFilterChange: PropTypes.func
};


export default AuthorArticleFilter;
