import React, { Component } from 'react';
import EditorUtils from 'draft-js-plugins-utils';

import Icon from '~/components/Icon/Icon';

import './remove-link-tool.scss';
import './assets/unlink.svg';

class RemoveLinkTool extends Component {
  handleRemove = () => {
    const { getEditorState, setEditorState } = this.props;
    const newState = EditorUtils.removeLinkAtSelection(getEditorState());
    setEditorState(newState);
  };

  render() {
    return (
      <button type="button" className="remove-link-tool editor-button" onClick={ this.handleRemove }>
        Удалить ссылку
        <Icon name="unlink" className="remove-link-tool__icon editor-button__icon" />
      </button>
    );
  }
}

export default RemoveLinkTool;
