import React, {Component} from 'react';
import {connect} from 'react-redux';

import List from '~/components/List/List';
import DateFilter from '~/components/DateFilter/DateFilter';
import PaginateLine from '~/components/PaginateLine/PaginateLine';
import StatusLabel from '~/components/StatusLabel/StatusLabel';
// import PointMenuButton from '~/components/PointMenuButton/PointMenuButton';

import { getFilteredArticlesArray } from '~/store/articles/selector';
import formatDate from '~/services/formatDate';

import './author-article-list.scss';

class AuthorArticleList extends Component {
  get listProps() {
    const { articlesArray } = this.props;
    return {
      data: articlesArray,
      head: true,
      cells: [
        {
          style: {
            width: '50%'
          },
          isMain: true,
          head: () => 'Имя',
          render: (data) =>
            <div>
              { data.title }
            </div>
        },
        {
          style: {
            width: '12%'
          },
          sortField: 'date_public',
          head: () =>
            'Создана',
          headToolTip: () =>
            <DateFilter />,
          render: (data) =>
            <div>
              { formatDate(data.date_public) }
            </div>
        },
        {
          style: {
            width: '13%'
          },
          sortField: 'date_step',
          head: () => 'Этап',
          render: (data) =>
            <div>
              Черновик
            </div>
        },
        {
          style: {
            width: '20%'
          },
          head: () => 'Статус',
          render: (data) =>
            <StatusLabel status={ data.state_article } />
        },
        // {
        //   render: (data) =>
        //     <PointMenuButton />
        // }
      ]
    };
  }

  render() {
    const { total } = this.props;
    return (
      <div className="author-article-list">
        <div className="author-article-list__holder">
          <List { ...this.listProps } />
        </div>
        <div className="author-article-list__paginate">
          <PaginateLine total={ total } />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    articlesArray: getFilteredArticlesArray(state),
    total: state.articles.ids.length
  };
}

export default connect(
  mapStateToProps,
)(AuthorArticleList);
