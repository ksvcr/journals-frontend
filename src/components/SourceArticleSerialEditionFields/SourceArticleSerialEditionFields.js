import React from 'react';
import { Field, FieldArray } from 'redux-form';
import { withNamespaces } from 'react-i18next';

import ReqMark from '~/components/ReqMark/ReqMark';
import TextField from '~/components/TextField/TextField';
import * as validate from '~/utils/validate';
import FieldHint from '~/components/FieldHint/FieldHint';
import SourceAuthorsFields from '~/components/SourceAuthorsFields/SourceAuthorsFields';

let SourceArticleSerialEditionFields = ({ t }) => {
  return (
    <React.Fragment>
      <FieldArray name="authors" component={ SourceAuthorsFields } />

      <div className="form__field">
        <label htmlFor="source_issue_title" className="form__label">
          { t('issue_title') } <ReqMark />
        </label>
        <Field name="issue_title" id="source_issue_title" className="text-field_white" component={ TextField }
               placeholder={ t('enter_title') } validate={ [validate.required] } />
      </div>

      <div className="form__field">
        <label htmlFor="source_issue_english_title" className="form__label">
          { t('issue_english_title') } <ReqMark />
        </label>
        <Field name="issue_english_title" id="source_issue_english_title" className="text-field_white" component={ TextField }
               placeholder={ t('enter_title') } validate={ [validate.required] } />
      </div>

      <div className="form__field">
        <label htmlFor="original_source_name" className="form__label">
          { t('original_title') } <ReqMark />
        </label>
        <Field name="original_name" id="original_source_name" className="text-field_white" component={ TextField }
               placeholder={ t('enter_title') } validate={ [validate.required] } />
      </div>

      <div className="form__field">
        <label htmlFor="second_source_name" className="form__label">
          { t('title_in_english') }
        </label>
        <Field name="second_source_name" id="second_source_name" className="text-field_white" component={ TextField }
               placeholder={ t('enter_title') } />
      </div>

      <div className="form__field">
        <div className="form__row">
          <div className="form__col form__col_4">
            <label htmlFor="source_year_publication" className="form__label">
              { t('issue_year') } <ReqMark />
              <FieldHint text={ t('year_format') } />
            </label>
            <Field name="year_publication" id="source_year_publication" className="text-field_white" component={ TextField }
                   placeholder={ t('enter_year') } validate={ [validate.required, validate.year] } />
          </div>
          <div className="form__col form__col_4">
            <label htmlFor="source_issue_number" className="form__label">
              { t('issue_number') }
            </label>
            <Field name="issue_number" id="issue_number" className="text-field_white" component={ TextField }
                   placeholder={ t('enter_issue_number') } />
          </div>
          <div className="form__col form__col_4">
            <label htmlFor="page_count" className="form__label">
              { t('page_count') }
            </label>
            <Field name="page_count" id="page_count" className="text-field_white" component={ TextField }
                   placeholder={ t('enter_page_count') } />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};


export default withNamespaces()(SourceArticleSerialEditionFields);
