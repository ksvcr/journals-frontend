import React, { Component } from 'react';
import { connect } from 'react-redux';

import List from '~/components/List/List';

import * as reviewInvitesActions from '~/store/reviewInvites/actions';
import { getReviewInvitesArray } from '~/store/reviewInvites/selector';
import InterestList from '~/components/InterestList/InterestList';
import Button from '~/components/Button/Button';
import Icon from '~/components/Icon/Icon';

class InvitedReviewersList extends Component {
  componentDidMount() {
    const { fetchReviewInvites, articleId } = this.props;
    fetchReviewInvites({ article: articleId });
  }

  get listProps() {
    const { reviewInvitesArray } = this.props;

    return {
      data: reviewInvitesArray,
      box: this.renderBox,
      cells: [
        {
          style: {
            width: '25%'
          },
          render: (data) => data.reviewer
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

function mapStateToProps(state) {
  return {
    reviewInvitesArray: getReviewInvitesArray(state)
  };
}

const mapDispatchToProps = {
  fetchReviewInvites: reviewInvitesActions.fetchReviewInvites,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvitedReviewersList);
