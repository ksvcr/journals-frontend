import { List, Map, Repeat } from 'immutable';
import { CharacterMetadata, ContentBlock, EditorState, BlockMapBuilder, Modifier, genKey } from 'draft-js';
import Icon from '~/components/Icon/Icon';
import React from 'react';

export const styleMap = {
  STRIKETHROUGH: {
    textDecoration: 'line-through',
  },
  SUBSCRIPT: {
    fontSize: '0.6em',
    verticalAlign: 'sub'
  },
  SUPERSCRIPT: {
    fontSize: '0.6em',
    verticalAlign: 'super'
  },
  CAPITALIZE: {
    textTransform: 'capitalize'
  },
  UPPERCASE: {
    textTransform: 'uppercase'
  }
};

export const blockRenderMap = Map({
  'atomic': {
    element: 'div'
  },
  'block-table': {
    element: 'div',
  }
});

export const toolbarClasses = {
  toolbarStyles : { toolbar: 'editor-toolbar' },
  buttonStyles: {
    buttonWrapper: 'editor-toolbar__button',
    button: 'editor-button',
    active: 'editor-button_active'
  }
};

export const undoParams = {
  undoContent: <Icon className="editor-button__icon editor-button__icon_undo" name="undo" />,
  redoContent: <Icon className="editor-button__icon editor-button__icon_redo" name="redo" />,
  theme: {
    undo: 'editor-button',
    redo: 'editor-button'
  }
};

export function getBlockStyle(block) {
  switch (block.getType()) {
    case 'align-left':
      return 'align-left';
    case 'align-center':
      return 'align-center';
    case 'align-right':
      return 'align-right';
    case 'align-justify':
      return 'align-justify';
    default:
      return null;
  }
}

export function findEntities(type) {
  return function(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity();
        return (
          entityKey !== null &&
          contentState.getEntity(entityKey).getType() === type
        );
      },
      callback
    );
  }
}

export function addNewBlockAt(
  editorState,
  newBlockType = 'unstyled',
  entityData = {}
) {
  const currentContentState = editorState.getCurrentContent();
  const currentSelectionState = editorState.getSelection();

  const afterRemovalContentState = Modifier.removeRange(
    currentContentState,
    currentSelectionState,
    'backward'
  );

  const targetSelection = afterRemovalContentState.getSelectionAfter();
  const blockKeyForTarget = targetSelection.get('focusKey');
  const block = currentContentState.getBlockForKey(blockKeyForTarget);
  let insertionTargetSelection;
  let insertionTargetBlock;

  const isEmptyBlock = block.getLength() === 0 && block.getEntityAt(0) === null;
  const selectedFromStart = currentSelectionState.getStartOffset() === 0;
  if (isEmptyBlock || selectedFromStart) {
    insertionTargetSelection = targetSelection;
    insertionTargetBlock = afterRemovalContentState;
  } else {
    insertionTargetBlock = Modifier.splitBlock(afterRemovalContentState, targetSelection);
    insertionTargetSelection = insertionTargetBlock.getSelectionAfter();
  }

  const newContentStateAfterSplit = Modifier.setBlockType(insertionTargetBlock, insertionTargetSelection, newBlockType);

  const contentStateWithEntity = newContentStateAfterSplit.createEntity(
    newBlockType, 'IMMUTABLE', entityData
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const charDataOfSticker = CharacterMetadata.create({ entity: entityKey });

  const fragmentArray = [
    new ContentBlock({
      key: genKey(),
      type: newBlockType,
      text: ' ',
      characterList: List(Repeat(charDataOfSticker, 1)),
      depth: 0,
      data: new Map({})
    }),

    new ContentBlock({
      key: genKey(),
      type: 'unstyled',
      text: '',
      characterList: List(),
    }),
  ];

  const fragment = BlockMapBuilder.createFromArray(fragmentArray);

  const contentStateWithNewBlock = Modifier.replaceWithFragment(
    newContentStateAfterSplit,
    insertionTargetSelection,
    fragment
  );

  return EditorState.push(
    editorState,
    contentStateWithNewBlock,
    'insert-custom-block'
  );
}
