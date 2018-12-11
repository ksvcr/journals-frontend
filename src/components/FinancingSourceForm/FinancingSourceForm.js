import React from 'react';
import { Field } from 'redux-form';

import TextField from '~/components/TextField/TextField';
import Select from '~/components/Select/Select';
import ReqMark from '~/components/ReqMark/ReqMark';

import getFinancingIds from '~/services/getFinancingIds';
import * as validate from '~/utils/validate';

const FinancingSourceForm = ({ field }) => {
  return (
    <React.Fragment>
      <div className="form__row">
        <div className="form__col form__col_4">
          <div className="form__field">
            <label htmlFor={ `${field}.organization` } className="form__label">
              Название организации <ReqMark />
            </label>
            <Field className="text-field_white" name={ `${field}.organization` } id={ `${field}.organization` }
                   component={ TextField } placeholder="Введите название" validate={ [validate.required] } />
          </div>
        </div>
        <div className="form__col form__col_4">
          <div className="form__field">
            <label htmlFor={ `${field}.type` } className="form__label">Тип ID</label>
            <Field className="text-field_white" name={ `${field}.type` } id={ `${field}.type` }
                   component={ props => <Select options={ getFinancingIds() } { ...props } className="select_white" /> } />
          </div>
        </div>
        <div className="form__col form__col_4">
          <div className="form__field">
            <label htmlFor={ `${field}.financing_id` } className="form__label">
              ID организации <ReqMark />
            </label>
            <Field className="text-field_white" name={ `${field}.financing_id` } id={ `${field}.financing_id` }
                   component={ TextField } placeholder="Введите ID" validate={ [validate.required] } />
          </div>
        </div>
      </div>
      <div className="form__row">
        <div className="form__col form__col_4">
          <div className="form__field">
            <label htmlFor={ `${field}.grant_name` } className="form__label">
              Название гранта  <ReqMark />
            </label>
            <Field className="text-field_white" name={ `${field}.grant_name` } id={ `${field}.grant_name` }
                   component={ TextField } placeholder="Введите название гранта" validate={ [validate.required] } />
          </div>
        </div>
        <div className="form__col form__col_4">
          <div className="form__field">
            <label htmlFor={ `${field}.grant_number` } className="form__label">
              Номер гранта  <ReqMark />
            </label>
            <Field className="text-field_white" name={ `${field}.grant_number` } id={ `${field}.grant_number` }
                   component={ TextField } placeholder="Введите номер гранта" validate={ [validate.required] } />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FinancingSourceForm;
