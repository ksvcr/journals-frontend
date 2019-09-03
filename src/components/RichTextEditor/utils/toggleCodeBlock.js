import { TextSelection } from 'prosemirror-state';

import clearMarks from './clearMarks';

export default function toggleCodeBlock(
  tr,
  schema
) {
  const { nodes } = schema;
  const { selection, doc } = tr;
  const codeBlock = nodes['code_block'];
  const paragraph = nodes['paragraph'];
  const heading = nodes['heading'];

  if (!selection || !doc || !codeBlock || !paragraph) {
    return tr;
  }

  const poses = [];
  const { from, to } = tr.selection;
  let allowed = true;
  let startWithCodeBlock = null;
  doc.nodesBetween(from, to, (node, pos) => {
    const nodeType = node.type;
    if (startWithCodeBlock === null) {
      startWithCodeBlock = nodeType === codeBlock;
    }
    const { type, isBlock } = node;
    if (isBlock) {
      allowed =
        allowed &&
        (type === paragraph ||
          type === codeBlock ||
          type === heading);
      allowed && poses.push(pos);
    }

    return isBlock;
  });

  // Update from the bottom to avoid disruptive changes in pos.
  allowed &&
  poses
    .sort((a, b) => {
      if (a > b) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
      return 0;
    })
    .reverse()
    .forEach(pos => {
      tr = setCodeBlockNodeEnabled(
        tr,
        schema,
        pos,
        !startWithCodeBlock
      );
    });
  return tr;
}

function setCodeBlockNodeEnabled(
  tr,
  schema,
  pos,
  enabled
) {
  const { doc } = tr;
  if (!doc) {
    return tr;
  }

  const node = doc.nodeAt(pos);
  if (!node) {
    return tr;
  }

  const { nodes } = schema;
  const codeBlock = nodes['code_block'];
  const paragraph = nodes['paragraph'];

  if (codeBlock && !enabled && node.type === codeBlock) {
    tr = tr.setNodeMarkup(pos, paragraph, node.attrs, node.marks);
  } else if (enabled && node.type !== codeBlock) {
    const { selection } = tr;
    tr = tr.setSelection(
      TextSelection.create(tr.doc, pos, pos + node.nodeSize)
    );
    tr = clearMarks(tr, schema);
    tr = tr.setSelection(selection);
    tr = tr.setNodeMarkup(pos, codeBlock, node.attrs, node.marks);
  }
  return tr;
}
