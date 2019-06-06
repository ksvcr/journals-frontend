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
    console.log(node);
    return <Table data={ node }/>;
  },
  'table_row': (props) => {
    console.log(props);
    return null;
  },
  'table_cell': (props) => {
    console.log(props);
    return null;
  }
};

export default customTypeMap;
