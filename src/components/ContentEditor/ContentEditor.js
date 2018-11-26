import React, { Component } from 'react';
import { convertToRaw, convertFromRaw, DefaultDraftBlockRenderMap, EditorState } from 'draft-js';
import { merge } from 'immutable';
import Editor from 'draft-js-plugins-editor';
import createStaticToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import createTablePlugin from 'draft-js-table-plugin';
import createEntityPropsPlugin from 'draft-js-entity-props-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';

import editorWithStyles from '~/components/EditorToolbar/EditorToolbar';
import ToolbarUndoSection, { undoPlugin } from '~/components/ToolbarUndoSection/ToolbarUndoSection';
import ToolbarStyleSection from '~/components/ToolbarStyleSection/ToolbarStyleSection';
import ToolbarAligmentSection from '~/components/ToolbarAligmentSection/ToolbarAligmentSection';
import ToolbarCaseSection from '~/components/ToolbarCaseSection/ToolbarCaseSection';
import TableTool from '~/components/TableTool/TableTool';
import AddLinkTool, { linkDecorator } from '~/components/AddLinkTool/AddLinkTool';
import RemoveLinkTool from '~/components/RemoveLinkTool/RemoveLinkTool';

import HighlightTool from '~/components/HighlightTool/HighlightTool';
import ColorTool from '~/components/ColorTool/ColorTool';
import ImageMediaTool from '~/components/ImageMediaTool/ImageMediaTool';
import AtomicBlock from '~/components/AtomicBlock/AtomicBlock';
import TableEditor from '~/components/TableEditor/TableEditor';

import { customStyleFn } from '~/services/editorCustomStyler';
import { styleMap, blockRenderMap, toolbarClasses, getBlockStyle } from '~/services/customDraftUtils';

import 'draft-js-table-plugin/lib/plugin.css';
import './content-editor.scss';

const toolbarPlugin = createStaticToolbarPlugin({
  theme: toolbarClasses
});

const tablePlugin = createTablePlugin({ component: TableEditor, Editor });

const { Toolbar } = toolbarPlugin;
const EditorToolbar = editorWithStyles(Toolbar);

const plugins = [createEntityPropsPlugin({}), createFocusPlugin({}), tablePlugin, toolbarPlugin, undoPlugin ];
const decorators = [linkDecorator];

let extendedBlockRenderMap = merge(DefaultDraftBlockRenderMap, blockRenderMap);

class ContentEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    isExpanded: false,
    isReadOnly: false
  };

  focus = () => {
    this.editor.focus();
  };

  mediaBlockRenderer = (block) => {
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
    const { editorState } = this.state;   
    const selection = editorState.getSelection();
    
    this.setState({
      isReadOnly,
      editorState: EditorState.forceSelection(editorState, selection)
     });
  };

  handleExpand = () => {
    this.setState(({ isExpanded }) => ({
      isExpanded: !isExpanded
    }));
  };

  renderButtons = (externalProps) => {
    const { isExpanded } = this.state;
    return (
      <React.Fragment>
        <div className="editor-toolbar__row">
          <ToolbarStyleSection { ...externalProps } />
          <Separator className="editor-toolbar__separator" />
          <ToolbarAligmentSection { ...externalProps } />
          <ToolbarUndoSection />
          <button type="button" onClick={ this.handleExpand }>+</button>
        </div>

        { isExpanded &&
          <div className="editor-toolbar__row">
            <ColorTool { ...externalProps } />
            <HighlightTool { ...externalProps } />
            <AddLinkTool  { ...externalProps } />
            <RemoveLinkTool { ...externalProps } />
            <Separator className="editor-toolbar__separator" />
            <ToolbarCaseSection { ...externalProps } />
            <Separator className="editor-toolbar__separator" />
            <TableTool { ...externalProps } />
            <ImageMediaTool { ...externalProps } />
          </div>
        }
      </React.Fragment>
    )
  };

  handleChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    console.log(raw);
    // const contentFromRaw = convertFromRaw(raw);
    // const inlineStyles = exporter(EditorState.createWithContent(contentFromRaw));
    // console.log(inlineStyles);
    this.setState({ editorState })
  };

  render() {
    const { editorState, isReadOnly } = this.state;
    return (
      <div className="content-editor">
        <Editor
          decorators={ decorators }
          blockRenderMap={ extendedBlockRenderMap }
          customStyleFn={ customStyleFn }
          customStyleMap={ styleMap }
          plugins={ plugins }
          editorState={ editorState }
          readOnly={ isReadOnly }
          onChange={ this.handleChange }
          blockStyleFn={ getBlockStyle }
          blockRendererFn={ this.mediaBlockRenderer }
          ref={ (element) => { this.editor = element; } }
        />
        <EditorToolbar>
          { this.renderButtons }
        </EditorToolbar>
      </div>
    );
  }
}

export default ContentEditor;
