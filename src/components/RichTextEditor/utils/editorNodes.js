import { Schema } from 'prosemirror-model';

import editorMarks from './editorMarks';
import ParagraphNodeSpec from './nodeSpecs/ParagraphNodeSpec';
import HeadingNodeSpec from './nodeSpecs/HeadingNodeSpec';
import ImageListSpec from './nodeSpecs/ImageListSpec';
import TableNodesSpecs from './nodeSpecs/TableNodesSpecs';

export const nodes = {
  doc: {
    content: 'block+'
  },
  paragraph: ParagraphNodeSpec,
  heading: HeadingNodeSpec,
  text: {
    group: 'inline'
  },
  'image-list': ImageListSpec
};

const schema = new Schema({
  nodes,
  marks: editorMarks,
});

const editorNodes = schema.spec.nodes.append(TableNodesSpecs);

export default editorNodes;
