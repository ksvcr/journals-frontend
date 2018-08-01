import React from 'react';
import classNames from 'classnames';
import './select.scss';

const Select = function (props) {
  const { meta } = props;
  const classes = classNames('select', props.className,
    {'select_error': meta && meta.submitFailed && meta.error });
  return (
    <div className={ classes }>
      <select id={ props.id } disabled={ props.disabled } required={ props.required }
              { ...props.input } className="select__field">
        {
          props.options.map(option => (
            <option value={ option.value }
                    key={ option.value }>
              { option.title }
            </option>
          ))
        }
      </select>
    </div>
  );
};

export default Select;
