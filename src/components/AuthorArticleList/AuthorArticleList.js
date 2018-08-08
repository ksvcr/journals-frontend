import React, {Component} from 'react';
import {connect} from 'react-redux';
import List from '~/components/List/List';
import Paginate from '~/components/Paginate/Paginate';

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
    return {
      data: this.articlesData,
      head: true,
      cells: [
        {
          style: {
            width: '55%'
          },
          head: () => 'Имя',
          render: (data) =>
            <div>
              { data.title }
            </div>
        },
        {
          style: {
            width: '15%'
          },
          head: () => 'Создана',
          render: (data) =>
            <div>
              { data.date }
            </div>
        },
        {
          style: {
            width: '15%'
          },
          head: () => 'Этап',
          render: (data) =>
            <div>
              { data.stage }
            </div>
        },
        {
          style: {
            width: '15%'
          },
          head: () => 'Статус',
          render: (data) =>
            <div>
              { data.status }
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
          <Paginate size={ 15 } />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
)(AuthorArticleList);
