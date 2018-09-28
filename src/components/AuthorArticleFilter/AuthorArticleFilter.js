import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Select from '~/components/Select/Select';
import Search from '~/components/Search/Search';

import './author-article-filter.scss';

class AuthorArticleFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSite: this.props.defaultSite
    }
  }

  get journalsOptions() {
    const { sitesArray } = this.props;
    return sitesArray.map(site => ({
      title: site.name,
      value: site.id
    }));
  }

  handleSiteChange = (event) => {
    const { value:currentSite } = event.target;
    const { onFilterChange } = this.props;
    this.setState({ currentSite });
    onFilterChange(currentSite);
  };
  
  handleSearchChange = (data) => {
    const { onFilterChange } = this.props;
    const { currentSite } = this.state;
    onFilterChange(currentSite, { search: data });
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
    const { currentSite } = this.state;
    return (
      <div className="author-article-filter">
        <form className="form">
          <div className="form__field">
            <label htmlFor="sites-list" className="form__label">Для журнала</label>
            <Select id="sites-list" options={ this.journalsOptions } onChange={ this.handleSiteChange } />
          </div>
          <div className="form__field">
            <label className="form__label">Поиск статьи</label>
            <Search value={ currentSite } targets={ this.searchTargets } onChange={ this.handleSearchChange } />
          </div>
        </form>
      </div>
    );
  }
}

AuthorArticleFilter.propTypes = {
  sitesArray: PropTypes.array,
  onFilterChange: PropTypes.func
};

export default AuthorArticleFilter;
