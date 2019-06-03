import { schema } from 'prosemirror-schema-basic'

import TextUnderlineMarkSpec from './markSpecs/TextUnderlineMarkSpec';
import StrikeMarkSpec from './markSpecs/StrikeMarkSpec';
import TextColorMarkSpec from './markSpecs/TextColorMarkSpec';
import TextHighlightMarkSpec from './markSpecs/TextHighlightMarkSpec';
import FontSizeMarkSpec from './markSpecs/FontSizeMarkSpec';

const customMarks = {
  'underline': TextUnderlineMarkSpec,
  'strike': StrikeMarkSpec,
  'mark-text-color': TextColorMarkSpec,
  'mark-text-hightlight': TextHighlightMarkSpec,
  'mark-font-size': FontSizeMarkSpec
};

const editorMarks = schema.spec.marks.append(customMarks);

export default editorMarks;
