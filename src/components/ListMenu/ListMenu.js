import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import ToolTip from '~/components/ToolTip/ToolTip';
import PointMenuButton from '~/components/PointMenuButton/PointMenuButton';

class ListMenu extends PureComponent {
  state = {
    showMenu: false,
  };

  handleMenuToggle = () => {
    this.setState(({ showMenu }) => ({
      showMenu: !showMenu
    }));
  };

  render() {
    const { showMenu } = this.state;
    const { renderContent, data } = this.props;
    return (
      <ToolTip
        className="tooltip"
        position="right-start"
        offset={ -5 }
        open={ showMenu }
        unmountHTMLWhenHide={ true }
        onRequestClose={ this.handleMenuToggle }
        useContext
        html={ renderContent(data, this.handleMenuToggle) } >
        <PointMenuButton onClick={ this.handleMenuToggle } id={ data.id } />
      </ToolTip>
    )
  }
}

ListMenu.propTypes = {
  renderContent: PropTypes.func,
  data: PropTypes.object
};

export default ListMenu;
