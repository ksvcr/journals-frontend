import { TextSelection } from 'prosemirror-state';
import { CellSelection, TableMap } from 'prosemirror-tables';
import { findParentNodeOfType } from 'prosemirror-utils';

function findActionableCellFromSelection(selection) {
  const { $anchorCell } = selection;
  const start = $anchorCell.start(-1);
  const table = $anchorCell.node(-1);
  const tableMap = TableMap.get(table);
  let topRightRect;
  let posFound = null;
  let nodeFound = null;
  selection.forEachCell((cell, cellPos) => {
    const cellRect = tableMap.findCell(cellPos - start);
    if (
      !topRightRect ||
      (cellRect.top >= topRightRect.top && cellRect.left > topRightRect.left)
    ) {
      topRightRect = cellRect;
      posFound = cellPos;
      nodeFound = cell;
    }
  });

  return posFound === null
    ? null
    : {
      node: nodeFound,
      pos: posFound,
    };
}

export default function findActionableCell(state) {
  const { doc, selection, schema } = state;
  const tdType = schema.nodes['table_cell'];
  const thType = schema.nodes['table_header'];
  if (!tdType && !thType) {
    return null;
  }

  let userSelection = selection;

  if (userSelection instanceof TextSelection) {
    const { from, to } = selection;
    if (from !== to) {
      return null;
    }
    const result =
      (tdType && findParentNodeOfType(tdType)(selection)) ||
      (thType && findParentNodeOfType(thType)(selection));

    if (!result) {
      return null;
    }

    userSelection = CellSelection.create(doc, result.pos);
  }

  if (userSelection instanceof CellSelection) {
    return findActionableCellFromSelection(userSelection);
  }

  return null;
}
