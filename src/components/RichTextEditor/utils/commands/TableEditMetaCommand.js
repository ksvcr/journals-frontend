import UICommand from '~/components/RichTextEditor/utils/UICommand';
import { CellSelection, isInTable } from 'prosemirror-tables';
import { findTable } from 'prosemirror-utils';
class TableEditMetaCommand extends UICommand {
  execute = (
    state,
    dispatch,
    view,
    meta
  ) => {
    const { tr, selection } = state;
    let endTr = tr;

    if (isInTable(state)) {
      const { pos } = findTable(selection);
      endTr = tr.setNodeMarkup(pos, null, { title: 'jopa' });
      endTr = tr.setSelection(selection);
    }

    const changed = endTr.docChanged || endTr !== tr;
    changed && dispatch && dispatch(endTr);

    return changed;
  };
}

export default TableEditMetaCommand;
