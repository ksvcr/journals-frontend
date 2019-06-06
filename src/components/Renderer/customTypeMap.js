import ProseMirrorDocument from 'react-prosemirror-document';
import React from 'react';

import headingView from './views/headingView';
import imageListView from './views/imageListView';
import Table from '~/components/Table/Table';

const customTypeMap = {
  ...ProseMirrorDocument.typeMap,
  'image-list': imageListView,
  'heading': headingView,
  'table': ({ node }) => {
    return <Table data={ node }/>;
  },
  'table_row': () => null,
  'table_cell': () => null
};

export default customTypeMap;
