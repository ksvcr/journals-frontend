import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as articleHistoryActions from '~/store/articleHistory/actions';

import List from '~/components/List/List';
import { withNamespaces } from 'react-i18next';

import * as formatDate from '~/services/formatDate';
import { getArticleActionTitle } from '~/services/articleActions';
import { getArticleStageTitle } from '~/services/articleStages';
import { getUserRoleTitle } from '~/services/userRoles';

import './article-history.scss';

class ArticleHistory extends Component {
  componentDidMount() {
    const { articleId, fetchArticleHistory } = this.props;
    fetchArticleHistory(articleId);
  }

  get listProps() {
    const { t, articleHistoryArray } = this.props;

    return {
      data: articleHistoryArray,
      head: true,
      cells: [
        {
          style: {
            width: '25%'
          },
          head: () => t('time'),
          render: ({ date_create }) => {
            return <div className="article-history__time"> { formatDate.toStringWithTime(date_create) } </div>
          }
        },
        {
          style: {
            width: '25%'
          },
          head: () => t('action'),
          render: ({ action }) => getArticleActionTitle(action)
        },
        {
          style: {
            width: '20%'
          },
          head: () => t('stage'),
          render: ({ stage_article }) => getArticleStageTitle(stage_article)
        },
        {
          style: {
            width: '15%'
          },
          head: () => t('from_whom'),
          render: ({ from_user_role }) => getUserRoleTitle(from_user_role, 'from')
        },
        {
          style: {
            width: '15%'
          },
          head: () => t('to_whom'),
          render: ({ user_role }) => getUserRoleTitle(user_role, 'to')
        }
      ]
    };
  }

  render() {
    return (
      <div className="article-history">
        <div className="article-history__holder">
          <List { ...this.listProps } />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { articleHistory } = state;
  const { articleId } = props;
  const articleHistoryArray = articleHistory.data[articleId] || [];

  return {
    articleHistoryArray
  };
}

const mapDispatchToProps = {
  fetchArticleHistory: articleHistoryActions.fetchArticleHistory
};

ArticleHistory = withNamespaces()(ArticleHistory);


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleHistory);
