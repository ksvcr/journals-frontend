import { Schema } from 'prosemirror-model';

import editorMarks from './editorMarks';
import ParagraphNodeSpec from './nodeSpecs/ParagraphNodeSpec';
import HeadingNodeSpec from './nodeSpecs/HeadingNodeSpec';
import ImageListSpec from './nodeSpecs/ImageListSpec';

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

const EditorSchema = new Schema({
  nodes,
  marks: editorMarks,
});

export default EditorSchema;
