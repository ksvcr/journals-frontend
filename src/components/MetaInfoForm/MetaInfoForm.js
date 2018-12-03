import React, { Component } from 'react';
import classNames from 'classnames';

import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import TextField from '~/components/TextField/TextField';

import './meta-info-form.scss';

class MetaInfoForm extends Component {
  render() {
    const fieldClasses = classNames('text-field_small', { 'text-field_white': this.props.whiteFields });
    return (
      <div className="meta-info-form form">
        <div className="form__field form__field_small">
          <label htmlFor="media-name" className="form__label form__label_small">
            Название
          </label>
          <Field name="title" id="media-name" className={ fieldClasses } component={ TextField }
                 placeholder="Введите название" />
        </div>
        <div className="form__field form__field_small">
          <label htmlFor="media-additional" className="form__label form__label_small">
            Примечания
          </label>
          <Field name="additional" id="media-additional" className={ fieldClasses }
                 component={ TextField } placeholder="Введите примечания" />
        </div>
        <div className="form__field form__field_small">
          <label htmlFor="media-keywords" className="form__label form__label_small">
            Ключевые слова
          </label>
          <Field name="keywords" id="media-keywords" className={ fieldClasses }
                 component={ TextField } placeholder="Введите ключевые слова" />
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

export default connect(mapStateToProps)(MetaInfoForm);

