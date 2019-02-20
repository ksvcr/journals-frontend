import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import List from "~/components/List/List";
import ToolsMenu from "~/components/ToolsMenu/ToolsMenu";
import TagEditor from "~/components/TagEditor/TagEditor";
import ListChecker from "~/components/ListChecker/ListChecker";

import * as usersActions from "~/store/users/actions";
import { getUsersArray } from "~/store/users/selector";

import * as userRoles from "~/services/userRoles";
import apiClient from "~/services/apiClient";

import "./redactor-users-list.scss";

class RedactorUsersList extends Component {
  renderName = ({ last_name, first_name, middle_name }) =>
    `${last_name} ${first_name} ${middle_name || ""}`;

  handleTagAdd = (user, text) => {
    const { currentUserId, createUserTag } = this.props;
    const tagData = { text, user, tag_author: currentUserId };
    createUserTag(tagData);
  };

  handleChangeRole = (name, data) => {
    const { onUpdateRequest } = this.props;

    onUpdateRequest({ filter: { [name]: data.join() } });
  };

  renderBox = data => {
    const { removeUserTag } = this.props;
    return (
      <div className="redactor-users-list__box">
        <div className="redactor-users-list__tags">
          <TagEditor
            entityId={data.id}
            data={data.tags}
            onAdd={this.handleTagAdd}
            onRemove={removeUserTag}
          />
        </div>
      </div>
    );
  };

  get roleFilterOptions() {
    return Object.keys(userRoles.roleMap)
      .slice(0, 2)
      .map(key => ({
        label: userRoles.getUserRoleTitle(key),
        value: key
      }));
  }

  handleUserMail = userId => {
    // Send message to user
  };

  handleUserShow = userId => {
    const { push } = this.props;
    push(`/settings/${userId}`);
  };

  handleUserLock = userId => {
    const { usersData } = this.props;
    const { email } = usersData[userId];
    return apiClient.lockUser({ email });
  };

  get toolsMenuItems() {
    return [
      {
        title: "Написать",
        handler: this.handleUserMail
      },
      {
        title: "Войти",
        handler: this.handleUserShow
      },
      {
        title: "Заблокировать",
        handler: this.handleUserLock
      }
    ];
  }

  get listProps() {
    const { usersArray } = this.props;
    return {
      data: usersArray,
      menuTooltip: data => (
        <ToolsMenu id={data.id} items={this.toolsMenuItems} />
      ),
      head: true,
      box: this.renderBox,
      cells: [
        {
          style: {
            width: "45%"
          },
          isMain: true,
          head: () => "Имя",
          render: this.renderName
        },
        {
          style: {
            width: "25%"
          },
          head: () => "Роль",
          headToolTip: () => (
            <ListChecker
              name="role"
              onChange={this.handleChangeRole}
              data={this.roleFilterOptions}
            />
          ),
          render: ({ role }) => (
            <div className="redactor-users-list__role">
              {userRoles.getUserRoleTitle(role)}
            </div>
          )
        },
        {
          style: {
            width: "30%",
            textAlign: "right"
          },
          head: () => "Категории наук",
          render: data => null
        }
      ]
    };
  }

  render() {
    return <List {...this.listProps} />;
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
  };
}

const mapDispatchToProps = {
  createUserTag: usersActions.createUserTag,
  removeUserTag: usersActions.removeUserTag,
  push
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RedactorUsersList);
