import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';

import List from '~/components/List/List';
import TagEditor from '~/components/TagEditor/TagEditor';
import ListChecker from '~/components/ListChecker/ListChecker';
import RedactorUsersListMenu from '~/components/RedactorUsersListMenu/RedactorUsersListMenu';
import InterestList from '~/components/InterestList/InterestList';

import * as usersActions from '~/store/users/actions';
import { getUsersArray } from '~/store/users/selector';
import { getUserData } from '~/store/user/selector';

import * as userRoles from '~/services/userRoles';

import './redactor-users-list.scss';

class RedactorUsersList extends Component {
  renderName = ({ last_name, first_name, middle_name }) =>
    `${last_name} ${first_name} ${middle_name || ''}`;

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
            entityId={ data.id }
            data={ data.tags }
            onAdd={ this.handleTagAdd }
            onRemove={ removeUserTag }
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

  get listProps() {
    const { usersArray } = this.props;
    return {
      data: usersArray,
      menuTooltip: (data, onClose) => (
        <RedactorUsersListMenu data={ data } onClose={ onClose } />
      ),
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
          head: () => 'Роль',
          headToolTip: () => (
            <ListChecker
              name="role"
              onChange={ this.handleChangeRole }
              data={ this.roleFilterOptions }
            />
          ),
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
          head: () => 'Категории наук',
          render: ({ sphere_scientific_interests }) => (
            sphere_scientific_interests ?
              <div className="redactor-users-list__interests">
                <InterestList data={ sphere_scientific_interests } />
              </div> : null
          )
        }
      ]
    };
  }

  render() {
    return <List { ...this.listProps } />;
  }
}

RedactorUsersList.propTypes = {
  onUpdateRequest: PropTypes.func
};

function mapStateToProps(state) {
  const { id:currentUserId } = getUserData(state);

  return {
    currentUserId,
    usersArray: getUsersArray(state)
  };
}

const mapDispatchToProps = {
  createUserTag: usersActions.createUserTag,
  removeUserTag: usersActions.removeUserTag
};

RedactorUsersList = withNamespaces()(RedactorUsersList);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RedactorUsersList);
