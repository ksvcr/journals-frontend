import React from 'react';
import { Field } from 'redux-form';
import { withNamespaces } from 'react-i18next';
import moment from 'moment';

import ReqMark from '~/components/ReqMark/ReqMark';
import TextField from '~/components/TextField/TextField';
import Calendar from '~/components/Calendar/Calendar';
import * as validate from '~/utils/validate';
import FieldHint from '~/components/FieldHint/FieldHint';

const SourceStandart = ({ t }) => {
  return (
    <React.Fragment>
      <div className="form__field">
        <label htmlFor="standart_entry_date" className="form__label">
          { t('standart_entry_date') } <ReqMark />
        </label>
        <Field name="standart_entry_date" id="standart_entry_date" validate={ [validate.required] }
               parse={ value => value.format('YYYY-MM-DD') } format={ value => moment(value, 'YYYY-MM-DD') }
               component={ props =>  <Calendar className="text-field_white"
                                               customInput={ <TextField meta={ props.meta } /> }
                                               selected={ props.input.value } { ...props } /> } />
      </div>
      <div className="form__field">
        <label htmlFor="original_name" className="form__label">
          { t('original_title') } <ReqMark />
        </label>
        <Field name="original_name" id="original_name" className="text-field_white" component={ TextField }
               placeholder={ t('enter_title') } validate={ [validate.required] } />
      </div>

      <div className="form__field">
        <label htmlFor="second_name" className="form__label">
          { t('title_in_english') } <ReqMark />
        </label>
        <Field name="second_name" id="second_name" className="text-field_white" component={ TextField }
               placeholder={ t('enter_title') } validate={ [validate.required] } />
      </div>

      <div className="form__field">
        <div className="form__row">
          <div className="form__col form__col_6">
            <label htmlFor="source_issue" className="form__label">
              { t('issue') } <ReqMark />
            </label>
            <Field name="issue" id="source_issue" className="text-field_white" component={ TextField }
                   placeholder={ t('enter_issue') } validate={ [validate.required] } />
          </div>
          <div className="form__col form__col_6">
            <label htmlFor="source_issue_city" className="form__label">
              { t('issue_city') } <ReqMark />
            </label>
            <Field name="issue_city" id="source_issue_city" className="text-field_white" component={ TextField }
                   placeholder={ t('enter_city') } validate={ [validate.required] } />
          </div>
        </div>
      </div>

      <div className="form__field">
        <div className="form__row">
          <div className="form__col form__col_6">
            <label htmlFor="source_issue_year" className="form__label">
              { t('issue_year') } <ReqMark />
              <FieldHint text={ t('year_format') } />
            </label>
            <Field name="issue_year" id="source_issue_year" className="text-field_white" component={ TextField }
                   placeholder="Введите год" validate={ [validate.required, validate.year] } />
          </div>
          <div className="form__col form__col_6">
            <label htmlFor="page_count" className="form__label">
              { t('page_count') } <ReqMark />
            </label>
            <Field name="page_count" id="page_count" className="text-field_white" component={ TextField }
                   placeholder="0 стр." validate={ [validate.required] } />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withNamespaces()(SourceStandart);
