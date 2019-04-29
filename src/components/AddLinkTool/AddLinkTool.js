import React, { Component } from 'react';
import EditorUtils from 'draft-js-plugins-utils';
import classNames from 'classnames';
import { withNamespaces } from 'react-i18next';

import Icon from '~/components/Icon/Icon';
import ToolTip from '~/components/ToolTip/ToolTip';
import LinkPrompt from '~/components/LinkPrompt/LinkPrompt';
import { findEntities } from '~/services/customDraftUtils';

import './add-link-tool.scss';
import './assets/link.svg';

class AddLinkTool extends Component {
  state = {
    showURLInput: false
  };

  handlePromptOpen = event => {
    event.preventDefault();
    const { getEditorState } = this.props;
    const editorState = getEditorState();
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = selection.getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

      let url = '';
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }

      this.setState({
        showURLInput: true,
        urlValue: url
      });
    }
  };

  handlePromptClose = () => {
    this.setState({
      showURLInput: false
    });
  };

  handleConfirm = urlValue => {
    const { getEditorState, setEditorState } = this.props;
    setEditorState(
      EditorUtils.createLinkAtSelection(getEditorState(), urlValue)
    );
    this.setState({
      showURLInput: false
    });
  };

  render() {
    const { showURLInput, urlValue } = this.state;
    const { t, getEditorState } = this.props;
    const hasLinkSelected = EditorUtils.hasEntity(getEditorState(), 'LINK');
    const classes = classNames('add-link-tool', 'editor-button', {
      'editor-button_active': hasLinkSelected
    });
    return (
      <ToolTip
        open={ showURLInput }
        className="tooltip"
        position="right-start"
        unmountHTMLWhenHide={ true }
        html={ <LinkPrompt value={ urlValue } onConfirm={ this.handleConfirm } /> }
        onRequestClose={ this.handlePromptClose }
      >
        <button
          type="button"
          className={ classes }
          onClick={ this.handlePromptOpen }
        >
          { t('add_link') }
          <Icon
            name="link"
            className="add-link-tool__icon editor-button__icon"
          />
        </button>
      </ToolTip>
    );
  }
}
AddLinkTool = withNamespaces()(AddLinkTool);

export default AddLinkTool;

const linkDecorator = {
  strategy: findEntities('LINK'),
  component: props => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return <a href={ url }>{ props.children }</a>;
  }
};


export { linkDecorator };
