import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchPanel from '~/components/SearchPanel/SearchPanel';
import Select from '~/components/Select/Select';
import SearchableSelect from '~/components/SearchableSelect/SearchableSelect';
import RedactorUsersList from '~/components/RedactorUsersList/RedactorUsersList';
import PaginateLine from '~/components/PaginateLine/PaginateLine';

import * as usersActions from '~/store/users/actions';
import { getUsersParams } from '~/store/users/selector';
import { getSitesArray } from '~/store/sites/selector';
import apiClient from '~/services/apiClient';

class RedactorUsers extends Component {
  componentDidMount() {
    this.handleRequest();
  }

  handleRequest = (params = {}) => {
    const { fetchUsers, usersParams } = this.props;
    const data = {
      ...usersParams,
      ...params,
      search: params.search_query || usersParams.search
    };
    fetchUsers(data);
  };

  get searchTargets() {
    return [
      {
        value: 'name',
        title: 'По имени'
      },
      {
        value: 'science',
        title: 'По научным данным'
      }
    ];
  }

  get selectSiteProps() {
    const { sitesArray } = this.props;
    const options = sitesArray.map(item => ({
      title: item.name,
      value: item.id
    }));

    return {
      name: 'site',
      options,
      onChange: event => {}
    };
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
    return {
      async: true,
      name: 'tags',
      loadOptions: this.loadOptions,
      placeholder: 'Выберите тег',
      normalize: option => option.value,
      onChange: ({ value }) => this.handleRequest({ filter: { tag_ids: value } })
    };
  }

  handlePaginateChange = paginate => {
    this.handleRequest({ paginate });
  };

  render() {
    const { total, paginate } = this.props;
    return (
      <React.Fragment>
        <h1 className="page__title">Пользователи</h1>
        <div className="page__tools">
          <div className="form">
            <div className="form__field">
              <label className="form__label">Поиск пользователя</label>
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
                  <label className="form__label">Журнал</label>
                  <Select { ...this.selectSiteProps } />
                </div>
              </div>
              <div className="form__col form__col_6">
                <div className="form__field">
                  <label className="form__label">Теги</label>
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
  const { users } = state;
  const { total, paginate } = users;
  return {
    usersParams: getUsersParams(state),
    total,
    paginate,
    sitesArray: getSitesArray(state)
  };
}

const mapDispatchToProps = {
  fetchUsers: usersActions.fetchUsers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RedactorUsers);
