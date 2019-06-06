const ALIGN_PATTERN = /(left|right|center|justify)/;

// https://github.com/ProseMirror/prosemirror-schema-basic/blob/master/src/schema-basic.js
// :: NodeSpec A plain paragraph textblock. Represented in the DOM
// as a `<p>` element.
const ParagraphNodeSpec = {
  attrs: {
    align: { default: null },
    color: { default: null },
    id: { default: null }
  },
  content: 'inline*',
  group: 'block',
  parseDOM: [{ tag: 'p', getAttrs }],
  toDOM,
};

function getAttrs(dom) {
  const {
    textAlign
  } = dom.style;

  let align = dom.getAttribute('align') || textAlign || '';
  align = ALIGN_PATTERN.test(align) ? align : null;

  const id = dom.getAttribute('id') || '';
  return { align, id };
}

function toDOM(node) {
  const {
    align,
    id,
  } = node.attrs;
  const attrs = {};

  let style = '';
  if (align && align !== 'left') {
    style += `text-align: ${align};`;
  }

  style && (attrs.style = style);

  if (id) {
    attrs.id = id;
  }

  return ['p', attrs, 0];
}

export const toParagraphDOM = toDOM;
export const getParagraphNodeAttrs = getAttrs;

export default ParagraphNodeSpec;
