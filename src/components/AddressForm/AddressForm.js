import React from 'react';
import { Field } from 'redux-form';
import { withNamespaces } from 'react-i18next';

import TextField from '~/components/TextField/TextField';
import Numeric from '~/components/Numeric/Numeric';
import SearchableSelect from '~/components/SearchableSelect/SearchableSelect';

const AddressForm = ({ field, countriesOptions, countriesData, t }) => {
  return (
    <React.Fragment>
      <div className="form__row">
        <div className="form__col form__col_4">
          <div className="form__field">
            <label htmlFor={ `${field}.last_name` } className="form__label">
              { t('last_name') }
            </label>
            <Field className="text-field_white"
                   name={ `${field}.last_name` }
                   id={ `${field}.last_name` }
                   component={ TextField }
                   placeholder={ t('enter_last_name') } />
          </div>
        </div>
        <div className="form__col form__col_4">
          <div className="form__field">
            <label htmlFor={ `${field}.first_name` } className="form__label">
              { t('name') }
            </label>
            <Field className="text-field_white"
                   name={ `${field}.first_name` }
                   id={ `${field}.first_name` }
                   component={ TextField }
                   placeholder={ t('enter_name') } />
          </div>
        </div>
        <div className="form__col form__col_4">
          <div className="form__field">
            <label htmlFor={ `${field}.middle_name` } className="form__label">
              { t('middle_name') }
            </label>
            <Field className="text-field_white"
                   name={ `${field}.middle_name` }
                   id={ `${field}.middle_name` }
                   component={ TextField }
                   placeholder={ t('enter_middle_name') } />
          </div>
        </div>
      </div>
      <div className="form__row">
        <div className="form__col form__col_4">
          <div className="form__field">
            <label htmlFor={ `${field}.mail_address_country` }
                   className="form__label" >
              { t('country') }
            </label>
            <Field className="searchable-select-wrapper_white"
                   name={ `${field}.mail_address_country` }
                   id={ `${field}.mail_address_country` }
                   format={ value => value ? { label: countriesData[value].name, value } : '' }
                   normalize={ option => option.value }
                   placeholder={ t('choose_country') }
                   options={ countriesOptions }
                   component={ SearchableSelect } />
          </div>
        </div>
        <div className="form__col form__col_4">
          <div className="form__field">
            <label htmlFor={ `${field}.mail_address_state` }
                   className="form__label" >
              { t('region') }
            </label>
            <Field className="text-field_white"
                   name={ `${field}.mail_address_state` }
                   id={ `${field}.mail_address_state` }
                   component={ TextField }
                   placeholder={ t('enter_region') } />
          </div>
        </div>
        <div className="form__col form__col_4">
          <div className="form__field">
            <label htmlFor={ `${field}.mail_address_city` }
                   className="form__label" >
              { t('city') }
            </label>
            <Field className="text-field_white"
                   name={ `${field}.mail_address_city` }
                   id={ `${field}.mail_address_city` }
                   component={ TextField }
                   placeholder={ t('enter_city') } />
          </div>
        </div>
      </div>
      <div className="form__row">
        <div className="form__col form__col_4">
          <div className="form__field">
            <label htmlFor={ `${field}.mail_address_street` }
                   className="form__label" >
              { t('street') }
            </label>
            <Field className="text-field_white"
                   name={ `${field}.mail_address_street` }
                   id={ `${field}.mail_address_street` }
                   component={ TextField }
                   placeholder={ t('enter_street') } />
          </div>
        </div>
        <div className="form__col form__col_2">
          <div className="form__field">
            <label htmlFor={ `${field}.mail_address_house` }
                   className="form__label">
              { t('house') }
            </label>
            <Field className="text-field_white"
                   name={ `${field}.mail_address_house` }
                   id={ `${field}.mail_address_house` }
                   component={ TextField }
                   placeholder="№" />
          </div>
        </div>
        <div className="form__col form__col_2">
          <div className="form__field">
            <label htmlFor={ `${field}.mail_address_housing` }
                   className="form__label">
              { t('housing') }
            </label>
            <Field className="text-field_white"
                   name={ `${field}.mail_address_housing` }
                   id={ `${field}.mail_address_housing` }
                   component={ TextField } />
          </div>
        </div>
        <div className="form__col form__col_2">
          <div className="form__field">
            <label htmlFor={ `${field}.mail_address_room` }
                   className="form__label" >
              { t('room') }
            </label>
            <Field className="text-field_white"
                   name={ `${field}.mail_address_room` }
                   id={ `${field}.mail_address_room` }
                   component={ TextField }
                   placeholder="№" />
          </div>
        </div>
        <div className="form__col form__col_2">
          <div className="form__field">
            <label htmlFor={ `${field}.mail_address_index` }
                   className="form__label">
              { t('index') }
            </label>
            <Field className="text-field_white"
                   name={ `${field}.mail_address_index` }
                   id={ `${field}.mail_address_index` }
                   component={ TextField } />
          </div>
        </div>
      </div>
      <div className="form__field">
        <Field name={ `${field}.count` }
               id={ `${field}.count` }
               min={ 1 } label="экз."
               component={ Numeric } />
      </div>
    </React.Fragment>
  );
};

export default withNamespaces()(AddressForm);
