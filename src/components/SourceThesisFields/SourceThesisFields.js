import React from 'react';
import { Field } from 'redux-form';
import moment from 'moment';
import { withNamespaces } from 'react-i18next';

import TextField from '~/components/TextField/TextField';
import ReqMark from '~/components/ReqMark/ReqMark';
import * as validate from '~/utils/validate';
import Calendar from '~/components/Calendar/Calendar';
import Select from '~/components/Select/Select';
import SearchableSelect from '~/components/SearchableSelect/SearchableSelect';

const SourceThesisFields = ({ rubricsOptions, languagesOptions, countriesData, countriesOptions, t }) => {
  return (
    <React.Fragment>
      <div className="form__field">
        <div className="form__row">
          <div className="form__col form__col_4">
            <label htmlFor="lastname" className="form__label">
              { t('author_last_name') } <ReqMark />
            </label>
            <Field name="author.lastname" id="lastname" className="text-field_white" component={ TextField }
                   placeholder={ t('enter_author_last_name') } validate={ [validate.required] } />
          </div>
          <div className="form__col form__col_4">
            <label htmlFor="initials" className="form__label">
              { t('author_initials') } <ReqMark />
            </label>
            <Field name="author.initials" id="initials" className="text-field_white" component={ TextField }
                   placeholder={ t('enter_author_initials') } validate={ [validate.required] } />
          </div>
          <div className="form__col form__col_4">
            <label htmlFor="source_language" className="form__label">
              { t('original_language') }
            </label>
            <Field name="language" id="source_language" className="select_white"
                   component={ props => <Select options={ languagesOptions } { ...props } /> } />
          </div>
        </div>
      </div>

      <div className="form__field">
        <label htmlFor="original_source_name" className="form__label">
          { t('original_title') } <ReqMark />
        </label>
        <Field name="original_name" id="original_source_name" className="text-field_white" component={ TextField }
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
            <label htmlFor="source_rubric" className="form__label">
              { t('direction') } <ReqMark />
            </label>
            <Field name="rubric" id="source_rubric" className="select_white" validate={ [validate.required] }
                   component={ props => <Select options={ rubricsOptions } { ...props } /> } />
          </div>
          <div className="form__col form__col_6">
            <label htmlFor="specialty_code" className="form__label">
              { t('specialty_code') } <ReqMark />
            </label>
            <Field name="specialty_code" id="specialty_code" className="text-field_white" component={ TextField }
                   placeholder={ t('enter_specialty_code') } validate={ [validate.required] } />
          </div>
        </div>
      </div>

      <div className="form__field">
        <div className="form__row">
          <div className="form__col form__col_6">
            <label htmlFor="defense_country" className="form__label">
              { t('defense_country') } <ReqMark />
            </label>
            <Field name="defense_country" id="defense_country" validate={ [validate.required] }
                   format={ value => value && countriesData[value] ? { label: countriesData[value].name, value } : '' }
                   normalize={ option => option.value }
                   placeholder={ t('choose_country') }
                   options={ countriesOptions }
                   className="searchable-select-wrapper_white"
                   component={ SearchableSelect }  />
          </div>
          <div className="form__col form__col_6">
            <label htmlFor="defense_city" className="form__label">
              { t('defense_city') } <ReqMark />
            </label>
            <Field name="defense_city" id="defense_city" className="text-field_white" component={ TextField }
                   placeholder={ t('enter_defense_city') } validate={ [validate.required] } />
          </div>
        </div>
      </div>

      <div className="form__field">
        <div className="form__row">
          <div className="form__col form__col_4">
            <label htmlFor="defense_date" className="form__label">
              { t('defense_date') } <ReqMark />
            </label>
            <Field name="defense_date" id="defense_date" validate={ [validate.required] }
                   parse={ value => value.format('YYYY-MM-DD') } format={ value => moment(value, 'YYYY-MM-DD') }
                   component={ props =>  <Calendar className="text-field_white"
                                                   customInput={ <TextField meta={ props.meta } /> }
                                                   selected={ props.input.value } { ...props } /> } />
          </div>
          <div className="form__col form__col_4">
            <label htmlFor="statement_date" className="form__label">
              { t('statement_date') } <ReqMark />
            </label>
            <Field name="statement_date" id="statement_date" validate={ [validate.required] }
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
                   placeholder="0 стр." validate={ [validate.required] } />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withNamespaces()(SourceThesisFields);
