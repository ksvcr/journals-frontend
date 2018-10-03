import React, { PureComponent } from 'react';
import { Field } from 'redux-form';

import TextField from '~/components/TextField/TextField';
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
            <fieldset className="form__set" key={ index }>
              <legend className="form__legend">{ `Грант №${index +1}` }</legend>
              <div className="form__row">
                <div className="form__col form__col_4">
                  <div className="form__field">
                    <label htmlFor={ `${field}.organization` } className="form__label">Название организации</label>
                    <Field name={ `${field}.organization` } id={ `${field}.organization` } component={ TextField } />
                  </div>
                </div>
              </div>
            </fieldset>
          ))
        }
      </ReactCSSTransitionGroup>
    );
  }
}

export default FinancingSources;
