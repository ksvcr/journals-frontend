import UICommand from '../UICommand';
import { Fragment } from 'prosemirror-model';
import { TextSelection } from 'prosemirror-state';
import { isInTable } from 'prosemirror-tables';

class ImageListCommand extends UICommand {
  isEnabled = (state) => {
    const { selection } = state;
    if (selection instanceof TextSelection && !isInTable(state)) {
      return selection.from === selection.to;
    }
    return false;
  };

  execute = (
    state,
    dispatch,
    view
  ) => {
    let { tr, schema, selection } = state;
    const { nodes } = schema;

    tr = tr.setSelection(selection);
    const paragraph = nodes['paragraph'];

    if (!paragraph) {
      return tr;
    }

    const { from, to } = tr.selection;
    if (from !== to) {
      return tr;
    }

    const newNode = schema.nodes['image-list'];
    const node = newNode.create({}, null, null);
    const frag = Fragment.from(node);

    tr = tr.insert(from, frag);

    dispatch && dispatch(tr);
  };
}

export default ImageListCommand;
