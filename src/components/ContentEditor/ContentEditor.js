import React, { Component } from 'react';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';

import {
  ItalicButton,
  BoldButton,
  UnderlineButton
} from 'draft-js-buttons';

import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import 'draft-js-alignment-plugin/lib/plugin.css';

const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;
const plugins = [toolbarPlugin];
const text = 'In this editor a toolbar shows up once you select part of the text 1…';

class ContentEditor extends Component {
  state = {
    editorState: createEditorStateWithText(text),
  };

  focus = () => {
    this.editor.focus();
  };

  renderButtons = (externalProps) => (
    <React.Fragment>
      <ItalicButton {...externalProps} />
      <BoldButton {...externalProps} />
      <UnderlineButton {...externalProps} />
      <Separator />
    </React.Fragment>
  );

  handleChange = (editorState) => {
    console.log('editorState ==>', editorState.toJS());
    this.setState({ editorState })
  };

  render() {
    return (
      <div onClick={this.focus}>
        <Toolbar>
          { this.renderButtons }
        </Toolbar>
        <Editor
          editorState={this.state.editorState}
          onChange={this.handleChange}
          plugins={ plugins }
          ref={(element) => { this.editor = element; }}
        />
      </div>
    );
  }
}

export default ContentEditor;
