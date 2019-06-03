import UICommand from '../UICommand';
import { Fragment } from 'prosemirror-model';

class ImageListCommand extends UICommand {
  isEnabled = (state) => {
    return true;
  };

  execute = (
    state,
    dispatch,
    view
  ) => {
    let { tr, schema } = state;
    const { selection } = tr;
    if (!selection) {
      return tr;
    }
    const { from, to } = selection;
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
