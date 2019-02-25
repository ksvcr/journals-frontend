import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';

import List from '~/components/List/List';
import ToolsMenu from '~/components/ToolsMenu/ToolsMenu';
import PaginateLine from '~/components/PaginateLine/PaginateLine';
import StatusLabel from '~/components/StatusLabel/StatusLabel';
import TagEditor from '~/components/TagEditor/TagEditor';

import { getArticlesArray } from '~/store/articles/selector';
import * as articlesActions from '~/store/articles/actions';

import * as formatDate from '~/services/formatDate';

import './corrector-article-list.scss';

class CorrectorArticleList extends Component {
  getToolsMenuItems(data) {
    return [
      {
        title: 'Править',
        handler: `/article/${data.id}/correct`
      },
      {
        title: 'Просмотр',
        type: 'preview',
        icon: 'preview',
        link: `/article/${data.id}`
      }
    ];
  };

  handlePaginateChange = (paginate) => {
    const { onUpdateRequest } = this.props;
    onUpdateRequest({ paginate });
  };

  handleTagAdd = (article, text) => {
    const { userData, createArticleTag } = this.props;
    const tagData = { article, text, user: userData.id, user_role: userData.role };
    createArticleTag(article, tagData);
  };

  handleSortChange = (ordering) => {
    const { onUpdateRequest } = this.props;
    onUpdateRequest({ ordering });
  };

  get listProps() {
    const { t, articlesArray, sitesData } = this.props;

    return {
      data: articlesArray,
      onSortChange: this.handleSortChange,
      head: true,
      menuTooltip: (data) => <ToolsMenu id={ data.id } items={ this.getToolsMenuItems(data) } />,
      box: this.renderBox,
      cells: [
        {
          style: {
            width: '40%'
          },
          isMain: true,
          head: () => t('title'),
          render: (data) =>
            data.title || 'Название статьи не указано'
        },
        {
          style: {
            width: '20%'
          },
          sort: 'site',
          head: () => 'Журнал',
          render: (data) => {
            const siteId = data.site;
            const site = sitesData[siteId];
            return site ? site.name : 'Журнал не найден';
          }
        },
        {
          style: {
            width: '15%'
          },
          sort: 'date_send_to_review',
          head: () => 'Отправлена',
          render: (data) =>
            formatDate.toString(data.date_send_to_review)
        },
        {
          style: {
            width: '10%',
            textAlign: 'center'
          },
          sort: '',
          head: () => 'Знаков',
          render: (data) => {
            // TODO: Количество символов из апи
            return data.count || 0;
          }
        },
        {
          style: {
            width: '15%'
          },
          head: () => t('state'),
          render: (data) =>
            <StatusLabel status={ data.state_article } />
        }
      ]
    };
  }

  renderBox = (data) => {
    const { removeArticleTag } = this.props;
    return (
      <div className="corrector-article-list__box">
        <div className="corrector-article-list__tags">
          <TagEditor entityId={ data.id } data={ data.tags }
                     onAdd={ this.handleTagAdd } onRemove={ removeArticleTag } />
        </div>
      </div>
    );
  };

  render() {
    const { total, paginate } = this.props;
    return (
      <div className="corrector-article-list">
        <div className="corrector-article-list__holder">
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
  const { articles, sites, user } = state;
  const { total, paginate } = articles;
  return {
    articlesArray: getArticlesArray(state),
    sitesData: sites.data,
    userData: user.data,
    total, paginate
  };
}

const mapDispatchToProps = {
  createArticleTag: articlesActions.createArticleTag,
  removeArticleTag: articlesActions.removeArticleTag
};

CorrectorArticleList = withNamespaces()(CorrectorArticleList);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CorrectorArticleList);
