import React from 'react';
import { Field } from 'redux-form';
import moment from 'moment';

import ReqMark from '~/components/ReqMark/ReqMark';
import TextField from '~/components/TextField/TextField';
import Calendar from '~/components/Calendar/Calendar';
import Select from '~/components/Select/Select';
import SearchableSelect from '~/components/SearchableSelect/SearchableSelect';
import * as validate from '~/utils/validate';

const SourcePatent = ({ rightholderType, rightholderOptions, countriesData, countriesOptions }) => {
  return (
    <React.Fragment>
      <div className="form__field">
        <div className="form__row">
          <div className="form__col form__col_4">
            <label htmlFor="number" className="form__label">
              Номер патента <ReqMark />
            </label>
            <Field name="number" id="number" className="text-field_white" component={ TextField }
                   placeholder="Введите номер патента" validate={ [validate.required] } />
          </div>
          <div className="form__col form__col_4">
            <label htmlFor="patent_classifier" className="form__label">
              Патентный классификатор <ReqMark />
            </label>
            <Field name="patent_classifier" id="patent_classifier" className="text-field_white" component={ TextField }
                   placeholder="Введите патентный классификатор" validate={ [validate.required] } />
          </div>
          <div className="form__col form__col_4">
            <label htmlFor="version" className="form__label">
              Версия
            </label>
            <Field name="version" id="version" className="text-field_white" component={ TextField }
                   placeholder="Введите версию" />
          </div>
        </div>
      </div>

      <div className="form__field">
        <div className="form__row">
          <div className="form__col form__col_4">
            <label htmlFor="rightholder" className="form__label">
              Правообладатель
            </label>
            <Field name="rightholder" id="rightholder" className="select_white"
                   component={ props => <Select options={ rightholderOptions } { ...props } /> } />
          </div>
          <div className="form__col form__col_4">
            <label htmlFor="patent_application_number" className="form__label">
              Номер заявки на патент <ReqMark />
            </label>
            <Field name="patent_application_number" id="patent_application_number" className="text-field_white" component={ TextField }
                   placeholder="Введите номер заявки" validate={ [validate.required] } />
          </div>
          <div className="form__col form__col_4">
            <label htmlFor="patent_application_date" className="form__label">
              Дата заявки на патент <ReqMark />
            </label>
            <Field name="patent_application_date" id="patent_application_date" validate={ [validate.required] }
                   parse={ value => value.format('YYYY-MM-DD') } format={ value => moment(value, 'YYYY-MM-DD') }
                   component={ props =>  <Calendar className="text-field_white"
                                                   customInput={ <TextField meta={ props.meta } /> }
                                                   selected={ props.input.value } { ...props } /> } />
          </div>
        </div>
      </div>

      <div className="form__field">
        <label htmlFor="author" className="form__label">
          Автор изобретения <ReqMark />
        </label>
        <Field name="author" id="author" className="text-field_white" component={ TextField }
               placeholder="Введите автора изобретения" validate={ [validate.required] } />
      </div>

      <div className="form__field">
        <label htmlFor="invention_title" className="form__label">
          Название изобретения <ReqMark />
        </label>
        <Field name="invention_title" id="invention_title" className="text-field_white" component={ TextField }
               placeholder="Введите название изобретения" validate={ [validate.required] } />
      </div>

      <div className="form__field">
        <label htmlFor="second_invention_title" className="form__label">
          Название изобретения на английском
        </label>
        <Field name="second_invention_title" id="second_invention_title" className="text-field_white" component={ TextField }
               placeholder="Введите название изобретения на английском" />
      </div>

      { rightholderType === 1 ?
        <React.Fragment>
          <div className="form__field">
            <label htmlFor="person_name" className="form__label">
              ФИО персоны-правообладателя
            </label>
            <Field name="person_name" id="person_name" className="text-field_white" component={ TextField }
                   placeholder="Введите ФИО персоны" />
          </div>

          <div className="form__field">
            <label htmlFor="person_name_translate" className="form__label">
              ФИО персоны-правообладателя на английском
            </label>
            <Field name="person_name_translate" id="person_name_translate" className="text-field_white" component={ TextField }
                   placeholder="Введите ФИО на английском" />
          </div>
        </React.Fragment>
        :
        <React.Fragment>
          <div className="form__field">
            <label htmlFor="organization_name" className="form__label">
              Название организации
            </label>
            <Field name="organization_name" id="organization_name" className="text-field_white" component={ TextField }
                   placeholder="Введите название организации" />
          </div>

          <div className="form__field">
            <label htmlFor="organization_name_translate" className="form__label">
              Название организации на английском
            </label>
            <Field name="organization_name_translate" id="organization_name_translate" className="text-field_white" component={ TextField }
                   placeholder="Введите название организации на английском" />
          </div>
        </React.Fragment>
      }

      <div className="form__field">
        <label htmlFor="publication_place" className="form__label">
          Где опубликован патент
        </label>
        <Field name="publication_place" id="publication_place" className="text-field_white" component={ TextField }
               placeholder="Введите где опубликован патент" />
      </div>

      <div className="form__field">
        <label htmlFor="publication_place_translate" className="form__label">
          Где опубликован патент на английском
        </label>
        <Field name="publication_place_translate" id="publication_place_translate" className="text-field_white" component={ TextField }
               placeholder="Введите где опубликован патент на английском" />
      </div>

      <div className="form__field">
        <div className="form__row">
          <div className="form__col form__col_4">
            <label htmlFor="publication_date" className="form__label">
              Дата публикации
            </label>
            <Field name="publication_date" id="publication_date"
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
          <div className="form__col form__col_4">
            <label htmlFor="country" className="form__label">
              Страна <ReqMark />
            </label>
            <Field name="country" id="country"
                   format={ value => value && countriesData[value] ? { label: countriesData[value].name, value } : '' }
                   normalize={ option => option.value }
                   placeholder="Выберите страну"
                   className="searchable-select-wrapper_white"
                   options={ countriesOptions }
                   component={ SearchableSelect }  />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SourcePatent;
