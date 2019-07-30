import React from 'react';
import ImageSlider from '~/components/ImageSlider/ImageSlider';
import ImageMedia from '~/components/ImageMedia/ImageMedia';
import find from 'lodash/find';

const ImageListView =  ({ node, meta }) => {
  const { attrs } = node;

  const images = attrs.images.map(image => {
    const { doi } = find(meta.images, { id: image.id });
    return { ...image, doi };
  });

  if (!images.length) return null;

  return images.length > 1 ? (
    <ImageSlider data={ images } />
  ) : (
    <ImageMedia data={ images[0] } />
  )
};

export default ImageListView;
