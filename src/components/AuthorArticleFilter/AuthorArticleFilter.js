import React, {Component} from 'react';
import {connect} from 'react-redux';

import Select from '~/components/Select/Select';
import Radio from '~/components/Radio/Radio';
import SearchField from '~/components/SearchField/SearchField';

import {getSitesArray} from '~/store/sites/selector';
import './author-article-filter.scss';

class AuthorArticleFilter extends Component {
  get journalsOptions() {
    const { sitesArray } = this.props;
    return sitesArray.map(site => ({
      title: site.name,
      value: site.id
    }));
  }

  render() {
    return (
      <div className="author-article-filter">
        <div className="form">
          <div className="form__field">
            <label htmlFor="journals-list" className="form__label">Для журнала</label>
            <Select id="journals-list" options={ this.journalsOptions } />
          </div>
          <div className="form__field">
            <label htmlFor="journals-list" className="form__label">Поиск статьи</label>
            <Radio name="search" label="Искать везде" />
            <Radio name="search" label="Искать в заголовках" />
            <SearchField />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    sitesArray: getSitesArray(state)
  };
}

export default connect(
  mapStateToProps,
)(AuthorArticleFilter);
