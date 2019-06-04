import React, { Component } from 'react';
import { convertToRaw, convertFromRaw, DefaultDraftBlockRenderMap, EditorState } from 'draft-js';
import { merge } from 'immutable';
import Editor from 'draft-js-plugins-editor';
import createStaticToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import createEntityPropsPlugin from 'draft-js-entity-props-plugin';
import createUndoPlugin from 'draft-js-undo-plugin';

import editorWithStyles from '~/components/EditorToolbar/EditorToolbar';
import ToolbarStyleSection from '~/components/ToolbarStyleSection/ToolbarStyleSection';
import ToolbarAligmentSection from '~/components/ToolbarAligmentSection/ToolbarAligmentSection';
import ToolbarCaseSection from '~/components/ToolbarCaseSection/ToolbarCaseSection';
import TableTool from '~/components/RichTextEditor/components/TableTool/TableTool';
import AddLinkTool, { linkDecorator } from '~/components/RichTextEditor/components/AddLinkTool/AddLinkTool';
import RemoveLinkTool from '~/components/RemoveLinkTool/RemoveLinkTool';
import HighlightTool from '~/components/RichTextEditor/components/HighlightTool/HighlightTool';
import ColorTool from '~/components/RichTextEditor/components/ColorTool/ColorTool';
import ImageMediaTool from '~/components/ImageMediaTool/ImageMediaTool';
import ExpandTool from '~/components/ExpandTool/ExpandTool';
import AtomicBlock from '~/components/AtomicBlock/AtomicBlock';
import ContentCounter from '~/components/ContentCounter/ContentCounter';
import HeadlinesButtons from '~/components/HeadlinesButtons/HeadlinesButtons';
import FontSizeTool from '~/components/RichTextEditor/components/FontSizeTool/FontSizeTool';

import { customStyleFn } from '~/services/editorCustomStyler';
import { styleMap, blockRenderMap, toolbarClasses, getBlockStyle, undoParams } from '~/services/customDraftUtils';

import './content-editor.scss';

const decorators = [linkDecorator];

let extendedBlockRenderMap = merge(DefaultDraftBlockRenderMap, blockRenderMap);

class ContentEditor extends Component {
  constructor(props) {
    super(props);
    const editorState = this.initEditorState();
    this.state = {
      editorState: editorState,
      isExpanded: false,
      isReadOnly: false
    };
    this.plugins = this.createPlugins();
    this.changeValue(editorState);
  }

  createPlugins = () => {
    const toolbarPlugin = createStaticToolbarPlugin({
      theme: toolbarClasses
    });

    const undoPlugin = createUndoPlugin(undoParams);
    const { UndoButton, RedoButton } = undoPlugin;

    this.undoSection = () => (
      <React.Fragment>
        <UndoButton />
        <RedoButton />
      </React.Fragment>
    );

    const { Toolbar } = toolbarPlugin;
    this.toolbar = editorWithStyles(Toolbar);
    return [
      createEntityPropsPlugin({}),
      toolbarPlugin,
      undoPlugin
    ];
  };

  initEditorState = () => {
    const { value } = this.props;
    if (value) {
      const contentFromRaw = convertFromRaw(value);
      return EditorState.createWithContent(contentFromRaw);
    } else {
      return EditorState.createEmpty();
    }
  };

  mediaBlockRenderer = block => {
    if (block.getType() === 'atomic') {
      return {
        component: AtomicBlock,
        editable: false,
        props: {
          onInteractChange: this.toggleReadOnly
        }
      };
    }
    return null;
  };

  toggleReadOnly = (isReadOnly) => {
    this.setState({
      isReadOnly
    });
  };

  handleExpand = () => {
    this.setState(({ isExpanded }) => ({
      isExpanded: !isExpanded
    }));
  };

  handleChange = editorState => {
    this.setState({ editorState });
  };

  changeValue = () => {
    const { editorState } = this.state;
    const { onChange } = this.props;
    const contentState = editorState.getCurrentContent();
    const value = convertToRaw(contentState);
    onChange(value);
  };

  renderButtons = externalProps => {
    const { isExpanded } = this.state;
    const ToolbarUndoSection = this.undoSection;
    return (
      <React.Fragment>
        <div className="editor-toolbar__row">
          <FontSizeTool { ...externalProps } />
          <Separator className="editor-toolbar__separator" />
          <HeadlinesButtons { ...externalProps } />
          <ToolbarStyleSection { ...externalProps } />
          <Separator className="editor-toolbar__separator" />
          <ToolbarAligmentSection { ...externalProps } />
          <ToolbarUndoSection />
          <ExpandTool isActive={ isExpanded } onClick={ this.handleExpand } />
        </div>

        { isExpanded && (
          <div className="editor-toolbar__row">
            <ColorTool { ...externalProps } />
            <HighlightTool { ...externalProps } />
            <AddLinkTool { ...externalProps } />
            <RemoveLinkTool { ...externalProps } />
            <Separator className="editor-toolbar__separator" />
            <ToolbarCaseSection { ...externalProps } />
            <Separator className="editor-toolbar__separator" />
            <TableTool { ...externalProps } />
            <ImageMediaTool { ...externalProps } />
          </div>
        ) }
      </React.Fragment>
    );
  };

  render() {
    const { editorState, isReadOnly } = this.state;
    const EditorToolbar = this.toolbar;

    return (
      <div className="content-editor">
        <Editor
          decorators={ decorators }
          blockRenderMap={ extendedBlockRenderMap }
          customStyleFn={ customStyleFn }
          customStyleMap={ styleMap }
          plugins={ this.plugins }
          editorState={ editorState }
          readOnly={ isReadOnly }
          onChange={ this.handleChange }
          blockStyleFn={ getBlockStyle }
          blockRendererFn={ this.mediaBlockRenderer }
          onBlur={ this.changeValue }
          ref={ element => {
            this.editor = element;
          } }
        />
        <ContentCounter editorState={ editorState } />
        <EditorToolbar>{ this.renderButtons }</EditorToolbar>
      </div>
    );
  }
}

export default ContentEditor;
