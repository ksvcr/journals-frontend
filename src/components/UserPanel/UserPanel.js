import React, { Component } from 'react';
import { connect } from 'react-redux';

import './user-panel.scss';

class UserPanel extends Component {
  render() {
    const { user, isFulfilled } = this.props;
    const { last_name, first_name, middle_name } = user;

    return isFulfilled ? (
      <div className="user-panel">
        { `${last_name} ${first_name.charAt(0)}. ${middle_name.charAt(0)}.` }
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

export default connect(mapStateToProps)(UserPanel);
