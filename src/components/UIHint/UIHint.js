import React, { Component } from 'react';
import ToolTip from '../ToolTip/ToolTip';

import './ui-hint.scss';

class UIHint extends Component {
  render() {
    const { position } = this.props;
    return (
      <div className="ui-hint">
        <ToolTip
          position={ position }
          distance="8"
          arrow="true"
          sticky="true"
          title={ this.props.text }
          stickyDuration="0"
          trigger="mouseenter"
          useContext="true"
          theme="hint"
          html={ <div className="ui-hint__text"> { this.props.text } </div> }
        >
          { this.props.children }
        </ToolTip>
      </div>
    );
  }
}

UIHint.defaultProps = {
  position: 'top-start'
};

export default UIHint;
