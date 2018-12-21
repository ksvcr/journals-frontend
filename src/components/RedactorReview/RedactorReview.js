import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RedactorReviewerList from '~/components/RedactorReviewerList/RedactorReviewerList';
import RedactorReviewTools from '~/components/RedactorReviewTools/RedactorReviewTools';

import './redactor-review.scss';

class RedactorReview extends Component {
  render() {
    const { articleData, articleId } = this.props;

    return (
      <div className="redactor-review">
        <div className="redactor-review__top">
          <div className="redactor-review__status">
            { articleData.stage === 'REVISION' ?
              'Статья находится на рецензировании' :
              'Рецензент для статьи пока не назначен' }
          </div>
        </div>
        <RedactorReviewTools />

        <RedactorReviewerList articleId={ articleId } />
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
  return {
    articleData: articles.data[articleId],
  };
}

export default connect(
  mapStateToProps
)(RedactorReview);
