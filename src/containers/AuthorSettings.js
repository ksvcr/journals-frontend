import React, { Component } from 'react';
import { connect } from 'react-redux';

import AuthorSettingsForm from '~/components/AuthorSettingsForm/AuthorSettingsForm';

import * as userActions from '~/store/user/actions';
import * as usersActions from '~/store/users/actions';
import * as countriesActions from '~/store/countries/actions';

class AuthorSettings extends Component {
  componentDidMount() {
    this.handleInitialRequest();
  }

  handleInitialRequest = () => {
    const { fetchCountries, fetchUser, userId } = this.props;
    const promises = [
      fetchCountries()
    ];

    if (userId) {
      promises.push(fetchUser(userId));
    }
    return Promise.all(promises);
  };

  handleSubmit = (data) => {
    const { updateCurrentUser, updateUser, userId } = this.props;

    if (userId) {
      updateUser(userId, data);
    } else {
      updateCurrentUser(data);
    }
  };

  render() {
    const { userId } = this.props;
    return (
      <React.Fragment>
        <h1 className="page__title">Настройки</h1>
        <AuthorSettingsForm userId={ userId } onSubmit={ this.handleSubmit } />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, props) {
  const { match } = props;

  return {
    userId: match.params.userId
  }
}

const mapDispatchToProps = {
  updateCurrentUser: userActions.updateCurrentUser,
  fetchUser: usersActions.fetchUser,
  updateUser: usersActions.updateUser,
  fetchCountries: countriesActions.fetchCountries
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorSettings);
