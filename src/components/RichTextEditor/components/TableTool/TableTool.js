import React, { Component } from 'react';
import ToolTip from '~/components/ToolTip/ToolTip';
import TableCreateForm from '../TableCreateForm/TableCreateForm';
import * as EditorCommands from '../../utils/EditorCommands';
import EditorButton from '../EditorButton/EditorButton';

const { TABLE_INSERT_TABLE:command } = EditorCommands;

class TableTool extends Component {
  state = {
    showForm: false
  };

  handleBlockAdd = (formData) => {
    const inputs =  {
      title: 'Заголовок таблицы',
      ...formData
    };
    const { editorState, editorView, dispatch } = this.props;
    command.execute(editorState, dispatch, editorView, inputs);
    this.handleFormToggle();
  };

  handleFormToggle = () => {
    this.setState(({ showForm }) => ({
      showForm: !showForm
    }));
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
          <TableCreateForm onSubmit={ this.handleBlockAdd } />
        }
      >
        <EditorButton disabled={ disabled }
                      onClick={ this.handleFormToggle } icon="table" />
      </ToolTip>
    );
  }
}

export default TableTool;
