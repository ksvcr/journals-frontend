import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import List from '~/components/List/List';
import TagEditor from '~/components/TagEditor/TagEditor';
import DeadlineEditor from '~/components/DeadlineEditor/DeadlineEditor';
import ToolsMenu from '~/components/ToolsMenu/ToolsMenu';

import * as usersActions from '~/store/users/actions';

import './invited-reviewers-list.scss';

class InvitedReviewersList extends Component {
  handleTagAdd = (user, text) => {
    const { currentUserId, createUserTag } = this.props;
    const tagData = { text, user, tag_author: currentUserId };
    createUserTag(tagData);
  };

  handleDeadlineChange = (date) => {
    console.log(date);
  };

  getToolsMenuItems(data) {
    const hasReview = data.reviews && data.reviews.length;

    let items = [
      {
        title: 'Отменить',
        handler: id => console.log(`Cancel ${id}`)
      }
    ];

    if (hasReview) {
      items.push({
        title: 'Просмотр рецензии',
        type: 'preview',
        icon: 'preview',
        handler: this.handleReviewPreview.bind(null, data)
      });
    }

    return items;
  }

  handleReviewPreview = (data) => {
    const { push } = this.props;
    const articleId = data.article.id;
    const reviewId = data.reviews[data.reviews.length-1].id;
    push(`/article/${articleId}/review/${reviewId}`);
  };

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
          render: data => <DeadlineEditor date={ data.decision_deadline }
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
  push,
  createUserTag: usersActions.createUserTag,
  removeUserTag: usersActions.removeUserTag
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvitedReviewersList);
