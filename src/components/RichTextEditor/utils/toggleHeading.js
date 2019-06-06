export default function toggleHeading(
  tr,
  schema,
  level
) {
  const { nodes } = schema;
  const { selection, doc } = tr;

  const heading = nodes['heading'];
  const paragraph = nodes['paragraph'];

  if (
    !selection ||
    !doc ||
    !heading ||
    !paragraph
  ) {
    return tr;
  }

  const { from, to } = tr.selection;
  let startWithHeadingBlock = null;
  const poses = [];
  doc.nodesBetween(from, to, (node, pos) => {
    const nodeType = node.type;

    if (startWithHeadingBlock === null) {
      startWithHeadingBlock =
        nodeType === heading && node.attrs.level === level;
    }

    poses.push(pos);
    return false;
  });
  // Update from the bottom to avoid disruptive changes in pos.
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
      tr = setHeadingNode(
        tr,
        schema,
        pos,
        startWithHeadingBlock ? null : level
      );
    });
  return tr;
}

function setHeadingNode(
  tr,
  schema,
  pos,
  level
) {
  const { nodes } = schema;
  const heading = nodes['heading'];
  const paragraph = nodes['paragraph'];
  if (pos >= tr.doc.content.size) {
    // Workaround to handle the edge case that pos was shifted caused by `toggleList`.
    return tr;
  }
  const node = tr.doc.nodeAt(pos);
  if (!node || !heading || !paragraph) {
    return tr;
  }
  const nodeType = node.type;

  if (nodeType === heading) {
    // Toggle heading
    if (level === null) {
      tr = tr.setNodeMarkup(pos, paragraph, node.attrs, node.marks);
    } else {
      tr = tr.setNodeMarkup(pos, heading, { ...node.attrs, level }, node.marks);
    }
  } else if ((level && nodeType === paragraph)) {
    tr = tr.setNodeMarkup(pos, heading, { ...node.attrs, level }, node.marks);
  }
  return tr;
}
