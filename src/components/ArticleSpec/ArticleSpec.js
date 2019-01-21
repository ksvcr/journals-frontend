import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './article-spec.scss';

class ArticleSpec extends Component {
  renderItems = () => {
    const { data } = this.props;
    return data.map((item, index) => (
      <div className="article-spec__item" key={ index }>
        <div className="article-spec__label">
          { item.title }
        </div>
        <div className="article-spec__value">
          { item.value }
        </div>
      </div>
    ));
  };

  render() {
    return (
      <div className="article-spec">
        { this.renderItems() }
      </div>
    );
  }
}

ArticleSpec.propTypes = {
  data: PropTypes.array
};

export default ArticleSpec;
