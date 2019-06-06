import { Schema } from 'prosemirror-model';

import editorMarks from './editorMarks';
import editorNodes from './editorNodes';

const EditorSchema = new Schema({
  nodes: editorNodes,
  marks: editorMarks
});

export default EditorSchema;
