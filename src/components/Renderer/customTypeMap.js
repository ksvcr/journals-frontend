import ProseMirrorDocument from 'react-prosemirror-document';
import React from 'react';

import headingView from './views/headingView';
import imageListView from './views/imageListView';
import Table from '~/components/Table/Table';

const customTypeMap = meta => {
  return {
    ...ProseMirrorDocument.typeMap,
    'image-list': (props) => {
      const newProps = { ...props, meta };
      return imageListView(newProps);
    },
    'heading': headingView,
    'table': ({ node }) => {
      return <Table data={ node }/>;
    },
    'table_row': () => null,
    'table_cell': () => null
  }
};

export default customTypeMap;
