const FontSizeMarkSpec = {
  attrs: {
    pt: { default: null },
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
    const { pt } = node.attrs;
    let style = '';
    if (pt) {
      style += `font-size: ${pt}pt;`;
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
    pt: fontSize.replace('pt', ''),
  };
}

export default FontSizeMarkSpec;
