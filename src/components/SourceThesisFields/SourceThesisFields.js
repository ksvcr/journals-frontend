import React from 'react';
import { Field } from 'redux-form';
import moment from 'moment';

import TextField from '~/components/TextField/TextField';
import ReqMark from '~/components/ReqMark/ReqMark';
import * as validate from '~/utils/validate';
import Calendar from '~/components/Calendar/Calendar';
import Select from '~/components/Select/Select';
import SearchableSelect from '~/components/SearchableSelect/SearchableSelect';

const SourceThesisFields = ({ rubricsOptions, languagesOptions, countriesData, countriesArray }) => {
  return (
    <React.Fragment>
      <div className="form__field">
        <div className="form__row">
          <div className="form__col form__col_4">
            <label htmlFor="lastname" className="form__label">
              Фамилия автора <ReqMark />
            </label>
            <Field name="author.lastname" id="lastname" className="text-field_white" component={ TextField }
                   placeholder="Введите фамилию автора" validate={ [validate.required] } />
          </div>
          <div className="form__col form__col_4">
            <label htmlFor="initials" className="form__label">
              Инициалы автора <ReqMark />
            </label>
            <Field name="author.initials" id="initials" className="text-field_white" component={ TextField }
                   placeholder="Введите инициалы автора" validate={ [validate.required] } />
          </div>
          <div className="form__col form__col_4">
            <label htmlFor="source_language" className="form__label">
              Язык оригинала
            </label>
            <Field name="language" id="source_language" className="select_white"
                   component={ props => <Select options={ languagesOptions } { ...props } /> } />
          </div>
        </div>
      </div>

      <div className="form__field">
        <label htmlFor="original_source_name" className="form__label">
          Название на языке оригинала <ReqMark />
        </label>
        <Field name="original_name" id="original_source_name" className="text-field_white" component={ TextField }
               placeholder="Введите название" validate={ [validate.required] } />
      </div>

      <div className="form__field">
        <label htmlFor="second_source_name" className="form__label">
          Название на английском языке
        </label>
        <Field name="second_source_name" id="second_source_name" className="text-field_white" component={ TextField }
               placeholder="Введите название" />
      </div>

      <div className="form__field">
        <div className="form__row">
          <div className="form__col form__col_6">
            <label htmlFor="source_rubric" className="form__label">
              Направление <ReqMark />
            </label>
            <Field name="rubric" id="source_rubric" className="select_white" validate={ [validate.required] }
                   component={ props => <Select options={ rubricsOptions } { ...props } /> } />
          </div>
          <div className="form__col form__col_6">
            <label htmlFor="specialty_code" className="form__label">
              Шифр специальности
            </label>
            <Field name="specialty_code" id="specialty_code" className="text-field_white" component={ TextField }
                   placeholder="Введите шифр" />
          </div>
        </div>
      </div>

      <div className="form__field">
        <div className="form__row">
          <div className="form__col form__col_6">
            <label htmlFor="defense_country" className="form__label">
              Страна защиты <ReqMark />
            </label>
            <Field name="country" id="country"
                   format={ value => value && countriesData[value] ? { name: countriesData[value].name, id: value } : '' }
                   normalize={ value => value.id }
                   component={ props => <SearchableSelect placeholder="Выберите страну"
                                                          options={ countriesArray } { ...props } /> }  />
          </div>
          <div className="form__col form__col_6">
            <label htmlFor="defense_city" className="form__label">
              Город защиты <ReqMark />
            </label>
            <Field name="defense_city" id="defense_city" className="text-field_white" component={ TextField }
                   placeholder="Введите город защиты" validate={ [validate.required] } />
          </div>
        </div>
      </div>

      <div className="form__field">
        <div className="form__row">
          <div className="form__col form__col_4">
            <label htmlFor="defense_date" className="form__label">
              Дата защиты <ReqMark />
            </label>
            <Field name="defense_date" id="defense_date" validate={ [validate.required] }
                   parse={ value => value.format('YYYY-MM-DD') } format={ value => moment(value, 'YYYY-MM-DD') }
                   component={ props =>  <Calendar className="text-field_white"
                                                   customInput={ <TextField meta={ props.meta } /> }
                                                   selected={ props.input.value } { ...props } /> } />
          </div>
          <div className="form__col form__col_4">
            <label htmlFor="statement_date" className="form__label">
              Дата утверждения <ReqMark />
            </label>
            <Field name="statement_date" id="statement_date" validate={ [validate.required] }
                   parse={ value => value.format('YYYY-MM-DD') } format={ value => moment(value, 'YYYY-MM-DD') }
                   component={ props =>  <Calendar className="text-field_white"
                                                   customInput={ <TextField meta={ props.meta } /> }
                                                   selected={ props.input.value } { ...props } /> } />
          </div>
          <div className="form__col form__col_4">
            <label htmlFor="page_count" className="form__label">
              Количество стр. <ReqMark />
            </label>
            <Field name="page_count" id="page_count" className="text-field_white" component={ TextField }
                   placeholder="0 стр." validate={ [validate.required] } />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SourceThesisFields;
