import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import TextField from '~/components/TextField/TextField';
import ReqMark from '~/components/ReqMark/ReqMark';
import * as validate from '~/utils/validate';
import Button from '~/components/Button/Button';

class AuthorCreateForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form className="author-create-form form" onSubmit={ handleSubmit }>
        <div className="form__field">
          <div className="form__row">
            <div className="form__col form__col_4">
              <label htmlFor="last_name" className="form__label">
                Фамилия <ReqMark />
              </label>
              <Field name="last_name" id="last_name" className="text-field_white" component={ TextField }
                     placeholder="Введите фамилию" validate={ [validate.required] } />
            </div>
            <div className="form__col form__col_4">
              <label htmlFor="first_name" className="form__label">
                Имя <ReqMark />
              </label>
              <Field name="first_name" id="first_name" className="text-field_white" component={ TextField }
                     placeholder="Введите имя" validate={ [validate.required] } />
            </div>
            <div className="form__col form__col_4">
              <label htmlFor="middle_name" className="form__label">
                Отчество <ReqMark />
              </label>
              <Field name="middle_name" id="middle_name" className="text-field_white" component={ TextField }
                     placeholder="Введите отчество" validate={ [validate.required] } />
            </div>
          </div>
        </div>
        <div className="form__field">
          <div className="form__row">
            <div className="form__col form__col_6">
              <label htmlFor="work_place" className="form__label">
                Место работы/учебы
              </label>
              <Field name="work_place" id="work_place" className="text-field_white"
                     component={ TextField } placeholder="Введите место работы/учебы" />
            </div>
            <div className="form__col form__col_6">
              <label htmlFor="work_place_en" className="form__label">
                Место работы/учебы на английском
              </label>
              <Field name="work_place_en" id="work_place_en" className="text-field_white"
                     component={ TextField } placeholder="Введите место работы/учебы" />
            </div>
          </div>
        </div>
        <div className="form__field">
          <div className="form__row">
            <div className="form__col form__col_6">
              <label htmlFor="country" className="form__label">
                Страна
              </label>
              <Field name="country" id="country" className="text-field_white"
                     component={ TextField } placeholder="Введите страну" />
            </div>
            <div className="form__col form__col_6">
              <label htmlFor="city" className="form__label">
                Город
              </label>
              <Field name="city" id="city" className="text-field_white"
                     component={ TextField } placeholder="Введите город" />
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
                     component={ TextField } placeholder="Введите ORCID" />
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
          <Button type="submit"> Сохранить автора </Button>
        </div>
      </form>
    );
  }
}

AuthorCreateForm = reduxForm({
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(AuthorCreateForm);

function mapStateToProps(state, props) {
  const { formName } = props;

  return {
    form: formName,
    initialValues: {
      role: 'AUTHOR'
    }
  };
}

export default connect(mapStateToProps)(AuthorCreateForm);

