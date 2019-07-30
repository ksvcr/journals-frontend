import React, { Component } from 'react';
import Swiper from 'react-id-swiper';
import { withNamespaces } from 'react-i18next';

import Icon from '~/components/Icon/Icon';
import ImageMedia from '~/components/ImageMedia/ImageMedia';
import Modal from '~/components/Modal/Modal';

import './assets/arrow.svg';
import 'react-id-swiper/src/styles/scss/swiper.scss';
import './image-slider.scss';

class ImageSlider extends Component {
  state = {
    modal: false,
    activeItem: null
  };

  handleImageClick = ({ currentTarget }) => {
    const { index } = currentTarget.dataset;
    this.setState({
      modal: true,
      activeItem: index
    });
  };

  handleClose = () => {
    this.setState({
      modal: false,
      activeItem: null
    });
  };

  renderItems = () => {
    const { data } = this.props;
    return data.map((item, index) => (
      <div className="image-slider__item" key={ index }
           data-index={ index } onClick={ this.handleImageClick }>
        <div className="image-slider__box">
          <div className="image-slider__image-wrapper">
            <img className="image-slider__image" src={ item.file } alt={ item.title } />
          </div>
        </div>
      </div>
    ));
  };

  get sliderParams() {
    return {
      rebuildOnUpdate : true,
      slidesPerView: 3,
      centeredSlides: true,
      pagination: {
        el: '.swiper-pagination.image-slider__pagination',
        type: 'bullets',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      renderNextButton: () =>
        <button className="swiper-button-next image-slider__arrow image-slider__arrow_next">
          <Icon name="arrow" className="image-slider__arrow-icon" />
        </button>,
      renderPrevButton: () =>
        <button className="swiper-button-prev image-slider__arrow image-slider__arrow_prev">
          <Icon name="arrow" className="image-slider__arrow-icon" />
        </button>
    };
  };

  render() {
    const { data, t } = this.props;
    const { modal, activeItem } = this.state;
    const slidesCount = data.length;
    const activeData = data[activeItem];

    return (
      <div className="image-slider">
        <div className="image-slider__title">
          { t('illustrations') } ({ slidesCount })
        </div>
        <div className="image-slider__swiper">
          <Swiper { ...this.sliderParams }>
            { this.renderItems() }
          </Swiper>
        </div>
        <Modal isOpen={ modal }
               onRequestClose={ this.handleClose }
               className="modal_without-padding">
          { activeData && <ImageMedia data={ activeData }/> }
        </Modal>
      </div>
    );
  }
}

ImageSlider = withNamespaces()(ImageSlider);

export default ImageSlider;
