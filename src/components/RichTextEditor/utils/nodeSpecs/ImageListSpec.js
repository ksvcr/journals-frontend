const ImageListSpec = {
  group: 'block',
  attrs: {
    images: { default: [] },
  },
  parseDOM: [{ tag: 'div' }],
  toDOM(node) {
    return ['div', node.attrs];
  },
};

export default ImageListSpec;
