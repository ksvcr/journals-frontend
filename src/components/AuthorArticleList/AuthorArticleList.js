import React, {Component} from 'react';
import {connect} from 'react-redux';
import List from '~/components/List/List';
import PaginateLine from '~/components/PaginateLine/PaginateLine';
import { getArticlesArray } from '~/store/articles/selector';

class AuthorArticleList extends Component {
  get articlesData() {
    return [
      {
        id: 1,
        title: 'Проблемы восприятия молодежью сакральных и уникальных природных мест Якутии',
        date: '10.10.2017',
        stage: 'Отправлена',
        status: 'На рассмотрении'
      },
      {
        id: 2,
        title: 'Проблемы восприятия молодежью сакральных и уникальных природных мест Якутии',
        date: '10.10.2017',
        stage: 'Черновик',
        status: 'Требует доработки'
      }
    ];
  }

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
          head: () => 'Создана',
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
    return (
      <div className="author-article-list">
        <div className="author-article-list__holder">
          <List { ...this.listProps } />
        </div>
        <div className="author-article-list__paginate">
          <PaginateLine total={ this.articlesData.length } />
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
