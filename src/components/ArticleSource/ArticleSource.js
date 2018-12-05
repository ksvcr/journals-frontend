import React, { Component } from 'react';

import './article-source.scss';

class ArticleSource extends Component {
  get title() {
   const { data } = this.props;
   const parts = ['last_name', 'first_name', 'title'].filter(key => data[key]);
   return parts.reduce((result, key) => {
     return `${result} ${data[key]}`
   }, '')
  }

  render() {
    const { index } = this.props;
    return (
      <div className="article-source">
        <div className="article-source__label">
          { `Источник №${index + 1}` }
        </div>
        <div className="article-source__title">
          { this.title }
        </div>
        <div className="article-source__text">

        </div>
      </div>
    );
  }
}

export default ArticleSource;
