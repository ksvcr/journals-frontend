import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as formatDate from '~/services/formatDate';

import List from '~/components/List/List';
import TagEditor from '~/components/TagEditor/TagEditor';

import * as usersActions from '~/store/users/actions';

import './invited-reviewers-list.scss';

class InvitedReviewersList extends Component {
  handleTagAdd = (user, text) => {
    const { currentUserId, createUserTag } = this.props;
    const tagData = { text, user, tag_author: currentUserId };
    createUserTag(tagData);
  };

  get listProps() {
    const { articleData } = this.props;
    const { reviewInvites = [] } = articleData;

    return {
      data: reviewInvites,
      box: this.renderBox,
      cells: [
        {
          style: {
            width: '75%'
          },
          render: ({ reviewer }) => {
            const { first_name, last_name } = reviewer;
            return `${first_name} ${last_name}`;
          }
        },
        {
          style: {
            width: '25%'
          },
          render: data => `До ${formatDate.toString(data.decision_deadline)}`
        }
      ]
    };
  }

  renderBox = (data) => {
    const { reviewers, removeUserTag } = this.props;
    const reviewer = reviewers[data.reviewer.id];
    return reviewer && (
      <div className="invited-reviewers-list__box">
        <div className="invited-reviewers-list__tags">
          <TagEditor
            entityId={ reviewer.id }
            data={ reviewer.tags }
            onAdd={ this.handleTagAdd }
            onRemove={ removeUserTag }
          />
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="invited-reviewers-list">
        <List { ...this.listProps } />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { articles, user } = state;
  const { articleId } = props;
  return {
    currentUserId: user.data.id,
    reviewers: articles.reviewers,
    articleData: articles.data[articleId]
  };
}

const mapDispatchToProps = {
  createUserTag: usersActions.createUserTag,
  removeUserTag: usersActions.removeUserTag
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvitedReviewersList);
