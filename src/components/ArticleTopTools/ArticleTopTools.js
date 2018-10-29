import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class ArticleTopTools extends Component {
  render() {
    return (
      <div className="article-top-tools">
        <div className="article-top-tools__item">
          <Link className="article-top-tools__link" to="/">
            Отмена
          </Link>
        </div>
      </div>
    );
  }
}

export default ArticleTopTools;
