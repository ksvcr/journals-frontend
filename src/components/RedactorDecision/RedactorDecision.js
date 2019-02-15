import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as articlesActions from '~/store/articles/actions';

import MultiSwitch from '~/components/MultiSwitch/MultiSwitch';
import ReviewApprove from '~/components/ReviewApprove/ReviewApprove';
import Button from '~/components/Button/Button';

import './redactor-decision.scss';

class RedactorDecision extends Component {
  state = {
    decision: null
  };

  componentDidMount() {
    const { fetchArticleReviewInvites, articleId } = this.props;
    fetchArticleReviewInvites({ article: articleId });
  }

  handleChange = (value) => {
    this.setState({
      decision: value
    });
  };

  handleSave = () => {
    const { articleId, editArticle } = this.props;
    const { decision } = this.state;
    editArticle(articleId, { state_article: decision });
  };

  get options() {
    const { articleState } = this.props;

    switch (articleState) {
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
    }
  }

  render() {
    const { decision } = this.state;
    const { articleId, reviews } = this.props;
    return (
      <div className="redactor-decision">
        { this.options.length > 0 &&
          <div className="redactor-decision__switch">
            <MultiSwitch options={ this.options } name={ `decision-${articleId}` } value={ decision }
                         onChange={ this.handleChange } />
          </div>
        }

        { decision === 'AWAIT_PAYMENT' &&
          <ReviewApprove articleId={ articleId } />
        }

        { decision &&
          <div className="redactor-decision__bottom">
            <Button type="button" className="button_orange" onClick={ this.handleSave }>
              Отправить
            </Button>
          </div>
        }
      </div>
    );
  }
}

RedactorDecision.propTypes = {
  articleId: PropTypes.number
};

function mapStateToProps(state, props) {
  const { articles } = state;
  const { articleId } = props;

  const articleData = articles.data[articleId];

  return {
    articleState: articleData && articleData.state_article
  };
}

const mapDispatchToProps = {
  editArticle: articlesActions.editArticle,
  fetchArticleReviewInvites: articlesActions.fetchArticleReviewInvites
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RedactorDecision);
