import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';

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
  getToolsMenuItems = (data) => {
    const { t, commitArticleTranslation } = this.props;
    return [
      {
        title: 'Перевести',
        link: `/article/${data.id}/translate`
      },
      {
        title: t('send_to_editor'),
        handler: (id) => {
          const languageCode = data.language === 'en' ? 'ru' : 'en';
          commitArticleTranslation(id, languageCode)
        }
      },
      {
        title: 'Просмотр',
        type: 'preview',
        icon: 'preview',
        link: `/article/${data.id}`
      }
    ];
  }

  handlePaginateChange = paginate => {
    const { onUpdateRequest } = this.props;
    onUpdateRequest({ paginate });
  };

  handleTagAdd = (article, text) => {
    const { userId, userRole, createArticleTag } = this.props;
    const tagData = { article, text, user: userId, user_role: userRole };
    createArticleTag(article, tagData);
  };

  handleSortChange = ordering => {
    const { onUpdateRequest } = this.props;
    onUpdateRequest({ ordering });
  };

  get listProps() {
    const { t, articlesArray, sitesData } = this.props;

    return {
      data: articlesArray,
      onSortChange: this.handleSortChange,
      head: true,
      menuTooltip: (data, onClose) => (
        <ToolsMenu id={ data.id } items={ this.getToolsMenuItems(data) } onClose={ onClose } />
      ),
      box: this.renderBox,
      cells: [
        {
          style: {
            width: '26%'
          },
          isMain: true,
          head: () => t('article_title'),
          render: data => data.title || t('title_of_article_not_found')
        },
        {
          style: {
            width: '20%'
          },
          sort: 'site',
          head: () => t('journal'),
          render: data => {
            const siteId = data.site;
            const siteName = sitesData[siteId] && sitesData[siteId].name;
            return siteName || t('journal_not_found');
          }
        },
        {
          style: {
            width: '12%'
          },
          sort: 'date_send_to_review',
          head: () => t('sended'),
          render: data => formatDate.toString(data.date_create)
        },
        {
          style: {
            width: '12%'
          },
          head: () => 'Перевод',
          render: data => <TranslateDirection language={ data.language } />
        },
        {
          style: {
            width: '20%'
          },
          head: () => t('state'),
          render: data => <StatusLabel status={ data.state_article } />
        }
      ]
    };
  }

  renderBox = data => {
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

        { total > 0 && (
          <PaginateLine onChange={ this.handlePaginateChange } total={ total }
                        { ...paginate } />
        ) }
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
    total,
    paginate
  };
}

const mapDispatchToProps = {
  createArticleTag: articlesActions.createArticleTag,
  removeArticleTag: articlesActions.removeArticleTag,
  commitArticleTranslation: articlesActions.commitArticleTranslation
};

TranslatorArticleList = withNamespaces()(TranslatorArticleList);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TranslatorArticleList);
