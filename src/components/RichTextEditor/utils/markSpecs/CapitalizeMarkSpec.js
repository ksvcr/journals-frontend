// https://bitbucket.org/atlassian/atlaskit/src/34facee3f461/packages/editor-core/src/schema/nodes/?at=master
const CapitalizeMarkSpec = {
  parseDOM: [
    {
      style: 'text-transform',
      getAttrs: value => {
        return value === 'capitalize' && null;
      },
    },
  ],
  toDOM() {
    const style = 'text-transform: capitalize;';
    return ['span', { style }, 0];
  },
};

export default CapitalizeMarkSpec;
