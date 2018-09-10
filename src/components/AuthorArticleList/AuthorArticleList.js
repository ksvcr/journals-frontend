import React, {Component} from 'react';
import {connect} from 'react-redux';

import List from '~/components/List/List';
import ToolTip from '~/components/ToolTip/ToolTip';
import DateFilter from '~/components/DateFilter/DateFilter';
import PaginateLine from '~/components/PaginateLine/PaginateLine';
import FilterButton from '~/components/FilterButton/FilterButton';

import { getArticlesArray } from '~/store/articles/selector';

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
            width: '55%'
          },
          head: () => 'Имя',
          render: (data) =>
            <div>
              { data.id }
            </div>
        },
        {
          style: {
            width: '15%'
          },
          head: () =>
            <ToolTip className="tooltip" position="bottom-start"
                     html={ <DateFilter /> }>
              <FilterButton>
                Создана
              </FilterButton>
            </ToolTip>,
          render: (data) =>
            <div>
              { data.date_public }
            </div>
        },
        {
          style: {
            width: '15%'
          },
          head: () => 'Этап',
          render: (data) =>
            <div>
              { data.id }
            </div>
        },
        {
          style: {
            width: '15%'
          },
          head: () => 'Статус',
          render: (data) =>
            <div>
              { data.id }
            </div>
        }
      ]
    };
  }

  render() {
    const { articlesArray } = this.props;
    return (
      <div className="author-article-list">
        <div className="author-article-list__holder">
          <List { ...this.listProps } />
        </div>
        <div className="author-article-list__paginate">
          <PaginateLine total={ articlesArray.length } />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    articlesArray: getArticlesArray(state)
  };
}

export default connect(
  mapStateToProps,
)(AuthorArticleList);
