import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RedactorReviewerList from '~/components/RedactorReviewerList/RedactorReviewerList';
import RedactorReviewTools from '~/components/RedactorReviewTools/RedactorReviewTools';
import RedactorReviewStatus from '~/components/RedactorReviewStatus/RedactorReviewStatus';

import * as articlesActions from '~/store/articles/actions';

import './redactor-review.scss';

class RedactorReview extends Component {
  state = {
    isShowReviewerList: false
  };

  handleReviewerAdd = () => {
    this.setState({
      isShowReviewerList: true
    });
  };

  handleSelfInvite = () => {
    const { articleId, currentUserId, inviteArticleReviewer } = this.props;
    inviteArticleReviewer(articleId, { article: articleId, reviewer: currentUserId });
  };

  render() {
    const { articleData, articleId } = this.props;
    const { isShowReviewerList } = this.state;
    return (
      <div className="redactor-review">
        <div className="redactor-review__top">
          <div className="redactor-review__status">
            <RedactorReviewStatus stage={ articleData.stage } isShowReviewerList={ isShowReviewerList }
                                  onSelfInvite={ this.handleSelfInvite } />
          </div>
          { !isShowReviewerList &&
            <div className="redactor-review__tools">
              <RedactorReviewTools onReviewerAdd={ this.handleReviewerAdd }
                                   onSelfInvite={ this.handleSelfInvite } />
            </div>
          }
        </div>
        { isShowReviewerList &&
          <RedactorReviewerList articleId={ articleId } />
        }
      </div>
    );
  }
}

RedactorReview.propTypes = {
  articleId: PropTypes.number
};

function mapStateToProps(state, props) {
  const { articles, user } = state;
  const { articleId } = props;
  return {
    currentUserId: user.data.id,
    articleData: articles.data[articleId]
  };
}

const mapDispatchToProps = {
  inviteArticleReviewer: articlesActions.inviteArticleReviewer
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(RedactorReview);
