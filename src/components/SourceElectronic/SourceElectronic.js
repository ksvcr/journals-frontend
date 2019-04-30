import React from 'react';
import { Field, FieldArray } from 'redux-form';
import moment from 'moment';

import TextField from '~/components/TextField/TextField';
import ReqMark from '~/components/ReqMark/ReqMark';
import * as validate from '~/utils/validate';
import Calendar from '~/components/Calendar/Calendar';
import Select from '~/components/Select/Select';
import SourceAuthorsFields from '~/components/SourceAuthorsFields/SourceAuthorsFields';

const SourceElectronic = ({ rubricsOptions }) => {
  return (
    <React.Fragment>
      <FieldArray name="authors" component={ SourceAuthorsFields } />

      <div className="form__field">
        <label htmlFor="source_rubric" className="form__label">
          Направление <ReqMark />
        </label>
        <Field name="rubric" id="source_rubric" className="select_white" validate={ [validate.required] }
               component={ props => <Select options={ rubricsOptions } { ...props } /> } />
      </div>

      <div className="form__field">
        <label htmlFor="original_source_name" className="form__label">
          Название источника на языке оригинала <ReqMark />
        </label>
        <Field name="original_source_name" id="original_source_name" className="text-field_white" component={ TextField }
               placeholder="Введите название" />
      </div>

      <div className="form__field">
        <label htmlFor="second_source_name" className="form__label">
          Название источника на английском языке
        </label>
        <Field name="second_source_name" id="second_source_name" className="text-field_white" component={ TextField }
               placeholder="Введите название" />
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
        <Field name="second_name" id="second_name" className="text-field_white" component={ TextField }
               placeholder="Введите название" />
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

export default SourceElectronic;
