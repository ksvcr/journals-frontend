import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Icon from '~/components/Icon/Icon';

import './article-top-tools.scss';
import './assets/cancel.svg';

class ArticleTopTools extends Component {
  render() {
    return (
      <div className="article-top-tools">
        <div className="article-top-tools__item">
          <Link className="article-top-tools__link" to="/">
            <Icon name="cancel" className="article-top-tools__icon article-top-tools__icon_cancel" />
            Отмена
          </Link>
        </div>
      </div>
    );
  }
}

export default ArticleTopTools;
