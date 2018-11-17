import React, { Component } from 'react';
import { convertToRaw, convertFromRaw, EditorState, AtomicBlockUtils } from 'draft-js';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';

import editorWithStyles from '~/components/EditorToolbar/EditorToolbar';
import EditorButton from '~/components/EditorButton/EditorButton';
import ToolbarUndoSection, { undoPlugin } from '~/components/ToolbarUndoSection/ToolbarUndoSection';
import HighlightTool from '~/components/HighlightTool/HighlightTool';
import AtomicBlock from '~/components/AtomicBlock/AtomicBlock';

import { customStyleFn } from '~/services/editorCustomStyler';
import styleMap from '~/services/editorStyleMap';

import './content-editor.scss';

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
    isExpanded: false,
    isReadOnly: false
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

  mediaBlockRenderer = (block) => {
    
    if (block.getType() === 'atomic') {
      return {
        component: AtomicBlock,
        editable: false,
        props: {
          onInteractChange: this.toggleReadOnly
        }
      };
    }

    return null;
  };

  toggleReadOnly = (isReadOnly) => {
    const { editorState } = this.state;   
    const selection = editorState.getSelection();
    
    this.setState({ 
      isReadOnly,
      editorState: EditorState.forceSelection(editorState, selection)
     });
  }

  handleExpand = () => {
    this.setState(({ isExpanded }) => ({
      isExpanded: !isExpanded
    }));
  };

  handleImageBlockAdd = (event) => {
    event.stopPropagation();

    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'image-list',
      'MUTABLE',
      { images: [] }
    );

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentStateWithEntity }
    );

    this.handleChange(
      AtomicBlockUtils.insertAtomicBlock(
        newEditorState,
        entityKey,
        ' '
      )
    );
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
        <ToolbarUndoSection />
        <HighlightTool { ...externalProps } />
        <button type="button" onClick={ this.handleImageBlockAdd }>Загрузить фото</button>
        <button type="button" onClick={ this.handleExpand }>+</button>
        { isExpanded &&
          this.renderCaseSection(externalProps) }
      </React.Fragment>
    )
  };

  handleChange = (editorState) => {
    // const contentState = editorState.getCurrentContent();
    // const raw = convertToRaw(contentState);
    // console.log(raw);
    // const contentFromRaw = convertFromRaw(raw);
    // const inlineStyles = exporter(EditorState.createWithContent(contentFromRaw));
    // console.log(inlineStyles);
    this.setState({ editorState })
  };

  render() {
    const { editorState, isReadOnly } = this.state;
    return (
      <div className="content-editor">
        <Editor
          blockRendererFn={ this.mediaBlockRenderer }
          editorState={ editorState }
          customStyleMap={ styleMap }
          onChange={ this.handleChange }
          customStyleFn={ customStyleFn }
          blockStyleFn={ this.getBlockStyle }
          plugins={ plugins }
          readOnly={ isReadOnly }
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
