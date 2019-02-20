import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Cookies from 'js-cookie';

import Icon from '~/components/Icon/Icon';

import * as userActions from '../../store/user/actions';

import './user-panel.scss';

class UserPanel extends Component {
  handleLogout = () => {
    const { logout } = this.props;
    
    logout().then(() => {
      Cookies.remove('csrftoken');
      push('/');
    });
  };

  render() {
    const { user, isFulfilled } = this.props;
    const { last_name, first_name, middle_name } = user;

    return isFulfilled ? (
      <div className="user-panel">
        { `${last_name} ${first_name.charAt(0)}. ${middle_name.charAt(0)}.` }
        <button className="user-panel__logout" onClick={ this.handleLogout }>
          <Icon name="arrow" className="user-panel__icon" />
        </button>
      </div>
    ) : null;
  }
}

function mapStateToProps(state) {
  const { user } = state;

  return {
    isFulfilled: user.isFulfilled,
    user: user.data
  };
}

const mapDispatchToProps = {
  logout: userActions.logout,
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel);
