import React, { Component } from 'react';

import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import TextField from '~/components/TextField/TextField';

import './image-media-form.scss';

class ImageMediaForm extends Component {
  render() {
    return (
      <form className="image-media-form form">
        <div className="form__field form__field_small">
          <label htmlFor="media-name" className="form__label form__label_small">
            Название
          </label>
          <Field name="title" id="media-name" className="text-field_small" component={ TextField }
                 placeholder="Введите название" />
        </div>
        <div className="form__field form__field_small">
          <label htmlFor="media-additional" className="form__label form__label_small">
            Примечания
          </label>
          <Field name="additional" id="media-additional" className="text-field_small"
                 component={ TextField } placeholder="Введите примечания" />
        </div>
        <div className="form__field form__field_small">
          <label htmlFor="media-keywords" className="form__label form__label_small">
            Ключевые слова
          </label>
          <Field name="keywords" id="media-keywords" className="text-field_small"
                 component={ TextField } placeholder="Введите ключевые слова" />
        </div>
      </form>
    );
  }
}

ImageMediaForm = reduxForm()(ImageMediaForm);

function mapStateToProps(state, props) {
  const { id, onChange } = props;
  return {
    form: `image-media-form-${id}`,
    onChange: onChange.bind(null, id)
  };
}

export default connect(mapStateToProps)(ImageMediaForm);

