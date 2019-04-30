import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import AuthorSettingsForm from '~/components/AuthorSettingsForm/AuthorSettingsForm';
import { withNamespaces } from 'react-i18next';

import * as userActions from '~/store/user/actions';
import * as usersActions from '~/store/users/actions';

import * as countriesActions from '~/store/countries/actions';
import AuthorSitesList from '~/components/AuthorSitesList/AuthorSitesList';

const FORM_NAME = 'author-settings-form';

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
    const { updateCurrentUser, updateUser, userId, push } = this.props;

    if (userId) {
      updateUser(userId, data).then(() => {
        push('/');
      });
    } else {
      updateCurrentUser(data).then(() => {
        push('/');
      });
    }
  };

  render() {
    const { t, userId, form } = this.props;
    return (
      <React.Fragment>
        <h1 className="page__title">{ t('settings') }</h1>

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
  push,
  updateCurrentUser: userActions.updateCurrentUser,
  fetchUser: usersActions.fetchUser,
  updateUser: usersActions.updateUser,
  fetchCountries: countriesActions.fetchCountries
};
AuthorSettings = withNamespaces()(AuthorSettings);


export default connect(mapStateToProps, mapDispatchToProps)(AuthorSettings);
