import React, { Component } from 'react';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import createLinkPlugin from 'draft-js-anchor-plugin';
import createUndoPlugin from 'draft-js-undo-plugin';

import {
  ItalicButton,
  BoldButton,
  UnderlineButton
} from 'draft-js-buttons';

import HeadlinesSelect from '~/components/HeadlinesSelect/HeadlinesSelect'

import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import 'draft-js-anchor-plugin/lib/plugin.css';

const linkPlugin = createLinkPlugin();
const { LinkButton } = linkPlugin;
const undoPlugin = createUndoPlugin();
const { UndoButton, RedoButton } = undoPlugin;
const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;

const plugins = [toolbarPlugin, linkPlugin, undoPlugin];
const text = 'In this editor a toolbar shows up once you select part of the text 1…';

class ContentEditor extends Component {
  state = {
    editorState: createEditorStateWithText(text),
    isExpanded: false
  };

  focus = () => {
    this.editor.focus();
  };

  handleExpand = () => {
    this.setState(({ isExpanded }) => ({
      isExpanded: !isExpanded
    }));
  };

  renderButtons = (externalProps) => {
    console.log(externalProps);
    return (
      <React.Fragment>
        <HeadlinesSelect {...externalProps} />
        <Separator />
        <BoldButton {...externalProps} />
        <ItalicButton {...externalProps} />
        <UnderlineButton {...externalProps} />
        <Separator />
        <button type="button" onClick={ this.handleExpand }>+</button>

        { this.state.isExpanded &&
          <React.Fragment>
            <LinkButton {...externalProps} />
            <Separator />
            <UndoButton />
            <RedoButton />
          </React.Fragment>
        }

      </React.Fragment>
    )
  };

  handleChange = (editorState) => {
    // console.log('editorState ==>', editorState.toJS());
    this.setState({ editorState })
  };

  render() {
    return (
      <div onClick={this.focus}>
        <Editor
          editorState={this.state.editorState}
          onChange={this.handleChange}
          plugins={ plugins }
          ref={(element) => { this.editor = element; }}
        />
        <Toolbar>
          { this.renderButtons }
        </Toolbar>
      </div>
    );
  }
}

export default ContentEditor;
