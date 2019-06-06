import ProseMirrorDocument from 'react-prosemirror-document';

import strikeMark from './views/strikeMark';
import capitalizeMark from './views/capitalizeMark';
import textColorMark from './views/textColorMark';
import textHightlightMark from './views/textHightlightMark';
import fontSizeMark from './views/fontSizeMark';
import uppercaseMark from './views/uppercaseMark';

const customMarkMap = {
  ...ProseMirrorDocument.markMap,
  'underline': 'u',
  'strike': strikeMark,
  'capitalize': capitalizeMark,
  'uppercase': uppercaseMark,
  'mark-text-color': textColorMark,
  'mark-text-hightlight': textHightlightMark,
  'mark-font-size': fontSizeMark
};

export default customMarkMap;
