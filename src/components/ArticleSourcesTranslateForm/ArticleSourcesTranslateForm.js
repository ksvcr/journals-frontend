import React, { Component } from 'react';
import { FieldArray } from 'redux-form';
import nanoid from 'nanoid';

import ArticleSourceList from '~/components/ArticleSourceList/ArticleSourceList';

class ArticleSourcesTranslateForm extends Component {
  renderSourceList = (props) => {
    const { formName, isTranslator } = this.props;

    const initialValues = {
      isEdit: true,
      hash: nanoid()
    };

    return (
      <ArticleSourceList formName={ formName } legend="Источник" isTranslator={ isTranslator }
                         initialValues={ initialValues } { ...props } />
    );
  };

  render() {
    return (
      <div  className="article-common-translate-form">
        <h2 className="page__title">Список литературы</h2>
        <div className="form__field">
          <FieldArray name="sources" rerenderOnEveryChange={ true }
                      component={ this.renderSourceList } />
        </div>
      </div>
    );
  }
}

export default ArticleSourcesTranslateForm;
