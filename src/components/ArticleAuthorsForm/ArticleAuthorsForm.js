import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FieldArray, getFormInitialValues, reduxForm } from 'redux-form';

import FieldSetList from '~/components/FieldSetList/FieldSetList';
import AuthorAdd from '~/components/AuthorAdd/AuthorAdd';

class ArticleAuthorsForm extends Component {
  renderAuthorList = (props) => {
    const { formName } = this.props;
    const initialValues = {
      source: 'search'
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
      <form className="article-common" onSubmit={ handleSubmit }>
        <h2 className="page__title">Авторы</h2>
        <div className="form__field">
          <FieldArray name="authors" rerenderOnEveryChange={ true }
                      component={ this.renderAuthorList } />
        </div>
      </form>
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
  const formInitialValuesSelector = getFormInitialValues(formName);
  return {
    form: formName,
    initialValues: {
      ...formInitialValuesSelector(state),
      authors: [{
        type: 'current',
        source: 'search'
      }]
    }
  };
}

export default connect(mapStateToProps)(ArticleAuthorsForm);
