import React from 'react';
import EditorButton from '~/components/EditorButton/EditorButton';

export default (props) => {
  const buttons = [
    { type: 'blockType', value: 'align-left', icon: 'align-left' },
    { type: 'blockType', value: 'align-center', icon: 'align-center' },
    { type: 'blockType', value: 'align-right', icon: 'align-right' },
    { type: 'blockType', value: 'align-justify', icon: 'align-justify' }
  ];
  return buttons
    .map(button => EditorButton(button))
    .map((Button, index) => <Button key={ index } { ...props } />)
};
