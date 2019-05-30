import { EditorState } from 'prosemirror-state';
import { exampleSetup } from 'prosemirror-example-setup';

import createEmptyEditorState from './createEmptyEditorState';
import EditorSchema from './EditorSchema';



export default function convertFromJSON(
  json,
  schema,
  plugins
) {
  const effectiveSchema = schema || EditorSchema;
  const effectivePlugins = plugins || exampleSetup({ schema: effectiveSchema });
  if (typeof json === 'string') {
    try {
      json = JSON.parse(json);
    } catch (ex) {
      console.error('convertFromJSON:', ex);
      return createEmptyEditorState(schema, plugins);
    }
  }

  if (!json || typeof json !== 'object') {
    console.error('convertFromJSON: invalid object', json);
    return createEmptyEditorState(schema, plugins);
  }

  return EditorState.create({
    doc: effectiveSchema.nodeFromJSON(json),
    schema: effectiveSchema,
    plugins: effectivePlugins,
  });
}
