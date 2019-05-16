import React, { Component } from 'react';
import EditorUtils from 'draft-js-plugins-utils';
import { withNamespaces } from 'react-i18next';

import Icon from '~/components/Icon/Icon';

import './remove-link-tool.scss';
import './assets/unlink.svg';

class RemoveLinkTool extends Component {
  handleRemove = () => {
    const { getEditorState, setEditorState } = this.props;
    const newState = EditorUtils.removeLinkAtSelection(getEditorState());
    setEditorState(newState);
  };

  render() {
    const { t } = this.props;
    return (
      <button type="button" className="remove-link-tool editor-button" onClick={ this.handleRemove }>
        { t('delete_link') }
        <Icon name="unlink" className="remove-link-tool__icon editor-button__icon" />
      </button>
    );
  }
}

RemoveLinkTool = withNamespaces()(RemoveLinkTool);

export default RemoveLinkTool;
