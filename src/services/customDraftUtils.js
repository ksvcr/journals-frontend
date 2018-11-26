import { List, Map, Repeat } from 'immutable';
import { CharacterMetadata, ContentBlock, EditorState, genKey } from 'draft-js';

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

export function getBlockStyle(block) {
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
  pivotBlockKey,
  newBlockType = 'unstyled',
  entityData = {}
) {
  const content = editorState.getCurrentContent();
  const blockMap = content.getBlockMap();
  const block = blockMap.get(pivotBlockKey);

  if (!block) {
    throw new Error(`The pivot key - ${ pivotBlockKey } is not present in blockMap.`);
  }

  const blocksBefore = blockMap.toSeq().takeUntil((v) => (v === block));
  const blocksAfter = blockMap.toSeq().skipUntil((v) => (v === block)).rest();
  const newBlockKey = genKey();

  const contentStateWithEntity = content.createEntity(
    newBlockType, 'IMMUTABLE', entityData
  );

  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const charData = CharacterMetadata.create({ entity: entityKey });

  const newBlock = new ContentBlock({
    key: newBlockKey,
    type: newBlockType,
    text: ' ',
    characterList: List(Repeat(charData, 1)),
    depth: 0,
    data: new Map({})
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
}
