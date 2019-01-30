import React, { Component } from 'react';

import ArticleSource from '~/components/ArticleSource/ArticleSource';
import ArticleSourceTranslateItemForm from '~/components/ArticleSourceTranslateItemForm/ArticleSourceTranslateItemForm';

class ArticleSourceTranslateItem extends Component {
  state = { isEdit: false };

  handleEdit = () => {
    this.setState({ isEdit: true });
  };

  handleSubmit = () => {
    console.log('submit');
    this.setState({ isEdit: false });
  };

  render() {
    const { isEdit } = this.state;
    const { field, index } = this.props;
    return isEdit
      ? <ArticleSourceTranslateItemForm item={ field } index={ index }
                                        onSubmit={ this.handleSubmit } />
      : <ArticleSource index={ index } data={ field }
                       onEdit={ this.handleEdit }
                       isTraslate={ true } />;
  }
}

export default ArticleSourceTranslateItem;
