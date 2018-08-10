import React, { Component } from 'react';
import {connect} from 'react-redux';

import Header from '~/components/Header/Header';
import { fetchSites } from '~/store/sites/actions';
import { login } from '~/store/user/actions';

import 'normalize.css';
import '~/static/styles/index.scss';

class Page extends Component {
  componentWillMount() {
    // const { fetchSites, login } = this.props;
    // fetchSites().then(() => {
    //   login();
    // });
  }
  
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
    fetchSites: () => dispatch(fetchSites()),
    login: () => dispatch(login())
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
