import React, { Component } from 'react';
import ImageMedia from '~/components/ImageMedia/ImageMedia';

class AtomicBlock extends Component {
  handleChange = (files) => {
    const { contentState, block, blockProps } = this.props;
    const data = this.entity.getData();

    blockProps.onInteractChange(false);
    console.log(files);

    const images = [...data.images, ...files.map(item => item.name)];

    const newContentState = contentState.replaceEntityData(
      block.getEntityAt(0),
      { images }
    );
  }

  handleInteract = () => {
    const { contentState, block, blockProps } = this.props;    
    blockProps.onInteractChange(true);
  }

  get entity() {
    const { contentState, block } = this.props;
    return contentState.getEntity(
      block.getEntityAt(0)
    );
  }

  render() {
    const data = this.entity.getData();
    const type = this.entity.getType();
   
    switch(type){
      case 'image-list':
        return <ImageMedia data={ data } onChange={ this.handleChange } onInteract={ this.handleInteract } />;
  
      default:
        return null;
    }
  }
};

export default AtomicBlock;