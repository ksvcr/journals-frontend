import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import List from '~/components/List/List';
import PaginateLine from '~/components/PaginateLine/PaginateLine';
import StatusLabel from '~/components/StatusLabel/StatusLabel';
import ToolsMenu from '~/components/ToolsMenu/ToolsMenu';
import DeadlineLabel from '~/components/DeadlineLabel/DeadlineLabel';

import { getArticlesArray } from '~/store/articles/selector';

import * as formatDate from '~/services/formatDate';
import { getArticleStageTitle } from '~/services/articleStages';

import './articles-for-review-list.scss';

class ArticlesForReviewList extends Component {
  state = {
    box: null,
    dateField: 'date_create'
  };

  get toolsMenuItems() {
    return [
      {
        title: 'Просмотр',
        type: 'preview',
        icon: 'preview',
        handler: this.handlePreview
      }
    ];
  };

  handleSortChange = (ordering) => {
    const { onUpdateRequest } = this.props;
    onUpdateRequest({ ordering });
  };

  handlePreview = (id) => {
    const { push } = this.props;

    setTimeout(() => {
      push(`/article/${id}`);
    }, 0);
  };

  handlePaginateChange = (paginate) => {
    const { onUpdateRequest } = this.props;
    onUpdateRequest({ paginate });
  };

  get listProps() {
    const { articlesArray, reviewInvites, reviewInvitesArticlesMap } = this.props;
    const { dateField } = this.state;

    return {
      data: articlesArray,
      onSortChange: this.handleSortChange,
      head: true,
      menuTooltip: (data) => <ToolsMenu id={ data.id } items={ this.toolsMenuItems } />,
      cells: [
        {
          style: {
            width: '50%'
          },
          isMain: true,
          head: () => 'Название',
          render: (data) =>
            data.title || 'Название статьи не указано'
        },
        {
          style: {
            width: '13%'
          },
          sort: 'date_create',
          head: () => 'Создана',
          render: (data) =>
            formatDate.toString(data[dateField])
        },
        {
          style: {
            width: '20%'
          },
          sort: 'stage_article',
          head: () => 'Этап',
          render: (data) =>
            getArticleStageTitle(data.stage)
        },
        {
          style: {
            width: '17%'
          },
          sort: 'state_article',
          head: () => 'Статус',
          render: (data) => {
            const inviteId = reviewInvitesArticlesMap[data.id];
            const invite = reviewInvites[inviteId];
            return (
              <React.Fragment>
                <StatusLabel status={data.state_article} />
                { invite &&
                  <div className="articles-for-review-list__deadline">
                    <DeadlineLabel date={ invite.decision_deadline } />
                  </div>
                }
              </React.Fragment>
            );
          }
        }
      ]
    };
  }

  render() {
    const { total, paginate } = this.props;
    return (
      <div className="articles-for-review-list">
        <div className="articles-for-review-list__holder">
          <List { ...this.listProps } />
        </div>

        { total > 0 &&
          <PaginateLine onChange={ this.handlePaginateChange } total={ total } { ...paginate } />
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { articles, reviewInvites } = state;
  const { total, paginate } = articles;
  return {
    articlesArray: getArticlesArray(state),
    reviewInvites: reviewInvites.data,
    reviewInvitesArticlesMap: reviewInvites.article || {},
    total, paginate
  };
}

const mapDispatchToProps = {
  push
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(ArticlesForReviewList);
