import React, { Component } from 'react';
import { Field, reduxForm, Form } from 'redux-form';
import { connect } from 'react-redux';

import TextField from '~/components/TextField/TextField';

class AuthorCreateForm extends Component {
  render() {
    return (
      <Form className="author-create-form form" onSubmit={ (data) => { console.log(data); } }>
        <div className="form__field">
          <label htmlFor="first_name" className="form__label">
            Имя
          </label>
          <Field name="first_name" id="first_name" className="text-field_white" component={ TextField }
                 placeholder="Введите имя" />
        </div>
      </Form>
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
    form: formName
  };
}

export default connect(mapStateToProps)(AuthorCreateForm);

