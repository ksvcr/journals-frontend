import React, {Component} from 'react';
import {connect} from 'react-redux';

import List from '~/components/List/List';
import DateFilter from '~/components/DateFilter/DateFilter';
import PaginateLine from '~/components/PaginateLine/PaginateLine';
import StatusLabel from '~/components/StatusLabel/StatusLabel';
// import PointMenuButton from '~/components/PointMenuButton/PointMenuButton';

import { getFilteredArticlesArray } from '~/store/articles/selector';
import * as paginateActions from '~/store/paginate/actions';

import * as formatDate from '~/services/formatDate';
import getArticleStatusTitle from '~/services/getArticleStatusTitle';

import './author-article-list.scss';

class AuthorArticleList extends Component {
  handleSortChange = (sort) => {
    const { setSort } = this.props;
    setSort(sort);
  };

  get listProps() {
    const { articlesArray } = this.props;
    return {
      data: articlesArray,
      onSortChange: this.handleSortChange,
      head: true,
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
          sort: {
            field: 'date_public',
            type: 'date'
          },
          head: () =>
            'Создана',
          headToolTip: () =>
            <DateFilter />,
          render: (data) =>
            formatDate.toString(data.date_public)
        },
        {
          style: {
            width: '13%'
          },
          sort: {
            field: 'stage_article',
            type: 'status'
          },
          head: () => 'Этап',
          render: (data) =>
            getArticleStatusTitle(data.stage_article)
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

const mapDispatchToProps = {
  setSort: paginateActions.setSort,
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(AuthorArticleList);
