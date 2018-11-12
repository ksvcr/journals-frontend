import React from 'react';
import createUndoPlugin from 'draft-js-undo-plugin';

import Icon from '~/components/Icon/Icon';

const undoPlugin = createUndoPlugin({
  undoContent: <Icon className="editor-button__icon editor-button__icon_undo" name="undo" />,
  redoContent: <Icon className="editor-button__icon editor-button__icon_redo" name="redo" />,
  theme: {
    undo: 'editor-button',
    redo: 'editor-button'
  }
});

const { UndoButton, RedoButton } = undoPlugin;

export default () => {
  return (
    <React.Fragment>
      <UndoButton />
      <RedoButton />
    </React.Fragment>
  );
};

export {
  undoPlugin
};
