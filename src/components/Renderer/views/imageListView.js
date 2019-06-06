import React from 'react';
import ImageSlider from '~/components/ImageSlider/ImageSlider';
import ImageMedia from '~/components/ImageMedia/ImageMedia';

const ImageListView =  ({ node }) => {
  const { attrs } = node;

  if (!attrs.images.length) return null;

  return attrs.images.length > 1 ? (
    <ImageSlider data={ attrs.images } />
  ) : (
    <ImageMedia data={ attrs.images[0] } />
  )
};

export default ImageListView;
