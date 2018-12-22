import React, { Component } from 'react';
import './article-top-tools.scss';

class ArticleTopTools extends Component {
  render() {
    return (
      <div className="article-top-tools">
        { this.props.children }
      </div>
    );
  }
}

export default ArticleTopTools;
