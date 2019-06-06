import React, { PureComponent } from 'react';

import EditorButton from '../EditorButton/EditorButton';

class CommandButton extends PureComponent {
  render() {
    const { command, editorState, editorView, icon, title } = this.props;

    const disabled = !editorView || !command.isEnabled(editorState, editorView);
    const active = command.isActive(editorState);

    return (
      <EditorButton onClick={ this.handleUIEnter } active={ active } disabled={ disabled }
                    icon={ icon } title={ title } />
    );
  }

  _execute = (value, event) => {
    const { command, editorState, dispatch, editorView } = this.props;
    command.execute(editorState, dispatch, editorView, event);
  };

  handleUIEnter = (event) => {
    const { command } = this.props;
    this._execute(command, event);
  };
}

export default CommandButton;
