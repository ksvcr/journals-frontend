import React from 'react';
import { Field } from 'redux-form';
import * as validate from '~/utils/validate';
import { withNamespaces } from 'react-i18next';

import TextField from '~/components/TextField/TextField';
import ReqMark from '~/components/ReqMark/ReqMark';

const FreeEntry = ({ t }) => {
  return (
    <div className="form__field">
      <label htmlFor="invention_title" className="form__label">
        { t('free_entry') } <ReqMark />
      </label>
      <Field name="free_entry" id="free_entry" className="text-field_white" textarea
             minRows={ 6 } component={ TextField } validate={ [validate.required] } />
    </div>
  );
};

export default withNamespaces()(FreeEntry);
