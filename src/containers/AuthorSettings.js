import React, { Component } from 'react';
import { connect } from 'react-redux';

import AuthorSettingsForm from '~/components/AuthorSettingsForm/AuthorSettingsForm';

import * as userActions from '~/store/user/actions';
import * as usersActions from '~/store/users/actions';

class AuthorSettings extends Component {
  componentDidMount() {
    const { fetchUser, userId } = this.props;

    if (userId) {
      fetchUser(userId);
    }
  }

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
  updateUser: usersActions.updateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorSettings);
