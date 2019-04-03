import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as articleHistoryActions from '~/store/articleHistory/actions';

import List from '~/components/List/List';

class ArticleHistory extends Component {
  componentDidMount() {
    const { articleId, fetchArticleHistory } = this.props;
    fetchArticleHistory(articleId);
  }

  get listProps() {
    const { articleHistoryArray } = this.props;

    return {
      data: articleHistoryArray,
      head: true,
      cells: [
        {
          style: {
            width: '25%'
          },
          head: () => 'Время',
          render: data => data.date_create
        },
        {
          style: {
            width: '25%'
          },
          head: () => 'Действие',
          render: data => data.action
        },
        {
          style: {
            width: '25%'
          },
          head: () => 'Этап',
          render: data => data.state
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleHistory);
