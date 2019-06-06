import React from 'react';

function textHightlightMark(props) {
  return (
    <span style={ { backgroundColor: props.highlightColor, display: 'inline-block' } }>
      { props.children }
    </span>
  );
}

export default textHightlightMark;
