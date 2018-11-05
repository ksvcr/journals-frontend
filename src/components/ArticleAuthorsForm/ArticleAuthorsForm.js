import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FieldArray, formValueSelector } from 'redux-form';
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
    return (
      <div className="article-authors">
        <h2 className="page__title">Авторы</h2>
        <div className="form__field">
          <FieldArray name="authors" rerenderOnEveryChange={ true }
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

export default connect(mapStateToProps)(ArticleAuthorsForm);
