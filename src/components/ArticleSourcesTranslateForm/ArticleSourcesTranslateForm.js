import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Field, FieldArray} from 'redux-form';

import ReqMark from '~/components/ReqMark/ReqMark';
import TextField from '~/components/TextField/TextField';
import FieldSet from '~/components/FieldSet/FieldSet';
import ArticleSourceList from '~/components/ArticleSourceList/ArticleSourceList';

import * as validate from '~/utils/validate';
import nanoid from "nanoid";

class ArticleSourcesTranslateForm extends Component {
  renderSources = () => {
    const { articleData } = this.props;
    return articleData.sources.map((item, index) => (
      <FieldSet legend={`Источник №${index + 1}`} key={ item.id } >
        <div className="form__field">
          <label htmlFor={ `sources[${index}].original_name` } className="form__label">
            Название <ReqMark />
          </label>

          <TextField className="text-field_preview text-field_dark" textarea value={ item.original_name } readOnly />
          <Field name={ `sources[${index}].original_name` } id={ `sources[${index}].original_name` }
                 textarea component={ TextField } className="text-field_white" value={ item.second_name }
                 placeholder="Введите перевод" validate={ [validate.required] } />
        </div>
      </FieldSet>
    ));
  };

  renderSourceList = (props) => {
    const { formName } = this.props;

    const initialValues = {
      isEdit: true,
      hash: nanoid()
    };

    return (
      <ArticleSourceList formName={ formName } legend="Источник" addText="Добавить источник"
                         initialValues={ initialValues } { ...props } />
    );
  };

  render() {
    const { articleData } = this.props;
    return (
      <div  className="article-common-translate-form">
        <h2 className="page__title">Список литературы на английском языке</h2>

        <div className="form__field">
          <FieldArray name="sources" rerenderOnEveryChange={ true }
                      component={ this.renderSourceList } />
        </div>

        { articleData.sources.length > 0 &&
        <div className="form__field">
          <label className="form__label">
            Источники
          </label>

          { this.renderSources() }
        </div>
        }

      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { id } = props;

  return {
    articleData: state.articles.data[id]
  };
}

export default connect(
  mapStateToProps,
)(ArticleSourcesTranslateForm);
