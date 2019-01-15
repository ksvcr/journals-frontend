import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';

import ReqMark from '~/components/ReqMark/ReqMark';
import TextField from '~/components/TextField/TextField';
import FieldSet from '~/components/FieldSet/FieldSet';

import * as validate from '~/utils/validate';

class ArticleCommonTranslateForm extends Component {
  renderFinancingSources = () => {
    const { articleData } = this.props;
    return articleData.financing_sources.map((item, index) => (
      <FieldSet legend={`Грант №${index + 1}`} key={ item.id } >
        <div className="form__field">
          <label htmlFor={ `financing_sources[${index}].organization` } className="form__label">
            Название организации <ReqMark />
          </label>

          <TextField className="text-field_preview" textarea value={ item.organization } readOnly />
          <Field name={ `financing_sources[${index}].organization` } id={ `financing_sources[${index}].organization` }
                 textarea component={ TextField } className="text-field_white"
                 placeholder="Введите перевод" validate={ [validate.required] } />
        </div>
        <div className="form__field">
          <label htmlFor={ `financing_sources[${index}].grant_name` } className="form__label">
            Название гранта <ReqMark />
          </label>
          <TextField className="text-field_preview" textarea value={ item.grant_name } readOnly />
          <Field name={ `financing_sources[${index}].grant_name` } id={ `financing_sources[${index}].grant_name` }
                 textarea component={ TextField } className="text-field_white"
                 placeholder="Введите перевод" validate={ [validate.required] } />
        </div>
      </FieldSet>
    ));
  };

  render() {
    const { articleData } = this.props;
    return (
      <div  className="article-common-translate-form">
        <h2 className="page__title">Общие сведения</h2>

        <div className="form__field">
          <label htmlFor="title" className="form__label">
            Название статьи <ReqMark />
          </label>

          <TextField className="text-field_preview" textarea value={ articleData.title } readOnly />
          <Field name="title" id="title" textarea component={ TextField }
                 placeholder="Введите перевод" validate={ [validate.required] } />
        </div>

        <div className="form__field">
          <label htmlFor="thanks_text" className="form__label">
            Благодарности <ReqMark />
          </label>

          <TextField className="text-field_preview" textarea value={ articleData.thanks_text } readOnly />
          <Field name="thanks_text" id="thanks_text" component={ TextField }
                 placeholder="Введите перевод" validate={ [validate.required] } />
        </div>

        <div className="form__field">
          <label htmlFor="text_to_keywords" className="form__label">
            Ключевые слова <ReqMark />
          </label>

          <TextField className="text-field_preview" textarea value={ articleData.text_to_keywords } readOnly />
          <Field name="text_to_keywords" id="text_to_keywords" component={ TextField }
                 placeholder="Введите перевод" validate={ [validate.required] } />
        </div>

        <div className="form__field">
          <label htmlFor="text_to_keywords" className="form__label">
            Аннотация <ReqMark />
          </label>

          <TextField className="text-field_preview" textarea value={ articleData.text_to_description } readOnly />
          <Field name="text_to_description" id="text_to_description" component={ TextField }
                 placeholder="Введите перевод" validate={ [validate.required] } />
        </div>

        { articleData.conflict_interest &&
          <div className="form__field">
            <label className="form__label">
              Конфликт интересов <ReqMark />
            </label>

            <TextField className="text-field_preview" textarea value={ articleData.conflict_interest } readOnly />
            <Field name="conflict_interest" id="conflict_interest" component={ TextField }
                   placeholder="Введите перевод" validate={ [validate.required] } />
          </div>
        }

        <div className="form__field">
          <label className="form__label">
            Финансирование
          </label>

          { this.renderFinancingSources() }
        </div>
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
)(ArticleCommonTranslateForm);
