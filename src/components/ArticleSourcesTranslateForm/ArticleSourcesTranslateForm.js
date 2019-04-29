import React, { Component } from 'react';
import { FieldArray } from 'redux-form';
import nanoid from 'nanoid';
import { withNamespaces } from 'react-i18next';

import ArticleSourceList from '~/components/ArticleSourceList/ArticleSourceList';

class ArticleSourcesTranslateForm extends Component {
  renderSourceList = (props) => {
    const { t, formName, isTranslator } = this.props;

    const initialValues = {
      isEdit: true,
      hash: nanoid()
    };

    return (
      <ArticleSourceList formName={ formName } legend={ t('source') } isTranslator={ isTranslator }
                         initialValues={ initialValues } { ...props } />
    );
  };

  render() {
    const { t } = this.props;
    return (
      <div  className="article-common-translate-form">
        <h2 className="page__title">{ t('source_list') }</h2>
        <div className="form__field">
          <FieldArray name="sources" rerenderOnEveryChange={ true }
                      component={ this.renderSourceList } />
        </div>
      </div>
    );
  }
}

ArticleSourcesTranslateForm = withNamespaces()(ArticleSourcesTranslateForm);

export default ArticleSourcesTranslateForm;
