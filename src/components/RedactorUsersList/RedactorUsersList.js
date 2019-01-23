import React, { Component } from 'react';
import { connect } from 'react-redux';

import List from '~/components/List/List';
import ToolsMenu from '~/components/ToolsMenu/ToolsMenu';
import TagEditor from '~/components/TagEditor/TagEditor';

import * as usersActions from '~/store/users/actions';
import { getUsersArray } from '~/store/users/selector';

import * as userRoles from '~/services/userRoles';

import './redactor-users-list.scss';

class RedactorUsersList extends Component {
  renderName = ({ last_name, first_name, middle_name }) =>
    `${last_name} ${first_name} ${middle_name || ''}`;

  handleTagAdd = (user, text) => {
      const { currentUserId, createUserTag } = this.props;
      const tagData = { text, user, tag_author: currentUserId };
      createUserTag(user, tagData);
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

  get listProps() {
    const { usersArray } = this.props;
    return {
      data: usersArray,
      menuTooltip: (data) => <ToolsMenu id={ data.id } items={ [] } />,
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
    )
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return {
    currentUserId: user.data.id,
    usersArray: getUsersArray(state)
  }
}

const mapDispatchToProps = {
  createUserTag : usersActions.createUserTag,
  removeUserTag : usersActions.removeUserTag
};

export default connect(mapStateToProps, mapDispatchToProps)(RedactorUsersList);
