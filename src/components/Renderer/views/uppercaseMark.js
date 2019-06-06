import React from 'react';

function uppercaseMark(props) {
  return (
    <span style={ { textTransform: 'uppercase' } }>
      { props.children }
    </span>
  );
}

export default uppercaseMark;
