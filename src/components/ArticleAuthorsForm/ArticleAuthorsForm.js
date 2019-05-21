import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FieldArray, formValueSelector } from 'redux-form';
import nanoid from 'nanoid';
import { withNamespaces } from 'react-i18next';

import FieldSetList from '~/components/FieldSetList/FieldSetList';
import AuthorAdd from '~/components/AuthorAdd/AuthorAdd';

class ArticleAuthorsForm extends Component {
  renderAuthorList = (props) => {
    const { formName, t } = this.props;

    const initialValues = {
      source: 'search',
      hash: nanoid()
    };

    return (
      <FieldSetList legend={ t('author') } addText={ t('add_author') }
                    initialValues={ initialValues } { ...props }>
        { (field, index, data) => <AuthorAdd field={ field } data={ data }
                                             formName={ formName } /> }
      </FieldSetList>
    );
  };

  render() {
    const { t } = this.props;

    return (
      <div className="article-authors">
        <h2 className="page__title">{ t('authors') }</h2>
        <div className="form__field">
          <FieldArray name="authors"
                      component={ this.renderAuthorList } />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { formName } = props;
  const formSelector = formValueSelector(formName);

  return {
    authors: formSelector(state, 'authors') || []
  };
}

ArticleAuthorsForm = withNamespaces()(ArticleAuthorsForm);

export default connect(mapStateToProps)(ArticleAuthorsForm);
