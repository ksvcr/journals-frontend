import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {reduxForm, Field, formValueSelector} from 'redux-form';

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

  handleSubmit = (formData) => {
    const { articleId, editArticle, editArticleReview } = this.props;
    const { state_article, review_for_approve, comment_for_redactor } = formData;
    editArticle(articleId, { state_article });
    if (review_for_approve) {
      editArticleReview(articleId, review_for_approve, { is_approved: true, comment_for_redactor });
    }
  };

  get options() {
    const { currentArticleState } = this.props;

    switch (currentArticleState) {
      case 'AWAIT_REDACTOR':
        return [
          {
            title: 'Принять',
            value: 'AWAIT_PAYMENT',
            color: 'green'
          },
          {
            title: 'Доработать',
            value: 'REVISION',
            color: 'orange'
          },
          {
            title: 'Отклонить',
            value: 'DISAPPROVED',
            color: 'red'
          }
        ];

      // После оплаты статья отправляется на вычитку корректору
      case 'AWAIT_PAYMENT':
        return [
          {
            title: 'Подтвердить оплату',
            value: 'AWAIT_PROOFREADING',
            color: 'green'
          }
        ];

      case 'AWAIT_PUBLICATION':
        return [
          {
            title: 'Опубликовать',
            value: 'PUBLISHED',
            color: 'green'
          }
        ];

      default:
        return [];
    }
  }

  render() {
    const { articleId, state_article, handleSubmit, form } = this.props;
    return (
      <div className="redactor-decision">
        <form className="redactor-decision__form" onSubmit={ handleSubmit(this.handleSubmit) }>
          { this.options.length > 0 &&
            <div className="redactor-decision__switch">
              <Field options={this.options} name="state_article"
                     component={MultiSwitch}/>
            </div>
          }

          { state_article === 'AWAIT_PAYMENT' &&
            <div className="redactor-decision__reviews">
              <ReviewApprove formName={ form } articleId={ articleId }/>
            </div>
          }

          { state_article &&
            <div className="redactor-decision__bottom">
              <Button type="submit" className="button_orange">
                Отправить
              </Button>
            </div>
          }
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
  return {
    form: formName,
    state_article: formSelector(state, 'state_article'),
    currentArticleState: articleData && articleData.state_article
  };
}

const mapDispatchToProps = {
  editArticle: articlesActions.editArticle,
  editArticleReview: articlesActions.editArticleReview,
  fetchArticleReviewInvites: articlesActions.fetchArticleReviewInvites
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RedactorDecision);
