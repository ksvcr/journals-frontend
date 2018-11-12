import React, { Component } from 'react';
import { convertToRaw, convertFromRaw, EditorState } from 'draft-js';
import createStyles from 'draft-js-custom-styles';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';

import editorWithStyles from '~/components/EditorToolbar/EditorToolbar';
import EditorButton from '~/components/EditorButton/EditorButton';
import ToolbarUndoSection, { undoPlugin } from '~/components/ToolbarUndoSection/ToolbarUndoSection';
import ColorPicker from '~/components/ColorPicker/ColorPicker';

import styleMap from '~/services/editorStyleMap';

import './content-editor.scss';

const { styles, customStyleFn, exporter } = createStyles(['background'], 'CUSTOM_');

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

  getBlockStyle = (block) => {
    switch (block.getType()) {
      case 'left':
        return 'align-left';
      case 'center':
        return 'align-center';
      case 'right':
        return 'align-right';
      case 'justify':
        return 'align-justify';
      default:
        return null;
    }
  };

  handleExpand = () => {
    this.setState(({ isExpanded }) => ({
      isExpanded: !isExpanded
    }));
  };

  handleColorSet = (color) => {
    this.handleChange(styles.background.add(this.state.editorState, color));
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
      { type: 'blockType', value: 'left', icon: 'align-left' },
      { type: 'blockType', value: 'center', icon: 'align-center' },
      { type: 'blockType', value: 'right', icon: 'align-right' },
      { type: 'blockType', value: 'justify', icon: 'align-justify' }
    ];
    return buttons
      .map(button => EditorButton(button))
      .map((Button, index) => <Button key={ index } { ...externalProps } />)
  };

  renderCaseSection = (externalProps) => {
    const buttons = [
      { type: 'style', value: 'CAPITALIZE', icon: 'capitalize' },
      { type: 'style', value: 'UPPERCASE', icon: 'uppercase' },
      { type: 'style', value: 'SUBSCRIPT', icon: 'sub' },
      { type: 'style', value: 'SUPERSCRIPT', icon: 'sup' }
    ];
    return buttons
      .map(button => EditorButton(button))
      .map((Button, index) => <Button key={ index } { ...externalProps } />)
  };

  renderButtons = (externalProps) => {
    const { isExpanded } = this.state;
    return (
      <React.Fragment>
        { this.renderStyleSection(externalProps) }
        <Separator className="editor-toolbar__separator" />
        { this.renderAligmentSection(externalProps) }
        <ColorPicker onChange={ this.handleColorSet } />
        <ToolbarUndoSection />
        <button type="button" onClick={ this.handleExpand }>+</button>
        { isExpanded &&
          this.renderCaseSection(externalProps) }
      </React.Fragment>
    )
  };

  handleChange = (editorState) => {
    // const contentState = editorState.getCurrentContent();
    // const raw = convertToRaw(contentState);
    // const contentFromRaw = convertFromRaw(raw);
    // const inlineStyles = exporter(EditorState.createWithContent(contentFromRaw));
    // console.log(inlineStyles);
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
          customStyleFn={ customStyleFn }
          blockStyleFn={ this.getBlockStyle }
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
