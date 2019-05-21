import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';

import List from '~/components/List/List';
import DateFilter from '~/components/DateFilter/DateFilter';
import PaginateLine from '~/components/PaginateLine/PaginateLine';
import StatusLabel from '~/components/StatusLabel/StatusLabel';
import ToolsMenu from '~/components/ToolsMenu/ToolsMenu';
import TagEditor from '~/components/TagEditor/TagEditor';
import ListChecker from '~/components/ListChecker/ListChecker';
import RedactorActions from '~/components/RedactorActions/RedactorActions';

import { getArticlesArray } from '~/store/articles/selector';
import * as articlesActions from '~/store/articles/actions';
import { getUserData } from '~/store/user/selector';

import * as formatDate from '~/services/formatDate';
import { articleStatusOptions } from '~/services/articleStatuses';
import { getArticleStageTitle, articleStageOptions } from '~/services/articleStages';

import './redactor-article-list.scss';

class RedactorArticleList extends Component {
  state = {
    dateField: 'date_create'
  };

  getToolsMenuItems = (data) => {
    const { t } = this.props;
    const tools = [];

    if (data.state_article === 'AWAIT_PUBLICATION' && data.need_translation) {
      tools.push({
        title: t('see_translation'),
        link: `/article/${data.id}/translate`
      });
    }

    tools.push({
      title: t('edit'),
      link: `/article/${data.id}/edit`
    },
    {
      title: t('view'),
      type: 'preview',
      icon: 'preview',
      link: `/article/${data.id}`
    });

    return tools;
  };

  get dateTitle() {
    const { t } =this.props;
    return {
      'date_create': t('created'),
      'date_send_to_review': t('sended'),
      'last_change': t('changed')
    };
  };

  handleSortChange = (ordering) => {
    const { onUpdateRequest } = this.props;
    onUpdateRequest({ ordering });
  };

  handleDateFilterChange = (field, range) => {
    const { onUpdateRequest } = this.props;
    this.setState({ dateField: field });
    onUpdateRequest({ filter: range });
  };

  handleCheckerFilterChange = (name, data) => {
    const { onUpdateRequest } = this.props;
    onUpdateRequest({ filter: { [name]: data } });
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

  get listProps() {
    const { t, articlesArray, sitesData } = this.props;
    const { dateField } = this.state;

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
            width: '30%'
          },
          isMain: true,
          head: () => t('article_title'),
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
            const siteName = sitesData[siteId] && sitesData[siteId].name;
            return siteName || t('journal_not_found');
          }
        },
        {
          style: {
            width: '12%'
          },
          sort: dateField,
          head: () => this.dateTitle[dateField],
          headToolTip: () =>
            <DateFilter field={ dateField }
                        onChange={ this.handleDateFilterChange } />,
          render: (data) =>
            formatDate.toString(data[dateField])
        },
        {
          style: {
            width: '13%'
          },
          sort: 'stage_article',
          head: () => t('stage'),
          headToolTip: () => <ListChecker data={ articleStageOptions } name="stage_article"
                                          onChange={ this.handleCheckerFilterChange } />,
          render: (data) =>
            getArticleStageTitle(data.stage_article)
        },
        {
          style: {
            width: '20%'
          },
          sort: 'state_article',
          head: () => t('state'),
          headToolTip: () => <ListChecker data={ articleStatusOptions } name="state_article"
                                          onChange={ this.handleCheckerFilterChange } />,
          render: (data) =>
            <StatusLabel status={ data.state_article } />
        }
      ]
    };
  }

  renderBox = (data) => {
    const { removeArticleTag } = this.props;
    return (
      <div className="redactor-article-list__box">
        <div className="redactor-article-list__tags">
          <TagEditor entityId={ data.id } data={ data.tags }
                     onAdd={ this.handleTagAdd } onRemove={ removeArticleTag } />
        </div>
        <div className="redactor-article-list__actions">
          <RedactorActions articleId={ data.id } />
        </div>
      </div>
    );
  };

  render() {
    const { total, paginate } = this.props;
    return (
      <div className="redactor-article-list">
        <div className="redactor-article-list__holder">
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
  const { sites, articles } = state;
  const { total, paginate } = articles;
  const { id:userId, userRole } = getUserData(state);
  return {
    userId,
    userRole,
    articlesArray: getArticlesArray(state),
    sitesData: sites.data,
    total, paginate
  };
}

const mapDispatchToProps = {
  createArticleTag: articlesActions.createArticleTag,
  removeArticleTag: articlesActions.removeArticleTag
};

RedactorArticleList = withNamespaces()(RedactorArticleList);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RedactorArticleList);
