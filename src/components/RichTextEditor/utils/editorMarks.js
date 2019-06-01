import { schema } from 'prosemirror-schema-basic'

import TextUnderlineMarkSpec from './markSpecs/TextUnderlineMarkSpec';
import StrikeMarkSpec from './markSpecs/StrikeMarkSpec';

const customMarks = {
  'underline': TextUnderlineMarkSpec,
  'strike': StrikeMarkSpec
};

const editorMarks = schema.spec.marks.append(customMarks);

export default editorMarks;
