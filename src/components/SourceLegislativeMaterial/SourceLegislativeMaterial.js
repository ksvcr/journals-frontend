import React from 'react';
import { Field } from 'redux-form';
import moment from 'moment';
import { withNamespaces } from 'react-i18next';

import TextField from '~/components/TextField/TextField';
import ReqMark from '~/components/ReqMark/ReqMark';
import * as validate from '~/utils/validate';
import Calendar from '~/components/Calendar/Calendar';
import SearchableSelect from '~/components/SearchableSelect/SearchableSelect';
import Select from '~/components/Select/Select';
import FieldHint from '~/components/FieldHint/FieldHint';

let SourceLegislativeMaterial = ({ countriesData, countriesOptions, lawTypesOptions, t }) => {
  return (
    <React.Fragment>
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
        <Field name="second_source_name" id="second_name" className="text-field_white" component={ TextField }
               placeholder={ t('enter_title') } validate={ [validate.required] } />
      </div>

      <div className="form__field">
        <div className="form__row">
          <div className="form__col form__col_4">
            <label htmlFor="country" className="form__label">
              { t('country') } <ReqMark />
            </label>
            <Field name="country" id="country"
                   format={ value => value && countriesData[value] ? { label: countriesData[value].name, value } : '' }
                   normalize={ option => option.value }
                   placeholder={ t('choose_country') }
                   options={ countriesOptions }
                   className="searchable-select-wrapper_white"
                   component={ SearchableSelect }  />
          </div>
          <div className="form__col form__col_4">
            <label htmlFor="source_issue" className="form__label">
              { t('issue') } <ReqMark />
            </label>
            <Field name="issue" id="source_issue" className="text-field_white" component={ TextField }
                   placeholder={ t('enter_issue') } validate={ [validate.required] } />
          </div>
          <div className="form__col form__col_4">
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
          <div className="form__col form__col_4">
            <label htmlFor="category" className="form__label">
              { t('law_type') } <ReqMark />
            </label>
            <Field name="category" id="category" className="select_white"
                   component={ props => <Select options={ lawTypesOptions } { ...props } /> } />
          </div>
          <div className="form__col form__col_4">
            <label htmlFor="source_issue_year" className="form__label">
              { t('issue_year') } <ReqMark />
              <FieldHint text={ t('year_format') } />
            </label>
            <Field name="issue_year" id="source_issue_year" className="text-field_white" component={ TextField }
                   placeholder={ t('enter_year') } validate={ [validate.required, validate.year] } />
          </div>
          <div className="form__col form__col_4">
            <label htmlFor="issue_number" className="form__label">
              { t('issue_number') }
            </label>
            <Field name="issue_number" id="issue_number" className="text-field_white" component={ TextField }
                   placeholder={ t('enter_issue_number') } />
          </div>
        </div>
      </div>

      <div className="form__field">
        <div className="form__row">
          <div className="form__col form__col_6">
            <label htmlFor="adopted_authority" className="form__label">
              { t('adopted_authority') }
            </label>
            <Field name="adopted_authority" id="adopted_authority" className="text-field_white" component={ TextField }
                   placeholder={ t('enter_adopted_authority') } />
          </div>
          <div className="form__col form__col_6">
            <label htmlFor="adoption_date" className="form__label">
              { t('adoption_date') }
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
              { t('approval_authority') }
            </label>
            <Field name="approval_authority" id="approval_authority" className="text-field_white" component={ TextField }
                   placeholder={ t('enter_approval_authority') } />
          </div>
          <div className="form__col form__col_4">
            <label htmlFor="approval_date" className="form__label">
              { t('approval_date') }
            </label>
            <Field name="approval_date" id="approval_date"
                   parse={ value => value.format('YYYY-MM-DD') } format={ value => moment(value, 'YYYY-MM-DD') }
                   component={ props =>  <Calendar className="text-field_white"
                                                   customInput={ <TextField meta={ props.meta } /> }
                                                   selected={ props.input.value } { ...props } /> } />
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

export default withNamespaces()(SourceLegislativeMaterial);
