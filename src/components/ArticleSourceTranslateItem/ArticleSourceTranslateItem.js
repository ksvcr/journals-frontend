import React, { Component } from 'react';

import ArticleSource from '~/components/ArticleSource/ArticleSource';
import ArticleSourceTranslateItemForm from '~/components/ArticleSourceTranslateItemForm/ArticleSourceTranslateItemForm';

class ArticleSourceTranslateItem extends Component {
  state = { isEdit: false };

  handleEdit = () => {
    this.setState({ isEdit: true });
  };

  handleSubmit = (formData) => {
    const { onSubmit } = this.props;
    this.setState({ isEdit: false });
    onSubmit(formData);
  };

  render() {
    const { isEdit } = this.state;
    const { field, index, hash } = this.props;
    return isEdit
      ? <ArticleSourceTranslateItemForm formName={ `source-translate[${hash}]` }
                                        data={ field } index={ index }
                                        onSubmit={ this.handleSubmit }/>
      : <ArticleSource index={ index } data={ field }
                       onEdit={ this.handleEdit }
                       isTraslate={ true } />;
  }
}

export default ArticleSourceTranslateItem;
