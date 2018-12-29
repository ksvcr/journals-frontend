import React from 'react';
import EditorButton from '~/components/EditorButton/EditorButton';

export default (props) => {
  const buttons = [
    { type: 'blockType', value: 'header-one', iconText: 'H1' },
    { type: 'blockType', value: 'header-two', iconText: 'H2' },
    { type: 'blockType', value: 'header-three', iconText: 'H3' },
    { type: 'blockType', value: 'header-four', iconText: 'H4' }
  ];

  return buttons
    .map(button => EditorButton({ ...button }))
    .map((Button, index) => <Button key={ index } { ...props } />);
};
