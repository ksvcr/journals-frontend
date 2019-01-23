import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchPanel from '~/components/SearchPanel/SearchPanel';
import Select from '~/components/Select/Select';
import RedactorUsersList from '~/components/RedactorUsersList/RedactorUsersList';
import PaginateLine from '~/components/PaginateLine/PaginateLine';

import * as usersActions from '~/store/users/actions';
import { getUsersParams } from '~/store/users/selector';

class RedactorUsers extends Component {
  componentDidMount() {
    this.handleRequest();
  }

  handleRequest = (params = {}) => {
    const { fetchUsers, usersParams } = this.props;
    const data = {
      ...usersParams,
      ...params,
      search: params.search_query
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
    return {
      name: 'site',
      options: [],
      onChange: (event) => {}
    };
  }

  get selectActionProps() {
    return {
      name: 'action',
      options: [],
      onChange: (event) => {}
    };
  }

  get selectTagsProps() {
    return {
      name: 'tags',
      options: [],
      onChange: (event) => {}
    };
  }

  handlePaginateChange = (paginate) => {
    this.handleRequest({ paginate })
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
              <SearchPanel hasDefaultTarget={ false } targets={ this.searchTargets }
                           onChange={ this.handleRequest } initialTarget="name" />
            </div>
            <div className="form__row">
              <div className="form__col form__col_4">
                <div className="form__field">
                  <label className="form__label">Журнал</label>
                  <Select { ...this.selectSiteProps } />
                </div>
              </div>
              <div className="form__col form__col_4">
                <div className="form__field">
                  <label className="form__label">Действия</label>
                  <Select { ...this.selectActionProps } />
                </div>
              </div>
              <div className="form__col form__col_4">
                <div className="form__field">
                  <label className="form__label">Теги</label>
                  <Select { ...this.selectTagsProps } />
                </div>
              </div>
            </div>
          </div>
        </div>

        <RedactorUsersList />


        { total > 0 &&
          <PaginateLine onChange={ this.handlePaginateChange } total={ total } { ...paginate } />
        }
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
    paginate
  }
}

const mapDispatchToProps = {
  fetchUsers: usersActions.fetchUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(RedactorUsers);
