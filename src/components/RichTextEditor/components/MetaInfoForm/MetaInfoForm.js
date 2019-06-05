import React, { Component } from 'react';
import classNames from 'classnames';
import { withNamespaces } from 'react-i18next';

import TextField from '~/components/TextField/TextField';

import './meta-info-form.scss';

class MetaInfoForm extends Component {
  handleChange = (event) => {
    const { id, data, onChange } = this.props;
    const { name, value } = event.target;
    onChange(id, {
      ...data,
      [name]: value
    });
  };

  render() {
    const { data, t } = this.props;
    const fieldClasses = classNames('text-field_small', { 'text-field_white': this.props.whiteFields });
    return (
      <div className="meta-info-form form">
        <div className="form__field form__field_small">
          <label htmlFor="media-name" className="form__label form__label_small">
            { t('title') }
          </label>
          <TextField name="title" id="media-name" className={ fieldClasses } onChange={ this.handleChange }
                     value={ data['title'] || '' } placeholder={ t('enter_title') } />
        </div>
        <div className="form__field form__field_small">
          <label htmlFor="media-additional" className="form__label form__label_small">
            { t('note') }
          </label>
          <TextField name="additional" id="media-additional" className={ fieldClasses } onChange={ this.handleChange }
                     value={ data['additional'] || '' } placeholder={ t('enter_note') } />
        </div>
        <div className="form__field form__field_small">
          <label htmlFor="media-keywords" className="form__label form__label_small">
            { t('keywords') }
          </label>
          <TextField name="keywords" id="media-keywords" className={ fieldClasses } onChange={ this.handleChange }
                     value={ data['keywords'] || '' } placeholder={ t('enter_keywords') } />
        </div>
      </div>
    );
  }
}

MetaInfoForm = withNamespaces()(MetaInfoForm);

export default MetaInfoForm;

