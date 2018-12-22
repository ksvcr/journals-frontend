import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '~/components/Header/Header';
import Menu from '~/components/Menu/Menu';
import Footer from '~/components/Footer/Footer';

import * as userActions from '~/store/user/actions';
import * as sitesActions from '~/store/sites/actions';
import hasToken from '~/services/hasToken';

import 'normalize.css';
import '~/static/styles/index.scss';

class Page extends Component {
  componentDidMount() {
    const { fetchSites } = this.props;
    this.authUser().then(() => {
      return fetchSites();
    });
  }

  get menuItems() {
    return [
      {
        title: 'Мои статьи',
        href: '/'
      },
      {
        title: 'Мои скидки',
        href: '/second'
      },
      {
        title: 'Настройки',
        href: '/settings'
      }
    ];
  }

  authUser = () => {
    const { login, fetchCurrentUser } = this.props;
    if (hasToken()) {
      return fetchCurrentUser();
    } else {
      return login().then(() => {
        return fetchCurrentUser();
      });
    }
  };

  render() {
    const { isFulfilled } = this.props;
    return (
      <div className="page">
        <Header />
        <main className="page__main">
          { isFulfilled &&
            <div className="page__holder">
              <aside className="page__sidebar">
                <Menu items={ this.menuItems } />
              </aside>

              { this.props.children }
            </div>
          }
        </main>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFulfilled: state.sites.isFulfilled
  };
}

const mapDispatchToProps = {
  fetchSites: sitesActions.fetchSites,
  fetchCurrentUser: userActions.fetchCurrentUser,
  login: userActions.login
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
