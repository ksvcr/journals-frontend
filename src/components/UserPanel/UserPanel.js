import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

import Icon from '~/components/Icon/Icon';

import * as userActions from '../../store/user/actions';
import { getUserData } from '~/store/user/selector';

import './user-panel.scss';
import './assets/logout.svg';

class UserPanel extends Component {
  handleLogout = () => {
    const { logout } = this.props;

    logout().then(() => {
      Cookies.remove('csrftoken');
      Cookies.remove('sessionid');
      window.location.replace('/');
    });
  };

  render() {
    const { user, isFulfilled } = this.props;
    const { last_name, first_name, middle_name } = user;

    return isFulfilled ? (
      <div className="user-panel">
        { `${last_name} ${first_name.charAt(0)}. ${ middle_name ? middle_name.charAt(0) + '.' : ''}` }
        <button className="user-panel__logout" onClick={ this.handleLogout }>
          <Icon name="logout" className="user-panel__icon" />
        </button>
      </div>
    ) : null;
  }
}

function mapStateToProps(state) {
  const { user } = state;

  return {
    isFulfilled: user.isFulfilled,
    user: getUserData(state)
  };
}

const mapDispatchToProps = {
  logout: userActions.logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel);
