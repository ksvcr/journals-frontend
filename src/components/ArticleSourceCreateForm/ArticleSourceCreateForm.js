import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import moment from 'moment';

import TextField from '~/components/TextField/TextField';
import Button from '~/components/Button/Button';
import Select from '~/components/Select/Select';
import Calendar from '~/components/Calendar/Calendar';

import { getLanguagesArray } from '~/store/languages/selector';
import { getRubricsArray } from '~/store/rubrics/selector';

import * as validate from '~/utils/validate';
import ReqMark from '~/components/ReqMark/ReqMark';

class ArticleSourceCreateForm extends Component {
  handleSubmit = (formData) => {
    const { field, onSubmit } = this.props;
    onSubmit(field, formData);
  };

  get languagesOptions() {
    const { languagesArray } = this.props;
    return languagesArray.map(item => ({
      title: item.name,
      value: item.id
    }));
  }

  get rubricsOptions() {
    const { rubricsArray } = this.props;
    return rubricsArray.map(item => ({
      title: item.name,
      value: item.id
    }));
  }
  
  render() {
    const { handleSubmit } = this.props;
    return (
      <form className="article-source-create-form form" onSubmit={ handleSubmit(this.handleSubmit) }>
        <div className="form__field">
          <div className="form__row">
            <div className="form__col form__col_4">
              <label htmlFor="source_last_name" className="form__label">
                Фамилия автора
              </label>
              <Field name="last_name" id="source_last_name" className="text-field_white" component={ TextField }
                     placeholder="Введите фамилию" />
            </div>
            <div className="form__col form__col_4">
              <label htmlFor="source_first_name" className="form__label">
                Инициалы автора
              </label>
              <Field name="first_name" id="source_first_name" className="text-field_white" component={ TextField }
                     placeholder="Введите имя" />
            </div>
            <div className="form__col form__col_4">
              <label htmlFor="source_language" className="form__label">
                Язык оригинала
              </label>
              <Field name="language" id="source_language" className="select_white"
                     component={ props => <Select options={ this.languagesOptions } { ...props } /> } />
            </div>
          </div>
        </div>
        <div className="form__field">
          <label htmlFor="source_title" className="form__label">
            Название на языке оригинала <ReqMark />
          </label>
          <Field name="title" id="source_title" className="text-field_white" component={ TextField }
                 placeholder="Введите название" validate={ [validate.required] } />
        </div>
        <div className="form__field">
          <label htmlFor="source_english_title" className="form__label">
            Название на английском языке <ReqMark />
          </label>
          <Field name="english_title" id="source_english_title" className="text-field_white" component={ TextField }
                 placeholder="Введите название" validate={ [validate.required] } />
        </div>
        <div className="form__field">
          <div className="form__row">
            <div className="form__col form__col_6">
              <label htmlFor="rubric" className="form__label">
                Направление <ReqMark />
              </label>
              <Field name="rubric" id="rubric" className="select_white" validate={ [validate.required] }
                     component={ props => <Select options={ this.rubricsOptions } { ...props } /> } />
            </div>
            <div className="form__col form__col_6">
              <label htmlFor="source_code" className="form__label">
                Шифр специальности <ReqMark />
              </label>
              <Field name="code" id="source_code" className="text-field_white" component={ TextField }
                     placeholder="Введите шифр"  validate={ [validate.required] } />
            </div>
          </div>
        </div>
        <div className="form__field">
          <div className="form__row">
            <div className="form__col form__col_6">
              <label htmlFor="source_city" className="form__label">
                Город защиты <ReqMark />
              </label>
              <Field name="city" id="source_city" className="text-field_white" component={ TextField }
                     placeholder="Введите город" validate={ [validate.required] } />
            </div>
            <div className="form__col form__col_2">
              <label htmlFor="source_date" className="form__label">
                Дата защиты <ReqMark />
              </label>
              <Field name="date" id="source_date" validate={ [validate.required] }
                     component={ props =>  <Calendar className="text-field_white"
                                                     customInput={ <TextField meta={ props.meta } /> }
                                                     selected={ props.input.value || moment() } { ...props } /> } />
            </div>
            <div className="form__col form__col_2">
              <label htmlFor="source_confirm" className="form__label">
                Утверждена <ReqMark />
              </label>
              <Field name="confirm" id="source_confirm" validate={ [validate.required] }
                     component={ props =>  <Calendar className="text-field_white"
                                                     customInput={ <TextField meta={ props.meta } /> }
                                                     selected={ props.input.value } { ...props } /> } />
            </div>
            <div className="form__col form__col_2">
              <label htmlFor="source_count" className="form__label">
                Количество стр. <ReqMark />
              </label>
              <Field name="count" id="source_count" className="text-field_white" component={ TextField }
                     placeholder="0 стр." validate={ [validate.required] } />
            </div>
          </div>
        </div>
        <div className="form__field">
          <div className="form__row">
            <div className="form__col form__col_4">
              <label htmlFor="source_url" className="form__label">
                URL публикации
              </label>
              <Field name="url" id="source_url" className="text-field_white" component={ TextField }
                     placeholder="Введите URL" />
            </div>
            <div className="form__col form__col_4">
              <label htmlFor="source_doi" className="form__label">
                DOI
              </label>
              <Field name="doi" id="source_doi" className="text-field_white" component={ TextField }
                     placeholder="Введите DOI" />
            </div>
            <div className="form__col form__col_4">
              <label htmlFor="source_number" className="form__label">
                № в списке
              </label>
              <Field name="number" id="source_number" className="text-field_white" component={ TextField }
                     placeholder="Введите номер" />
            </div>
          </div>
        </div>
        <div className="form__field">
          <Button type="submit" className="button_orange"> Сохранить </Button>
        </div>
      </form>
    );
  }
}

ArticleSourceCreateForm = reduxForm({
  destroyOnUnmount: false
})(ArticleSourceCreateForm);

function mapStateToProps(state, props) {
  const { formName, data } = props;
  const languagesArray = getLanguagesArray(state);
  const rubricsArray = getRubricsArray(state);

  return {
    form: formName,
    languagesArray,
    rubricsArray,
    initialValues: {
      language: languagesArray.length ? languagesArray[0].id : null,
      rubric: rubricsArray.length ? rubricsArray[0].id : null,
      date: moment(),
      confirm: moment(),
      ...data
    }
  };
}

export default connect(mapStateToProps)(ArticleSourceCreateForm);

