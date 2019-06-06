const TextHighlightMarkSpec = {
  attrs: {
    highlightColor: '',
  },
  inline: true,
  group: 'inline',
  parseDOM: [
    {
      tag: 'span[style*=background-color]',
      getAttrs: (dom) => {
        const { backgroundColor } = dom.style;
        return {
          highlightColor: backgroundColor
        };
      },
    },
  ],

  toDOM(node) {
    const { highlightColor } = node.attrs;
    let style = '';
    if (highlightColor) {
      style += `background-color: ${highlightColor}; display: inline-block`;
    }
    return ['span', { style }, 0];
  },
};

export default TextHighlightMarkSpec;
