import React, { Component } from 'react';

import Icon from '~/components/Icon/Icon';

import './article-source.scss';
import './assets/edit.svg';
import './assets/cancel.svg';

class ArticleSource extends Component {
  getTitle(parts, lang) {
   const { data } = this.props;
   let resultString = '';
   if (data.author) {
     const { lastname, initials } = data.author;
     resultString = `${lastname} ${initials} `;
   }

   let params = parts.filter(key => data[key]).reduce((result, key) => {
     let item = data[key];
     if (key === 'page_count') {
       if (lang === 'ru') {
         item = `- ${item} с.`
       } else {
         item = `${item} P`
       }
     }
     return `${result} ${item}`;
   }, '');

   return resultString + params;
  }

  handleRemove = () => {
    const { index, onRemove } = this.props;
    onRemove(index);
  };

  handleEdit = () => {
    const { field, data, onEdit } = this.props;
    onEdit(field, data);
  };

  render() {
    const { index } = this.props;
    return (
      <div className="article-source">
        <div className="article-source__box">
          <div className="article-source__legend">
            { `Источник №${index + 1}` }
          </div>
          <div className="article-source__title">
            { this.getTitle(['original_name', 'page_count'], 'ru') }
          </div>
          <div className="article-source__text">
            { this.getTitle(['original_name', 'page_count'], 'en') }
          </div>
        </div>
        <div className="article-source__tools">
          <button className="article-source__tool" type="button" onClick={ this.handleEdit }>
            <Icon name="edit" className="article-source__icon article-source__icon_edit" />
            Редактировать
          </button>
          <button className="article-source__tool" type="button" onClick={ this.handleRemove }>
            <Icon name="cancel" className="article-source__icon article-source__icon_remove" />
            Удалить
          </button>
        </div>
      </div>
    );
  }
}

export default ArticleSource;
