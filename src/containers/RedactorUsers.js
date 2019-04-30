import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';

import SearchPanel from '~/components/SearchPanel/SearchPanel';
import SearchableSelect from '~/components/SearchableSelect/SearchableSelect';
import RedactorUsersList from '~/components/RedactorUsersList/RedactorUsersList';
import PaginateLine from '~/components/PaginateLine/PaginateLine';
import SiteSelect from '~/components/SiteSelect/SiteSelect';

import * as usersActions from '~/store/users/actions';
import { getUsersParams } from '~/store/users/selector';
import { getSitesArray } from '~/store/sites/selector';
import apiClient from '~/services/apiClient';

class RedactorUsers extends Component {
  componentDidMount() {
    this.handleRequest();
  }

  handleRequest = (params = {}) => {
    const { siteId, fetchUsers, usersParams } = this.props;
    const data = {
      ...usersParams,
      ...params,
      search: params.search_query || usersParams.search
    };
    fetchUsers(siteId, data);
  };

  get searchTargets() {
    const { t } = this.props;
    return [
      {
        value: 'name',
        title: t('search_by_name')
      },
      {
        value: 'science',
        title: t('search_by_scientific_data')
      }
    ];
  }

  loadOptions = inputValue => {
    return new Promise(resolve => {
      if (!inputValue) resolve([]);
      apiClient.getUserTags({ search_query: inputValue }).then(data => {
        const options = data.results.map(item => ({ label: item.text, value: item.id }));
        resolve(options);
      });
    });
  };

  get selectTagsProps() {
    const { t } = this.props;
    return {
      async: true,
      name: 'tags',
      loadOptions: this.loadOptions,
      placeholder: t('select_tag'),
      normalize: option => option.value,
      onChange: ({ value }) => this.handleRequest({ filter: { tag_ids: value } })
    };
  }

  handlePaginateChange = paginate => {
    this.handleRequest({ paginate });
  };

  render() {
    const { t, total, paginate } = this.props;
    return (
      <React.Fragment>
        <h1 className="page__title">{ t('users') }</h1>
        <div className="page__tools">
          <div className="form">
            <div className="form__field">
              <label className="form__label">{ t('user_search') }</label>
              <SearchPanel
                hasDefaultTarget={ false }
                targets={ this.searchTargets }
                onChange={ this.handleRequest }
                initialTarget="name"
              />
            </div>
            <div className="form__row">
              <div className="form__col form__col_6">
                <div className="form__field">
                  <label className="form__label">{ t('journal') }</label>
                  <SiteSelect id="sites-list" onChange={ this.handleRequest } />
                </div>
              </div>
              <div className="form__col form__col_6">
                <div className="form__field">
                  <label className="form__label">{ t('tags') }</label>
                  <SearchableSelect { ...this.selectTagsProps } />
                </div>
              </div>
            </div>
          </div>
        </div>

        <RedactorUsersList onUpdateRequest={ this.handleRequest } />

        { total > 0 && (
          <PaginateLine
            onChange={ this.handlePaginateChange }
            total={ total }
            { ...paginate }
          />
        ) }
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { users, sites } = state;
  const { total, paginate } = users;
  return {
    usersParams: getUsersParams(state),
    siteId: sites.current,
    total,
    paginate,
    sitesArray: getSitesArray(state)
  };
}

const mapDispatchToProps = {
  fetchUsers: usersActions.fetchUsers
};

RedactorUsers = withNamespaces()(RedactorUsers);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RedactorUsers);
