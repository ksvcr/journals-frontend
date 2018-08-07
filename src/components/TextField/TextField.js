import React, { Component } from 'react';
import classNames from 'classnames';

import './text-field.scss';

class TextField extends Component {
  render() {
    const { input={}, meta, className, ...rest } = this.props;
    const classes = classNames('text-field', className,
      {
        'field-error': meta && meta.submitFailed && meta.error
      });

    return (
      <input type="text" { ...input } { ...rest }
             className={ classes } autoComplete="off" />
    );
  }
}

export default TextField;







