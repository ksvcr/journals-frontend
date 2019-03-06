import React, { Component } from 'react';
import { connect } from 'react-redux';

import List from '~/components/List/List';
import TagEditor from '~/components/TagEditor/TagEditor';
import DeadlineEditor from '~/components/DeadlineEditor/DeadlineEditor';
import ToolsMenu from '~/components/ToolsMenu/ToolsMenu';

import * as usersActions from '~/store/users/actions';
import * as reviewInvitesActions from '~/store/reviewInvites/actions';

import './invited-reviewers-list.scss';

class InvitedReviewersList extends Component {
  handleTagAdd = (user, text) => {
    const { currentUserId, createUserTag } = this.props;
    const tagData = { text, user, tag_author: currentUserId };
    createUserTag(tagData);
  };

  handleDeadlineChange = (id, date) => {
    const { editReviewInvite } = this.props;
    editReviewInvite(id, { decision_deadline: date });
  };

  handleInviteRemove = (articleId, id) => {
    const { removeReviewInvite } = this.props;
    removeReviewInvite(id, articleId);
  };

  getToolsMenuItems(data) {
    const hasReview = data.reviews && data.reviews.length;
    const articleId = data.article.id;

    let items = [
      {
        title: 'Отменить',
        handler: this.handleInviteRemove.bind(null, articleId)
      }
    ];

    if (hasReview) {
      const reviewId = data.reviews[data.reviews.length-1].id;
      items.push({
        title: 'Просмотр рецензии',
        type: 'preview',
        icon: 'preview',
        link: `/article/${articleId}/review/${reviewId}`
      });
    }

    return items;
  }

  get listProps() {
    const { articleData } = this.props;
    const { reviewInvites = [] } = articleData;

    return {
      data: reviewInvites,
      menuTooltip: data => (
        <ToolsMenu id={ data.id } items={ this.getToolsMenuItems(data) } />
      ),
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
          render: data => <DeadlineEditor id={ data.id } date={ data.decision_deadline }
                                          onChange={ this.handleDeadlineChange } />
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
          <TagEditor entityId={ reviewer.id }
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
  removeUserTag: usersActions.removeUserTag,
  removeReviewInvite: reviewInvitesActions.removeReviewInvite,
  editReviewInvite: reviewInvitesActions.editReviewInvite
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvitedReviewersList);
