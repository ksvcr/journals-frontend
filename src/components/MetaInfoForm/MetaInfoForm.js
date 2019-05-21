import React, { Component } from 'react';
import classNames from 'classnames';
import { withNamespaces } from 'react-i18next';

import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import TextField from '~/components/TextField/TextField';

import './meta-info-form.scss';

class MetaInfoForm extends Component {
  render() {
    const { t } = this.props;
    const fieldClasses = classNames('text-field_small', { 'text-field_white': this.props.whiteFields });
    return (
      <div className="meta-info-form form">
        <div className="form__field form__field_small">
          <label htmlFor="media-name" className="form__label form__label_small">
            { t('title') }
          </label>
          <Field name="title" id="media-name" className={ fieldClasses } component={ TextField }
                 placeholder={ t('enter_title') } />
        </div>
        <div className="form__field form__field_small">
          <label htmlFor="media-additional" className="form__label form__label_small">
            { t('note') }
          </label>
          <Field name="additional" id="media-additional" className={ fieldClasses }
                 component={ TextField } placeholder={ t('enter_note') } />
        </div>
        <div className="form__field form__field_small">
          <label htmlFor="media-keywords" className="form__label form__label_small">
            { t('keywords') }
          </label>
          <Field name="keywords" id="media-keywords" className={ fieldClasses }
                 component={ TextField } placeholder={ t('enter_keywords') } />
        </div>
      </div>
    );
  }
}

MetaInfoForm = reduxForm()(MetaInfoForm);

function mapStateToProps(state, props) {
  const { id, onChange } = props;
  return {
    form: `meta-form-${id}`,
    onChange: onChange.bind(null, id)
  };
}

MetaInfoForm = withNamespaces()(MetaInfoForm);

export default connect(mapStateToProps)(MetaInfoForm);

