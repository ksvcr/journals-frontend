import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FieldArray } from 'redux-form';
import nanoid from 'nanoid';

import FieldSetList from '~/components/FieldSetList/FieldSetList';
import ArticleSource from '~/components/ArticleSource/ArticleSource';

class ArticleSourcesForm extends Component {
  renderSourceList = (props) => {
    const { formName } = this.props;

    const initialValues = {
      source: 'search',
      hash: nanoid()
    };

    return (
      <FieldSetList legend="Источник" addText="Добавить источник"
                    initialValues={ initialValues } { ...props }>
        { (field, index, data) => <ArticleSource field={ field } data={ data }
                                                 formName={ formName } /> }
      </FieldSetList>
    );
  };

  render() {
    return (
      <div className="article-sources">
        <h2 className="page__title">Список литературы</h2>
        <div className="form__field">
          <FieldArray name="sources" rerenderOnEveryChange={ true }
                      component={ this.renderSourceList } />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
)(ArticleSourcesForm);
