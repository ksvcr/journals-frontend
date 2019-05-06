import React from 'react';
import { Field } from 'redux-form';
import moment from 'moment';

import TextField from '~/components/TextField/TextField';
import ReqMark from '~/components/ReqMark/ReqMark';
import * as validate from '~/utils/validate';
import Calendar from '~/components/Calendar/Calendar';
import SearchableSelect from '~/components/SearchableSelect/SearchableSelect';
import Select from '~/components/Select/Select';
import FieldHint from '~/components/FieldHint/FieldHint';

const SourceLegislativeMaterial = ({ countriesData, countriesOptions, lawTypesOptions }) => {
  return (
    <React.Fragment>
      <div className="form__field">
        <label htmlFor="original_name" className="form__label">
          Название на языке оригинала <ReqMark />
        </label>
        <Field name="original_name" id="original_name" className="text-field_white" component={ TextField }
               placeholder="Введите название" validate={ [validate.required] } />
      </div>

      <div className="form__field">
        <label htmlFor="second_name" className="form__label">
          Название на английском языке <ReqMark />
        </label>
        <Field name="second_source_name" id="second_name" className="text-field_white" component={ TextField }
               placeholder="Введите название" validate={ [validate.required] } />
      </div>

      <div className="form__field">
        <div className="form__row">
          <div className="form__col form__col_4">
            <label htmlFor="country" className="form__label">
              Страна <ReqMark />
            </label>
            <Field name="country" id="country"
                   format={ value => value && countriesData[value] ? { label: countriesData[value].name, value } : '' }
                   normalize={ option => option.value }
                   placeholder="Выберите страну"
                   options={ countriesOptions }
                   className="searchable-select-wrapper_white"
                   component={ SearchableSelect }  />
          </div>
          <div className="form__col form__col_4">
            <label htmlFor="source_issue" className="form__label">
              Издательство <ReqMark />
            </label>
            <Field name="issue" id="source_issue" className="text-field_white" component={ TextField }
                   placeholder="Введите Издательство" validate={ [validate.required] } />
          </div>
          <div className="form__col form__col_4">
            <label htmlFor="source_issue_city" className="form__label">
              Город издания <ReqMark />
            </label>
            <Field name="issue_city" id="source_issue_city" className="text-field_white" component={ TextField }
                   placeholder="Введите город" validate={ [validate.required] } />
          </div>
        </div>
      </div>

      <div className="form__field">
        <div className="form__row">
          <div className="form__col form__col_4">
            <label htmlFor="category" className="form__label">
              Тип закона <ReqMark />
            </label>
            <Field name="category" id="category" className="select_white"
                   component={ props => <Select options={ lawTypesOptions } { ...props } /> } />
          </div>
          <div className="form__col form__col_4">
            <label htmlFor="source_issue_year" className="form__label">
              Год издания <ReqMark />
              <FieldHint text={ 'В формате (ГГГГ)' } />
            </label>
            <Field name="issue_year" id="source_issue_year" className="text-field_white" component={ TextField }
                   placeholder="Введите год" validate={ [validate.required, validate.year] } />
          </div>
          <div className="form__col form__col_4">
            <label htmlFor="issue_number" className="form__label">
              Номер издания
            </label>
            <Field name="issue_number" id="issue_number" className="text-field_white" component={ TextField }
                   placeholder="Введите номер издания" />
          </div>
        </div>
      </div>

      <div className="form__field">
        <div className="form__row">
          <div className="form__col form__col_6">
            <label htmlFor="adopted_authority" className="form__label">
              Принявший орган
            </label>
            <Field name="adopted_authority" id="adopted_authority" className="text-field_white" component={ TextField }
                   placeholder="Введите принявший орган" />
          </div>
          <div className="form__col form__col_6">
            <label htmlFor="adoption_date" className="form__label">
              Дата принятия
            </label>
            <Field name="adoption_date" id="adoption_date" validate={ [validate.required] }
                   parse={ value => value.format('YYYY-MM-DD') } format={ value => moment(value, 'YYYY-MM-DD') }
                   component={ props =>  <Calendar className="text-field_white"
                                                   customInput={ <TextField meta={ props.meta } /> }
                                                   selected={ props.input.value } { ...props } /> } />
          </div>
        </div>
      </div>

      <div className="form__field">
        <div className="form__row">
          <div className="form__col form__col_4">
            <label htmlFor="approval_authority" className="form__label">
              Одобривший орган
            </label>
            <Field name="approval_authority" id="approval_authority" className="text-field_white" component={ TextField }
                   placeholder="Введите одобривший орган" />
          </div>
          <div className="form__col form__col_4">
            <label htmlFor="approval_date" className="form__label">
              Дата одобрения
            </label>
            <Field name="approval_date" id="approval_date"
                   parse={ value => value.format('YYYY-MM-DD') } format={ value => moment(value, 'YYYY-MM-DD') }
                   component={ props =>  <Calendar className="text-field_white"
                                                   customInput={ <TextField meta={ props.meta } /> }
                                                   selected={ props.input.value } { ...props } /> } />
          </div>
          <div className="form__col form__col_4">
            <label htmlFor="page_count" className="form__label">
              Количество страниц
            </label>
            <Field name="page_count" id="page_count" className="text-field_white" component={ TextField }
                   placeholder="Введите количество страниц" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SourceLegislativeMaterial;
