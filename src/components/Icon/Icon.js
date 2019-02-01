import React from 'react';

const Icon = (props) => (
  <svg className={props.className}>
    <use xlinkHref={`#${props.name}`} />
  </svg>
);

export default Icon
