import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import List from '~/components/List/List';
import ToolsMenu from '~/components/ToolsMenu/ToolsMenu';
import PaginateLine from '~/components/PaginateLine/PaginateLine';
import StatusLabel from '~/components/StatusLabel/StatusLabel';
import TagEditor from '~/components/TagEditor/TagEditor';
import TranslateDirection from '~/components/TranslateDirection/TranslateDirection';

import { getArticlesArray } from '~/store/articles/selector';
import * as articlesActions from '~/store/articles/actions';

import * as formatDate from '~/services/formatDate';

import './translator-article-list.scss';

class TranslatorArticleList extends Component {
  get toolsMenuItems() {
    return [
      {
        title: 'Перевести',
        handler: this.handleTranslate
      },
      {
        title: 'Просмотр',
        type: 'preview',
        icon: 'preview',
        handler: this.handlePreview
      }
    ];
  };

  handlePreview = (id) => {
    const { push } = this.props;
    push(`/article/${id}`);
  };

  handleTranslate = (id) => {
    const { push } = this.props;
    push(`/article/${id}/translate`);
  };

  handlePaginateChange = (paginate) => {
    const { onUpdateRequest } = this.props;
    onUpdateRequest({ paginate });
  };

  handleTagAdd = (article, text) => {
    const { userId, userRole, createArticleTag } = this.props;
    const tagData = { article, text, user: userId, user_role: userRole };
    createArticleTag(article, tagData);
  };

  handleSortChange = (ordering) => {
    const { onUpdateRequest } = this.props;
    onUpdateRequest({ ordering });
  };

  get listProps() {
    const { articlesArray, sitesData } = this.props;

    return {
      data: articlesArray,
      onSortChange: this.handleSortChange,
      head: true,
      menuTooltip: (data) => <ToolsMenu id={ data.id } items={ this.toolsMenuItems } />,
      box: this.renderBox,
      cells: [
        {
          style: {
            width: '26%'
          },
          isMain: true,
          head: () => 'Название',
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
            const siteName = sitesData[siteId] && sitesData[siteId].name;
            return siteName || 'Журнал не найден';
          }
        },
        {
          style: {
            width: '12%'
          },
          sort: 'date_send_to_review',
          head: () => 'Отправлена',
          render: (data) => formatDate.toString(data.date_send_to_review)
        },
        {
          style: {
            width: '12%'
          },
          head: () => 'Перевод',
          render: (data) => <TranslateDirection language={data.language}/>
        },
        {
          style: {
            width: '20%'
          },
          head: () => 'Статус',
          render: (data) =>
            <StatusLabel status={ data.state_article } />
        }
      ]
    };
  }

  renderBox = (data) => {
    const { removeArticleTag } = this.props;
    return (
      <div className="translator-article-list__box">
        <div className="translator-article-list__tags">
          <TagEditor entityId={ data.id } data={ data.tags }
                     onAdd={ this.handleTagAdd } onRemove={ removeArticleTag } />
        </div>
      </div>
    );
  };

  render() {
    const { total, paginate } = this.props;
    return (
      <div className="translator-article-list">
        <div className="translator-article-list__holder">
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
  const { articles, sites } = state;
  const { total, paginate } = articles;
  return {
    articlesArray: getArticlesArray(state),
    sitesData: sites.data,
    total, paginate
  };
}

const mapDispatchToProps = {
  push,
  createArticleTag: articlesActions.createArticleTag,
  removeArticleTag: articlesActions.removeArticleTag
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TranslatorArticleList);
