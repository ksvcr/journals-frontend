import { Schema } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';

import editorMarks from './editorMarks';
import ParagraphNodeSpec from './nodeSpecs/ParagraphNodeSpec';
import HeadingNodeSpec from './nodeSpecs/HeadingNodeSpec';

export const nodes = {
  doc: {
    content: 'block+'
  },
  paragraph: ParagraphNodeSpec,
  heading: HeadingNodeSpec,
  text: {
    group: 'inline'
  },
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
  nodes,
  marks: editorMarks,
});

console.log(schema.spec.nodes);

export default EditorSchema;
