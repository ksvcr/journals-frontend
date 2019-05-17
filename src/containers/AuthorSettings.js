import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { withNamespaces } from 'react-i18next';

import AuthorSettingsForm from '~/components/AuthorSettingsForm/AuthorSettingsForm';
import AuthorSitesList from '~/components/AuthorSitesList/AuthorSitesList';

import * as userActions from '~/store/user/actions';
import * as usersActions from '~/store/users/actions';
import * as countriesActions from '~/store/countries/actions';
import { getUserData } from '~/store/user/selector';

const FORM_NAME = 'author-settings-form';

class AuthorSettings extends Component {
  componentDidMount() {
    this.handleInitialRequest();
  }

  handleInitialRequest = () => {
    const { fetchCountries } = this.props;
    const promises = [
      fetchCountries()
    ];

    return Promise.all(promises);
  };

  handleSubmit = (data) => {
    const { updateCurrentUser, updateUser, fetchControlledUser, fetchCurrentUser,
            isControlled, userId, push } = this.props;
    const updatePromise = isControlled ?
      updateUser(userId, data).then(() => fetchControlledUser(userId)) :
      updateCurrentUser(data).then(() => fetchCurrentUser());

    updatePromise.then(() => {
      push('/');
    });
  };

  render() {
    const { t } = this.props;
    return (
      <React.Fragment>
        <h1 className="page__title">{ t('settings') }</h1>

        <div className="page__tools">
          <AuthorSitesList form={ FORM_NAME } />
        </div>

        <AuthorSettingsForm form={ FORM_NAME } onSubmit={ this.handleSubmit } />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  const { controlledUser, controlledData, data:currentUserData } = user;
  const isControlled = controlledUser && controlledData && currentUserData.role === 'REDACTOR';
  const { id: userId } = getUserData(state);

  return {
    userId,
    isControlled
  };
}

const mapDispatchToProps = {
  push,
  updateCurrentUser: userActions.updateCurrentUser,
  fetchUser: usersActions.fetchUser,
  updateUser: usersActions.updateUser,
  fetchCountries: countriesActions.fetchCountries,
  fetchCurrentUser: userActions.fetchCurrentUser,
  fetchControlledUser: userActions.fetchControlledUser
};

AuthorSettings = withNamespaces()(AuthorSettings);

export default connect(mapStateToProps, mapDispatchToProps)(AuthorSettings);
