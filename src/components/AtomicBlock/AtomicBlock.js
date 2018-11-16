import React from 'react';
import ImageMedia from '~/components/ImageMedia/ImageMedia';

const AtomicBlock = (props) => {
  const entity = props.contentState.getEntity(
    props.block.getEntityAt(0)
  );
  const data = entity.getData();
  const type = entity.getType();

  switch(type){
    case 'image-list':
      return <ImageMedia data={ data }/>;

    default:
      return null;
  }
};

export default AtomicBlock;
