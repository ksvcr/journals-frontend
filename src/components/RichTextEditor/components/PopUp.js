import React from 'react';

import PopUpManager from '../utils/PopUpManager';
import { atAnchorBottomLeft, atViewportCenter } from '../utils/PopUpPosition';
import nanoid from 'nanoid';

import './czi-pop-up.scss';

class PopUp extends React.PureComponent {
  _bridge = null;
  _id = nanoid();

  render() {
    const dummy = {};
    const { View, viewProps, close } = this.props;
    return (
      <div data-pop-up-id={ this._id } id={ this._id }>
        <View { ...viewProps || dummy } close={ close } />
      </div>
    );
  }

  componentDidMount() {
    this._bridge = { getDetails: this._getDetails };
    PopUpManager.register(this._bridge);
  }

  componentWillUnmount() {
    this._bridge && PopUpManager.unregister(this._bridge);
  }

  _getDetails = () => {
    const { close, popUpParams } = this.props;
    const { anchor, autoDismiss, position, modal } = popUpParams;
    return {
      anchor,
      autoDismiss: autoDismiss === false ? false : true,
      body: document.getElementById(this._id),
      close,
      modal: modal === true,
      position: position || (modal ? atViewportCenter : atAnchorBottomLeft),
    };
  };
}

export default PopUp;
