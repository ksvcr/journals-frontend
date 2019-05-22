import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { push } from 'connected-react-router';
import { withNamespaces } from 'react-i18next';

import TextField from '~/components/TextField/TextField';
import ReqMark from '~/components/ReqMark/ReqMark';
import Button from '~/components/Button/Button';
import ReviewEstimate from '~/components/ReviewEstimate/ReviewEstimate';
import MultiSwitch from '~/components/MultiSwitch/MultiSwitch';
import ReviewsHistory from '~/components/ReviewsHistory/ReviewsHistory';
import ArticleVersions from '~/components/ArticleVersions/ArticleVersions';
import ArticleSpec from '~/components/ArticleSpec/ArticleSpec';

import * as validate from '~/utils/validate';
import getArticleTypes from '~/services/getArticleTypes';

import './review-create-form.scss';

class ReviewCreateForm extends Component {
  componentDidUpdate() {
    const { articleData, push } = this.props;
    if (!articleData) {
      push('/');
    }
  }

  handleEstimateChange = (field, value) => {
    const { change } = this.props;
    change(field, value);
  };

  get recommendationOptions() {
    const { t } = this.props;
    return [
      {
        title: t('accept'),
        value: 1,
        color: 'green'
      },
      {
        title: t('finalize'),
        value: 2,
        color: 'orange'
      },
      {
        title: t('reject'),
        value: 3,
        color: 'red'
      }
    ];
  }

  get commentForAuthorLabel() {
    const { t, reviews, recommendation } = this.props;
    let label = t('review_text');
    const review_round = reviews.length + 1;
    if (recommendation !== 1) {
      label = t('comment_after_review_round', { review_round });
    }
    return label;
  }


  get specData() {
    const { articleData, sitesData, rubricsData, t } = this.props;
    const site = sitesData[articleData.site];
    const types = getArticleTypes();
    const rubric = rubricsData[articleData.rubric];
    return [
      {
        title: `${ t('for_journals') }:`,
        value: site ? site.name : t('journal_not_found')
      },
      {
        title: `${ t('article_category') }:`,
        value: rubric ? rubric.name : t('rubric_not_found')
      },
      {
        title: `${ t('article_type') }:`,
        value: types[articleData.article_type]
      }
    ];
  }

  handleRecommendationChange = (value) => {
    const { change } = this.props;
    value = parseInt(value, 10);
    change('recommendation', value);
  };

  render() {
    const { t, articleData, handleSubmit, recommendation, reviews, author } = this.props;
    return articleData ? (
      <form className="review-create-form" onSubmit={ handleSubmit }>
        <h2 className="page__title">{ articleData.title }</h2>

        <div className="review-create-form__spec">
          <ArticleSpec data={ this.specData } />
        </div>

        <div className="review-create-form__versions">
          <ArticleVersions articleId={ articleData.id }
                           versions={ articleData.versions } />
        </div>

        <div className="form__field">
          <label htmlFor="recommendation" className="form__label">
            { t('your_article_recommendations') }:
          </label>
          <MultiSwitch id="recommendation" name="recommendation" options={ this.recommendationOptions }
                       onChange={ this.handleRecommendationChange } value={ recommendation } />
        </div>

        { recommendation === 2 && reviews.length > 0 &&
          <ReviewsHistory reviews={ reviews } author={ author } isCollapse={ true }/>
        }

        <div className="form__field">
          <label htmlFor="comment_for_author" className="form__label">
            { this.commentForAuthorLabel }
          </label>
          <Field name="comment_for_author" id="comment_for_author" component={ TextField } textarea
                 minRows={ recommendation === 1 ? 20 : 6 }
                 placeholder={ t('enter_review_text') } />
        </div>

        { recommendation === 1 &&
          <div className="review-create-form__estimate">
            <ReviewEstimate onChange={ this.handleEstimateChange } />
          </div>
        }

        <div className="form__field">
          <label htmlFor="comment_for_redactor" className="form__label">
            { t('comment_for_redactor') } ({ t('not_shown_to_author') }) <ReqMark />
          </label>
          <Field name="comment_for_redactor" id="comment_for_redactor" component={ TextField } textarea
                 minRows={ 6 }
                 placeholder={ t('enter_comment_for_redactor') } validate={ [validate.required] } />
        </div>

        <div className="form__field">
          <Button type="submit">{ t('send_review') }</Button>
        </div>
      </form>
    ) : null;
  }
}

ReviewCreateForm = reduxForm({
  form: 'review-create'
})(ReviewCreateForm);

function mapStateToProps(state, props) {
  const { id:articleId } = props;
  const { articles, users, rubrics, sites } = state;
  const selector = formValueSelector('review-create');
  const recommendation = selector(state, 'recommendation');
  const articleData = articles.data[articleId];
  const author = articleData && users.data[articleData.author.user];

  return {
    articleData,
    recommendation,
    rubricsData: rubrics.data,
    sitesData: sites.data,
    initialValues: {
      recommendation: 1
    },
    author
  };
}

const mapDispatchToProps = {
  push
};

ReviewCreateForm = withNamespaces()(ReviewCreateForm);

export default connect(
  mapStateToProps, mapDispatchToProps
)(ReviewCreateForm);
