import cx from 'classnames';
import React, { PureComponent } from 'react';
import nanoid from 'nanoid';

import CommandMenu from './CommandMenu';
import PointerSurface from './PointerSurface';
import createPopUp from '../utils/createPopUp';

class CommandMenuButton extends PureComponent {
  _menu = null;
  _id = nanoid();

  state = {
    expanded: false,
  };

  render() {
    const {
      className,
      commandGroups,
      editorState,
      editorView,
      icon,
      disabled,
      title,
    } = this.props;
    const enabled =
      !disabled &&
      commandGroups.some((group) => {
        return Object.keys(group).some(label => {
          const command = group[label];
          let disabledVal = true;
          try {
            disabledVal =
              !editorView || !command.isEnabled(editorState, editorView);
          } catch (ex) {
            disabledVal = false;
          }
          return !disabledVal;
        });
      });

    const { expanded } = this.state;
    const buttonClassName = cx(className, {
      'czi-custom-menu-button': true,
      expanded,
    });

    return (
      <PointerSurface
        className={ buttonClassName }
        disabled={ !enabled }
        icon={ icon }
        id={ this._id }
        onClick={ this._onClick }
        title={ title }
      > { title } </PointerSurface>
    );
  }

  componentWillUnmount() {
    this._hideMenu();
  }

  _onClick = () => {
    const expanded = !this.state.expanded;
    this.setState({
      expanded,
    });
    expanded ? this._showMenu() : this._hideMenu();
  };

  _hideMenu = () => {
    const menu = this._menu;
    this._menu = null;
    menu && menu.close();
  };

  _showMenu = () => {
    const menu = this._menu;
    const menuProps = {
      ...this.props,
      onCommand: this._onCommand,
    };

    if (menu) {
      menu.update(menuProps);
    } else {
      this._menu = createPopUp(CommandMenu, menuProps, {
        anchor: document.getElementById(this._id),
        onClose: this._onClose,
      });
    }
  };

  _onCommand = () => {
    this.setState({ expanded: false });
    this._hideMenu();
  };

  _onClose = () => {
    if (this._menu) {
      this.setState({ expanded: false });
      this._menu = null;
    }
  };
}

export default CommandMenuButton;
