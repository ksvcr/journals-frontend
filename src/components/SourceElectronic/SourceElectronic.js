import React from 'react';
import { Field, FieldArray } from 'redux-form';
import moment from 'moment';
import { withNamespaces } from 'react-i18next';

import TextField from '~/components/TextField/TextField';
import ReqMark from '~/components/ReqMark/ReqMark';
import Select from '~/components/Select/Select';
import SourceAuthorsFields from '~/components/SourceAuthorsFields/SourceAuthorsFields';
import FieldHint from '~/components/FieldHint/FieldHint';
import Calendar from '~/components/Calendar/Calendar';

import * as validate from '~/utils/validate';

const SourceElectronic = ({ rubricsOptions, t }) => {
  return (
    <React.Fragment>
      <FieldArray name="authors" component={ SourceAuthorsFields } />

      <div className="form__field">
        <div className="form__row">
          <div className="form__col form__col_6">
            <label htmlFor="source_rubric" className="form__label">
              { t('direction') } <ReqMark />
            </label>
            <Field name="rubric" id="source_rubric" className="select_white" validate={ [validate.required] }
                   component={ props => <Select options={ rubricsOptions } { ...props } /> } />
          </div>
          <div className="form__col form__col_6">
            <label htmlFor="accessed_date" className="form__label">
              { t('accessed_date') } <ReqMark />
            </label>
            <Field name="accessed_date" id="accessed_date" validate={ [validate.required] }
                   parse={ value => value.format('YYYY-MM-DD') } format={ value => moment(value, 'YYYY-MM-DD') }
                   component={ props =>  <Calendar className="text-field_white"
                                                   customInput={ <TextField meta={ props.meta } /> }
                                                   selected={ props.input.value } { ...props } /> } />
          </div>
        </div>
      </div>

      <div className="form__field">
        <label htmlFor="original_source_name" className="form__label">
          { t('original_source_name') } <ReqMark />
        </label>
        <Field name="original_source_name" id="original_source_name" className="text-field_white" component={ TextField }
               placeholder={ t('enter_title') } validate={ [validate.required] } />
      </div>

      <div className="form__field">
        <label htmlFor="second_source_name" className="form__label">
          { t('english_source_name') } <ReqMark />
        </label>
        <Field name="second_source_name" id="second_source_name" className="text-field_white" component={ TextField }
               placeholder={ t('enter_title') } validate={ [validate.required] } />
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
          <div className="form__col form__col_4">
            <label htmlFor="source_year_publication" className="form__label">
              { t('publication_year') } <ReqMark />
              <FieldHint text={ t('year_format') } />
            </label>
            <Field name="publication_year" id="source_year_publication" className="text-field_white" component={ TextField }
                   placeholder={ t('enter_year') } validate={ [validate.required, validate.year] } />
          </div>
          <div className="form__col form__col_4">
            <label htmlFor="source_issue_number" className="form__label">
              { t('issue_number') } <ReqMark />
            </label>
            <Field name="issue_number" id="source_issue_number" className="text-field_white" component={ TextField }
                   placeholder={ t('enter_issue_number') } validate={ [validate.required] } />
          </div>
          <div className="form__col form__col_4">
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

export default withNamespaces()(SourceElectronic);
