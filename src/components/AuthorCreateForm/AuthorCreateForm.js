import React, { Component } from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';

import TextField from '~/components/TextField/TextField';
import ReqMark from '~/components/ReqMark/ReqMark';
import Button from '~/components/Button/Button';
import Icon from '~/components/Icon/Icon';
import SearchableSelect from '~/components/SearchableSelect/SearchableSelect';

import * as validate from '~/utils/validate';
import { getCountriesOptions } from '~/store/countries/selector';

import './author-create-form.scss';
import './assets/cancel.svg';

class AuthorCreateForm extends Component {
  handleReset = () => {
    const { reset, formName } = this.props;
    reset(formName);
  };

  render() {
    const { t, handleSubmit, countriesData, countriesOptions } = this.props;
    return (
      <form className="author-create-form form" onSubmit={ handleSubmit }>
        <div className="form__field">
          <div className="form__row">
            <div className="form__col form__col_4">
              <label htmlFor="last_name" className="form__label">
                { t('last_name') } <ReqMark />
              </label>
              <Field name="last_name" id="last_name" className="text-field_white" component={ TextField }
                     placeholder={ t('enter_last_name') } validate={ [validate.required] } />
            </div>
            <div className="form__col form__col_4">
              <label htmlFor="first_name" className="form__label">
                { t('name') } <ReqMark />
              </label>
              <Field name="first_name" id="first_name" className="text-field_white" component={ TextField }
                     placeholder={ t('enter_name') } validate={ [validate.required] } />
            </div>
            <div className="form__col form__col_4">
              <label htmlFor="middle_name" className="form__label">
                { t('middle_name') } <ReqMark />
              </label>
              <Field name="middle_name" id="middle_name" className="text-field_white" component={ TextField }
                     placeholder={ t('enter_middle_name') } />
            </div>
          </div>
        </div>
        <div className="form__field">
          <div className="form__row">
            <div className="form__col form__col_6">
              <label htmlFor="work_place" className="form__label">
                { t('place_of_work') }
              </label>
              <Field name="work_place" id="work_place" className="text-field_white"
                     component={ TextField } placeholder={ t('enter_place_of_work') } />
            </div>
            <div className="form__col form__col_6">
              <label htmlFor="work_place_en" className="form__label">
                { t('place_of_work_in_english') }
              </label>
              <Field name="work_place_en" id="work_place_en" className="text-field_white"
                     component={ TextField } placeholder={ t('enter_place_of_work') } />
            </div>
          </div>
        </div>
        <div className="form__field">
          <div className="form__row">
            <div className="form__col form__col_6">
              <label htmlFor="country" className="form__label">
                { t('country') }
              </label>
              <Field name="country" id="country" validate={ [validate.required] }
                     format={ value => value && countriesData[value] ? { label: countriesData[value].name, value } : '' }
                     normalize={ option => option.value }
                     placeholder={ t('choose_country') }
                     options={ countriesOptions }
                     className="searchable-select-wrapper_white"
                     component={ SearchableSelect } />
            </div>
            <div className="form__col form__col_6">
              <label htmlFor="city" className="form__label">
                { t('city') }
              </label>
              <Field name="city" id="city" className="text-field_white"
                     component={ TextField } placeholder={ t('enter_city') } />
            </div>
          </div>
        </div>
        <div className="form__field">
          <div className="form__row">
            <div className="form__col form__col_6">
              <label htmlFor="code_orcid" className="form__label">
                ORCID
              </label>
              <Field name="code_orcid" id="code_orcid" className="text-field_white"
                     component={ TextField } placeholder={ t('enter_orcid') } />
            </div>
            <div className="form__col form__col_6">
              <label htmlFor="last_name" className="form__label">
                РИНЦ author id
              </label>
              <Field name="code_rinc" id="code_rinc" className="text-field_white"
                     component={ TextField } placeholder="Введите РИНЦ author id" />
            </div>
          </div>
        </div>
        <div className="form__field">
          <div className="form__row">
            <div className="form__col form__col_6">
              <label htmlFor="code_orcid" className="form__label">
                E-mail
              </label>
              <Field name="email" id="email" className="text-field_white"
                     component={ TextField } placeholder={ t('enter_email') } />
            </div>
            <div className="form__col form__col_6">
              <label htmlFor="last_name" className="form__label">
                Researcher ID
              </label>
              <Field name="code_researcher" id="code_researcher" className="text-field_white"
                     component={ TextField } placeholder="Введите Researcher ID" />
            </div>
          </div>
        </div>
        <div className="form__field">
          <Button type="submit" className="button_orange">{ t('save_autor') }</Button>
          <Button type="button" className="button_transparent" onClick={ this.handleReset } >
            <Icon name="cancel" className="author-create-form__cancel-icon" />
            { t('clear_fields') }
          </Button>
        </div>
      </form>
    );
  }
}

AuthorCreateForm = reduxForm({
  destroyOnUnmount: false
})(AuthorCreateForm);

function mapStateToProps(state, props) {
  const { formName } = props;
  const { countries } = state;
  const countriesOptions = getCountriesOptions(state);
  return {
    form: formName,
    countriesData: countries.data,
    countriesOptions,
    initialValues: {
      role: 'AUTHOR'
    }
  };
}

const mapDispatchToProps = {
  reset
};

AuthorCreateForm = withNamespaces()(AuthorCreateForm);

export default connect(mapStateToProps, mapDispatchToProps)(AuthorCreateForm);

