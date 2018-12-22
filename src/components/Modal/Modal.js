import React, { Component } from 'react';
import ReactModal from 'react-modal';
import classNames from 'classnames';

import Icon from '../Icon/Icon';

import './modal.scss';
import './assets/close.svg';

class Modal extends Component {
  get modalSettings() {
    const { className } = this.props;
    const classes = classNames('modal', className);
    return {
      ...this.props,
      portalClassName: classes,
      className: 'modal__holder',
      overlayClassName: 'modal__overlay',
      ariaHideApp: false
    }
  };

  render() {
    return (
      <ReactModal { ...this.modalSettings }>
        <div className="modal__box">
          <button type="button" className="modal__close" onClick={ this.props.onRequestClose }>
            <Icon className="modal__icon" name="close" />
          </button>
          <div className="modal__content">
            { this.props.children }
          </div>
        </div>
      </ReactModal>
    );
  }
}

export default Modal;
