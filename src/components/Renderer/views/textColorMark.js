import React from 'react';

function textColorMark(props) {
  return (
    <span style={ { color: props.color } }>
      { props.children }
    </span>
  );
}

export default textColorMark;
