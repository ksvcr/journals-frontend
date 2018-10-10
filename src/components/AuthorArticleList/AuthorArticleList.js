import React, { Component } from 'react';
import { connect } from 'react-redux';

import List from '~/components/List/List';
import DateFilter from '~/components/DateFilter/DateFilter';
import PaginateLine from '~/components/PaginateLine/PaginateLine';
import StatusLabel from '~/components/StatusLabel/StatusLabel';
import ToolsMenu from '~/components/ToolsMenu/ToolsMenu';
import Payment from '~/components/Payment/Payment';

import { getArticlesArray } from '~/store/articles/selector';

import * as formatDate from '~/services/formatDate';
import getArticleStatusTitle from '~/services/getArticleStatusTitle';

import './author-article-list.scss';

class AuthorArticleList extends Component {
  state = {
    box: null,
    dateField: 'date_create'
  };

  get toolsMenuItems() {
    return [
      {
        title: 'Редактировать'
      },
      {
        title: 'Отозвать'
      },
      {
        title: 'Оплатить',
        handler: this.handlePaymentShow
      },
      {
        title: 'Просмотр',
        type: 'preview',
        icon: 'preview'
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

  handlePaymentShow = (id) => {
    this.setState({
      box: { id,  type: 'payment' }
    });
  };

  handlePaymentClose = () => {
    this.setState({ box: null });
  };

  handleDateFilterChange = (field, range) => {
    const { onUpdateRequest } = this.props;
    this.setState({ dateField: field });
    onUpdateRequest({ filter: range });
  };

  handlePaginateChange = (paginate) => {
    const { onUpdateRequest } = this.props;
    onUpdateRequest({ paginate });
  };

  get listProps() {
    const { articlesArray } = this.props;
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
            width: '50%'
          },
          isMain: true,
          head: () => 'Имя',
          render: (data) =>
            data.title
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
          render: (data) =>
            getArticleStatusTitle(data.stage)
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
    const { box } = this.state;
    if (box && box.id === data.id) {
      if (box.type === 'payment') {
        return <Payment onClose={ this.handlePaymentClose } />;
      }
    }

    return null;
  };

  render() {
    const { total, paginate } = this.props;
    return (
      <div className="author-article-list">
        <div className="author-article-list__holder">
          <List { ...this.listProps } />
        </div>

        { total > 0 &&
          <div className="author-article-list__paginate">
            <PaginateLine onChange={ this.handlePaginateChange } total={ total } { ...paginate } />
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { total, paginate } = state.articles;
  return {
    articlesArray: getArticlesArray(state),
    total, paginate
  };
}

export default connect(
  mapStateToProps
)(AuthorArticleList);
