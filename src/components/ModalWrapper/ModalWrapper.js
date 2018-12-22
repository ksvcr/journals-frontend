import React, { Component } from 'react';
import { connect } from 'react-redux';

import Modal from '../Modal/Modal';
import ImageMedia from '../ImageMedia/ImageMedia';

import * as pageActions from '~/store/page/actions';

class ModalWrapper extends Component {
  handleClose = () => {
    const { dispatch } = this.props;
    dispatch(pageActions.setModal({
      modal: null
    }));
  };

  render() {
    const { showModal, dynamicContent } = this.props;

    return (
      <Modal isOpen={ showModal === "image-media" }
             onRequestClose={ this.handleClose }
             className="modal_without-padding">
        { dynamicContent && <ImageMedia data={ dynamicContent }/> }
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  const { page } = state;
  return {
    showModal: page.showModal,
    dynamicContent: page.dynamicContent
  };
};

export default connect(mapStateToProps)(ModalWrapper);
