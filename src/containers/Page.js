import React, { Component } from 'react';
import {connect} from 'react-redux';

import Header from '~/components/Header/Header';
import {login, fetchCurrentUser} from '~/store/user/actions';
import hasToken from '~/services/hasToken';

import 'normalize.css';
import '~/static/styles/index.scss';

class Page extends Component {
  componentWillMount() {
    this.authUser();
  }

  authUser = () => {
    const { login, fetchCurrentUser } = this.props;
    if (hasToken()) {
      fetchCurrentUser();
    } else {
      login();
    }
  };
  
  render() {
    return (
      <div className="page">
        <Header />
        <main className="page__main">
          <div className="page__holder">
            { this.props.children }
          </div>
        </main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCurrentUser: () => dispatch(fetchCurrentUser()),
    login: () => dispatch(login())
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
