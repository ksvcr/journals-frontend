import React from 'react';
import EditorButton from '~/components/EditorButton/EditorButton';

export default (props) => {
  const buttons = [
    { type: 'style', value: 'BOLD', icon: 'bold' },
    { type: 'style', value: 'ITALIC', icon: 'italic' },
    { type: 'style', value: 'UNDERLINE', icon: 'underline' },
    { type: 'style', value: 'STRIKETHROUGH', icon: 'strikethrough' }
  ];

  return buttons
    .map(button => EditorButton(button))
    .map((Button, index) => <Button key={ index } { ...props } />);
};
