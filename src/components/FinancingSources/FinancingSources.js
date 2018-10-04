import React, { PureComponent } from 'react';
import { Field } from 'redux-form';

import TextField from '~/components/TextField/TextField';
import FieldSet from '~/components/FieldSet/FieldSet';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class FinancingSources extends PureComponent {
  render() {
    const { fields } = this.props;

    return (
      <ReactCSSTransitionGroup transitionName="fade"
                               transitionEnterTimeout={ 400 }
                               transitionLeaveTimeout={ 200 } >
        {
          fields.map((field, index) => (
            <FieldSet legend={`Грант №${index + 1}`} key={ index }>
              <div className="form__row">
                <div className="form__col form__col_4">
                  <div className="form__field">
                    <label htmlFor={ `${field}.organization` } className="form__label">Название организации</label>
                    <Field name={ `${field}.organization` } id={ `${field}.organization` } component={ TextField } />
                  </div>
                </div>
              </div>
            </FieldSet>
          ))
        }
      </ReactCSSTransitionGroup>
    );
  }
}

export default FinancingSources;
