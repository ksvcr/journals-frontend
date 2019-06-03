import React, { PureComponent } from 'react';
import PointerSurface from './PointerSurface'

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
      <div className="command-button">
        <PointerSurface disabled={ disabled } active={ active } value={ command }
                        onClick={ this._onUIEnter } onMouseEnter={ this._onUIEnter } >
          { title }
          { active ? 'active' : 'passive' }
        </PointerSurface>
      </div>
    );
  }

  _execute = (value, event) => {
    const { command, editorState, dispatch, editorView } = this.props;
    command.execute(editorState, dispatch, editorView, event);
  };

  _onUIEnter = (command, event) => {
    if (command.shouldRespondToUIEvent(event)) {
      this._execute(command, event);
    }
  };
}

export default CommandButton;
