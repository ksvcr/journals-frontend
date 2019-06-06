const FontSizeMarkSpec = {
  attrs: {
    px: { default: null },
  },
  inline: true,
  group: 'inline',
  parseDOM: [
    {
      style: 'font-size',
      getAttrs: getAttrs,
    },
  ],
  toDOM(node) {
    const { px } = node.attrs;
    let style = '';
    if (px) {
      style += `font-size: ${px}px;`;
    }

    return ['span', { style }, 0];
  },
};

function getAttrs(fontSize) {
  const attrs = {};
  if (!fontSize) {
    return attrs;
  }

  return {
    px: fontSize.replace('px', ''),
  };
}

export default FontSizeMarkSpec;
