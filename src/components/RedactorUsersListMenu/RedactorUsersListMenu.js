import React, { Component } from 'react';
import { connect } from 'react-redux';

import ToolsMenu from '~/components/ToolsMenu/ToolsMenu';
import MailForm from '~/components/MailForm/MailForm';

import apiClient from '~/services/apiClient';

class RedactorUsersListMenu extends Component {
  state = {
    showMail: false
  };

  handleMailToggle = () => {
    setTimeout(() => {
      this.setState(({ showMail }) => ({
        showMail: !showMail
      }));
    }, 0); // хак, чтобы тултип не успевал закрыться при смене контента
  };

  getToolsMenuItems = (data) => {
    return [
      {
        title: 'Написать',
        handler: this.handleMailToggle
      },
      {
        title: 'Войти',
        link: `/settings/${data.id}`
      },
      {
        title: 'Заблокировать',
        handler: this.handleUserLock
      }
    ];
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


export default connect(
  mapStateToProps
)(RedactorUsersListMenu);
