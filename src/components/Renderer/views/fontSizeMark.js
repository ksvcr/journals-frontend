import React from 'react';

function fontSizeMark(props) {
  return (
    <span style={ { fontSize: `${props.px}px` } }>
      { props.children }
    </span>
  );
}

export default fontSizeMark;
