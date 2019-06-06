import React from 'react';
import classNames from 'classnames';

import './expand-tool.scss';

const ExpandTool = ({ isActive, ...restProps }) => {
  const expandClasses = classNames('expand-tool', 'editor-button',
    { 'expand-tool_active': isActive });

  return (
    <button type="button" className={ expandClasses } { ...restProps }>
      Дополнительные инструменты
      <i className="expand-tool__icon" />
    </button>
  );
};

export default ExpandTool;
