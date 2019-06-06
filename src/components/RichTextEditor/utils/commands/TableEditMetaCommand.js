import UICommand from '~/components/RichTextEditor/utils/UICommand';
import { isInTable } from 'prosemirror-tables';
import { findTable } from 'prosemirror-utils';

class TableEditMetaCommand extends UICommand {
  getMeta = (state) => {
    const { selection } = state;
    const table = findTable(selection);
    const attrs = table ? table.node.attrs : {};
    return attrs;
  };

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
      endTr = tr.setNodeMarkup(pos, null, meta);
      endTr = tr.setSelection(selection);
    }

    const changed = endTr.docChanged || endTr !== tr;
    changed && dispatch && dispatch(endTr);

    return changed;
  };
}

export default TableEditMetaCommand;
