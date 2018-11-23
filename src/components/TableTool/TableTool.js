import React, { Component } from 'react';
import { List, Map, Repeat } from 'immutable';
import { CharacterMetadata, ContentBlock, EditorState, genKey } from 'draft-js';
import Icon from '~/components/Icon/Icon';

import './table-tool.scss';
import './assets/table.svg';

class TableTool extends Component {
  handleBlockAdd = () => {
    const { getEditorState, setEditorState } = this.props;
    const editorState = getEditorState();
    const blockKey = 'block-table';
    const selection = editorState.getSelection();
    setEditorState(addNewBlockAt(
      editorState,
      selection.getAnchorKey(),
      blockKey
    ))
  };

  render() {
    return (
      <button type="button" className="table-tool editor-button" onClick={ this.handleBlockAdd }>
        Добавить таблицу
        <Icon name="table" className="table-tool__icon editor-button__icon" />
      </button>
    );
  }
}

export default TableTool;


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
