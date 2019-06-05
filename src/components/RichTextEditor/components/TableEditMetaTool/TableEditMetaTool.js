import React, { Component } from 'react';
import ToolTip from '~/components/ToolTip/ToolTip';
import * as EditorCommands from '../../utils/EditorCommands';
import EditorButton from '../EditorButton/EditorButton';
import MetaInfoForm from '../MetaInfoForm/MetaInfoForm';

const { TABLE_EDIT_META:command } = EditorCommands;

class TableEditMetaTool extends Component {
  state = {
    showForm: false
  };

  handleFormToggle = () => {
    this.setState(({ showForm }) => ({
      showForm: !showForm
    }));
  };

  handleMetaChange = (id, formData) => {
    const { editorState, editorView, dispatch } = this.props;
    command.execute(editorState, dispatch, editorView, formData);
    this.handleFormToggle();
  };

  render() {
    const { showForm } = this.state;
    const { editorState, editorView } = this.props;
    const disabled = !command.isEnabled(editorState, editorView);
    return (
      <ToolTip
        className="tooltip"
        position="bottom-end"
        useContext={ true }
        unmountHTMLWhenHide={ true }
        open={ showForm }
        onRequestClose={ this.handleFormToggle }
        html={
          <MetaInfoForm data={ command.getMeta(editorState) }
                        onSubmit={ this.handleMetaChange } />
        }
      >
        <EditorButton disabled={ disabled }
                      onClick={ this.handleFormToggle } title="Edit" />
      </ToolTip>
    );
  }
}

export default TableEditMetaTool;
