import React, { Component } from 'react';
import { convertToRaw, convertFromRaw, DefaultDraftBlockRenderMap, EditorState, SelectionState,
  genKey, ContentBlock, CharacterMetadata } from 'draft-js';
import { Map, merge, List, Repeat } from 'immutable';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createStaticToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import createTablePlugin from 'draft-js-table-plugin';
import createEntityPropsPlugin from 'draft-js-entity-props-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';

import editorWithStyles from '~/components/EditorToolbar/EditorToolbar';
import ToolbarUndoSection, { undoPlugin } from '~/components/ToolbarUndoSection/ToolbarUndoSection';
import ToolbarStyleSection from '~/components/ToolbarStyleSection/ToolbarStyleSection';
import ToolbarAligmentSection from '~/components/ToolbarAligmentSection/ToolbarAligmentSection';
import ToolbarCaseSection from '~/components/ToolbarCaseSection/ToolbarCaseSection';

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

  handleAddTable = () => {
    const blockKey = 'block-table';
    const selection = this.state.editorState.getSelection();
    this.handleChange(addNewBlockAt(
      this.state.editorState,
      selection.getAnchorKey(),
      blockKey
    ))
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



const addNewBlockAt = (
  editorState,
  pivotBlockKey,
  newBlockType = 'unstyled',
  initialData = new Map({})
) => {
  const content = editorState.getCurrentContent();
  const blockMap = content.getBlockMap();
  const block = blockMap.get(pivotBlockKey);

  if (!block) {
    throw new Error(`The pivot key - ${ pivotBlockKey } is not present in blockMap.`);
  }

  const blocksBefore = blockMap.toSeq().takeUntil((v) => (v === block));
  const blocksAfter = blockMap.toSeq().skipUntil((v) => (v === block)).rest();
  const newBlockKey = genKey();

  const data =  {
    rows: [
      [
        {
          entityMap: {},
          blocks: [
            {
              key: genKey(),
              text: ' ',
              type: 'unstyled',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: []
            }
          ]
        },
        {
          entityMap: {},
          blocks: [
            {
              key: genKey(),
              text: ' ',
              type: 'unstyled',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: []
            }
          ]
        }
      ]
    ],
    numberOfColumns: 2
  };

  const contentStateWithEntity = content.createEntity(
    newBlockType, 'IMMUTABLE', data
  );

  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const charData = CharacterMetadata.create({ entity: entityKey });

  const newBlock = new ContentBlock({
    key: newBlockKey,
    type: newBlockType,
    text: ' ',
    characterList: List(Repeat(charData, 1)),
    depth: 0,
    data: initialData,
  });

  const newBlockMap = blocksBefore.concat(
    [[pivotBlockKey, block], [newBlockKey, newBlock]],
    blocksAfter
  ).toOrderedMap();

  const selection = editorState.getSelection();

  const newContent = content.merge({
    blockMap: newBlockMap,
    selectionBefore: selection,
    selectionAfter: selection.merge({
      anchorKey: newBlockKey,
      anchorOffset: 0,
      focusKey: newBlockKey,
      focusOffset: 0,
      isBackward: false,
    }),
  });

  return EditorState.push(editorState, newContent, 'split-block');
};
