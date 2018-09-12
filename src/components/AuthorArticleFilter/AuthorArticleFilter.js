import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Select from '~/components/Select/Select';
import Radio from '~/components/Radio/Radio';
import SearchField from '~/components/SearchField/SearchField';

import './author-article-filter.scss';

class AuthorArticleFilter extends Component {
  get journalsOptions() {
    const { sitesArray } = this.props;
    return sitesArray.map(site => ({
      title: site.name,
      value: site.id
    }));
  }

  handleSiteChange = (event) => {
    const { value } = event.target;
    const { onSiteChange } = this.props;
    onSiteChange(value);
  };

  render() {
    return (
      <div className="author-article-filter">
        <div className="form">
          <div className="form__field">
            <label htmlFor="sites-list" className="form__label">Для журнала</label>
            <Select id="sites-list" options={ this.journalsOptions } onChange={ this.handleSiteChange } />
          </div>
          <div className="form__field">
            <label className="form__label">Поиск статьи</label>
            <Radio name="search-filter" label="Искать везде" />
            <Radio name="search-filter" label="Искать в заголовках" />
            <SearchField />
          </div>
        </div>
      </div>
    );
  }
}

AuthorArticleFilter.propTypes = {
  sitesArray: PropTypes.array,
  onSiteChange: PropTypes.func
};

export default AuthorArticleFilter;
