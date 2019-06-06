// https://bitbucket.org/atlassian/atlaskit/src/34facee3f461/packages/editor-core/src/schema/nodes/?at=master
const UppercaseMarkSpec = {
  parseDOM: [
    {
      style: 'text-transform',
      getAttrs: value => {
        return value === 'uppercase' && null;
      },
    },
  ],
  toDOM() {
    const style = 'text-transform: uppercase;';
    return ['span', { style }, 0];
  },
};

export default UppercaseMarkSpec;
