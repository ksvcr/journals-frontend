import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import List from '~/components/List/List';
import ToolsMenu from '~/components/ToolsMenu/ToolsMenu';
import TagEditor from '~/components/TagEditor/TagEditor';
import CheckboxFilter from '~/components/CheckboxFilter/CheckboxFilter';

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

  handleChangeRole = (roles) => {
    const { onUpdateRequest } = this.props;
    // Сейчас API не поддерживает передачу нескольких ролей (с 1 ролью все работает хорошо)
    // TODO: возможно придется заменить checkbox на radio
    const role = roles.join(',');
    onUpdateRequest({ filter: { role } });
  };

  get roleFilterOptions() {
    return Object.keys(userRoles.roleMap).map((key) => ({
      title: userRoles.getUserRoleTitle(key),
      value: key
    }));
  }

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
