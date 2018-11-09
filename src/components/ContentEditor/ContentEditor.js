import React, { Component } from 'react';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import createUndoPlugin from 'draft-js-undo-plugin';

import editorWithStyles from '~/components/EditorToolbar/EditorToolbar';
import EditorButton from '~/components/EditorButton/EditorButton';
import styleMap from '~/services/editorStyleMap';

import './content-editor.scss';

const undoPlugin = createUndoPlugin();
const { UndoButton, RedoButton } = undoPlugin;
const toolbarPlugin = createToolbarPlugin({
  theme: {
    toolbarStyles : { toolbar: 'editor-toolbar' },
    buttonStyles: {
      buttonWrapper: 'editor-toolbar__button',
      button: 'editor-button',
      active: 'editor-button_active'
    }
  }
});

const { Toolbar } = toolbarPlugin;
const EditorToolbar = editorWithStyles(Toolbar);

const plugins = [toolbarPlugin, undoPlugin];
const text = 'In this editor a toolbar shows up once you select part of the text 1…';

class ContentEditor extends Component {
  state = {
    editorState: createEditorStateWithText(text),
    isExpanded: false
  };

  focus = () => {
    this.editor.focus();
  };

  handleExpand = () => {
    this.setState(({ isExpanded }) => ({
      isExpanded: !isExpanded
    }));
  };

  handleAligmentSet = (aligment) => {
    console.log(aligment);
  };

  renderStyleSection = (externalProps) => {
    const buttons = [
      { type: 'style', value: 'BOLD', icon: 'bold' },
      { type: 'style', value: 'ITALIC', icon: 'italic' },
      { type: 'style', value: 'UNDERLINE', icon: 'underline' },
      { type: 'style', value: 'STRIKETHROUGH', icon: 'strikethrough' }
    ];
    return buttons
      .map(button => EditorButton(button))
      .map((Button, index) => <Button key={ index } { ...externalProps } />)
  };

  renderAligmentSection = (externalProps) => {
    const buttons = [
      { type: 'alignment', value: 'left', icon: 'left' },
      { type: 'alignment', value: 'center', icon: 'center' },
      { type: 'alignment', value: 'right', icon: 'right' }
    ];
    return buttons
      .map(button => EditorButton(button))
      .map((Button, index) => <Button key={ index } { ...externalProps } setAlignment={ this.handleAligmentSet } />)
  };

  renderButtons = (externalProps) => {
    return (
      <React.Fragment>
        { this.renderStyleSection(externalProps) }
        <Separator className="editor-toolbar__separator" />
        { this.renderAligmentSection(externalProps) }
        <button type="button" onClick={ this.handleExpand }>+</button>
        { this.state.isExpanded &&
          <React.Fragment>
            <UndoButton />
            <RedoButton />
          </React.Fragment>
        }
      </React.Fragment>
    )
  };

  handleChange = (editorState) => {
    // console.log('editorState ==>', editorState.toJS());
    this.setState({ editorState })
  };

  render() {
    const { editorState } = this.state;
    return (
      <div className="content-editor" onClick={ this.focus }>
        <Editor
          editorState={ editorState }
          customStyleMap={ styleMap }
          onChange={ this.handleChange }
          plugins={ plugins }
          ref={ (element) => { this.editor = element; } }
        />
        <EditorToolbar>
          { this.renderButtons }
        </EditorToolbar>
      </div>
    );
  }
}

export default ContentEditor;
