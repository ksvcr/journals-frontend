import React, { PureComponent } from 'react';

import FontSizeCommand from '../utils/commands/FontSizeCommand';
import CommandMenuButton from './CommandMenuButton';
import findActiveFontSize from '../utils/findActiveFontSize';

export const FONT_PT_SIZES = [
  8,
  9,
  10,
  11,
  12,
  14,
  18,
  24,
  30,
  36,
  48,
  60,
  72,
  90,
];

const FONT_PT_SIZE_COMMANDS = FONT_PT_SIZES.reduce((memo, size) => {
  memo[` ${size} `] = new FontSizeCommand(size);
  return memo;
}, {});

const COMMAND_GROUPS = [
  { Default: new FontSizeCommand(0) },
  FONT_PT_SIZE_COMMANDS,
];

class FontSizeCommandMenuButton extends PureComponent {
  render() {
    const { dispatch, editorState, editorView } = this.props;
    const fontSize = findActiveFontSize(editorState);
    return (
      <CommandMenuButton
        commandGroups={ COMMAND_GROUPS }
        dispatch={ dispatch }
        editorState={ editorState }
        editorView={ editorView }
        title={ fontSize }
      />
    );
  }
}

export default FontSizeCommandMenuButton;
