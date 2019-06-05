import ProseMirrorDocument from 'react-prosemirror-document';
import React from 'react';

import headingView from './views/headingView';
import imageListView from './views/imageListView';

const customTypeMap = {
  ...ProseMirrorDocument.typeMap,
  'image-list': imageListView,
  'heading': headingView
};

export default customTypeMap;
