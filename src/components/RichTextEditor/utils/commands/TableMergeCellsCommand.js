import { CellSelection, mergeCells } from 'prosemirror-tables';

import UICommand from '../UICommand';

function isBlankParagraphNode(node) {
  if (!node) {
    return false;
  }
  if (node.type.name !== 'paragraph') {
    return false;
  }
  const { firstChild, lastChild } = node;
  if (!firstChild) {
    return true;
  }
  if (firstChild !== lastChild) {
    return false;
  }
  return firstChild.type.name === 'text' && firstChild.text === ' ';
}

function purgeConsecutiveBlankParagraphNodes(
  tr,
  schema
) {
  const paragraph = schema.nodes['paragraph'];
  const cell = schema.nodes['table_cell'];
  if (!paragraph || !cell) {
    return tr;
  }
  const { doc, selection } = tr;
  if (!selection instanceof CellSelection) {
    return tr;
  }
  const { from, to } = selection;
  const paragraphPoses = [];
  doc.nodesBetween(from, to, (node, pos, parentNode) => {
    if (node.type === paragraph && parentNode.type === cell) {
      if (isBlankParagraphNode(node)) {
        const $pos = tr.doc.resolve(pos);
        if (isBlankParagraphNode($pos.nodeBefore)) {
          paragraphPoses.push(pos);
        }
      }
      return false;
    } else {
      return true;
    }
  });
  paragraphPoses.reverse().forEach(pos => {
    const cell = tr.doc.nodeAt(pos);
    tr = tr.delete(pos, pos + cell.nodeSize);
  });
  return tr;
}

class TableMergeCellsCommand extends UICommand {
  execute = (
    state,
    dispatch,
    view
  ) => {
    const { tr, schema, selection } = state;
    let endTr = tr;
    if (selection instanceof CellSelection) {
      mergeCells(
        state,
        nextTr => {
          endTr = nextTr;
        },
        view
      );
      // Also merge onsecutive blank paragraphs into one.
      endTr = purgeConsecutiveBlankParagraphNodes(endTr, schema);
    }
    const changed = endTr.docChanged || endTr !== tr;
    changed && dispatch && dispatch(endTr);
    return changed;
  };
}

export default TableMergeCellsCommand;
