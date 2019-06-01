import { AllSelection, TextSelection } from 'prosemirror-state';

import UICommand from '../UICommand';

export function setTextAlign(
  tr,
  schema,
  alignment
) {
  const { selection, doc } = tr;
  if (!selection || !doc) {
    return tr;
  }
  const { from, to } = selection;
  const { nodes } = schema;

  const heading = nodes['heading'];
  const paragraph = nodes['paragraph'];

  const tasks = [];
  alignment = alignment || null;

  const allowedNodeTypes = new Set([heading, paragraph]);

  doc.nodesBetween(from, to, (node, pos, parentNode) => {
    const nodeType = node.type;
    const align = node.attrs.align || null;
    if (align !== alignment && allowedNodeTypes.has(nodeType)) {
      tasks.push({
        node,
        pos,
        nodeType,
      });
    }
    return true;
  });

  if (!tasks.length) {
    return tr;
  }

  tasks.forEach(job => {
    const { node, pos, nodeType } = job;
    let { attrs } = node;
    if (alignment) {
      attrs = {
        ...attrs,
        align: alignment,
      };
    } else {
      attrs = {
        ...attrs,
        align: null,
      };
    }
    tr = tr.setNodeMarkup(pos, nodeType, attrs, node.marks);
  });

  return tr;
}

class TextAlignCommand extends UICommand {
  constructor(alignment) {
    super();
    this._alignment = alignment;
  }

  isActive = (state) => {
    const { selection, doc } = state;
    const { from, to } = selection;
    let keepLooking = true;
    let active = false;
    doc.nodesBetween(from, to, (node, pos) => {
      if (keepLooking && node.attrs.align === this._alignment) {
        keepLooking = false;
        active = true;
      }
      return keepLooking;
    });
    return active;
  };

  isEnabled = (state) => {
    const { selection } = state;
    return (
      selection instanceof TextSelection || selection instanceof AllSelection
    );
  };

  execute = (
    state,
    dispatch,
    view
  ) => {
    const { schema, selection } = state;
    const tr = setTextAlign(
      state.tr.setSelection(selection),
      schema,
      this._alignment
    );
    if (tr.docChanged) {
      dispatch && dispatch(tr);
      return true;
    } else {
      return false;
    }
  };
}

export default TextAlignCommand;
