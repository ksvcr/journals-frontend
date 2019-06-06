import React, { Component } from 'react';
import ToolTip from '~/components/ToolTip/ToolTip';
import LinkPrompt from '~/components/RichTextEditor/components/LinkPrompt/LinkPrompt';
import * as EditorCommands from '~/components/RichTextEditor/utils/EditorCommands';
import EditorButton from '~/components/RichTextEditor/components/EditorButton/EditorButton';

import './assets/link.svg';

const { LINK_SET_URL:command } = EditorCommands;

class AddLinkTool extends Component {
  state = {
    showURLInput: false
  };

  handlePromptOpen = () => {
    this.setState({
      showURLInput: true
    });
  };

  handlePromptClose = () => {
    this.setState({
      showURLInput: false
    });
  };

  handleConfirm = urlValue => {
    const { editorState, dispatch, editorView } = this.props;
    command.execute(editorState, dispatch, editorView, urlValue);
    this.handlePromptClose();
  };

  render() {
    const { showURLInput } = this.state;
    const { editorState, editorView } = this.props;
    const urlValue = command.getHref(editorState);
    const isEnabled = command.isEnabled(editorState, editorView);
    return (
      <ToolTip
        open={ showURLInput }
        className="tooltip"
        position="right-start"
        unmountHTMLWhenHide={ true }
        html={ <LinkPrompt value={ urlValue } onConfirm={ this.handleConfirm } /> }
        onRequestClose={ this.handlePromptClose }
      >
        <EditorButton disabled={ !isEnabled }
                      onClick={ this.handlePromptOpen } icon="link" />
      </ToolTip>
    );
  }
}
export default AddLinkTool;
