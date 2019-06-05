import ProseMirrorDocument from 'react-prosemirror-document';
import React from 'react';

import strikeMark from './views/strikeMark';
import textColorMark from './views/textColorMark';
import textHightlightMark from './views/textHightlightMark';
import fontSizeMark from './views/fontSizeMark';

const customMarkMap = {
  ...ProseMirrorDocument.markMap,
  'underline': 'u',
  'strike': strikeMark,
  'mark-text-color': textColorMark,
  'mark-text-hightlight': textHightlightMark,
  'mark-font-size': fontSizeMark
};

export default customMarkMap;
