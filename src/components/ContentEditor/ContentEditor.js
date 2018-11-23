import React, { Component } from 'react';
import { convertToRaw, convertFromRaw, DefaultDraftBlockRenderMap, EditorState, SelectionState,
  genKey, ContentBlock, CharacterMetadata } from 'draft-js';
import { Map, merge, List, Repeat } from 'immutable';
import Editor from 'draft-js-plugins-editor';
import createStaticToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import createTablePlugin from 'draft-js-table-plugin';
import createEntityPropsPlugin from 'draft-js-entity-props-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';

import editorWithStyles from '~/components/EditorToolbar/EditorToolbar';
import ToolbarUndoSection, { undoPlugin } from '~/components/ToolbarUndoSection/ToolbarUndoSection';
import ToolbarStyleSection from '~/components/ToolbarStyleSection/ToolbarStyleSection';
import ToolbarAligmentSection from '~/components/ToolbarAligmentSection/ToolbarAligmentSection';
import ToolbarCaseSection from '~/components/ToolbarCaseSection/ToolbarCaseSection';
import TableTool from '~/components/TableTool/TableTool';

import HighlightTool from '~/components/HighlightTool/HighlightTool';
import ImageMediaTool from '~/components/ImageMediaTool/ImageMediaTool';
import AtomicBlock from '~/components/AtomicBlock/AtomicBlock';
import TableEditor from '~/components/TableEditor/TableEditor';

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

const toolbarPlugin = createStaticToolbarPlugin({
  theme: {
    toolbarStyles : { toolbar: 'editor-toolbar' },
    buttonStyles: {
      buttonWrapper: 'editor-toolbar__button',
      button: 'editor-button',
      active: 'editor-button_active'
    }
  }
});

const tablePlugin = createTablePlugin({ component: TableEditor, Editor });

const { Toolbar } = toolbarPlugin;
const EditorToolbar = editorWithStyles(Toolbar);

const plugins = [createEntityPropsPlugin({}), createFocusPlugin({}), tablePlugin, toolbarPlugin, undoPlugin ];

let extendedBlockRenderMap = merge(DefaultDraftBlockRenderMap, blockRenderMap);

class ContentEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
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

  renderButtons = (externalProps) => {
    const { isExpanded } = this.state;
    return (
      <React.Fragment>
        <ToolbarStyleSection { ...externalProps } />
        <Separator className="editor-toolbar__separator" />
        <ToolbarAligmentSection { ...externalProps } />
        <ToolbarUndoSection />

        <button type="button" onClick={ this.handleExpand }>+</button>

        { isExpanded &&
          <React.Fragment>
            <HighlightTool { ...externalProps } />
            <ToolbarCaseSection { ...externalProps } />
            <Separator className="editor-toolbar__separator" />
            <TableTool { ...externalProps } />
            <ImageMediaTool { ...externalProps } />
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
