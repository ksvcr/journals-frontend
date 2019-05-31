import { Schema } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic'

const customNode = {
  customNode: {
    group: 'block',
    attrs: {
      images: { default: [] },
    },
    parseDOM: [{ tag: 'div' }],
    toDOM(node) {
      return ['div', node.attrs];
    },
  }
};

const EditorSchema = new Schema({
  nodes: schema.spec.nodes.append(customNode),
  marks: schema.spec.marks,
});

export default EditorSchema;
