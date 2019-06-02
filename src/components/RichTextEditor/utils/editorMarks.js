import { schema } from 'prosemirror-schema-basic'

import TextUnderlineMarkSpec from './markSpecs/TextUnderlineMarkSpec';
import StrikeMarkSpec from './markSpecs/StrikeMarkSpec';
import TextColorMarkSpec from './markSpecs/TextColorMarkSpec';

const customMarks = {
  'underline': TextUnderlineMarkSpec,
  'strike': StrikeMarkSpec,
  'mark-text-color': TextColorMarkSpec,

};

const editorMarks = schema.spec.marks.append(customMarks);

export default editorMarks;
