import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import List from '~/components/List/List';
import ToolsMenu from '~/components/ToolsMenu/ToolsMenu';
import PaginateLine from '~/components/PaginateLine/PaginateLine';
import StatusLabel from '~/components/StatusLabel/StatusLabel';

import { getArticlesArray } from '~/store/articles/selector';
import { getArticleStageTitle } from '~/services/articleStages';

class TranslatorArticleList extends Component {
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

  handlePreview = (id) => {
    const { push } = this.props;

    push(`/article/${id}`);
  };

  handlePaginateChange = (paginate) => {
    const { onUpdateRequest } = this.props;
    onUpdateRequest({ paginate });
  };

  get listProps() {
    const { articlesArray } = this.props;

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
            width: '13%'
          },
          sort: 'stage_article',
          head: () => 'Этап',
          render: (data) =>
            getArticleStageTitle(data.stage)
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
  const { articles } = state;
  const { total, paginate } = articles;
  return {
    articlesArray: getArticlesArray(state),
    total, paginate
  };
}

const mapDispatchToProps = {
  push
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TranslatorArticleList);
