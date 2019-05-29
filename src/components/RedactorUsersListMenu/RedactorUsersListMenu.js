import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { withNamespaces } from 'react-i18next';

import ToolsMenu from '~/components/ToolsMenu/ToolsMenu';
import MailForm from '~/components/MailForm/MailForm';

import apiClient from '~/services/apiClient';
import * as userActions from '~/store/user/actions';

class RedactorUsersListMenu extends Component {
  state = {
    showMail: false
  };

  getToolsMenuItems = (data) => {
    const menuArr = [];
    const { t } = this.props;

    menuArr.push({
      title: t('write'),
      handler: this.handleMailToggle
    });

    if (data.role !== 'REDACTOR') {
      menuArr.push({
        title: t('login'),
        handler: this.handleUserLogin
      });

      menuArr.push({
        title: t('block'),
        handler: this.handleUserLock
      });
    }

    return menuArr;
  };

  handleMailToggle = () => {
    setTimeout(() => {
      this.setState(({ showMail }) => ({
        showMail: !showMail
      }));
    }, 0); // хак, чтобы тултип не успевал закрыться при смене контента
  };

  handleUserLogin = userId => {
    const { setControlledUser, fetchControlledUser, push } = this.props;
    setControlledUser(userId);
    fetchControlledUser(userId).then(() => {
      push('/');
    });
  };

  handleUserLock = userId => {
    const { usersData, onClose } = this.props;
    const { email } = usersData[userId];
    onClose();
    apiClient.lockUser({ email });
  };
  
  handleMailSubmit = (formData) => {
    const { onClose } = this.props;
    const { data } = this.props;
    apiClient.sendMail({ ...formData, users: [ data.id ] });
    onClose();
  };

  render() {
    const { data } = this.props;
    const { showMail } = this.state;
    return (
      <React.Fragment>
        { showMail ?
          <MailForm onSubmit={ this.handleMailSubmit } /> :
          <ToolsMenu id={ data.id } items={ this.getToolsMenuItems(data) } />
        }
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { users } = state;
  return {
    usersData: users.data
  };
}

const mapDispatchToProps = {
  push,
  setControlledUser : userActions.setControlledUser,
  fetchControlledUser : userActions.fetchControlledUser
};

RedactorUsersListMenu = withNamespaces()(RedactorUsersListMenu);

export default connect(
  mapStateToProps, mapDispatchToProps
)(RedactorUsersListMenu);
