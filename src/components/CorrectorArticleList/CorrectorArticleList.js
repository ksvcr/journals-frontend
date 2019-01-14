import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import List from '~/components/List/List';
import PaginateLine from '~/components/PaginateLine/PaginateLine';
import StatusLabel from '~/components/StatusLabel/StatusLabel';
import ToolsMenu from '~/components/ToolsMenu/ToolsMenu';

import { getArticlesArray } from '~/store/articles/selector';

import * as formatDate from '~/services/formatDate';

class CorrectorArticleList extends Component {
  state = {
    box: null
  };

  get toolsMenuItems() {
    return [
      {
        title: 'Править',
        handler: this.handleCorrect
      },
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

  handleCorrect = (id) => {
    const { push } = this.props;
    push(`/article/${id}/correct/`);
  };

  handlePreview = (id) => {
    const { push } = this.props;
    push(`/article/${id}`);
  };

  handlePaymentClose = () => {
    this.setState({ box: null });
  };

  handlePaginateChange = (paginate) => {
    const { onUpdateRequest } = this.props;
    onUpdateRequest({ paginate });
  };

  get listProps() {
    const { articlesArray, sites } = this.props;

    return {
      data: articlesArray,
      onSortChange: this.handleSortChange,
      head: true,
      menuTooltip: (data) => <ToolsMenu id={ data.id } items={ this.toolsMenuItems } />,
      box: this.renderBox,
      cells: [
        {
          style: {
            width: '40%'
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
            const site = sites.data[siteId];
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
          render: (data) => Math.round(Math.random() * 10000).toLocaleString() // TODO: заменить на реальные данные
        },
        {
          style: {
            width: '15%'
          },
          head: () => 'Статус',
          render: (data) =>
            <StatusLabel status={ data.state_article } />
        }
      ]
    };
  }

  renderBox = (data) => {
    // const { box } = this.state;
    // if (box && box.id === data.id) {
    //   if (box.type === 'payment') {
    //     return <Payment onClose={ this.handlePaymentClose } />;
    //   }
    // }

    return null;
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
  return {
    articlesArray: getArticlesArray(state),
    sites,
    total, paginate
  };
}

const mapDispatchToProps = {
  push
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(CorrectorArticleList);
