import React, { Component } from 'react';
import { connect } from 'react-redux';

import AuthorSettingsForm from '~/components/AuthorSettingsForm/AuthorSettingsForm';

import * as userActions from '~/store/user/actions';
import * as usersActions from '~/store/users/actions';
import AuthorSitesList from '~/components/AuthorSitesList/AuthorSitesList';

const FORM_NAME = 'author-settings-form';

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
    const { userId, form } = this.props;
    return (
      <React.Fragment>
        <h1 className="page__title">Настройки</h1>

        <div className="page__tools">
          <AuthorSitesList form={ form } userId={ userId } />
        </div>

        <AuthorSettingsForm form={ form } userId={ userId } onSubmit={ this.handleSubmit } />

      </React.Fragment>
    );
  }
}

function mapStateToProps(state, props) {
  const { match } = props;
  const { userId } = match.params;
  const form = userId ? `${FORM_NAME}-${userId}` : FORM_NAME;

  return {
    userId: match.params.userId,
    form
  };
}

const mapDispatchToProps = {
  updateCurrentUser: userActions.updateCurrentUser,
  fetchUser: usersActions.fetchUser,
  updateUser: usersActions.updateUser
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorSettings);
