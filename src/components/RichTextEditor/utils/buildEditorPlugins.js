import { baseKeymap } from 'prosemirror-commands';
import { dropCursor } from 'prosemirror-dropcursor';
import { gapCursor } from 'prosemirror-gapcursor';
import { history } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';

// Creates the default plugin for the editor.
export default function buildEditorPlugins(){
  const plugins = [
    dropCursor(),
    gapCursor(),
    history(),
    keymap(baseKeymap),
  ];

  return plugins;
}
