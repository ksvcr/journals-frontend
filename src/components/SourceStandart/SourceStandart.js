import React from 'react';
import { Field } from 'redux-form';

import ReqMark from '~/components/ReqMark/ReqMark';
import TextField from '~/components/TextField/TextField';
import Calendar from '~/components/Calendar/Calendar';
import * as validate from '~/utils/validate';
import moment from 'moment';
import FieldHint from '~/components/FieldHint/FieldHint';

const SourceStandart = () => {
  return (
    <React.Fragment>
      <div className="form__field">
        <label htmlFor="standart_entry_date" className="form__label">
          Дата ввода стандарта <ReqMark />
        </label>
        <Field name="standart_entry_date" id="standart_entry_date" validate={ [validate.required] }
               parse={ value => value.format('YYYY-MM-DD') } format={ value => moment(value, 'YYYY-MM-DD') }
               component={ props =>  <Calendar className="text-field_white"
                                               customInput={ <TextField meta={ props.meta } /> }
                                               selected={ props.input.value } { ...props } /> } />
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
          Название на английском языке <ReqMark />
        </label>
        <Field name="second_name" id="second_name" className="text-field_white" component={ TextField }
               placeholder="Введите название" validate={ [validate.required] } />
      </div>

      <div className="form__field">
        <div className="form__row">
          <div className="form__col form__col_6">
            <label htmlFor="source_issue" className="form__label">
              Издательство <ReqMark />
            </label>
            <Field name="issue" id="source_issue" className="text-field_white" component={ TextField }
                   placeholder="Введите Издательство" validate={ [validate.required] } />
          </div>
          <div className="form__col form__col_6">
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
              <FieldHint text={ 'В формате (ГГГГ)' } />
            </label>
            <Field name="issue_year" id="source_issue_year" className="text-field_white" component={ TextField }
                   placeholder="Введите год" validate={ [validate.required, validate.year] } />
          </div>
          <div className="form__col form__col_6">
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

export default SourceStandart;
