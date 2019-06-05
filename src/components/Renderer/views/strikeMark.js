import React from 'react';

function strikeMark(props) {
  return (
    <span style={ { textDecoration: 'line-through' } }>
      { props.children }
    </span>
  );
}

export default strikeMark;
