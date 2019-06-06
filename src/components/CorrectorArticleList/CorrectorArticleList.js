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
import { getUserData } from '~/store/user/selector';

import * as formatDate from '~/services/formatDate';

import './corrector-article-list.scss';

class CorrectorArticleList extends Component {
  getToolsMenuItems(data) {
    const { locked_by } = data;
    const { t, userData } = this.props;
    const isLocked = locked_by !== null && locked_by !== userData.id;
    const items = [];

    if (!isLocked) {
      items.push({
        title: t('correct'),
        link: `/article/${data.id}/correct`
      });

      items.push({
        title: t('send_to_editor'),
        handler: id => this.handleProofreadingCommit(id, data)
      });
    }

    items.push({
      title: t('view'),
      type: 'preview',
      icon: 'preview',
      link: `/article/${data.id}`
    });

    return items;
  };

  handleProofreadingCommit = (id, data) => {
    const { editArticle } = this.props;
    const commitData = {
      state_article: data.need_translation ? 'AWAIT_TRANSLATE' : 'AWAIT_PUBLICATION'
    };

    editArticle(id, commitData);
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
      menuTooltip: (data, onClose) => (
        <ToolsMenu id={ data.id } items={ this.getToolsMenuItems(data) } onClose={ onClose } />
      ),
      box: this.renderBox,
      cells: [
        {
          style: {
            width: '40%'
          },
          isMain: true,
          head: () => t('title'),
          render: (data) =>
            data.title || t('title_of_article_not_found')
        },
        {
          style: {
            width: '20%'
          },
          sort: 'site',
          head: () => t('journal'),
          render: (data) => {
            const siteId = data.site;
            const site = sitesData[siteId];
            return site ? site.name : t('journal_not_found');
          }
        },
        {
          style: {
            width: '15%'
          },
          sort: 'date_create',
          head: () => t('sended'),
          render: (data) => formatDate.toString(data.date_create)
        },
        {
          style: {
            width: '25%'
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
  const { articles, sites } = state;
  const { total, paginate } = articles;
  const userData = getUserData(state);

  return {
    articlesArray: getArticlesArray(state),
    sitesData: sites.data,
    userData,
    total, paginate
  };
}

const mapDispatchToProps = {
  createArticleTag: articlesActions.createArticleTag,
  removeArticleTag: articlesActions.removeArticleTag,
  editArticle: articlesActions.editArticle
};

CorrectorArticleList = withNamespaces()(CorrectorArticleList);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CorrectorArticleList);
