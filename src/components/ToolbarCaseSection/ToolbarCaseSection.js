import React from 'react';
import EditorButton from '~/components/EditorButton/EditorButton';

export default (props) => {
  const buttons = [
    { type: 'style', value: 'CAPITALIZE', icon: 'capitalize' },
    { type: 'style', value: 'UPPERCASE', icon: 'uppercase' },
    { type: 'style', value: 'SUBSCRIPT', icon: 'sub' },
    { type: 'style', value: 'SUPERSCRIPT', icon: 'sup' }
  ];
  return buttons
    .map(button => EditorButton(button))
    .map((Button, index) => <Button key={ index } { ...props } />)
};
