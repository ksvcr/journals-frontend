import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';

import List from '~/components/List/List';
import PaginateLine from '~/components/PaginateLine/PaginateLine';
import StatusLabel from '~/components/StatusLabel/StatusLabel';
import ToolsMenu from '~/components/ToolsMenu/ToolsMenu';
import DeadlineLabel from '~/components/DeadlineLabel/DeadlineLabel';
import LoaderWrapper from '~/components/LoaderWrapper/LoaderWrapper';

import { getArticlesArray } from '~/store/articles/selector';
import * as articlesActions from '~/store/articles/actions';

import * as formatDate from '~/services/formatDate';
import { getArticleStageTitle } from '~/services/articleStages';

import './articles-for-review-list.scss';

class ArticlesForReviewList extends Component {
  state = {
    box: null,
    dateField: 'date_create'
  };

  getToolsMenuItems(data) {
    const tools = [];
    const { t } = this.props;

    if (data.state_article === 'AWAIT_REVIEWER') {
      tools.push({
        title: t('accept_article'),
        handler: this.handleAcceptInvite
      });
    }

    if (data.state_article === 'AWAIT_REVIEW') {
      tools.push({
        title: t('write_review'),
        link: `/article/${data.id}/review`
      });
    }

    tools.push({
      title: t('view'),
      type: 'preview',
      icon: 'preview',
      link: `/article/${data.id}`
    });

    return tools;
  }

  handleSortChange = ordering => {
    const { onUpdateRequest } = this.props;
    onUpdateRequest({ ordering });
  };

  handleAcceptInvite = id => {
    const { acceptArticleReviewInvite } = this.props;
    acceptArticleReviewInvite(id);
  };

  handlePaginateChange = paginate => {
    const { onUpdateRequest } = this.props;
    onUpdateRequest({ paginate });
  };

  get listProps() {
    const { t, articlesArray, reviewInvites, reviewInvitesArticlesMap } = this.props;
    const { dateField } = this.state;

    return {
      data: articlesArray,
      onSortChange: this.handleSortChange,
      head: true,
      menuTooltip: (data, onClose) => (
        <ToolsMenu id={ data.id } items={ this.getToolsMenuItems(data) }  onClose={ onClose } />
      ),
      cells: [
        {
          style: {
            width: '50%'
          },
          isMain: true,
          head: () => t('article_title'),
          render: data => data.title || t('title_of_article_not_found')
        },
        {
          style: {
            width: '13%'
          },
          sort: 'date_create',
          head: () => t('created'),
          render: data => formatDate.toString(data[dateField])
        },
        {
          style: {
            width: '20%'
          },
          sort: 'stage_article',
          head: () => t('stage'),
          render: data => getArticleStageTitle(data.stage_article)
        },
        {
          style: {
            width: '17%'
          },
          sort: 'state_article',
          head: () => t('state'),
          render: data => {
            const inviteId = reviewInvitesArticlesMap[data.id];
            const invite = reviewInvites[inviteId];
            return (
              <React.Fragment>
                <StatusLabel status={ data.state_article } />
                { invite && (
                  <div className="articles-for-review-list__deadline">
                    <DeadlineLabel date={ invite.decision_deadline } />
                  </div>
                ) }
              </React.Fragment>
            );
          }
        }
      ]
    };
  }

  render() {
    const { total, paginate, isPending } = this.props;
    return (
      <div className="articles-for-review-list">
        <LoaderWrapper isLoading={ isPending }>
          <div className="articles-for-review-list__holder">
            <List { ...this.listProps } />
          </div>

          { total > 0 && (
            <PaginateLine onChange={ this.handlePaginateChange }
                          total={ total } { ...paginate } />
          ) }
        </LoaderWrapper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { articles, reviewInvites } = state;
  const { total, paginate } = articles;
  return {
    isPending: articles.isPending,
    articlesArray: getArticlesArray(state),
    reviewInvites: reviewInvites.data,
    reviewInvitesArticlesMap: reviewInvites.articleId || {},
    total,
    paginate
  };
}

const mapDispatchToProps = {
  acceptArticleReviewInvite: articlesActions.acceptArticleReviewInvite
};

ArticlesForReviewList = withNamespaces()(ArticlesForReviewList);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlesForReviewList);
