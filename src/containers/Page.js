import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '~/components/Header/Header';
import MainMenu from '~/components/MainMenu/MainMenu';
import Footer from '~/components/Footer/Footer';
import InlineLoader from '~/components/InlineLoader/InlineLoader';
import ResetControlledButton from '~/components/ResetControlledButton/ResetControlledButton';

import * as userActions from '~/store/user/actions';
import * as sitesActions from '~/store/sites/actions';

import hasToken from '~/services/hasToken';

import 'normalize.css';
import '~/static/styles/index.scss';

class Page extends Component {
  componentDidMount() {
    const { fetchSites } = this.props;
    this.authUser().then(() => {
      return Promise.all([
        fetchSites()
      ]);
    });
  }

  fetchUser = () => {
    const { controlledUser, fetchCurrentUser, fetchControlledUser } = this.props;
    return fetchCurrentUser().then((response) => {
      if (response) {
        const { role } = response.value;
        if (controlledUser && role === 'REDACTOR') {
          return fetchControlledUser(controlledUser);
        }
      }
    });
  };

  authUser = () => {
    const { login } = this.props;
    if (hasToken()) {
      return this.fetchUser();
    } else {
      return login().then(() => {
        return this.fetchUser();
      });
    }
  };

  render() {
    const { isFulfilled, controlledUser, controlledData, userRole } = this.props;
    const isControlled = controlledUser && controlledData && userRole === 'REDACTOR';
    return (
      <div className="page">
        <Header />
        <main className="page__main">
          { isFulfilled ?
            <div className="page__holder">
              <aside className="page__sidebar">
                <MainMenu />
                {
                  isControlled &&
                    <ResetControlledButton />
                }
              </aside>
              <article className="page__content">
                { this.props.children }
              </article>
            </div> :
            <div className="page__loader">
              <InlineLoader />
            </div>
          }
        </main>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { sites, user } = state;
  const { data:userData, controlledUser, controlledData } = user;

  return {
    controlledUser,
    controlledData,
    userRole: userData.role,
    isFulfilled: sites.isFulfilled && user.isFulfilled
  };
}

const mapDispatchToProps = {
  fetchSites: sitesActions.fetchSites,
  fetchCurrentUser: userActions.fetchCurrentUser,
  fetchControlledUser: userActions.fetchControlledUser,
  login: userActions.login
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
