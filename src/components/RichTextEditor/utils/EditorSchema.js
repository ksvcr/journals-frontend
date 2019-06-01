import { Schema } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic'
import editorMarks from './editorMarks';

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
  marks: editorMarks,
});

export default EditorSchema;
