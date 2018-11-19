import React from 'react';
import EditorButton from '~/components/EditorButton/EditorButton';

export default (props) => {
  const buttons = [
    { type: 'blockType', value: 'left', icon: 'align-left' },
    { type: 'blockType', value: 'center', icon: 'align-center' },
    { type: 'blockType', value: 'right', icon: 'align-right' },
    { type: 'blockType', value: 'justify', icon: 'align-justify' }
  ];
  return buttons
    .map(button => EditorButton(button))
    .map((Button, index) => <Button key={ index } { ...props } />)
};
