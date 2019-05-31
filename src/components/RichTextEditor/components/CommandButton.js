import React, { PureComponent } from 'react';

class CommandButton extends PureComponent {
  render() {
    const {
      command,
      editorState,
      editorView,
      title,
    } = this.props;
    let disabled = this.props.disabled;
    if (!!disabled === false) {
      disabled = !editorView || !command.isEnabled(editorState, editorView);
    }
    const active = command.isActive(editorState);
    return (
      <button disabled={ disabled }
              onClick={ this._onUIEnter }
              type="button">
        { title }
        { active ? 'active' : 'passive' }
      </button>
    );
  }

  _onUIEnter = (event) => {
    const { command } = this.props;
    this._execute(command, event);
  };

  _execute = (value, event) => {
    const { command, editorState, dispatch, editorView } = this.props;
    command.execute(editorState, dispatch, editorView, event);
  };
}

export default CommandButton;
