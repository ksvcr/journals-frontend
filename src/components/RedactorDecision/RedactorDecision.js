import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { withNamespaces } from 'react-i18next';

import * as articlesActions from '~/store/articles/actions';

import MultiSwitch from '~/components/MultiSwitch/MultiSwitch';
import ReviewApprove from '~/components/ReviewApprove/ReviewApprove';
import Button from '~/components/Button/Button';

import './redactor-decision.scss';

class RedactorDecision extends Component {
  componentDidMount() {
    const { fetchArticleReviewInvites, articleId } = this.props;
    fetchArticleReviewInvites({ article: articleId });
  }

  handleSubmit = formData => {
    const { articleId, editArticle, editArticleReview } = this.props;
    const { state_article, review_for_approve, comment_for_redactor } = formData;
    editArticle(articleId, { state_article });
    if (review_for_approve) {
      editArticleReview(articleId, review_for_approve, {
        is_approved: true,
        comment_for_redactor
      });
    }
  };

  get options() {
    const { t, currentArticleState } = this.props;

    switch (currentArticleState) {
      case 'AWAIT_REDACTOR':
        return [
          {
            title: t('accept'),
            value: 'AWAIT_PAYMENT',
            color: 'green'
          },
          {
            title: t('finalize'),
            value: 'REVISION',
            color: 'orange'
          },
          {
            title: t('reject'),
            value: 'DISAPPROVED',
            color: 'red'
          }
        ];

      // После оплаты статья отправляется на вычитку корректору
      case 'AWAIT_PAYMENT':
        return [
          {
            title: t('confirm_payment'),
            value: 'AWAIT_PROOFREADING',
            color: 'green'
          }
        ];

      case 'AWAIT_PUBLICATION':
        return [
          {
            title: t('publish'),
            value: 'PUBLISHED',
            color: 'green'
          }
        ];

      default:
        return [];
    }
  }

  render() {
    const { articleId, state_article, handleSubmit, form, currentArticleState } = this.props;
    return (
      <div className="redactor-decision">
        <form
          className="redactor-decision__form"
          onSubmit={ handleSubmit(this.handleSubmit) }
        >
          { this.options.length > 0 && (
            <div className="redactor-decision__switch">
              <Field
                options={ this.options }
                name="state_article"
                component={ MultiSwitch }
              />
            </div>
          ) }

          { currentArticleState === 'AWAIT_REDACTOR' && state_article === 'AWAIT_PAYMENT' && (
            <div className="redactor-decision__reviews">
              <ReviewApprove formName={ form } articleId={ articleId } />
            </div>
          ) }

          { state_article && (
            <div className="redactor-decision__bottom">
              <Button type="submit" className="button_orange">
                Отправить
              </Button>
            </div>
          ) }
        </form>
      </div>
    );
  }
}

RedactorDecision.propTypes = {
  articleId: PropTypes.number
};

RedactorDecision = reduxForm()(RedactorDecision);

function mapStateToProps(state, props) {
  const { articles } = state;
  const { articleId } = props;
  const articleData = articles.data[articleId];
  const formName = `redactor-decision-${articleId}`;
  const formSelector = formValueSelector(formName);
  const defaultReview = articleData && articleData.reviews.length &&  articleData.reviews[0];
  return {
    form: formName,
    state_article: formSelector(state, 'state_article'),
    currentArticleState: articleData && articleData.state_article,
    initialValues: {
      review_for_approve: defaultReview && defaultReview.id,
      comment_for_redactor: defaultReview && defaultReview.comment_for_redactor
    }
  };
}

const mapDispatchToProps = {
  editArticle: articlesActions.editArticle,
  editArticleReview: articlesActions.editArticleReview,
  fetchArticleReviewInvites: articlesActions.fetchArticleReviewInvites
};

RedactorDecision = withNamespaces()(RedactorDecision);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RedactorDecision);
