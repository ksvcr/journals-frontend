import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './sort-checker.scss';

const SortChecker = props => {
  const { isActive, children, checked, ...rest } = props;
  const checkerClasses = classNames('sort-checker',
    {
      'sort-checker_active': isActive,
      'sort-checker_asc': checked
    });

  return (
    <label className={ checkerClasses }>
      <input type="checkbox" className="sort-checker__input" checked={ checked } { ...rest } />
      { children &&
        <span className="sort-checker__title">
          { children }
        </span>
      }
    </label>
  );
};

SortChecker.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  isActive: PropTypes.bool
};

export default SortChecker;
