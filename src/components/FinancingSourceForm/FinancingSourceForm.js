import React from 'react';
import { Field } from 'redux-form';
import TextField from '~/components/TextField/TextField';
import Select from '~/components/Select/Select';
import getFinancingIds from '~/services/getFinancingIds';

const FinancingSourceForm = ({ field }) => {
  return (
    <React.Fragment>
      <div className="form__row">
        <div className="form__col form__col_4">
          <div className="form__field">
            <label htmlFor={ `${field}.organization` } className="form__label">Название организации</label>
            <Field className="text-field_white" name={ `${field}.organization` } id={ `${field}.organization` }
                   component={ TextField } placeholder="Введите название" />
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
            <label htmlFor={ `${field}.organizationId` } className="form__label">ID организации</label>
            <Field className="text-field_white" name={ `${field}.organizationId` } id={ `${field}.organizationId` }
                   component={ TextField } placeholder="Введите ID" />
          </div>
        </div>
      </div>
      <div className="form__row">
        <div className="form__col form__col_4">
          <div className="form__field">
            <label htmlFor={ `${field}.grant` } className="form__label">Название гранта</label>
            <Field className="text-field_white" name={ `${field}.grant` } id={ `${field}.grant` }
                   component={ TextField } placeholder="Введите название гранта" />
          </div>
        </div>
        <div className="form__col form__col_4">
          <div className="form__field">
            <label htmlFor={ `${field}.grantId` } className="form__label">Номер гранта</label>
            <Field className="text-field_white" name={ `${field}.grantId` } id={ `${field}.grantId` }
                   component={ TextField } placeholder="Введите номер гранта" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FinancingSourceForm;
