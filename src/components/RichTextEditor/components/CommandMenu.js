import React, { PureComponent } from 'react';

import PointerSurface from './PointerSurface';

class CommandMenu extends PureComponent {
  _activeCommand = null;

  render() {
    const { commandGroups, editorState, editorView } = this.props;
    const children = [];
    commandGroups.forEach(group => {
      Object.keys(group).forEach(label => {
        const command = group[label];
        let disabled = true;
        try {
          disabled = !editorView || !command.isEnabled(editorState, editorView);
        } catch (ex) {
          disabled = false;
        }
        children.push(
          <PointerSurface
            active={ command.isActive(editorState) }
            disabled={ disabled }
            key={ label }
            onClick={ this._onUIEnter }
            onMouseEnter={ this._onUIEnter }
            value={ command }
          > { command.renderLabel(editorState) || label } </PointerSurface>
        );
      });
    });
    
    console.log(children);
    return <div>{ children }</div>;
  }

  _onUIEnter = (command, event) => {
    if (command.shouldRespondToUIEvent(event)) {
      this._activeCommand && this._activeCommand.cancel();
      this._activeCommand = command;
      this._execute(command, event);
    }
  };

  _execute = (command, e) => {
    const { dispatch, editorState, editorView, onCommand } = this.props;
    if (command.execute(editorState, dispatch, editorView, e)) {
      onCommand && onCommand();
    }
  };
}

export default CommandMenu;
