import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as reviewInvitesActions from '~/store/reviewInvites/actions';
import { getReviewInvitesArray } from '~/store/reviewInvites/selector';

class InvitedReviewersList extends Component {
  componentDidMount() {
    const { fetchReviewInvites, articleId } = this.props;
    fetchReviewInvites({ article: articleId });
  }

  render() {
    return (
      <div className="invited-reviewers-list">
        Список приглашенных рецензентов
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
