import React from 'react';

function capitalizeMark(props) {
  return (
    <span style={ { textTransform: 'capitalize' } }>
      { props.children }
    </span>
  );
}

export default capitalizeMark;
