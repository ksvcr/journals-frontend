import React, { Component } from 'react';
import { connect } from 'react-redux';

import AuthorSettingsForm from '~/components/AuthorSettingsForm/AuthorSettingsForm';

import * as userActions from '~/store/user/actions';

class AuthorSettings extends Component {
  handleSubmit = (data) => {
    const { dispatch } = this.props;
    dispatch(userActions.updateCurrentUser(data));
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="page__title">Настройки</h1>
        <AuthorSettingsForm formName="author-settings-form" onSubmit={ this.handleSubmit } />
      </React.Fragment>
    );
  }
}

export default connect()(AuthorSettings);
