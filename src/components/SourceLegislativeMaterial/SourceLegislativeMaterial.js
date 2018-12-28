import React from 'react';
import { Field } from 'redux-form';
import moment from 'moment';

import TextField from '~/components/TextField/TextField';
import ReqMark from '~/components/ReqMark/ReqMark';
import * as validate from '~/utils/validate';
import Calendar from '~/components/Calendar/Calendar';

const SourceLegislativeMaterial = () => {
  return (
    <React.Fragment>
      <div className="form__field">
        <div className="form__row">
          <div className="form__col form__col_6">
            <label htmlFor="lastname" className="form__label">
              Фамилия автора <ReqMark />
            </label>
            <Field name="lastname" id="lastname" className="text-field_white" component={ TextField }
                   placeholder="Введите фамилию автора" validate={ [validate.required] } />
          </div>
          <div className="form__col form__col_6">
            <label htmlFor="initials" className="form__label">
              Инициалы автора <ReqMark />
            </label>
            <Field name="initials" id="initials" className="text-field_white" component={ TextField }
                   placeholder="Введите инициалы автора" validate={ [validate.required] } />
          </div>
        </div>
      </div>

      <div className="form__field">
        <label htmlFor="original_name" className="form__label">
          Название на языке оригинала <ReqMark />
        </label>
        <Field name="original_name" id="original_name" className="text-field_white" component={ TextField }
               placeholder="Введите название" validate={ [validate.required] } />
      </div>

      <div className="form__field">
        <label htmlFor="second_name" className="form__label">
          Название на английском языке
        </label>
        <Field name="second_source_name" id="second_name" className="text-field_white" component={ TextField }
               placeholder="Введите название" />
      </div>

      <div className="form__field">
        <div className="form__row">
          <div className="form__col form__col_4">
            <label htmlFor="country" className="form__label">
              Страна <ReqMark />
            </label>
            <Field name="country" id="country" className="text-field_white" component={ TextField }
                   placeholder="Введите страну" validate={ [validate.required] } />
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
          <div className="form__col form__col_6">
            <label htmlFor="source_issue_year" className="form__label">
              Год издания <ReqMark />
            </label>
            <Field name="issue_year" id="source_issue_year" className="text-field_white" component={ TextField }
                   placeholder="Введите название" validate={ [validate.required] } />
          </div>
          <div className="form__col form__col_6">
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
          <div className="form__col form__col_4">
            <label htmlFor="adopted_authority" className="form__label">
              Принявший орган
            </label>
            <Field name="adopted_authority" id="adopted_authority" className="text-field_white" component={ TextField }
                   placeholder="Введите принявший орган" />
          </div>
          <div className="form__col form__col_4">
            <label htmlFor="adopted_authority_translate" className="form__label">
              Перевод принявшего органа
            </label>
            <Field name="adopted_authority_translate" id="adopted_authority_translate"
                   className="text-field_white" component={ TextField } placeholder="Введите перевод" />
          </div>
          <div className="form__col form__col_4">
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
            <label htmlFor="approval_authority_translate" className="form__label">
              Перевод одобрившего органа
            </label>
            <Field name="approval_authority_translate" id="approval_authority_translate"
                   className="text-field_white" component={ TextField } placeholder="Введите перевод" />
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
        </div>
      </div>
    </React.Fragment>
  );
};

export default SourceLegislativeMaterial;
