import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import List from '~/components/List/List';
import DateFilter from '~/components/DateFilter/DateFilter';
import PaginateLine from '~/components/PaginateLine/PaginateLine';
import StatusLabel from '~/components/StatusLabel/StatusLabel';
import ToolsMenu from '~/components/ToolsMenu/ToolsMenu';
import TagEditor from '~/components/TagEditor/TagEditor';
import ListChecker from '~/components/ListChecker/ListChecker';

import { getArticlesArray } from '~/store/articles/selector';
import * as articlesActions from '~/store/articles/actions';

import * as formatDate from '~/services/formatDate';
import { getArticleStatusTitle, getArticleStatusOptions } from '~/services/articleStatuses';

import './redactor-article-list.scss';

const articleOptions = getArticleStatusOptions();

class RedactorArticleList extends Component {
  state = {
    dateField: 'date_create'
  };

  get toolsMenuItems() {
    return [
      {
        title: 'Редактировать',
        handler: this.handleEdit
      },
      {
        title: 'Отозвать'
      },
      {
        title: 'Просмотр',
        type: 'preview',
        icon: 'preview',
        handler: this.handlePreview
      }
    ];
  };

  get dateTitle() {
    return {
      'date_create': 'Создана',
      'date_send_to_review': 'Отправлена',
      'last_change': 'Изменена'
    };
  };

  handleSortChange = (ordering) => {
    const { onUpdateRequest } = this.props;
    onUpdateRequest({ ordering });
  };

  handleEdit = (id) => {
    const { push } = this.props;

    setTimeout(() => {
      push(`/edit/${id}`);
    }, 0);
  };

  handlePreview = (id) => {
    const { push } = this.props;

    setTimeout(() => {
      push(`/article/${id}`);
    }, 0);
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
    const { articlesArray, sitesData } = this.props;
    const { dateField } = this.state;

    return {
      data: articlesArray,
      onSortChange: this.handleSortChange,
      head: true,
      menuTooltip: (data) => <ToolsMenu id={ data.id } items={ this.toolsMenuItems } />,
      box: this.renderBox,
      cells: [
        {
          style: {
            width: '30%'
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
          head: () => 'Этап',
          headToolTip: () => <ListChecker data={ articleOptions } name="stage_article"
                                          onChange={ this.handleCheckerFilterChange } />,
          render: (data) =>
            getArticleStatusTitle(data.stage)
        },
        {
          style: {
            width: '20%'
          },
          sort: 'state_article',
          head: () => 'Статус',
          headToolTip: () => <ListChecker data={ articleOptions } name="state_article"
                                          onChange={ this.handleCheckerFilterChange } />,
          render: (data) =>
            <StatusLabel status={ data.state_article } />
        }
      ]
    };
  }

  renderBox = (data) => {
    return (
      <div className="redactor-article-list__editor">
        <TagEditor id={ data.id } data={ data.tags } onChange={ this.handleTagAdd } />
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
  const { sites, articles, user } = state;
  const { total, paginate } = articles;
  return {
    userId: user.data.id,
    userRole: user.data.role,
    articlesArray: getArticlesArray(state),
    sitesData: sites.data,
    total, paginate
  };
}

const mapDispatchToProps = {
  push,
  createArticleTag: articlesActions.createArticleTag
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(RedactorArticleList);
