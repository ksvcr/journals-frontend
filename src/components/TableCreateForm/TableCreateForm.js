import React, { Component } from 'react';
import { withNamespaces } from 'react-i18next';
import { Field, reduxForm } from 'redux-form';

import TextField from '~/components/TextField/TextField';
import Button from '~/components/Button/Button';

import './table-create-form.scss';

class TableCreateForm extends Component {
  render() {
    const { t, handleSubmit } = this.props;

    return (
      <form className="table-create-form form" onSubmit={ handleSubmit }>
        <h2 className="table-create-form__title">
          { t('create_table') }
        </h2>

        <div className="form__field">
          <div className="form__row">
            <div className="form__col form__col_6">
              <label htmlFor="row_count" className="form__label form__label_small">
                { t('row_count') }
              </label>
              <Field name="row_count" id="row_count" className="text-field_small"
                     component={ TextField } placeholder={ t('enter_count') } />
            </div>
            <div className="form__col form__col_6">
              <label htmlFor="col_count" className="form__label form__label_small">
                { t('col_count') }
              </label>
              <Field name="col_count" id="col_count" className="text-field_small"
                     component={ TextField } placeholder={ t('enter_count') } />
            </div>
          </div>
        </div>

        <hr className="page__divider" />

        <div className="form__field form__field_small">
          <label htmlFor="media-name" className="form__label form__label_small">
            { t('title') }
          </label>
          <Field name="title" id="media-name" className="text-field_small" component={ TextField }
                 placeholder={ t('enter_title') } />
        </div>
        <div className="form__field form__field_small">
          <label htmlFor="media-additional" className="form__label form__label_small">
            { t('note') }
          </label>
          <Field name="additional" id="media-additional" className="text-field_small"
                 component={ TextField } placeholder={ t('enter_note') } />
        </div>
        <div className="form__field form__field_small">
          <label htmlFor="media-keywords" className="form__label form__label_small">
            { t('keywords') }
          </label>
          <Field name="keywords" id="media-keywords" className="text-field_small"
                 component={ TextField } placeholder={ t('enter_keywords') } />
        </div>

        <div className="form__field form__field_small">
          <Button type="submit" className="button_orange button_small">
            { t('save') }
          </Button>
        </div>
      </form>
    );
  }
}

TableCreateForm = reduxForm({
  form: 'create-table-form'
})(TableCreateForm);

TableCreateForm = withNamespaces()(TableCreateForm);

export default TableCreateForm;
