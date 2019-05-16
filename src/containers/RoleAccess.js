import React, { Component } from 'react';
import { connect } from 'react-redux';

import NotFound from '~/containers/NotFound';
import { getUserData } from '~/store/user/selector';

export default function(RouteComponent, roles) {
  class RoleAccess extends Component {
    get hasRole() {
      const { userRole } = this.props;
      return ~roles.indexOf(userRole);
    }
    
    render() {
      return this.hasRole ? <RouteComponent { ...this.props }/> : <NotFound /> ;
    }
  }

  function mapStateToProps(state) {
    const { role:userRole } = getUserData(state);
    return {
      userRole
    };
  }

  return connect(
    mapStateToProps,
  )(RoleAccess);
}

