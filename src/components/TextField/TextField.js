import React, { Component } from 'react';
import classNames from 'classnames';

import Icon from '~/components/Icon/Icon';

import './assets/calendar.svg';
import './text-field.scss';

class TextField extends Component {
  render() {
    const { input={}, meta, textarea, className, icon, ...rest } = this.props;
    const fieldClasses = classNames('text-field', className,
      {
        'text-field_error': meta && meta.submitFailed && meta.error
      });

    const iconClasses = classNames('text-field__icon', { [`text-field__icon_${icon}`] : icon });

    return (
      <div className={ fieldClasses }>
        { textarea ?
          <textarea { ...input } { ...rest }
                               className="text-field__input" autoComplete="off" /> :
          <input type="text" { ...input } { ...rest }
                 className="text-field__input" autoComplete="off" />
        }
        { icon &&
          <Icon className={ iconClasses } name={ icon }/> }
      </div>
    );
  }
}

export default TextField;







