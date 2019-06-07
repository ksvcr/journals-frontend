import React, { Component } from 'react';
import classNames from 'classnames';
import { withNamespaces } from 'react-i18next';

import TextField from '~/components/TextField/TextField';
import Button from '~/components/Button/Button';

import './meta-info-form.scss';

class MetaInfoForm extends Component {
  constructor(props) {
    super(props);

    const { data } = props;
    this.state = {
      data: {
        title: '',
        additional: '',
        keywords: '',
        ...data
      }
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(({ data }) => ({
      data: {
        ...data,
        [name]: value
      }
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { id, onSubmit } = this.props;
    const { data } = this.state;
    onSubmit(id, data);
  };

  render() {
    const { t } = this.props;
    const { data } = this.state;
    const fieldClasses = classNames('text-field_small', { 'text-field_white': this.props.whiteFields });
    return (
      <form className="meta-info-form form" onSubmit={ this.handleSubmit }>
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
        <div className="form__field form__field_small">
          <Button type="submit" className="button_orange button_small">
            { t('save') }
          </Button>
        </div>
      </form>
    );
  }
}

MetaInfoForm = withNamespaces()(MetaInfoForm);

export default MetaInfoForm;

