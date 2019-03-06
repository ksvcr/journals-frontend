import React from 'react';
import { Field } from 'redux-form';

import TextField from '~/components/TextField/TextField';
import Numeric from '~/components/Numeric/Numeric';
import SearchableSelect from '~/components/SearchableSelect/SearchableSelect';

const AddressForm = ({ field, countriesOptions, countriesData }) => {
  return (
    <React.Fragment>
      <div className="form__row">
        <div className="form__col form__col_8">
          <div className="form__field">
            <label htmlFor={ `${field}.user` } className="form__label">
              ФИО получателя
            </label>
            <Field className="text-field_white"
                   name={ `${field}.user` }
                   id={ `${field}.user` }
                   component={ TextField }
                   placeholder="Введите ФИО" />
          </div>
        </div>
      </div>
      <div className="form__row">
        <div className="form__col form__col_4">
          <div className="form__field">
            <label htmlFor={ `${field}.mail_address_country` }
                   className="form__label" >
              Страну
            </label>
            <Field className="text-field_white"
                   name={ `${field}.mail_address_country` }
                   id={ `${field}.mail_address_country` }
                   format={ value => value ? { label: countriesData[value].name, value } : '' }
                   normalize={ option => option.value }
                   placeholder="Выберите страну"
                   options={ countriesOptions }
                   component={ SearchableSelect } />
          </div>
        </div>
        <div className="form__col form__col_4">
          <div className="form__field">
            <label htmlFor={ `${field}.mail_address_state` }
                   className="form__label" >
              Область/Край
            </label>
            <Field className="text-field_white"
                   name={ `${field}.mail_address_state` }
                   id={ `${field}.mail_address_state` }
                   component={ TextField }
                   placeholder="Введите область" />
          </div>
        </div>
        <div className="form__col form__col_4">
          <div className="form__field">
            <label htmlFor={ `${field}.mail_address_city` }
                   className="form__label" >
              Город
            </label>
            <Field className="text-field_white"
                   name={ `${field}.mail_address_city` }
                   id={ `${field}.mail_address_city` }
                   component={ TextField }
                   placeholder="Введите город" />
          </div>
        </div>
      </div>
      <div className="form__row">
        <div className="form__col form__col_4">
          <div className="form__field">
            <label htmlFor={ `${field}.mail_address_street` }
                   className="form__label" >
              Улица
            </label>
            <Field className="text-field_white"
                   name={ `${field}.mail_address_street` }
                   id={ `${field}.mail_address_street` }
                   component={ TextField }
                   placeholder="Введите улицу" />
          </div>
        </div>
        <div className="form__col form__col_2">
          <div className="form__field">
            <label htmlFor={ `${field}.mail_address_house` }
                   className="form__label">
              Дом
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
              Корпус
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
              Квартира
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
              Индекс
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

export default AddressForm;
