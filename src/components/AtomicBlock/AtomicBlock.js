import React from 'react';
import ImageList from '~/components/ImageList/ImageList';

const AtomicBlock = (props) => {
  const entity = props.contentState.getEntity(
    props.block.getEntityAt(0)
  );
  const data = entity.getData();
  const type = entity.getType();

  switch(type){
    case 'image-list':
      return <ImageList data={ data }/>;

    default:
      return null;
  }
};

export default AtomicBlock;
