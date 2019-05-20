import React from 'react';
import { Field } from 'redux-form';
import moment from 'moment';
import { withNamespaces } from 'react-i18next';

import ReqMark from '~/components/ReqMark/ReqMark';
import TextField from '~/components/TextField/TextField';
import Calendar from '~/components/Calendar/Calendar';
import Select from '~/components/Select/Select';
import SearchableSelect from '~/components/SearchableSelect/SearchableSelect';
import * as validate from '~/utils/validate';

const SourcePatent = ({ rightholderType, rightholderOptions, countriesData, countriesOptions, t }) => {
  return (
    <React.Fragment>
      <div className="form__field">
        <div className="form__row">
          <div className="form__col form__col_4">
            <label htmlFor="number" className="form__label">
              { t('patent_number') } <ReqMark />
            </label>
            <Field name="number" id="number" className="text-field_white" type="number" component={ TextField }
                   placeholder={ t('enter_patent_number') } validate={ [validate.required] } />
          </div>
          <div className="form__col form__col_4">
            <label htmlFor="patent_classifier" className="form__label">
              { t('patent_classifier') } <ReqMark />
            </label>
            <Field name="patent_classifier" id="patent_classifier" className="text-field_white" component={ TextField }
                   placeholder={ t('enter_patent_classifier') } validate={ [validate.required] } />
          </div>
          <div className="form__col form__col_4">
            <label htmlFor="version" className="form__label">
              { t('version') }
            </label>
            <Field name="version" id="version" className="text-field_white" component={ TextField }
                   placeholder={ t('enter_version') } />
          </div>
        </div>
      </div>

      <div className="form__field">
        <div className="form__row">
          <div className="form__col form__col_4">
            <label htmlFor="rightholder" className="form__label">
              { t('rightholder') }
            </label>
            <Field name="rightholder" id="rightholder" className="select_white"
                   component={ props => <Select options={ rightholderOptions } { ...props } /> } />
          </div>
          <div className="form__col form__col_4">
            <label htmlFor="patent_application_number" className="form__label">
              { t('patent_application_number') } <ReqMark />
            </label>
            <Field name="patent_application_number" id="patent_application_number" className="text-field_white" component={ TextField }
                   placeholder={ t('enter_patent_application_number') } validate={ [validate.required] } />
          </div>
          <div className="form__col form__col_4">
            <label htmlFor="patent_application_date" className="form__label">
              { t('patent_application_date') } <ReqMark />
            </label>
            <Field name="patent_application_date" id="patent_application_date" validate={ [validate.required] }
                   parse={ value => value.format('YYYY-MM-DD') } format={ value => moment(value, 'YYYY-MM-DD') }
                   component={ props =>  <Calendar className="text-field_white"
                                                   customInput={ <TextField meta={ props.meta } /> }
                                                   selected={ props.input.value } { ...props } /> } />
          </div>
        </div>
      </div>

      <div className="form__field">
        <label htmlFor="author" className="form__label">
          { t('invention_author') } <ReqMark />
        </label>
        <Field name="author" id="author" className="text-field_white" component={ TextField }
               placeholder={ t('enter_invention_author') } validate={ [validate.required] } />
      </div>

      <div className="form__field">
        <label htmlFor="invention_title" className="form__label">
          { t('invention_title') } <ReqMark />
        </label>
        <Field name="invention_title" id="invention_title" className="text-field_white" component={ TextField }
               placeholder={ t('enter_invention_title') } validate={ [validate.required] } />
      </div>

      <div className="form__field">
        <label htmlFor="second_invention_title" className="form__label">
          { t('invention_title_in_english') } <ReqMark />
        </label>
        <Field name="second_invention_title" id="second_invention_title" className="text-field_white" component={ TextField }
               placeholder={ t('enter_invention_title') } validate={ [validate.required] } />
      </div>

      { rightholderType === 1 ?
        <React.Fragment>
          <div className="form__field">
            <label htmlFor="person_name" className="form__label">
              { t('rightholder_name') }
            </label>
            <Field name="person_name" id="person_name" className="text-field_white" component={ TextField }
                   placeholder={ t('enter_name') } />
          </div>

          <div className="form__field">
            <label htmlFor="person_name_translate" className="form__label">
              { t('rightholder_name_english') }
            </label>
            <Field name="person_name_translate" id="person_name_translate" className="text-field_white" component={ TextField }
                   placeholder={ t('enter_name') } />
          </div>
        </React.Fragment>
        :
        <React.Fragment>
          <div className="form__field">
            <label htmlFor="organization_name" className="form__label">
              { t('organization_name') }
            </label>
            <Field name="organization_name" id="organization_name" className="text-field_white" component={ TextField }
                   placeholder={ t('enter_organization_name') } />
          </div>

          <div className="form__field">
            <label htmlFor="organization_name_translate" className="form__label">
              { t('organization_name_in_english') }
            </label>
            <Field name="organization_name_translate" id="organization_name_translate" className="text-field_white" component={ TextField }
                   placeholder={ t('enter_organization_name') } />
          </div>
        </React.Fragment>
      }

      <div className="form__field">
        <label htmlFor="publication_place" className="form__label">
          { t('publication_place') }
        </label>
        <Field name="publication_place" id="publication_place" className="text-field_white" component={ TextField }
               placeholder={ t('enter_publication_place') } />
      </div>

      <div className="form__field">
        <label htmlFor="publication_place_translate" className="form__label">
          { t('publication_place_in_english') }
        </label>
        <Field name="publication_place_translate" id="publication_place_translate" className="text-field_white" component={ TextField }
               placeholder={ t('enter_publication_place') } />
      </div>

      <div className="form__field">
        <div className="form__row">
          <div className="form__col form__col_4">
            <label htmlFor="publication_date" className="form__label">
              { t('publication_date') }
            </label>
            <Field name="publication_date" id="publication_date"
                   parse={ value => value.format('YYYY-MM-DD') } format={ value => moment(value, 'YYYY-MM-DD') }
                   component={ props =>  <Calendar className="text-field_white"
                                                   customInput={ <TextField meta={ props.meta } /> }
                                                   selected={ props.input.value } { ...props } /> } />
          </div>
          <div className="form__col form__col_4">
            <label htmlFor="page_count" className="form__label">
              { t('page_count') } <ReqMark />
            </label>
            <Field name="page_count" id="page_count" className="text-field_white" component={ TextField }
                   placeholder={ t('enter_page_count') } validate={ [validate.required] } />
          </div>
          <div className="form__col form__col_4">
            <label htmlFor="country" className="form__label">
              { t('country') } <ReqMark />
            </label>
            <Field name="country" id="country"
                   validate={ [validate.required] }
                   format={ value => value && countriesData[value] ? { label: countriesData[value].name, value } : '' }
                   normalize={ option => option.value }
                   placeholder={ t('choose_country') }
                   className="searchable-select-wrapper_white"
                   options={ countriesOptions }
                   component={ SearchableSelect }  />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withNamespaces()(SourcePatent);
