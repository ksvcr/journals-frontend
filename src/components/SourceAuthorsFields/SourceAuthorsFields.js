import React from 'react';
import { Field } from 'redux-form';

import FieldAddButton from '~/components/FieldAddButton/FieldAddButton';
import ReqMark from '~/components/ReqMark/ReqMark';
import TextField from '~/components/TextField/TextField';
import * as validate from '~/utils/validate';
import { withNamespaces } from 'react-i18next';

const SourceAuthorsFields = ({ fields, t }) => {
  function handleAdd() {
    fields.push({});
  }

  const authorFields = fields.map((field, index) => (
    <div className="form__field" key={ index }>
      <div className="form__row">
        <div className="form__col form__col_6">
          <label htmlFor={ `${field}.lastname` } className="form__label">
            { t('author_last_name') } <ReqMark />
          </label>
          <Field name={ `${field}.lastname` } id={ `${field}.lastname` } className="text-field_white" component={ TextField }
                 placeholder={ t('enter_author_last_name') } validate={ [validate.required] } />
        </div>
        <div className="form__col form__col_6">
          <label htmlFor={ `${field}.initials` } className="form__label">
            { t('author_initials') } <ReqMark />
          </label>
          <Field name={ `${field}.initials` } id={ `${field}.initials` } className="text-field_white" component={ TextField }
                 placeholder={ t('enter_author_initials') } validate={ [validate.required] } />
        </div>
      </div>
    </div>
  ));

  return (
    <React.Fragment>
      { authorFields }
      <div className="form__field">
        <FieldAddButton className="field-add-button_small" onAdd={ handleAdd }>
          { t('add_author') }
        </FieldAddButton>
      </div>
    </React.Fragment>
  );
};

export default withNamespaces()(SourceAuthorsFields);
