import React, { Component } from 'react';
import { connect } from 'react-redux';

import List from '~/components/List/List';

import './invited-reviewers-list.scss';

class InvitedReviewersList extends Component {
  get listProps() {
    const { articleData } = this.props;
    const { reviewInvites=[] } = articleData;

    return {
      data: reviewInvites,
      box: this.renderBox,
      cells: [
        {
          style: {
            width: '25%'
          },
          render: ({ reviewer }) => {
            const { first_name, last_name } = reviewer;
            return `${first_name} ${last_name}`;
          }
        }
      ]
    };
  }

  render() {
    return (
      <div className="invited-reviewers-list">
        <List { ...this.listProps } />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { articles } = state;
  const { articleId } = props;
  return {
    articleData: articles.data[articleId]
  };
}

export default connect(
  mapStateToProps
)(InvitedReviewersList);
