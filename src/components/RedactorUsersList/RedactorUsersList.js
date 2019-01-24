import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import List from '~/components/List/List';
import ToolsMenu from '~/components/ToolsMenu/ToolsMenu';
import TagEditor from '~/components/TagEditor/TagEditor';
import CheckboxFilter from '~/components/CheckboxFilter/CheckboxFilter';

import * as usersActions from '~/store/users/actions';
import { getUsersArray } from '~/store/users/selector';

import * as userRoles from '~/services/userRoles';

import './redactor-users-list.scss';
import apiClient from '~/services/apiClient';

class RedactorUsersList extends Component {
  renderName = ({ last_name, first_name, middle_name }) =>
    `${last_name} ${first_name} ${middle_name || ''}`;

  handleTagAdd = (user, text) => {
    const { currentUserId, createUserTag } = this.props;
    const tagData = { text, user, tag_author: currentUserId };
    createUserTag(user, tagData);
  };

  handleChangeRole = (roles) => {
    const { onUpdateRequest } = this.props;
    // Сейчас API не поддерживает передачу нескольких ролей (с 1 ролью все работает хорошо)
    // TODO: возможно придется заменить checkbox на radio
    const role = roles.join(',');
    onUpdateRequest({ filter: { role } });
  };

  renderBox = (data) => {
    const { removeUserTag } = this.props;
    return (
      <div className="redactor-users-list__box">
        <div className="redactor-users-list__tags">
          <TagEditor entityId={ data.id } data={ data.tags }
                      onAdd={ this.handleTagAdd } onRemove={ removeUserTag } />
        </div>
      </div>
    );
  };

  get roleFilterOptions() {
    return Object.keys(userRoles.roleMap).slice(0, 2).map((key) => ({
      title: userRoles.getUserRoleTitle(key),
      value: key
    }));
  }

  handleUserMail = (userId) => {
    // Send message to user
  };

  handleUserShow = (userId) => {
    const { push } = this.props;
    push(`/settings/${userId}`);
  };

  handleUserLock = (userId) => {
    const { usersData } = this.props;
    const { email } = usersData[userId];
    return apiClient.lockUser({ email });
  };


  get toolsMenuItems() {
    return [
      {
        title: 'Написать',
        handler: this.handleUserMail
      },
      {
        title: 'Войти',
        handler: this.handleUserShow
      },
      {
        title: 'Заблокировать',
        handler: this.handleUserLock
      }
    ];
  }


  get listProps() {
    const { usersArray } = this.props;
    return {
      data: usersArray,
      menuTooltip: (data) => <ToolsMenu id={ data.id } items={ this.toolsMenuItems } />,
      head: true,
      box: this.renderBox,
      cells: [
        {
          style: {
            width: '45%'
          },
          isMain: true,
          head: () => 'Имя',
          render: this.renderName
        },
        {
          style: {
            width: '25%'
          },
          isMain: true,
          head: () => 'Роль',
          headToolTip: () => <CheckboxFilter onChange={ this.handleChangeRole } options={ this.roleFilterOptions } />,
          render: ({ role }) => (
            <div className="redactor-users-list__role">
              { userRoles.getUserRoleTitle(role) }
            </div>
          )
        },
        {
          style: {
            width: '30%',
            textAlign: 'right'
          },
          isMain: true,
          head: () => 'Категории наук',
          render: (data) => null
        }
      ]
    };
  }

  render() {
    return (
      <List { ...this.listProps } />
    );
  }
}

RedactorUsersList.propTypes = {
  onUpdateRequest: PropTypes.func
};

function mapStateToProps(state) {
  const { user, users } = state;
  return {
    currentUserId: user.data.id,
    usersData: users.data,
    usersArray: getUsersArray(state)
  }
}

const mapDispatchToProps = {
  createUserTag : usersActions.createUserTag,
  removeUserTag : usersActions.removeUserTag,
  push
};

export default connect(mapStateToProps, mapDispatchToProps)(RedactorUsersList);
