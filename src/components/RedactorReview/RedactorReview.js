import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RedactorReviewerList from '~/components/RedactorReviewerList/RedactorReviewerList';
import RedactorReviewTools from '~/components/RedactorReviewTools/RedactorReviewTools';
import RedactorReviewStatus from '~/components/RedactorReviewStatus/RedactorReviewStatus';
import InvitedReviewersList from '~/components/InvitedReviewersList/InvitedReviewersList';
import PreliminaryRevisionForm from '~/components/PreliminaryRevisionForm/PreliminaryRevisionForm';
import RedactorCollapseButton from '~/components/RedactorCollapseButton/RedactorCollapseButton';
import Collapse from '~/components/Collapse/Collapse';

import * as articlesActions from '~/store/articles/actions';
import { getUserData } from '~/store/user/selector';

import './redactor-review.scss';

class RedactorReview extends Component {
  state = {
    isShowReviewerList: false
  };

  get invitesCount() {
    const { articleData } = this.props;
    return articleData && articleData.reviewInvites ? articleData.reviewInvites.length : 0;
  }

  componentDidMount() {
    const { fetchArticleReviewInvites, articleId } = this.props;
    fetchArticleReviewInvites({ article: articleId });
  }

  handleReviewerAdd = () => {
    this.setState({
      isShowReviewerList: true
    });
  };

  handleReviewerListClose = () => {
    this.setState({
      isShowReviewerList: false
    });
  };

  handleSelfInvite = () => {
    const {
      articleId,
      currentUserId,
      inviteArticleReviewer,
      fetchArticleReviewInvites
    } = this.props;
    inviteArticleReviewer(articleId, {
      article: articleId,
      reviewer: currentUserId
    }).then(() => {
      return fetchArticleReviewInvites({ article: articleId });
    });
  };

  renderCollapseButton = props => {
    const { t } = this.props;
    return (
      <RedactorCollapseButton { ...props }>
        { `${ t('reviewers') } (${this.invitesCount})` }
      </RedactorCollapseButton>
    );
  };

  renderCollapsePreliminaryButton = props => {
    const { t } = this.props;
    return (
      <RedactorCollapseButton { ...props }>
        { t('preliminary_revision') }
      </RedactorCollapseButton>
    );
  };

  render() {
    const { articleData, articleId } = this.props;
    const { isShowReviewerList } = this.state;
    return (
      <div className="redactor-review">
        <div className="redactor-review__top">
          <div className="redactor-review__status">
            <RedactorReviewStatus
              stage={ articleData && articleData.stage }
              isShowReviewerList={ isShowReviewerList }
              onSelfInvite={ this.handleSelfInvite }
            />
          </div>
          { !isShowReviewerList && (
            <div className="redactor-review__tools">
              <RedactorReviewTools
                onReviewerAdd={ this.handleReviewerAdd }
                onSelfInvite={ this.handleSelfInvite }
              />
            </div>
          ) }
        </div>

        { isShowReviewerList && (
          <RedactorReviewerList
            onClose={ this.handleReviewerListClose }
            articleId={ articleId }
          />
        ) }

        <Collapse customHead={ this.renderCollapsePreliminaryButton }>
          <PreliminaryRevisionForm articleId={ articleId } />
        </Collapse>

        { this.invitesCount > 0 && (
          <Collapse customHead={ this.renderCollapseButton }>
            <InvitedReviewersList articleId={ articleId } />
          </Collapse>
        ) }
      </div>
    );
  }
}

RedactorReview.propTypes = {
  articleId: PropTypes.number
};

function mapStateToProps(state, props) {
  const { articles } = state;
  const { articleId } = props;
  const { id:currentUserId } = getUserData(state);
  return {
    currentUserId,
    articleData: articles.data[articleId]
  };
}

const mapDispatchToProps = {
  inviteArticleReviewer: articlesActions.inviteArticleReviewer,
  fetchArticleReviewInvites: articlesActions.fetchArticleReviewInvites
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RedactorReview);
