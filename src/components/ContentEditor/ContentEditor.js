import React, { Component } from 'react';
import { convertToRaw, convertFromRaw, DefaultDraftBlockRenderMap, EditorState, SelectionState } from 'draft-js';
import { Map, merge, List, Repeat } from 'immutable';
import Editor, { createEditorStateWithText, composeDecorators } from 'draft-js-plugins-editor';
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import createTablePlugin, { tableCreator, tableStyles } from 'draft-js-table-plugin';
import addBlock from 'draft-js-drag-n-drop-plugin/lib/modifiers/addBlock';
import removeBlock from 'draft-js-drag-n-drop-plugin/lib/modifiers/removeBlock';

import editorWithStyles from '~/components/EditorToolbar/EditorToolbar';
import ToolbarUndoSection, { undoPlugin } from '~/components/ToolbarUndoSection/ToolbarUndoSection';
import ToolbarStyleSection from '~/components/ToolbarStyleSection/ToolbarStyleSection';
import ToolbarAligmentSection from '~/components/ToolbarAligmentSection/ToolbarAligmentSection';
import ToolbarCaseSection from '~/components/ToolbarCaseSection/ToolbarCaseSection';

import HighlightTool from '~/components/HighlightTool/HighlightTool';
import ImageMediaTool from '~/components/ImageMediaTool/ImageMediaTool';
import AtomicBlock from '~/components/AtomicBlock/AtomicBlock';

import { customStyleFn } from '~/services/editorCustomStyler';
import styleMap from '~/services/editorStyleMap';

import 'draft-js-table-plugin/lib/plugin.css';
import './content-editor.scss';

const blockRenderMap = Map({
  'atomic': {
    element: 'div'
  },
  'block-table': {
    element: 'div',
  }
});

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

// const table = tableCreator({ theme: tableStyles, Editor });
// console.log(table);

// const tablePlugin = createTablePlugin({ component: table, Editor });

const { Toolbar } = toolbarPlugin;
const EditorToolbar = editorWithStyles(Toolbar);

const plugins = [toolbarPlugin, undoPlugin];
const text = 'In this editor a toolbar shows up once you select part of the text 1…';

let extendedBlockRenderMap = merge(DefaultDraftBlockRenderMap, blockRenderMap);

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
  };

  handleExpand = () => {
    this.setState(({ isExpanded }) => ({
      isExpanded: !isExpanded
    }));
  };

  handleAddTable = () => {
    const blockKey = 'block-table';
    const { editorState } = this.state;
    const selection = editorState.getSelection();

    const contentStateAfterInsert = addBlock(
      editorState,
      selection,
      blockKey,
      {},
      'block-table'
    );
    
    console.log(contentStateAfterInsert);

    const newSelection = new SelectionState({
      anchorKey: blockKey,
      anchorOffset: 0,
      focusKey: blockKey,
      focusOffset: 0,
    });
    const newState = EditorState.push(editorState, contentStateAfterInsert, 'move-block');
    this.handleChange(EditorState.forceSelection(newState, newSelection));
  };

  renderButtons = (externalProps) => {
    const { isExpanded } = this.state;
    return (
      <React.Fragment>
        <ToolbarStyleSection { ...externalProps } />
        <Separator className="editor-toolbar__separator" />
        <ToolbarAligmentSection { ...externalProps } />
        <ToolbarUndoSection />
        <HighlightTool { ...externalProps } />
        <button type="button" onClick={ this.handleAddTable }>Вставить таблицу</button>

        <button type="button" onClick={ this.handleExpand }>+</button>

        { isExpanded &&
          <React.Fragment>
            <ImageMediaTool { ...externalProps } />
            <Separator className="editor-toolbar__separator" />
            <ToolbarCaseSection { ...externalProps } />
          </React.Fragment>
        }
      </React.Fragment>
    )
  };

  handleChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    console.log(raw);
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
          blockRenderMap={ extendedBlockRenderMap }
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
