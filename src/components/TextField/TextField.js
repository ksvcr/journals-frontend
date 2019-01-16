import React, { Component } from 'react';
import classNames from 'classnames';

import Textarea from 'react-textarea-autosize';

import Icon from '~/components/Icon/Icon';

import './assets/calendar.svg';
import './assets/search.svg';

import './text-field.scss';

class TextField extends Component {
  render() {
    const { input={}, meta, textarea, className, icon, ...rest } = this.props;
    const hasError = meta && meta.submitFailed && meta.error;

    const fieldClasses = classNames('text-field', className,
      {
        'text-field_error': hasError
      });

    const iconClasses = classNames('text-field__icon', { [`text-field__icon_${icon}`] : icon });

    return (
      <div className={ fieldClasses }>
        <div className="text-field__box">
          { textarea ?
            <Textarea { ...input } { ...rest }
                      className="text-field__input" autoComplete="off" /> :
            <input type="text" { ...input } { ...rest }
                   className="text-field__input" autoComplete="off" />
          }
          { icon &&
            <Icon className={ iconClasses } name={ icon }/> }
        </div>
        { hasError &&
          <div className="text-field__error">
            { meta.error }
          </div>
        }
      </div>
    );
  }
}

export default TextField;
