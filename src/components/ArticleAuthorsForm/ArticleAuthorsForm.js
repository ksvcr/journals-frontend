import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FieldArray, formValueSelector, reduxForm } from 'redux-form';
import nanoid from 'nanoid';

import FieldSetList from '~/components/FieldSetList/FieldSetList';
import AuthorAdd from '~/components/AuthorAdd/AuthorAdd';


class ArticleAuthorsForm extends Component {
  renderAuthorList = (props) => {
    const { formName } = this.props;

    const initialValues = {
      source: 'search',
      hash: nanoid()
    };

    return (
      <FieldSetList legend="Автор" addText="Добавить автора"
                    initialValues={ initialValues } { ...props }>
        { (field, index, data) => <AuthorAdd field={ field } data={ data }
                                             formName={ formName } /> }
      </FieldSetList>
    );
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="article-authors">
        <form className="article-authors__form" onSubmit={ handleSubmit } />
        <h2 className="page__title">Авторы</h2>
        <div className="form__field">
          <FieldArray name="authors" rerenderOnEveryChange={ true }
                      component={ this.renderAuthorList } />
        </div>
      </div>
    );
  }
}

ArticleAuthorsForm = reduxForm({
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(ArticleAuthorsForm);


function mapStateToProps(state, props) {
  const { formName } = props;
  const formSelector = formValueSelector(formName);

  return {
    form: formName,
    authors: formSelector(state, 'authors') || []
  };
}

export default connect(mapStateToProps)(ArticleAuthorsForm);
